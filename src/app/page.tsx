import { FaqSection } from "@/components/home/FaqSection";
import { FinalCta } from "@/components/home/FinalCta";
import { Hero } from "@/components/home/Hero";
import { HowTeaser } from "@/components/home/HowTeaser";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { ScamTicker } from "@/components/home/ScamTicker";
import { ThreatSection } from "@/components/home/ThreatSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ScamTicker />
      <ThreatSection />
      <HowTeaser />
      <ReviewsSection />
      <FaqSection />
      <FinalCta />
    </>
  );
}
