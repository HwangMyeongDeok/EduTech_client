import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ChallengesSection } from "@/components/home/ChallengesSection";
import { SeamlessLearningSection } from "@/components/home/SeamlessLearningSection";
import { AiExperienceSection } from "@/components/home/AiExperienceSection";
import { FeaturesGridSection } from "@/components/home/FeaturesGridSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaSection } from "@/components/home/CtaSection";
import { PricingSection } from "@/components/home/PricingSection";
import { FaqSection } from "@/components/home/FaqSection";
import { ScrollToTop } from "@/components/home/ScrollToTop";

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