"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { HeroVisual } from "@/components/home/HeroVisual";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="aurora" aria-hidden />
      <div className="grid-bg" aria-hidden />

      <div className="container-pg section-pad grid items-center gap-10 py-10 sm:py-14 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[1.02fr_0.98fr] lg:gap-8 lg:py-6">
        <div className="max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-bg-elevated/80 px-3 py-1 text-xs font-semibold text-fg-muted shadow-soft"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inset-0 animate-ping rounded-full bg-ok opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-ok" />
            </span>
            Live · Fast + Deep models
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-5 font-display text-[2.7rem] font-bold leading-[0.98] tracking-tight text-fg sm:text-6xl lg:text-[4.15rem]"
          >
            See the trap
            <br />
            <span className="gradient-text">before you tap.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mt-5 max-w-md text-base leading-relaxed text-fg-muted sm:text-lg"
          >
            Paste an email. Get a verdict — and the exact words that made it look Safe, Suspicious, or Dangerous.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link href="/check" className="btn-primary focus-ring w-full sm:w-auto">
              Check an email <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/how-it-works" className="btn-secondary focus-ring w-full sm:w-auto">
              Why it flagged
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-9 grid max-w-lg grid-cols-3 overflow-hidden rounded-[var(--radius-panel)] border border-line bg-bg-elevated/80"
          >
            {[
              { n: <AnimatedCounter to={99.8} decimals={1} suffix="%" />, l: "Deep accuracy" },
              { n: <AnimatedCounter to={8} />, l: "Trained models" },
              { n: <><AnimatedCounter to={1} prefix="<" suffix="s" /></>, l: "To a verdict" },
            ].map((s, i) => (
              <div key={s.l} className={`px-3 py-3 sm:px-4 ${i > 0 ? "border-l border-line" : ""}`}>
                <p className="font-display text-xl font-bold tracking-tight text-fg sm:text-2xl">{s.n}</p>
                <p className="mt-0.5 text-[11px] font-medium text-fg-muted">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22, rotate: -1.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <HeroVisual />
        </motion.div>
      </div>
    </section>
  );
}
