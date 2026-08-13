import type { Metadata } from "next";
import { EmailChecker } from "@/components/check/EmailChecker";

export const metadata: Metadata = {
  title: "Check Email",
  description: "Paste a suspicious email and get a Fast or Deep risk check — plus why.",
};

export default function CheckPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="aurora opacity-70" aria-hidden />
      <div className="section-pad py-8 sm:py-10">
        <div className="container-pg">
          <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-xl">
              <span className="eyebrow">Checker</span>
              <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">
                Check an email. <span className="gradient-text">See why.</span>
              </h1>
              <p className="mt-2 text-sm text-fg-muted sm:text-base">Paste a message. Get a verdict and the words behind it.</p>
            </div>
          </div>
          <EmailChecker />
        </div>
      </div>
    </div>
  );
}
