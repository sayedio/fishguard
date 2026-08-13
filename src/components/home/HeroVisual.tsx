"use client";

import { motion } from "framer-motion";

const reasons = [
  { n: "01", title: "Urgency", hit: "within 24 hours" },
  { n: "02", title: "Password ask", hit: "verify your password" },
  { n: "03", title: "Odd link", hit: "secure-login-update.com" },
];

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-10 -z-10 bg-[radial-gradient(circle_at_70%_20%,color-mix(in_oklab,var(--accent)_26%,transparent),transparent_58%)] blur-2xl"
      />

      <div className="grid gap-3 lg:grid-cols-[1.15fr_0.85fr]">
        <motion.div
          className="glass relative overflow-hidden"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
            <div className="flex items-center gap-2">
              <span className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-danger/70" />
                <span className="h-2 w-2 rounded-full bg-warn/70" />
                <span className="h-2 w-2 rounded-full bg-ok/70" />
              </span>
              <span className="text-[11px] font-semibold text-fg-muted">Inbox · scanned</span>
            </div>
            <span className="badge bg-danger-soft text-danger">Dangerous</span>
          </div>

          <div className="relative p-4">
            <div className="scan-line pointer-events-none absolute inset-x-4 top-4 z-10 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-muted">From</p>
            <p className="mt-1 font-mono text-[12px] text-fg">support@secure-login-update.com</p>
            <p className="mt-4 text-sm font-semibold leading-snug text-fg">
              Account locked — <mark className="hit-mark">verify now</mark>
            </p>
            <p className="mt-3 text-[13px] leading-relaxed text-fg-muted">
              Dear user, your account will be suspended{" "}
              <mark className="hit-mark">within 24 hours</mark>. Click here immediately to{" "}
              <mark className="hit-mark">verify your password</mark> and bank details.
            </p>
            <p className="mt-3 inline-block rounded-[0.35rem] border border-dashed border-danger/40 bg-danger-soft px-2 py-1 font-mono text-[11px] text-danger">
              http://secure-login-update.com
            </p>
          </div>
        </motion.div>

        <div className="flex flex-col gap-3">
          <div className="glass p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-fg-muted">Why</p>
            <p className="mt-1 font-display text-2xl font-bold tracking-tight text-fg">89%</p>
            <p className="text-xs text-fg-muted">phishing score</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-line">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-danger to-warn"
                initial={{ width: 0 }}
                animate={{ width: "89%" }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </div>

          <div className="glass flex-1 space-y-2 p-3">
            {reasons.map((r, i) => (
              <motion.div
                key={r.n}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 + i * 0.12 }}
                className="rounded-[0.45rem] border border-line bg-bg px-3 py-2"
              >
                <p className="text-[10px] font-semibold text-danger">
                  {r.n} · {r.title}
                </p>
                <p className="mt-0.5 truncate font-mono text-[11px] text-fg">{r.hit}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
