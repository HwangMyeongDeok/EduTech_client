"";

import { motion } from "framer-motion";
import { Users, MapPin } from "lucide-react";
import { fadeInUp, scaleIn, fadeInLeft, floatCard, floatY } from "@/lib/motion";
import { StarRow } from "@/components/market/instructors/InstructorCard";

export function HeroSection() {
  return (
    <section className="relative bg-[#EEF2FF] pt-20 pb-32 overflow-hidden">
      {/* Deco dots */}
      <div className="absolute top-10 right-[18%] w-3 h-3 rounded-full border-2 border-blue-300/70 pointer-events-none" />
      <div className="absolute top-24 right-[35%] w-2 h-2 rounded-full bg-blue-400/40 pointer-events-none" />
      <div className="absolute bottom-20 left-[8%] w-2 h-2 rounded-full bg-purple-400/40 pointer-events-none" />
      <div className="absolute top-1/3 right-3 w-5 h-5 rounded-full border-2 border-blue-200/60 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left text */}
        <div>
          <motion.h1
            className="text-[2.6rem] lg:text-[3rem] font-extrabold tracking-tight leading-[1.1] text-gray-900 mb-6"
            variants={fadeInUp} initial="hidden" animate="visible" custom={0}
          >
            Học trực tiếp từ <span className="text-blue-600">những người đang<br />làm nghề</span>
          </motion.h1>

          <motion.p
            className="text-muted-foreground text-[15px] leading-[1.7] mb-10 max-w-[380px]"
            variants={fadeInUp} initial="hidden" animate="visible" custom={0.12}
          >
            Giảng viên là các kỹ sư đang làm việc thực tế, giúp bạn học đúng thứ doanh nghiệp cần.
          </motion.p>

          <motion.button
            variants={fadeInUp} initial="hidden" animate="visible" custom={0.22}
            whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2 }}
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-500/25 cursor-pointer"
          >
            <Users className="w-4 h-4" /> Đối thoại học với mentor
          </motion.button>
        </div>

        {/* Right – floating cards */}
        <div className="relative h-64 lg:h-80 hidden lg:block">
          {/* Main card */}
          <motion.div
            className="absolute top-0 right-0 w-72 bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-white/50 p-5"
            variants={scaleIn} initial="hidden" animate="visible" custom={0.25} style={{ rotate: 2 }} {...floatCard}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center">
                <Users className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold tracking-tight text-gray-900 truncate">Senior Java Developer</p>
                <StarRow rating={4.5} size={11} />
              </div>
              <span className="text-[10px] bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                Đang dạy
              </span>
            </div>
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] text-muted-foreground">
                <span>Độ hoàn thành</span>
                <span className="text-blue-600 font-semibold">80%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "80%" }} />
              </div>
            </div>
          </motion.div>

          {/* Bottom small card */}
          <motion.div
            className="absolute bottom-0 left-6 bg-white/60 backdrop-blur-md rounded-2xl shadow-xl border border-white/40 p-3.5 flex items-center gap-3 w-52"
            variants={fadeInLeft} initial="hidden" animate="visible" custom={0.42} {...floatY}
          >
            <div className="w-9 h-9 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-bold tracking-tight text-gray-900">Chuẩn bị phỏng vấn</p>
              <p className="text-[10px] text-muted-foreground">Mock Interview AI</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}