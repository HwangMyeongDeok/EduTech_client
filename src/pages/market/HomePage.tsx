import { HeroSection } from "@/components/market/home/HeroSection";
import { StatsSection } from "@/components/market/home/StatsSection";
import { ChallengesSection } from "@/components/market/home/ChallengesSection";
import { SeamlessLearningSection } from "@/components/market/home/SeamlessLearningSection";
import { AiExperienceSection } from "@/components/market/home/AiExperienceSection";
import { FeaturesGridSection } from "@/components/market/home/FeaturesGridSection";
import { TestimonialsSection } from "@/components/market/home/TestimonialsSection";
import { CtaSection } from "@/components/market/home/CtaSection";
import { PricingSection } from "@/components/market/home/PricingSection";
import { FaqSection } from "@/components/market/home/FaqSection";
import { ScrollToTop } from "@/components/market/home/ScrollToTop";

export default function Home() {
  return (
    <div className="w-full overflow-x-hidden">
      <HeroSection />
      <StatsSection />
      <ChallengesSection />
      <SeamlessLearningSection />
      <AiExperienceSection />
      <FeaturesGridSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />

      <ScrollToTop />
    </div>
  );
}