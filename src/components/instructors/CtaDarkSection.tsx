import { motion } from "framer-motion";
import { Sparkles, ArrowRight, LayoutDashboard, BrainCircuit } from "lucide-react";
import { staggerContainerFast, fadeInRight, VIEWPORT_ONCE } from "@/lib/motion";
import { Reveal } from "@/components/instructors/Reveal";

export function CtaDarkSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        
        <div className="relative z-10 bg-[#0B1121] border border-blue-500/20 shadow-[0_20px_100px_rgba(11,86,213,0.15)] rounded-[3rem] p-10 lg:p-16 overflow-hidden flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none mix-blend-overlay" />
          
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="flex-1 relative z-10">
            <Reveal direction="left">
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-xs font-bold text-blue-400 uppercase tracking-widest bg-blue-500/10 border border-blue-500/20 rounded-full">
                <Sparkles className="w-4 h-4" /> Dành riêng cho giảng viên
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6 leading-[1.2]">
                Tạo câu hỏi từ video <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  và quản lý nội dung
                </span> <br />
                dễ dàng hơn
              </h2>
              
              <p className="text-slate-400 text-base leading-relaxed mb-10 max-w-lg">
                Hệ thống AI tự động hóa mọi thao tác thủ công. Chỉ cần tải video lên, MACO sẽ phân tích, tạo quiz và tổ chức lộ trình bài giảng hoàn hảo cho bạn.
              </p>
              
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(11,86,213,0.5)" }} 
                whileTap={{ scale: 0.95 }} 
                className="group relative inline-flex items-center gap-3 bg-[#0B56D5] text-white text-sm font-bold px-8 py-4 rounded-full overflow-hidden cursor-pointer border border-blue-400/30"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">BẮT ĐẦU NGAY</span>
                <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </motion.button>
            </Reveal>
          </div>

          <div className="flex-1 relative z-10 w-full">
            <motion.div 
              className="space-y-5" 
              variants={staggerContainerFast} 
              initial="hidden" 
              whileInView="visible" 
              viewport={VIEWPORT_ONCE}
            >
              {[
                {
                  icon: <LayoutDashboard className="w-6 h-6 text-blue-400" />,
                  title: "Quản lý nội dung thông minh",
                  desc: "Kéo thả, sắp xếp và phân nhánh bài giảng theo hệ thống thư mục trực quan. Tích hợp phân tích dữ liệu tương tác theo thời gian thực.",
                  glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                },
                {
                  icon: <BrainCircuit className="w-6 h-6 text-cyan-400" />,
                  title: "AI tự động tạo Quiz & Note",
                  desc: "Chỉ với 1 click, AI quét toàn bộ video để trích xuất từ khóa, tạo câu hỏi trắc nghiệm và biên soạn tài liệu học tập chuẩn xác.",
                  glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]"
                },
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeInRight} 
                  custom={i * 0.1} 
                  className={`group relative p-6 rounded-3xl bg-slate-800/60 border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 cursor-default ${item.glow}`}
                >
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-gradient-to-b from-blue-400 to-cyan-400 rounded-r-full group-hover:h-1/2 transition-all duration-500 opacity-0 group-hover:opacity-100" />
                  
                  <div className="flex items-start gap-5">
                    <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-500 group-hover:border-blue-500/30">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-200 mb-2 group-hover:text-blue-300 transition-colors">{item.title}</h3>
                      <p className="text-[13px] text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}