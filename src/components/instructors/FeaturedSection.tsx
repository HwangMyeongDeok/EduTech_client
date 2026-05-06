"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { staggerContainer, VIEWPORT_ONCE } from "@/lib/motion";
import { featuredInstructors } from "@/data/instructor.data";
import { InstructorCard } from "@/components/instructors/InstructorCard";
import { Reveal } from "@/components/instructors/Reveal";

export function FeaturedSection() {
  return (
    <section className="bg-[#F5F7FF] py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <Reveal className="text-center mb-14">
          <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center justify-center gap-1.5 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
            Đội ngũ dẫn đầu
          </p>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 mb-3">
            Giảng viên <span className="text-blue-600">được đánh giá cao</span>
          </h2>
          <p className="text-muted-foreground text-sm">Được công nhận bởi cộng đồng học viên</p>
        </Reveal>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
        >
          {featuredInstructors.map((d) => (
            <InstructorCard key={d.id} d={d} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}