import { motion } from "framer-motion";
import { ArrowRight, Compass, Search, Sparkles, VideoOff } from "lucide-react";
import { fadeInUp, staggerContainer, scaleIn, VIEWPORT_ONCE, EASE_OUT_EXPO } from "@/lib/motion";

export function ChallengesSection() {
  return (
    <section className="py-28 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-[80px]" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-100/40 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        {/* Header Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="text-center mb-20"
        >
          <motion.div variants={fadeInUp} custom={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-5 text-xs font-bold text-[#0B56D5] uppercase bg-blue-50 rounded-full border border-blue-100 tracking-widest">
              Thách thức
            </div>
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            custom={0.1}
            className="text-3xl font-extrabold text-slate-900 md:text-4xl lg:text-5xl leading-tight"
          >
            Bạn đã từng gặp vấn đề này?
          </motion.h2>
        </motion.div>

        {/* Grid Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid max-w-5xl grid-cols-1 gap-6 mx-auto md:grid-cols-3 mb-24"
        >
          {[
            { icon: Compass, title: "Học online nhưng không biết bắt đầu từ đâu", desc: "Quá nhiều nguồn tài nguyên, không có lộ trình rõ ràng khiến bạn bị lạc hướng.", color: "from-blue-500 to-blue-700" },
            { icon: Search, title: "Xem video nhưng không hiểu, phải tự tìm câu trả lời", desc: "Phải thoát ra ngoài để tra cứu, mất tập trung và thời gian quý báu.", color: "from-indigo-500 to-indigo-700" },
            { icon: VideoOff, title: "Dễ mất động lực và bỏ dở giữa chừng", desc: "Không có ai hỗ trợ, bạn dần mất động lực và không thể hoàn thành khóa học.", color: "from-violet-500 to-violet-700" },
          ].map((card, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              custom={i * 0.08}
              whileHover={{ y: -8, boxShadow: "0 24px 48px rgba(11,86,213,0.11)", borderColor: "rgba(11,86,213,0.2)" }}
              transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
              className="group p-9 bg-white border border-slate-100 rounded-[1.75rem] shadow-sm cursor-default"
            >
              <motion.div
                whileHover={{ scale: 1.08, rotate: 4 }}
                transition={{ duration: 0.2 }}
                className={`inline-flex items-center justify-center w-14 h-14 mb-7 text-white bg-gradient-to-br ${card.color} rounded-2xl shadow-lg`}
              >
                <card.icon className="w-6 h-6" />
              </motion.div>
              <h3 className="text-[17px] font-bold text-slate-800 mb-3 leading-snug">{card.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Solution callout */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          custom={0}
          className="max-w-3xl mx-auto relative overflow-hidden bg-white border border-blue-100 rounded-[2rem] shadow-xl shadow-blue-900/5 p-12 md:p-16"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-5">
              <Sparkles className="w-5 h-5 text-[#0B56D5]" />
              <span className="text-xs font-bold text-[#0B56D5] uppercase tracking-widest">Giải pháp từ Maco</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-7">
              "Biết bắt đầu, hiểu ngay, và luôn tiếp tục với{" "}
              <span className="gradient-text">MACO AI</span>"
            </h3>
            <motion.button
              whileHover={{ x: 5 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center gap-2 text-sm font-bold text-[#0B56D5] cursor-pointer"
            >
              Khám phá giải pháp
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}