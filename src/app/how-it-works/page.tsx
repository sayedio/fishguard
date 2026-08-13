import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How It Works",
  description: "How PhishGuard turns an email into a clear risk result.",
};

const steps = [
  {
    title: "Paste the email",
    body: "Drop in the message that feels wrong.",
    visual: (
      <svg viewBox="0 0 64 48" className="h-12 w-16" aria-hidden>
        <rect x="4" y="6" width="56" height="36" rx="3" className="fill-brand-soft stroke-brand" strokeWidth="1.5" />
        <path d="M12 16h40M12 24h28M12 32h34" className="stroke-brand" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Models read it",
    body: "Fast scores patterns. Deep reads language.",
    visual: (
      <svg viewBox="0 0 64 48" className="h-12 w-16" aria-hidden>
        <rect x="8" y="10" width="20" height="28" rx="2" className="fill-brand-soft stroke-brand" strokeWidth="1.4" />
        <rect x="36" y="10" width="20" height="28" rx="2" className="fill-brand-soft stroke-accent" strokeWidth="1.4" />
        <path d="M28 24h8" className="stroke-fg-muted" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Get a clear verdict",
    body: "Safe, Suspicious, or Dangerous — with confidence.",
    visual: (
      <svg viewBox="0 0 64 48" className="h-12 w-16" aria-hidden>
        <path
          d="M32 6l16 6v10c0 10-7 16-16 18-9-2-16-8-16-18V12l16-6z"
          className="fill-ok-soft stroke-ok"
          strokeWidth="1.5"
        />
        <path d="M24 24l5 5 11-12" className="fill-none stroke-ok" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "See why",
    body: "Key words are highlighted — urgency, password asks, odd links.",
    visual: (
      <svg viewBox="0 0 64 48" className="h-12 w-16" aria-hidden>
        <rect x="6" y="10" width="52" height="28" rx="3" className="fill-brand-soft stroke-accent" strokeWidth="1.4" />
        <path d="M14 20h20M14 28h14" className="stroke-accent" strokeWidth="3" strokeLinecap="round" />
        <path d="M38 20h12M32 28h18" className="stroke-brand" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function HowItWorksPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="aurora opacity-70" aria-hidden />
      <div className="section-pad py-10 sm:py-14">
      <div className="container-pg max-w-3xl">
        <span className="eyebrow">How it works</span>
        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
          Simple flow. <span className="gradient-text">Strong models.</span>
        </h1>
        <p className="mt-2 text-sm text-fg-muted sm:text-base">Three steps. No jargon.</p>

        <ol className="mt-8 space-y-3">
          {steps.map((step, i) => (
            <li key={step.title} className="panel flex items-start gap-4 p-4 sm:p-5">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[0.25rem] bg-brand-soft text-sm font-bold text-brand">
                {i + 1}
              </span>
              <div className="min-w-0 flex-1">
                <h2 className="font-display text-lg font-bold text-fg">{step.title}</h2>
                <p className="mt-1 text-sm text-fg-muted">{step.body}</p>
              </div>
              <div className="hidden shrink-0 sm:block">{step.visual}</div>
            </li>
          ))}
        </ol>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <article className="panel p-5">
            <h2 className="font-display text-lg font-bold text-fg">Fast</h2>
            <p className="mt-2 text-sm text-fg-muted">Quick pattern check.</p>
          </article>
          <article className="panel p-5">
            <h2 className="font-display text-lg font-bold text-fg">Deep</h2>
            <p className="mt-2 text-sm text-fg-muted">Stronger language read.</p>
          </article>
        </div>

        <p className="mt-5 text-sm text-fg-muted">Private by design — checked once, not stored.</p>

        <Link href="/check" className="btn-primary focus-ring mt-6 inline-flex">
          Check an email
        </Link>
      </div>
      </div>
    </div>
  );
}
