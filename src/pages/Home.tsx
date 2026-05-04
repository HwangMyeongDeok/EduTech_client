import { HeroSection } from "@/components/home/HeroSection";
import { StatsSection } from "@/components/home/StatsSection";
import { ChallengesSection } from "@/components/home/ChallengesSection";
import { SeamlessLearningSection } from "@/components/home/SeamlessLearningSection";
import { AiExperienceSection } from "@/components/home/AiExperienceSection";
import { FeaturesGridSection } from "@/components/home/FeaturesGridSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CtaSection } from "@/components/home/CtaSection";

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
      <CtaSection />
    </div>
  );
}