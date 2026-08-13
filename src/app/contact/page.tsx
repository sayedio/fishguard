import type { Metadata } from "next";
import { ContactForm } from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact PhishGuard or leave a short review.",
};

export default function ContactPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="aurora opacity-70" aria-hidden />
      <div className="section-pad py-10 sm:py-16">
        <div className="container-pg grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <span className="eyebrow">Contact</span>
            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              Say hello — or <span className="gradient-text">leave a review.</span>
            </h1>
            <p className="mt-3 text-sm text-fg-muted">Keep it short. Don&rsquo;t send passwords or OTPs.</p>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
