import { THREAT_POINTS } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

const icons = {
  money: (
    <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden>
      <rect x="6" y="12" width="36" height="24" rx="4" className="fill-brand-soft stroke-accent" strokeWidth="1.6" />
      <circle cx="24" cy="24" r="6" className="fill-none stroke-accent" strokeWidth="1.6" />
      <path d="M24 19v10M21 21.5h5.5M21 26.5h5.5" className="stroke-accent" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  id: (
    <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden>
      <rect x="8" y="14" width="32" height="20" rx="4" className="fill-brand-soft stroke-accent" strokeWidth="1.6" />
      <circle cx="18" cy="24" r="4" className="fill-none stroke-accent" strokeWidth="1.5" />
      <path d="M26 21h10M26 27h7" className="stroke-accent" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  device: (
    <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden>
      <rect x="14" y="8" width="20" height="32" rx="4" className="fill-brand-soft stroke-accent" strokeWidth="1.6" />
      <path d="M18 16h12M18 21h12M18 26h8" className="stroke-accent" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="24" cy="34" r="1.8" className="fill-danger" />
    </svg>
  ),
  trust: (
    <svg viewBox="0 0 48 48" className="h-9 w-9" aria-hidden>
      <path d="M24 10l12 5v9c0 8-5.2 13.2-12 15-6.8-1.8-12-7-12-15v-9l12-5z" className="fill-brand-soft stroke-accent" strokeWidth="1.6" />
      <path d="M18 24l4 4 8-9" className="fill-none stroke-danger" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
} as const;

export function ThreatSection() {
  return (
    <section id="why-it-matters" className="section-pad py-16 sm:py-24">
      <div className="container-pg">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">The risk</span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            Phishing steals <span className="gradient-text">quietly.</span>
          </h2>
          <p className="mt-3 text-base text-fg-muted">One rushed click can cost money, data, or your account.</p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {THREAT_POINTS.map((item, i) => (
            <Reveal as="article" key={item.title} delay={i * 0.08} className="panel card-hover p-5">
              <div className="mb-4">{icons[item.visual as keyof typeof icons]}</div>
              <h3 className="font-display text-base font-bold text-fg">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">{item.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
