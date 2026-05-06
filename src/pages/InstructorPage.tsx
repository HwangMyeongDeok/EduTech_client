"use client";

import { HeroSection } from "@/components/instructors/HeroSection";
import { FeaturedSection } from "@/components/instructors/FeaturedSection";
import { AllInstructorsSection } from "@/components/instructors/AllInstructorsSection";
import { LearningPathsSection } from "@/components/instructors/LearningPathsSection";
import { TestimonialsSection } from "@/components/instructors/TestimonialsSection";
import { AiSolutionSection } from "@/components/instructors/AiSolutionSection";
import { CtaDarkSection } from "@/components/instructors/CtaDarkSection";

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