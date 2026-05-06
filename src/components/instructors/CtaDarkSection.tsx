"use client";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight, CheckCircle2, Zap } from "lucide-react";
import { staggerContainerFast, fadeInRight, VIEWPORT_ONCE } from "@/lib/motion";
import { Reveal } from "@/components/instructors/Reveal";

export function CtaDarkSection() {
  return (
    <section className="bg-[#111827] py-24 relative overflow-hidden border-b border-white">
      <div className="absolute -top-20 right-[-10%] w-[300px] h-[300px] bg-blue-300/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      <div className="absolute top-8 right-16 w-4 h-4 rounded-full border border-blue-500/30" />
      <div className="absolute bottom-10 left-20 w-3 h-3 rounded-full bg-blue-500/20" />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <Reveal direction="left">
            <p className="text-[11px] font-bold uppercase tracking-widest text-blue-400 flex items-center gap-1.5 mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Dành riêng cho giảng viên
            </p>
            <h2 className="text-3xl lg:text-[2.2rem] font-extrabold tracking-tight text-white mb-5 leading-tight">
              Tạo câu hỏi từ video <span className="text-blue-400">và quản lý nội dung</span> dễ dàng hơn
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-10">
              MACO hỗ trợ giảng viên tạo câu hỏi từ video bài giảng theo tốc độ tức thì, đồng thời theo dõi và quản lý nội dung thông qua quá trình tổng hợp nhanh chóng và dễ dùng.
            </p>
            <motion.button whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-blue-500/25 cursor-pointer">
              Trở thành giảng viên <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Reveal>

          <motion.div className="space-y-4 lg:pt-14" variants={staggerContainerFast} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
            {[
              {
                icon: <CheckCircle2 className="w-4 h-4 text-blue-400" />,
                title: "Quản lý nội dung đầu quản",
                desc: "Tổng hợp và theo dõi nội dung bài giảng một cách hiệu quả và có hệ thống.",
              },
              {
                icon: <Zap className="w-4 h-4 text-yellow-400" />,
                title: "Tạo quiz từ video bài giảng",
                desc: "AI tự động phân tích nội dung video và tạo câu hỏi phù hợp, tiết kiệm thời gian.",
              },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeInRight} custom={i * 0.09} whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.09)" }} transition={{ duration: 0.2 }} className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-bold tracking-tight text-white mb-1">{item.title}</p>
                  <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}