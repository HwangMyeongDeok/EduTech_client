"";

import { motion } from "framer-motion";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { staggerContainer, fadeInUp, EASE_OUT_EXPO, VIEWPORT_ONCE } from "@/lib/motion";
import { learningPaths } from "@/data/instructor.data";
import { Reveal } from "@/components/market/instructors/Reveal";

export function LearningPathsSection() {
  return (
    <section className="bg-[#F5F7FF] py-24 relative overflow-hidden">
      <div className="absolute top-8 right-10 w-3.5 h-3.5 rounded-full border-2 border-blue-300/60 pointer-events-none" />
      <div className="absolute bottom-12 left-16 w-2.5 h-2.5 rounded-full bg-purple-300/50 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="grid lg:grid-cols-[1fr,2fr] gap-12 items-start mb-14">
          <Reveal direction="left">
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 mb-3">
              <MapPin className="w-3.5 h-3.5" /> Định hướng chuyên môn
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight">
              Từng bước tiến đều có <span className="text-blue-600">định hướng</span> rõ ràng
            </h2>
          </Reveal>
          <Reveal direction="right" delay={0.1}>
            <p className="text-muted-foreground text-sm leading-relaxed lg:mt-14">
              Mỗi giảng viên mang đến một hướng đi cụ thể, giúp bạn không bị lạc lối trên con đường phát triển sự nghiệp của mình.
            </p>
          </Reveal>
        </div>

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={staggerContainer} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
        >
          {learningPaths.map((lp) => (
            <motion.div
              key={lp.id} variants={fadeInUp}
              whileHover={lp.highlight ? { y: -6 } : { y: -4, boxShadow: "0 20px 40px rgba(11,86,213,0.10)" }}
              transition={{ duration: 0.22, ease: EASE_OUT_EXPO }}
              className={`rounded-2xl p-7 h-full flex flex-col cursor-pointer border ${lp.highlight ? "bg-blue-600 text-white shadow-xl shadow-blue-500/25 border-blue-500" : "bg-white border-gray-100 shadow-sm"
                }`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${lp.highlight ? "bg-white/20 backdrop-blur-sm" : "bg-gray-100"}`}>
                <MapPin className={`w-5 h-5 ${lp.highlight ? "text-white" : "text-gray-500"}`} />
              </div>
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full w-fit mb-4 ${lp.highlight ? "bg-white/20 text-white backdrop-blur-sm" : lp.tagColor}`}>
                {lp.tag}
              </span>
              <h3 className={`font-bold text-sm tracking-tight leading-snug mb-4 flex-1 ${lp.highlight ? "text-white" : "text-gray-900"}`}>
                {lp.title}
              </h3>
              <p className={`text-xs leading-relaxed mb-6 ${lp.highlight ? "text-blue-100" : "text-muted-foreground"}`}>
                {lp.description}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-1.5">
                  <Clock className={`w-3.5 h-3.5 ${lp.highlight ? "text-blue-200" : "text-muted-foreground"}`} />
                  <span className={`text-[11px] font-medium ${lp.highlight ? "text-blue-200" : "text-muted-foreground"}`}>{lp.duration}</span>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${lp.highlight ? "bg-white/20 backdrop-blur-sm" : "bg-blue-50"}`}>
                  <ArrowRight className={`w-3.5 h-3.5 ${lp.highlight ? "text-white" : "text-blue-600"}`} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}