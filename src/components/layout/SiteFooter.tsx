import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { SITE } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="relative mt-auto border-t border-line bg-bg-elevated">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" aria-hidden />
      <div className="container-pg section-pad grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs text-sm text-fg-muted">{SITE.description}</p>
          <p className="inline-flex items-center gap-2 rounded-full border border-line bg-ok-soft px-2.5 py-1 text-xs font-semibold text-ok">
            Not stored · Not shared
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-muted">Product</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-fg-muted">
            <li><Link className="transition hover:text-fg" href="/check">Check</Link></li>
            <li><Link className="transition hover:text-fg" href="/how-it-works">How it works</Link></li>
            <li><Link className="transition hover:text-fg" href="/contact">Contact</Link></li>
            <li><Link className="transition hover:text-fg" href="/privacy">Privacy</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-fg-muted">Stay safe</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-fg-muted">
            <li>Don&rsquo;t share OTPs by email</li>
            <li>Check links before clicking</li>
            <li>Confirm urgent money asks offline</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-pg section-pad flex flex-col items-start justify-between gap-2 py-5 text-xs text-fg-muted sm:flex-row sm:items-center">
          <span>© {new Date().getFullYear()} {SITE.name}</span>
          <span>Built for safer inboxes.</span>
        </div>
      </div>
    </footer>
  );
}
