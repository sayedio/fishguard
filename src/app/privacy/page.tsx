import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "How PhishGuard handles email text and feedback.",
};

export default function PrivacyPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="aurora opacity-70" aria-hidden />
      <div className="section-pad py-10 sm:py-16">
        <div className="container-pg max-w-2xl">
          <span className="eyebrow">Privacy</span>
          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            Private <span className="gradient-text">by design.</span>
          </h1>
          <div className="mt-6 space-y-4 text-sm leading-relaxed text-fg-muted">
            <p>
              Email checks are used to return a result for that moment. We do not keep a browsable archive of your
              pasted messages.
            </p>
            <p>Ratings stay on your device. Contact and review forms are emailed to the team when configured.</p>
            <p>Never paste OTPs, full card numbers, or recovery codes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
