import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { fadeInUp, staggerContainer, VIEWPORT_ONCE, EASE_OUT_EXPO } from "@/lib/motion";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Nguyễn Minh Khoa",
      role: "Sinh viên CNTT",
      text: "MACO AI giúp mình hiểu bài ngay trong lúc xem video. Không còn phải dừng lại và tra Google nữa!",
      avatar: "MK",
    },
    {
      name: "Trần Thị Hoa",
      role: "Kế toán viên",
      text: "Lộ trình học rõ ràng, AI hỗ trợ tận tâm. Mình học Python trong 3 tháng mà cảm giác rất tự tin.",
      avatar: "TH",
    },
    {
      name: "Lê Văn Dũng",
      role: "Product Manager",
      text: "Tính năng hỏi đáp ngay tại video là thứ mình tìm kiếm bấy lâu nay. Tuyệt vời!",
      avatar: "LV",
    },
  ];

  return (
    <section className="py-28 bg-gradient-to-br from-[#EEF3FC] to-[#E8F0FF] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">

        {/* Title */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="text-center mb-16"
        >
          <motion.p
            variants={fadeInUp}
            custom={0}
            className="inline-block text-xs font-bold text-[#0B56D5] uppercase tracking-widest mb-4"
          >
            Học viên nói gì
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            custom={0.08}
            className="text-3xl font-extrabold text-slate-900 md:text-4xl"
          >
            Học viên nói gì về <span className="gradient-text">MACO</span>?
          </motion.h2>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              custom={i * 0.1}
              whileHover={{
                y: -8,
                boxShadow: "0 24px 48px rgba(11, 86, 213, 0.08)",
                transition: { duration: 0.25, ease: EASE_OUT_EXPO },
              }}
              className="bg-white rounded-[1.75rem] p-8 border border-slate-100 shadow-sm relative flex flex-col cursor-default"
            >
              {/* Quote icon */}
              <div className="absolute top-6 right-6 text-4xl text-blue-100 font-serif leading-none select-none">"</div>

              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-5">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 text-amber-400" fill="currentColor" />
                ))}
              </div>

              {/* Quote Content */}
              <p className="text-slate-600 text-[15px] leading-relaxed mb-8 flex-1 italic">
                "{t.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3 pt-5 border-t border-slate-100">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0B56D5] to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20 flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-900">{t.name}</p>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}