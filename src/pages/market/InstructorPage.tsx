"use client";

import { HeroSection } from "@/components/market/instructors/HeroSection";
import { FeaturedSection } from "@/components/market/instructors/FeaturedSection";
import { AllInstructorsSection } from "@/components/market/instructors/AllInstructorsSection";
import { LearningPathsSection } from "@/components/market/instructors/LearningPathsSection";
import { TestimonialsSection } from "@/components/market/instructors/TestimonialsSection";
import { AiSolutionSection } from "@/components/market/instructors/AiSolutionSection";
import { CtaDarkSection } from "@/components/market/instructors/CtaDarkSection";

export default function InstructorPage() {
  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      <HeroSection />
      <FeaturedSection />
      <AllInstructorsSection />
      <LearningPathsSection />
      <TestimonialsSection />
      <AiSolutionSection />
      <CtaDarkSection />
    </div>
  );
}