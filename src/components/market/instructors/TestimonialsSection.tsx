"use client";

import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { staggerContainer, fadeInUp, EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/motion";
import { testimonials } from "@/data/instructor.data";
import { StarRow } from "@/components/market/instructors/InstructorCard";
import { Reveal } from "@/components/market/instructors/Reveal";

export function TestimonialsSection() {
  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <Reveal className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-gray-900">
            Học viên đã <span className="text-blue-600">trải nghiệm và chia sẻ</span>
          </h2>
        </Reveal>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.id} variants={fadeInUp}
              whileHover={{ y: -4, boxShadow: "0 12px 32px rgba(11,86,213,0.08)" }}
              transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
              className="bg-[#F8FAFF] rounded-2xl p-6 border border-gray-100 h-full flex flex-col cursor-pointer"
            >
              <StarRow rating={t.rating} size={14} />
              <p className="text-sm text-muted-foreground leading-relaxed mt-4 mb-6 flex-1">{t.text}</p>
              <div className="flex items-center gap-2.5 pt-4 border-t border-gray-100">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Users className="w-3.5 h-3.5 text-blue-500" />
                </div>
                <div>
                  <p className="text-xs font-bold tracking-tight text-gray-900">{t.author}</p>
                  <p className="text-[10px] text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}