import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Play, ChevronRight, Star, CheckCircle2, Zap, Sparkles, TrendingUp } from "lucide-react";
import { TypingText } from "./TypingText";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO, floatY, floatCard } from "@/lib/motion";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: EASE_OUT_EXPO } },
};

export function HeroSection() {
  const [videoPaused, setVideoPaused] = useState(false);

  const scrollToAiSection = () => {
    const aiSection = document.getElementById("ai-experience");
    if (aiSection) {
      // Cuộn mượt mà đến section có id tương ứng
      aiSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden">
      {/* Ambient gradient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={floatY}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-blue-400/15 blur-[140px] rounded-full"
        />
        <motion.div
          animate={{ ...floatY, transition: { ...floatY.transition, delay: 1 } }}
          className="absolute top-1/3 -left-32 w-[400px] h-[400px] bg-indigo-400/10 blur-[100px] rounded-full"
        />
        <motion.div
          animate={{ ...floatY, transition: { ...floatY.transition, delay: 2 } }}
          className="absolute bottom-0 -right-20 w-[500px] h-[400px] bg-blue-300/10 blur-[120px] rounded-full"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="text-center max-w-5xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-8 text-sm font-semibold text-[#0B56D5] bg-white rounded-full shadow-md shadow-blue-100 border border-blue-100/80">
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-[#0B56D5]" />
              </span>
              MACO AI — Nền tảng học tập thế hệ mới
            </div>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="mb-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl lg:text-7xl leading-[1.1]"
          >
            Không chỉ là học
            <br />
            <TypingText words={["mà là hiểu ngay", "mà là tiến nhanh", "mà là thành công"]} />
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-2xl mx-auto mb-10 text-lg text-slate-500 leading-relaxed"
          >
            Nền tảng học tập thế hệ mới giúp bạn không còn học lan man, không còn mất động lực. Mọi thứ bạn cần – lộ trình, giải thích, tương tác – đều có ngay trong một trải nghiệm duy nhất.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button
                size="lg"
                onClick={scrollToAiSection}
                className="group h-14 px-8 text-base font-bold text-white bg-[#0B56D5] rounded-full shadow-xl shadow-blue-500/30 cursor-pointer"
                style={{ boxShadow: undefined }}
              >
                Khám phá tính năng AI
                <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                variant="ghost"
                size="lg"
                className="group h-14 px-8 text-base font-semibold text-slate-700 rounded-full bg-white/70 backdrop-blur-sm border border-slate-200 cursor-pointer"
              >
                <Play className="w-4 h-4 mr-2 text-[#0B56D5]" />
                Xem demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            variants={item}
            className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 font-medium"
          >
            {[
              { icon: Star, text: "4.9/5 đánh giá" },
              { icon: CheckCircle2, text: "Miễn phí thử nghiệm" },
              { icon: Zap, text: "Không cần thẻ tín dụng" },
            ].map(({ icon: Icon, text }) => (
              <motion.div
                key={text}
                whileHover={{ scale: 1.06, color: "#0B56D5" }}
                className="flex items-center gap-1.5 cursor-default"
              >
                <Icon className="w-4 h-4 text-blue-400" />
                <span>{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* ---- VIDEO MOCKUP ---- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: EASE_OUT_EXPO }}
          className="relative max-w-5xl mx-auto mt-20"
        >
          {/* Glow ring under video */}
          <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-blue-400/20 rounded-[2rem] blur-2xl" />

          {/* Main video card */}
          <motion.div
            whileHover={{ scale: 1.01 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            onClick={() => setVideoPaused(!videoPaused)}
            className="relative z-10 overflow-hidden bg-slate-900 rounded-[1.5rem] shadow-[0_40px_80px_rgba(11,86,213,0.20)] border border-white/20 aspect-[16/9] flex items-center justify-center group cursor-pointer"
          >
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
              alt="Platform preview"
              className="absolute inset-0 object-cover w-full h-full opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
            />

            {/* Play button */}
            <motion.div
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              transition={{ duration: 0.2 }}
              className="relative z-20 flex items-center justify-center w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl"
            >
              <Play className="w-8 h-8 ml-1 text-[#0B56D5]" fill="currentColor" />
            </motion.div>

            {/* Top bar */}
            <div className="absolute top-0 left-0 right-0 p-4 flex items-center gap-2 bg-gradient-to-b from-black/40 to-transparent">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-400/80" />
                <div className="w-3 h-3 rounded-full bg-green-400/80" />
              </div>
              <div className="flex-1 mx-4 h-6 bg-white/10 rounded-md flex items-center px-3">
                <span className="text-white/60 text-xs">maco.ai/learn</span>
              </div>
            </div>

            {/* Bottom progress */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
              <div className="flex items-center gap-3 text-white/80">
                <span className="text-xs">05:20 / 28:45</span>
                <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full w-[19%] bg-[#0B56D5] rounded-full relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md" />
                  </div>
                </div>
                <span className="text-xs">HD</span>
              </div>
            </div>
          </motion.div>

          {/* Floating AI Card — Right */}
          <motion.div
            initial={{ opacity: 0, x: 24, y: 10 }}
            animate={{ opacity: 1, x: 0, y: 0, ...floatCard }}
            transition={{ duration: 0.7, delay: 1.1, ease: EASE_OUT_EXPO }}
            className="absolute hidden lg:block z-20 -right-16 top-[20%] w-80"
          >
            <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center justify-center w-9 h-9 text-white bg-[#0B56D5] rounded-xl shadow-lg shadow-blue-500/30">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">MACO AI</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-wide">Đang hoạt động</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl rounded-tl-none p-3.5">
                <p className="text-sm text-slate-600 leading-relaxed">Chào bạn! 👋 Tôi có thể giải thích phần <span className="text-[#0B56D5] font-semibold">05:20</span> ngay bây giờ không?</p>
              </div>
              <div className="flex gap-2 mt-3">
                <div className="flex-1 bg-[#0B56D5]/5 rounded-lg p-2 text-center text-xs font-semibold text-[#0B56D5] cursor-pointer hover:bg-[#0B56D5]/10 transition-colors">Có, giải thích</div>
                <div className="flex-1 bg-slate-50 rounded-lg p-2 text-center text-xs font-semibold text-slate-500 cursor-pointer hover:bg-slate-100 transition-colors">Bỏ qua</div>
              </div>
            </div>
          </motion.div>

          {/* Floating Progress Card — Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0, ...floatY }}
            transition={{ duration: 0.65, delay: 1.2, ease: EASE_OUT_EXPO }}
            className="absolute hidden lg:block z-20 -left-14 bottom-[15%] w-56"
          >
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-700">Tiến độ học</span>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="space-y-2">
                {[
                  { label: "Lý thuyết", value: 85, color: "bg-blue-500" },
                  { label: "Thực hành", value: 62, color: "bg-purple-500" },
                  { label: "Kiểm tra", value: 91, color: "bg-emerald-500" },
                ].map(({ label, value, color }) => (
                  <div key={label}>
                    <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                      <span>{label}</span>
                      <span className="font-bold">{value}%</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full ${color} rounded-full transition-all duration-1000`} style={{ width: `${value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}