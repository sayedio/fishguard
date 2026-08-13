"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { FAQ_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad py-16 sm:py-24">
      <div className="container-pg grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <span className="eyebrow">FAQ</span>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            Short <span className="gradient-text">answers.</span>
          </h2>
          <p className="mt-3 text-sm text-fg-muted">Everything you need before your first check.</p>
        </Reveal>
        <Reveal className="divide-y divide-line overflow-hidden rounded-[var(--radius-panel)] border border-line bg-bg-elevated">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q}>
                <button
                  type="button"
                  className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : index)}
                >
                  <span className="text-sm font-semibold text-fg sm:text-[0.95rem]">{item.q}</span>
                  <ChevronDown className={cn("h-4 w-4 shrink-0 text-fg-muted transition-transform duration-300", isOpen && "rotate-180 text-accent")} />
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="px-5 pb-4 text-sm text-fg-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}
