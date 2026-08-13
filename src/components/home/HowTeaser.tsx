import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";

const modes = [
  { title: "Fast", body: "Quick check for everyday mail.", bar: "40%" },
  { title: "Deep", body: "Stronger read for tricky mail.", bar: "74%" },
  { title: "Both", body: "Compare when it matters.", bar: "92%" },
];

export function HowTeaser() {
  return (
    <section className="section-pad py-16 sm:py-20">
      <div className="container-pg">
        <Reveal className="overflow-hidden rounded-[var(--radius-panel)] border border-line bg-bg-elevated shadow-soft">
          <div className="grid lg:grid-cols-2">
            <div className="relative overflow-hidden border-b border-line p-7 sm:p-9 lg:border-b-0 lg:border-r">
              <div className="aurora opacity-60" aria-hidden />
              <span className="eyebrow">How it works</span>
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight text-fg sm:text-3xl">
                Paste it. <span className="gradient-text">Know instantly.</span>
              </h2>
              <p className="mt-3 max-w-sm text-sm text-fg-muted">Two models read the message. You get one clear result.</p>

              <div className="mt-7 flex flex-wrap items-center gap-y-3" aria-hidden>
                {["Paste", "Scan", "Verdict"].map((step, i) => (
                  <div key={step} className="flex items-center gap-2">
                    <span className="grid h-7 w-7 place-items-center rounded-[0.4rem] bg-gradient-to-br from-accent to-accent-2 text-[11px] font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-xs font-semibold text-fg">{step}</span>
                    {i < 2 && <span className="mx-2 h-px w-6 bg-gradient-to-r from-accent/50 to-transparent sm:w-8" />}
                  </div>
                ))}
              </div>

              <Link href="/how-it-works" className="btn-secondary focus-ring mt-8">
                See the flow
              </Link>
            </div>

            <div className="grid sm:grid-cols-3 lg:grid-cols-1">
              {modes.map((mode) => (
                <div
                  key={mode.title}
                  className="border-b border-line p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 lg:border-b lg:border-r-0 lg:last:border-b-0"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-lg font-bold text-fg">{mode.title}</h3>
                    <div className="h-1.5 w-16 overflow-hidden rounded-full bg-line">
                      <div className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2" style={{ width: mode.bar }} />
                    </div>
                  </div>
                  <p className="mt-2 text-sm text-fg-muted">{mode.body}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
