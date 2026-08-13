import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

export function FinalCta() {
  return (
    <section className="section-pad pb-20 pt-4 sm:pb-28">
      <div className="container-pg">
        <Reveal className="relative overflow-hidden rounded-[var(--radius-panel)] border border-line bg-[linear-gradient(135deg,#0a1526,#16233f)] px-6 py-10 sm:px-12 sm:py-14">
          <div className="aurora" aria-hidden />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-display text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Unsure about an email?
              </h2>
              <p className="mt-2 text-sm text-white/70 sm:text-base">Check it before you click — it takes seconds.</p>
            </div>
            <div className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row">
              <Link
                href="/check"
                className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-control)] bg-white px-5 py-2.5 text-sm font-semibold text-[#12203a] transition hover:bg-white/90 sm:w-auto"
              >
                Check email <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-[var(--radius-control)] border border-white/25 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                Feedback
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
