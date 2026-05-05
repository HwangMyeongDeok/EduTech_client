import { motion } from "framer-motion";
import { ArrowRight, Brain, CheckCircle2, Lightbulb, MessageSquare, Sparkles, TrendingUp } from "lucide-react";

export function AiExperienceSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#EEF3FC] to-[#E8F0FF] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-200/30 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold text-slate-900 md:text-4xl lg:text-5xl leading-tight"
          >
            Trải nghiệm học tập với AI
            <br />
            <span className="gradient-text">hỗ trợ ngay khi bạn cần</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto"
          >
            MACO kết hợp khoa học với AI để hỗ trợ bạn hiểu bài, đặt câu hỏi và xử lý ngay qua từng khoảnh khắc học tập.
          </motion.p>
        </div>

        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 max-w-5xl mx-auto">
          {/* Chat UI - Reveal Left */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-6 bg-[#0B1121] rounded-[1.75rem] shadow-2xl shadow-blue-900/20"
          >
            {/* Chat Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700/60">
              <div className="w-9 h-9 flex items-center justify-center bg-blue-600 rounded-xl">
                <MessageSquare className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-bold text-white text-sm">CONTEXTUAL Q&A</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] text-emerald-400 font-medium">AI đang lắng nghe</span>
                </div>
              </div>
            </div>

            {/* Messages Animation Area */}
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <span className="text-[10px] text-slate-500 bg-slate-800 px-3 py-1 rounded-full">Đang xem video tại 05:20</span>
              </motion.div>

              {/* User Bubble */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="flex justify-end"
              >
                <div className="max-w-[80%] bg-slate-700 rounded-2xl rounded-tr-sm px-4 py-3">
                  <p className="text-xs text-slate-400 font-medium mb-1">Bạn hỏi:</p>
                  <p className="text-sm text-white">"Giải thích phần này ở phút 05:20 cho mình với?"</p>
                </div>
              </motion.div>

              {/* AI Bubble */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="flex gap-2.5"
              >
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-blue-600 rounded-xl">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                </div>
                <div className="max-w-[80%] bg-blue-600/15 border border-blue-500/20 rounded-2xl rounded-tl-sm px-4 py-3">
                  <p className="text-xs font-bold text-blue-400 mb-2">MACO AI phản hồi:</p>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    Tại phút <span className="text-blue-400 font-bold">05:20</span>, bài giảng định nghĩa <span className="text-white font-semibold">Closure</span> là một hàm có khả năng "nhớ" scope nơi nó được tạo ra...
                  </p>
                  <div className="flex gap-2 mt-3 pt-3 border-t border-blue-500/20">
                    <button className="text-[10px] text-blue-400 font-medium bg-blue-600/10 hover:bg-blue-600/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">📌 Lưu ghi chú</button>
                    <button className="text-[10px] text-blue-400 font-medium bg-blue-600/10 hover:bg-blue-600/20 px-3 py-1.5 rounded-lg transition-colors cursor-pointer">🔁 Hỏi thêm</button>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Feature list - Reveal Right */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block px-4 py-1.5 mb-4 text-xs font-bold text-white uppercase bg-[#0B56D5] rounded-full tracking-widest">
              Hỏi đáp trực tiếp
            </div>
            <h3 className="mb-4 text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
              Dành cho <span className="gradient-text">Học viên</span>
            </h3>
            <p className="mb-8 text-slate-500 leading-relaxed text-lg">
              Đặt câu hỏi ngay tại bất kỳ thời điểm nào trong video và nhận giải thích tức thì từ AI. Mọi thắc mắc được xử lý ngay lập tức.
            </p>

            <div className="space-y-3">
              {[
                { icon: CheckCircle2, text: "Quản lý nội dung học tập rõ ràng, dễ theo dõi theo từng video", color: "text-blue-600 bg-blue-50" },
                { icon: Brain, text: "AI tự động tóm tắt và làm nổi bật kiến thức quan trọng", color: "text-purple-600 bg-purple-50" },
                { icon: Lightbulb, text: "Gợi ý ví dụ thực tế giúp bạn hiểu sâu hơn và nhớ lâu hơn", color: "text-amber-600 bg-amber-50" },
                { icon: TrendingUp, text: "Theo dõi tiến độ và nhận phản hồi tức thì về hiệu quả học tập", color: "text-emerald-600 bg-emerald-50" },
              ].map(({ icon: Icon, text, color }, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (i * 0.1) }}
                  viewport={{ once: true }}
                  className="hover-lift flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm"
                >
                  <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl ${color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}