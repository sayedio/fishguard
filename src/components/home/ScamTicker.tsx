import { AlertTriangle } from "lucide-react";

const LINES = [
  "Your account will be suspended in 24 hours",
  "Unusual sign-in detected — verify now",
  "You have (1) undelivered package",
  "Payroll update required immediately",
  "Your payment was declined",
  "Confirm your bank details to avoid a hold",
  "Prize won — claim before midnight",
  "Password expires today — reset here",
];

export function ScamTicker() {
  const doubled = [...LINES, ...LINES];
  return (
    <section aria-label="Common scam subject lines" className="border-y border-line bg-bg-subtle/60">
      <div className="relative overflow-hidden py-3">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent" />
        <div className="marquee-track gap-6">
          {doubled.map((line, i) => (
            <span key={i} className="flex shrink-0 items-center gap-2 text-sm text-fg-muted">
              <AlertTriangle className="h-3.5 w-3.5 text-warn" />
              <span className="font-mono text-[13px]">&ldquo;{line}&rdquo;</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
