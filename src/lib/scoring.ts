export type Risk = "Safe" | "Suspicious" | "Dangerous";
export type Prediction = "legitimate" | "phishing";

export type ScoredResult = {
  prediction: Prediction;
  label: number;
  probability: number;
  risk: Risk;
  model?: string;
  mode?: string;
};

const PHISH_CUES =
  /\b(password|passcode|otp|one[-\s]?time code|verify (your )?(account|identity|login|password)|account (is |has been |will be )?(suspend|locked|compromised|disabled)|confirm your (password|bank|ssn|pin)|wire transfer|gift card|click (here|below|the link)|act now|urgent(ly)?|immediately|dear (user|customer|valued)|unusual (sign[-\s]?in|login)|update your (payment|billing) (method|info|details)|ssn|social security|prize|winner|claim now|bitcoin|seed phrase)\b/i;

const PRODUCT_DIGEST =
  /\b(weekly (writing )?update|writing streak|words analyzed|achievement badge|area of improvement|unique words|readability suggestions|tone suggestions|you were more (productive|accurate)|next achievement)\b/i;

const GREETING =
  /\b(hi|hello|hey|how are you|good morning|good afternoon|good evening|thanks|thank you|see you|ok|okay|bye)\b/i;

export function wordCount(text: string) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function hasRiskSignals(text: string) {
  return PHISH_CUES.test(text) || /https?:\/\/|www\./i.test(text);
}

/** Short chat / greetings are out-of-domain for Enron-style ham. Don't trust a phish score. */
export function isShortEveryday(text: string) {
  if (hasRiskSignals(text)) return false;
  const n = wordCount(text);
  if (n === 0 || n > 28) return false;
  return n <= 16 || GREETING.test(text);
}

/** LinearSVC expit() hugs 0.5. Stretch the logit so ham/phish separate. */
export function stretchProbability(probability: number, scale = 2.2): number {
  const eps = 1e-6;
  const p = Math.min(1 - eps, Math.max(eps, probability));
  const logit = Math.log(p / (1 - p));
  return 1 / (1 + Math.exp(-scale * logit));
}

export function riskFromModel(prediction: Prediction, probability: number): Risk {
  if (prediction === "legitimate") {
    return probability >= 0.5 ? "Suspicious" : "Safe";
  }
  return probability >= 0.7 ? "Dangerous" : "Suspicious";
}

export function roundProb(probability: number): number {
  return Math.round(probability * 1_000_000) / 1_000_000;
}

/**
 * Align the API payload with the model's class, then apply a conservative
 * digest overlay (product reports without credential/urgency cues).
 */
export function normalizePrediction(
  raw: Partial<ScoredResult> & { prediction?: string; probability?: number; label?: number },
  text: string,
  mode: "fast" | "deep",
): ScoredResult {
  let prediction: Prediction = raw.prediction === "phishing" ? "phishing" : "legitimate";
  let probability = typeof raw.probability === "number" ? raw.probability : prediction === "phishing" ? 0.7 : 0.2;

  // Only stretch if Azure is still on the old LinearSVC mapping
  // (legitimate + Suspicious + mid score). New app.py already calibrates.
  const oldUncalibratedHam =
    mode === "fast" &&
    prediction === "legitimate" &&
    raw.risk === "Suspicious" &&
    probability < 0.5;
  if (oldUncalibratedHam) {
    probability = stretchProbability(probability);
  }

  const looksLikeDigest = PRODUCT_DIGEST.test(text);
  const risky = hasRiskSignals(text);

  if (isShortEveryday(text)) {
    prediction = "legitimate";
    probability = Math.min(probability, 0.08);
  } else if (looksLikeDigest && !risky) {
    if (prediction === "phishing" && probability < 0.85) {
      prediction = "legitimate";
      probability = Math.min(probability, 0.28);
    } else if (prediction === "legitimate") {
      probability = Math.min(probability, 0.28);
    }
  }

  const label = prediction === "phishing" ? 1 : 0;
  return {
    prediction,
    label,
    probability: roundProb(probability),
    risk: riskFromModel(prediction, probability),
    model: raw.model,
    mode: raw.mode ?? mode,
  };
}
