import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    { 
      name: "Nguyễn Minh Khoa", 
      role: "Sinh viên CNTT", 
      text: "MACO AI giúp mình hiểu bài ngay trong lúc xem video. Không còn phải dừng lại và tra Google nữa!", 
      avatar: "MK" 
    },
    { 
      name: "Trần Thị Hoa", 
      role: "Kế toán viên", 
      text: "Lộ trình học rõ ràng, AI hỗ trợ tận tâm. Mình học Python trong 3 tháng mà cảm giác rất tự tin.", 
      avatar: "TH" 
    },
    { 
      name: "Lê Văn Dũng", 
      role: "Product Manager", 
      text: "Tính năng hỏi đáp ngay tại video là thứ mình tìm kiếm bấy lâu nay. Tuyệt vời!", 
      avatar: "LV" 
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#EEF3FC] to-[#E8F0FF] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        
        {/* Title */}
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold text-slate-900 md:text-4xl"
          >
            Học viên nói gì về <span className="gradient-text">MACO</span>?
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.5, 
                delay: i * 0.15, // Tạo hiệu ứng hiện lần lượt
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="bg-white rounded-[1.75rem] p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-shadow duration-300 relative"
            >
              {/* Rating Stars */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star 
                    key={j} 
                    className="w-4 h-4 text-amber-400" 
                    fill="currentColor" 
                  />
                ))}
              </div>

              {/* Quote Content */}
              <p className="text-slate-600 text-sm leading-relaxed mb-8 italic">
                "{t.text}"
              </p>

              {/* Author Info */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0B56D5] to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-extrabold text-slate-900">{t.name}</p>
                  <p className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}