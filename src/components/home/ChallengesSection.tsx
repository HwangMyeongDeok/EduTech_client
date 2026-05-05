import { motion } from "framer-motion";
import { ArrowRight, Compass, Search, Sparkles, VideoOff } from "lucide-react";

export function ChallengesSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-bold text-[#0B56D5] uppercase bg-blue-50 rounded-full border border-blue-100 tracking-widest"
          >
            Thách thức
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-extrabold text-slate-900 md:text-4xl lg:text-5xl"
          >
            Bạn đã từng gặp vấn đề này?
          </motion.h2>
        </div>

        {/* Grid Cards */}
        <div className="grid max-w-5xl grid-cols-1 gap-6 mx-auto md:grid-cols-3 mb-20">
          {[
            { icon: Compass, title: "Học online nhưng không biết bắt đầu từ đâu", desc: "Quá nhiều nguồn tài nguyên, không có lộ trình rõ ràng khiến bạn bị lạc hướng.", color: "from-blue-500 to-blue-700" },
            { icon: Search, title: "Xem video nhưng không hiểu, phải tự tìm câu trả lời", desc: "Phải thoát ra ngoài để tra cứu, mất tập trung và thời gian quý báu.", color: "from-indigo-500 to-indigo-700" },
            { icon: VideoOff, title: "Dễ mất động lực và bỏ dở giữa chừng", desc: "Không có ai hỗ trợ, bạn dần mất động lực và không thể hoàn thành khóa học.", color: "from-violet-500 to-violet-700" },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }} // Tự động stagger dựa trên index
              className="hover-lift group p-8 bg-white border border-slate-100 rounded-[1.75rem] shadow-sm cursor-default"
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 mb-6 text-white bg-gradient-to-br ${item.color} rounded-2xl shadow-lg`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Solution callout - Hiệu ứng Reveal Scale */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }} // Bắt đầu nhỏ hơn một chút
          whileInView={{ opacity: 1, scale: 1 }} // Phóng lớn về bình thường
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl mx-auto relative overflow-hidden bg-white border border-blue-100 rounded-[2rem] shadow-xl shadow-blue-900/5 p-10 md:p-14"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-[#0B56D5]" />
              <span className="text-xs font-bold text-[#0B56D5] uppercase tracking-widest">Giải pháp từ Maco</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight mb-6">
              "Biết bắt đầu, hiểu ngay, và luôn tiếp tục với{" "}
              <span className="gradient-text">MACO AI</span>"
            </h3>
            <button className="group inline-flex items-center gap-2 text-sm font-bold text-[#0B56D5] hover:gap-3 transition-all duration-200 cursor-pointer">
              Khám phá giải pháp
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}