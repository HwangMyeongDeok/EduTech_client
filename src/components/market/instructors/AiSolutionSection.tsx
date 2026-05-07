"use client";

import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import { staggerContainerFast, fadeInLeft, VIEWPORT_ONCE } from "@/lib/motion";
import { Reveal } from "@/components/market/instructors/Reveal";

export function AiSolutionSection() {
  return (
    <section className="bg-[#F5F7FF] py-24">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <Reveal className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3.5 py-1.5 rounded-full mb-5">
            <Sparkles className="w-3 h-3" /> Giải pháp cho Giảng viên
          </div>
          <h2 className="text-3xl lg:text-4xl font-extrabold tracking-tight text-gray-900 mb-4">
            Giải pháp cho Giảng viên <span className="text-blue-600">tạo câu hỏi từ video với AI</span>
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            MACO giúp bạn đơn giản hóa quy trình và tổ chức bài giảng tốt hơn
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left */}
          <div>
            <Reveal direction="left">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-[9px] font-black text-white">01</span>
                </div>
                <p className="text-sm font-bold tracking-tight text-gray-900">Đối với Giảng viên</p>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-8">
                Vai trò của bạn là dạy và chia sẻ kiến thức, không phải lãng phí thời gian vào việc tự xây dựng câu hỏi, dễ dàng tổ chức bài giảng và tạo câu hỏi ôn tập.
              </p>
            </Reveal>

            <motion.div className="space-y-3" variants={staggerContainerFast} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}>
              {[
                "Tạo quiz trực tiếp từ video bài giảng",
                "Tổ chức và sử dụng nội dung câu hỏi dễ dàng",
              ].map((text, i) => (
                <motion.div key={i} variants={fadeInLeft} custom={i * 0.07} whileHover={{ x: 3 }} transition={{ duration: 0.18 }} className="flex items-center gap-3.5 bg-white rounded-xl px-5 py-4 border border-gray-100 shadow-sm cursor-pointer">
                  <div className="w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-[9px] font-black text-blue-600">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="text-sm text-gray-700 font-medium">{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right – Quiz mockup */}
          <Reveal direction="right" delay={0.1}>
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border border-white/60 p-6 max-w-[340px] mx-auto">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Quiz Synthesis</p>
                  <p className="text-[10px] text-muted-foreground">AI-Powered</p>
                </div>
                <span className="text-[10px] bg-green-100 text-green-700 font-semibold px-2.5 py-0.5 rounded-full">● Live</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[{ label: "Quiz", emoji: "📋" }, { label: "Flashcard", emoji: "🃏" }].map((item) => (
                  <motion.button key={item.label} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} className="flex flex-col items-center gap-1.5 p-3.5 rounded-xl border-2 border-blue-100 bg-blue-50 hover:border-blue-400 transition-colors cursor-pointer">
                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-xs font-semibold text-gray-700">{item.label}</span>
                  </motion.button>
                ))}
              </div>
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                  <p className="text-[10px] text-muted-foreground mb-1.5">🤖 Câu hỏi AI tạo ra:</p>
                  <p className="text-xs text-gray-800 font-medium">Tại phút 05:25, Logic được dùng để làm gì?</p>
                </div>
                <div className="p-3.5 rounded-xl bg-blue-50 border border-blue-100">
                  <p className="text-[10px] text-blue-600 font-bold mb-1.5">✓ Đáp án đề xuất</p>
                  <p className="text-xs text-gray-700">A. Kiểm tra tính hợp lệ</p>
                </div>
                <motion.button whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.97 }} className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-md shadow-blue-500/20 cursor-pointer">
                  <Zap className="w-3 h-3" /> Tạo câu hỏi tổng hợp
                </motion.button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}