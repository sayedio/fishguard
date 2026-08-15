"use client";

import { useState } from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { SEED_REVIEWS } from "@/lib/constants";
import { Reveal } from "@/components/ui/Reveal";

type Review = {
  id: string;
  name: string;
  role?: string;
  rating: number;
  text: string;
};

export function ReviewsSection() {
  const [reviews] = useState<Review[]>(() => {
    const fallback = [...SEED_REVIEWS];
    if (typeof window === "undefined") return fallback;

    try {
      const raw = localStorage.getItem("phishguard_reviews");
      if (!raw) return fallback;
      const parsed = JSON.parse(raw) as Review[];
      if (Array.isArray(parsed) && parsed.length) {
        return [...parsed, ...SEED_REVIEWS].slice(0, 6);
      }
    } catch {
      /* ignore */
    }

    return fallback;
  });

  return (
    <section id="reviews" className="section-pad py-16 sm:py-24">
      <div className="container-pg">
        <Reveal className="flex items-end justify-between gap-4">
          <div>
            <span className="eyebrow">Reviews</span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              Real checks. <span className="gradient-text">Real calm.</span>
            </h2>
          </div>
          <Link
            href="/contact"
            className="btn-secondary focus-ring hidden sm:inline-flex">
            Write a review
          </Link>
        </Reveal>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {reviews.slice(0, 3).map((review, i) => (
            <Reveal
              as="article"
              key={review.id}
              delay={i * 0.1}
              className="panel card-hover flex flex-col p-6">
              <div
                className="flex gap-0.5"
                aria-label={`${review.rating} of 5`}>
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={`h-4 w-4 ${idx < review.rating ? "fill-warn text-warn" : "text-line"}`}
                  />
                ))}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-fg">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-xs font-bold text-white">
                  {review.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-fg">{review.name}</p>
                  {review.role && (
                    <p className="text-xs text-fg-muted">{review.role}</p>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Link
          href="/contact"
          className="btn-secondary focus-ring mt-6 inline-flex sm:hidden">
          Write a review
        </Link>
      </div>
    </section>
  );
}
