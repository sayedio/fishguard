import { isShortEveryday, type Prediction, type Risk } from "@/lib/scoring";

export type ReasonTone = "risk" | "safe";

export type ExplainSpan = {
  start: number;
  end: number;
  text: string;
};

export type ExplainReason = {
  id: string;
  title: string;
  detail: string;
  tone: ReasonTone;
  hits: string[];
};

export type Explanation = {
  summary: string;
  reasons: ExplainReason[];
  spans: ExplainSpan[];
  method: string;
};

type Cue = {
  id: string;
  title: string;
  detail: string;
  tone: ReasonTone;
  pattern: RegExp;
};

const RISK_CUES: Cue[] = [
  {
    id: "urgency",
    title: "Urgency",
    detail: "Pushes you to act before you can think.",
    tone: "risk",
    pattern: /\b(immediately|urgent(ly)?|act now|right now|within \d+\s*hours?|expires? today|final notice|last chance)\b/gi,
  },
  {
    id: "lockout",
    title: "Account threat",
    detail: "Fear of a locked or suspended account is a common lure.",
    tone: "risk",
    pattern: /\b(account (will be |has been |is )?(suspend(?:ed)?|locked|disabled|compromised)|account locked|verify now)\b/gi,
  },
  {
    id: "credentials",
    title: "Password or login ask",
    detail: "Real services rarely ask you to send a password by email.",
    tone: "risk",
    pattern: /\b(password|passcode|otp|one[-\s]?time code|verify (your )?(account|identity|login|password)|confirm your (password|identity|login))\b/gi,
  },
  {
    id: "money",
    title: "Money or bank ask",
    detail: "Asks for bank, card, or payment details.",
    tone: "risk",
    pattern: /\b(bank details|wire transfer|gift card|ssn|social security|account number|routing number|credit card)\b/gi,
  },
  {
    id: "click",
    title: "Pressure to click",
    detail: "RQ9 LIME often flagged “click”, “act”, and “reply” in phishing.",
    tone: "risk",
    pattern: /\b(click here|click below|click immediately|click (the )?link|act now)\b/gi,
  },
  {
    id: "generic",
    title: "Generic greeting",
    detail: "“Dear user / customer” is typical of mass scam mail.",
    tone: "risk",
    pattern: /\b(dear (user|customer|valued customer|account holder|member))\b/gi,
  },
  {
    id: "link",
    title: "Odd link",
    detail: "Links that mimic login pages are a classic trap.",
    tone: "risk",
    pattern: /https?:\/\/[^\s<>"']+|www\.[^\s<>"']+/gi,
  },
];

const SAFE_CUES: Cue[] = [
  {
    id: "digest",
    title: "Product update",
    detail: "Looks like a weekly report or product summary — not a login trap.",
    tone: "safe",
    pattern: /\b(weekly (writing )?update|writing streak|words analyzed|achievement badge|area of improvement|unique words|readability suggestions)\b/gi,
  },
  {
    id: "work",
    title: "Normal work mail",
    detail: "Reads like a meeting note or everyday message.",
    tone: "safe",
    pattern: /\b(meeting notes?|standup|please find attached|see you|thanks,|best regards)\b/gi,
  },
  {
    id: "greeting",
    title: "Everyday greeting",
    detail: "Short chat like “hi / how are you?” is not a scam pattern.",
    tone: "safe",
    pattern: /\b(hi|hello|hey|how are you|good morning|good afternoon|good evening|thanks|thank you)\b/gi,
  },
];

function collect(text: string, cues: Cue[]): { reasons: ExplainReason[]; spans: ExplainSpan[] } {
  const reasons: ExplainReason[] = [];
  const spans: ExplainSpan[] = [];

  for (const cue of cues) {
    const hits = new Set<string>();
    cue.pattern.lastIndex = 0;
    let match: RegExpExecArray | null;
    const re = new RegExp(cue.pattern.source, cue.pattern.flags);
    while ((match = re.exec(text)) !== null) {
      const raw = match[0].trim();
      if (!raw) continue;
      hits.add(raw.length > 48 ? `${raw.slice(0, 45)}…` : raw);
      spans.push({ start: match.index, end: match.index + match[0].length, text: match[0] });
      if (match.index === re.lastIndex) re.lastIndex += 1;
    }
    if (hits.size) {
      reasons.push({
        id: cue.id,
        title: cue.title,
        detail: cue.detail,
        tone: cue.tone,
        hits: [...hits].slice(0, 4),
      });
    }
  }

  spans.sort((a, b) => a.start - b.start || b.end - a.end);
  const merged: ExplainSpan[] = [];
  for (const span of spans) {
    const last = merged[merged.length - 1];
    if (last && span.start < last.end) {
      if (span.end > last.end) last.end = span.end;
      continue;
    }
    merged.push({ ...span });
  }

  return { reasons, spans: merged };
}

export function explainEmail(
  text: string,
  verdict: { prediction: Prediction; risk: Risk; probability: number },
): Explanation {
  const { reasons: riskReasons, spans } = collect(text, RISK_CUES);
  const { reasons: safeReasons } = collect(text, SAFE_CUES);

  const riskyLink = riskReasons.find((r) => r.id === "link");
  if (riskyLink) {
    const odd = riskyLink.hits.some((h) =>
      /secure-login|verify-|account-update|bit\.ly|tinyurl|login-update/i.test(h),
    );
    if (!odd && verdict.prediction === "legitimate") {
      riskReasons.splice(riskReasons.indexOf(riskyLink), 1);
    }
  }

  const isSafe = verdict.risk === "Safe" && verdict.prediction === "legitimate";
  const shortEveryday = isShortEveryday(text);

  if (shortEveryday) {
    return {
      summary: "Short everyday message. No scam cues found.",
      reasons: [
        {
          id: "short",
          title: "Too short to be a typical scam",
          detail: "Real phishing usually asks for a login, money, or a click. This reads like a normal hello.",
          tone: "safe" as const,
          hits: [],
        },
        ...safeReasons,
      ].slice(0, 4),
      spans: [],
      method: "RQ9-style cue analysis (LIME/SHAP signals: click, act, verify, urgency, links)",
    };
  }

  const reasons = isSafe
    ? [...safeReasons, ...riskReasons.filter((r) => r.id !== "link")].slice(0, 4)
    : [...riskReasons, ...safeReasons].slice(0, 5);

  if (!reasons.length) {
    reasons.push(
      isSafe
        ? {
            id: "clean",
            title: "No classic scam cues",
            detail: "No password ask, fake lockout, or pressure-click language stood out.",
            tone: "safe",
            hits: [],
          }
        : {
            id: "model",
            title: "Model pattern match",
            detail: "The model saw phishing-like wording even if a single cue is hard to name.",
            tone: "risk",
            hits: [],
          },
    );
  }

  const summary = isSafe
    ? "This looks like normal mail. No strong scam cues were found."
    : `Flagged mainly for ${
        reasons
          .filter((r) => r.tone === "risk")
          .slice(0, 2)
          .map((r) => r.title.toLowerCase())
          .join(" and ") || "risky language"
      }.`;

  return {
    summary,
    reasons,
    spans: isSafe ? [] : spans.slice(0, 12),
    method: "RQ9-style cue analysis (LIME/SHAP signals: click, act, verify, urgency, links)",
  };
}

export function highlightText(text: string, spans: ExplainSpan[]): { text: string; hit: boolean }[] {
  if (!spans.length) return [{ text, hit: false }];
  const parts: { text: string; hit: boolean }[] = [];
  let cursor = 0;
  for (const span of spans) {
    if (span.start > cursor) parts.push({ text: text.slice(cursor, span.start), hit: false });
    parts.push({ text: text.slice(span.start, span.end), hit: true });
    cursor = span.end;
  }
  if (cursor < text.length) parts.push({ text: text.slice(cursor), hit: false });
  return parts;
}
