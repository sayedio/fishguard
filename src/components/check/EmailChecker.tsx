"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Loader2, ShieldAlert, ShieldCheck, ShieldQuestion, Star } from "lucide-react";
import type { ExplainReason, ExplainSpan } from "@/lib/explain";
import { highlightText } from "@/lib/explain";
import { cn, formatPercent } from "@/lib/utils";

type Mode = "fast" | "deep" | "both";

type PredictResult = {
  prediction: "legitimate" | "phishing";
  label: number;
  probability: number;
  risk: "Safe" | "Suspicious" | "Dangerous";
  model: string;
  mode: string;
  summary?: string;
  reasons?: ExplainReason[];
  spans?: ExplainSpan[];
  method?: string;
};

const SAMPLE = `Dear user,

Your account will be suspended within 24 hours.
Click here immediately to verify your password and bank details:
http://secure-login-update.com

Thank you,
Support Team`;

const MODES = [
  { id: "fast" as const, label: "Fast", hint: "Quick SVM read" },
  { id: "deep" as const, label: "Deep", hint: "DistilBERT" },
  { id: "both" as const, label: "Both", hint: "Compare" },
];

export function EmailChecker() {
  const [mode, setMode] = useState<Mode>("fast");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fast, setFast] = useState<PredictResult | null>(null);
  const [deep, setDeep] = useState<PredictResult | null>(null);
  const [rating, setRating] = useState(0);
  const [rated, setRated] = useState(false);

  const hasResult = Boolean(fast || deep);

  const summary = useMemo(() => {
    const results = [fast, deep].filter(Boolean) as PredictResult[];
    if (!results.length) return null;
    return results.reduce((a, b) => (a.probability >= b.probability ? a : b));
  }, [fast, deep]);

  async function runPredict() {
    setError(null);
    setFast(null);
    setDeep(null);
    setRated(false);
    setRating(0);

    if (!text.trim()) {
      setError("Paste an email first.");
      return;
    }

    setLoading(true);
    try {
      const tasks: Promise<void>[] = [];

      if (mode === "fast" || mode === "both") {
        tasks.push(
          fetch("/api/predict/fast", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
          }).then(async (res) => {
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Fast check failed");
            setFast(data);
          }),
        );
      }

      if (mode === "deep" || mode === "both") {
        tasks.push(
          fetch("/api/predict/deep", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
          }).then(async (res) => {
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Deep check failed");
            setDeep(data);
          }),
        );
      }

      await Promise.all(tasks);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function saveRating(value: number) {
    setRating(value);
    setRated(true);
    try {
      const key = "phishguard_ratings";
      const prev = JSON.parse(localStorage.getItem(key) || "[]") as unknown[];
      prev.unshift({ value, at: Date.now(), mode });
      localStorage.setItem(key, JSON.stringify(prev.slice(0, 50)));
    } catch {
      /* ignore */
    }
  }

  const parts = summary?.spans?.length ? highlightText(text, summary.spans) : null;

  return (
    <div className="grid gap-5 lg:grid-cols-[1.05fr_0.95fr] lg:gap-6">
      <section className="panel overflow-hidden">
        <div className="border-b border-line bg-bg-subtle/50 p-3 sm:p-4">
          <div className="grid grid-cols-3 gap-1.5" role="tablist" aria-label="Check mode">
            {MODES.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={mode === item.id}
                className={cn(
                  "focus-ring rounded-[0.4rem] px-2 py-2 text-center transition sm:px-3",
                  mode === item.id
                    ? "bg-bg-elevated text-fg shadow-soft ring-1 ring-line"
                    : "text-fg-muted hover:text-fg",
                )}
                onClick={() => setMode(item.id)}
              >
                <span className="block text-sm font-semibold">{item.label}</span>
                <span className="hidden text-[11px] sm:block">{item.hint}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor="email-text" className="text-sm font-semibold text-fg">
              Paste the email
            </label>
            <span className="text-[11px] text-fg-muted">{text.trim().length} chars</span>
          </div>
          <textarea
            id="email-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={12}
            placeholder="Paste the full message here…"
            className="focus-ring mt-2 w-full resize-y rounded-[0.5rem] border border-line bg-bg px-3 py-3 text-sm leading-relaxed text-fg outline-none placeholder:text-fg-muted/70"
          />

          <div className="mt-3 flex flex-col gap-2 sm:flex-row">
            <button type="button" className="btn-primary focus-ring w-full disabled:opacity-60 sm:w-auto" onClick={runPredict} disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Reading…
                </>
              ) : (
                "Run check"
              )}
            </button>
            <button type="button" className="btn-secondary focus-ring w-full sm:w-auto" onClick={() => setText(SAMPLE)} disabled={loading}>
              Try a scam sample
            </button>
          </div>

          {error && (
            <p className="mt-3 rounded-[0.4rem] border border-danger/25 bg-danger-soft px-3 py-2 text-sm text-danger" role="alert">
              {error}
            </p>
          )}
          <p className="mt-4 text-xs text-fg-muted">Private check — not stored.</p>
        </div>
      </section>

      <aside className="space-y-3">
        {!hasResult && !loading && (
          <div className="panel relative overflow-hidden p-6 sm:min-h-[360px]">
            <div className="aurora opacity-50" aria-hidden />
            <div className="relative flex min-h-[280px] flex-col items-center justify-center text-center">
              <div className="grid h-14 w-14 place-items-center rounded-[0.6rem] bg-gradient-to-br from-accent to-accent-2 text-white shadow-[0_8px_24px_var(--glow)]">
                <ShieldQuestion className="h-6 w-6" />
              </div>
              <h2 className="mt-4 font-display text-xl font-bold text-fg">Waiting for a message</h2>
              <p className="mt-2 max-w-xs text-sm text-fg-muted">
                Run a check to see the verdict, score, and the words that drove it.
              </p>
            </div>
          </div>
        )}

        {loading && (
          <div className="panel p-5">
            <div className="flex items-center gap-2 text-sm font-semibold text-fg">
              <Loader2 className="h-4 w-4 animate-spin text-accent" />
              Scanning language…
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-1.5 animate-pulse rounded-full bg-line" />
              <div className="h-1.5 w-[80%] animate-pulse rounded-full bg-line" />
              <div className="h-28 animate-pulse rounded-[0.5rem] bg-line/80" />
            </div>
          </div>
        )}

        {summary && !loading && <VerdictPanel result={summary} />}
        {fast && <ResultCard title="Fast" result={fast} />}
        {deep && <ResultCard title="Deep" result={deep} />}

        {summary && !loading && (
          <>
            <div className="panel p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted">Why this result</p>
              <p className="mt-2 text-sm leading-relaxed text-fg">{summary.summary}</p>
              <ul className="mt-4 space-y-2">
                {(summary.reasons ?? []).map((reason) => (
                  <li key={reason.id} className="rounded-[0.5rem] border border-line bg-bg px-3 py-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-fg">{reason.title}</p>
                      <span className={cn("badge", reason.tone === "risk" ? "bg-danger-soft text-danger" : "bg-ok-soft text-ok")}>
                        {reason.tone === "risk" ? "Risk" : "Safe"}
                      </span>
                    </div>
                    <p className="mt-1 text-xs leading-relaxed text-fg-muted">{reason.detail}</p>
                    {reason.hits.length > 0 && (
                      <p className="mt-1.5 font-mono text-[11px] text-fg">{reason.hits.join(" · ")}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {parts && (
              <div className="panel p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted">Highlighted words</p>
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-fg">
                  {parts.map((part, i) =>
                    part.hit ? (
                      <mark key={i} className="hit-mark">
                        {part.text}
                      </mark>
                    ) : (
                      <span key={i}>{part.text}</span>
                    ),
                  )}
                </p>
              </div>
            )}

            <div className="panel p-5">
              <p className="text-sm font-medium text-fg">Rate this result</p>
              <div className="mt-1.5 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => {
                  const value = i + 1;
                  return (
                    <button
                      key={value}
                      type="button"
                      className="focus-ring rounded-[0.25rem] p-1"
                      aria-label={`Rate ${value} stars`}
                      onClick={() => saveRating(value)}
                    >
                      <Star className={cn("h-5 w-5", value <= rating ? "fill-warn text-warn" : "text-line")} />
                    </button>
                  );
                })}
              </div>
              {rated && <p className="mt-1.5 text-sm text-ok">Thanks.</p>}
              <Link href="/contact" className="btn-secondary focus-ring mt-4 w-full">
                Write a review
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

function VerdictPanel({ result }: { result: PredictResult }) {
  const Icon = result.risk === "Safe" ? ShieldCheck : result.risk === "Suspicious" ? ShieldQuestion : ShieldAlert;
  const color =
    result.risk === "Safe" ? "var(--ok)" : result.risk === "Suspicious" ? "var(--warn)" : "var(--danger)";
  const pct = Math.max(6, Math.round(result.probability * 100));

  return (
    <div className="panel p-5">
      <div className="flex items-center gap-4">
        <div
          className="verdict-ring grid h-20 w-20 shrink-0 place-items-center rounded-full p-[3px]"
          style={{ "--ring-color": color, "--ring-pct": `${pct}%` } as React.CSSProperties}
        >
          <div className="grid h-full w-full place-items-center rounded-full bg-bg-elevated">
            <Icon className="h-6 w-6" style={{ color }} />
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-fg-muted">Verdict</p>
          <p className="font-display text-2xl font-bold tracking-tight text-fg">{result.risk}</p>
          <p className="text-sm text-fg-muted">
            {formatPercent(result.probability)} phishing score · {result.prediction}
          </p>
        </div>
      </div>
    </div>
  );
}

function ResultCard({ title, result }: { title: string; result: PredictResult }) {
  const Icon = result.risk === "Safe" ? ShieldCheck : result.risk === "Suspicious" ? ShieldQuestion : ShieldAlert;
  const tone =
    result.risk === "Safe"
      ? "text-ok bg-ok-soft"
      : result.risk === "Suspicious"
        ? "text-warn bg-danger-soft"
        : "text-danger bg-danger-soft";

  return (
    <article className="panel p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-display text-base font-bold text-fg">{title}</p>
          <p className="text-xs text-fg-muted">{result.prediction}</p>
        </div>
        <span className={cn("badge", tone)}>
          <Icon className="h-3.5 w-3.5" />
          {result.risk}
        </span>
      </div>
      <p className="mt-3 font-display text-2xl font-bold tracking-tight text-fg">{formatPercent(result.probability)}</p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
        <div
          className={cn(
            "h-full rounded-full",
            result.risk === "Safe"
              ? "bg-ok"
              : result.risk === "Suspicious"
                ? "bg-gradient-to-r from-warn to-danger"
                : "bg-gradient-to-r from-danger to-warn",
          )}
          style={{ width: `${Math.max(6, Math.round(result.probability * 100))}%` }}
        />
      </div>
    </article>
  );
}
