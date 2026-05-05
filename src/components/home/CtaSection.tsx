import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative overflow-hidden bg-gradient-to-br from-[#0B56D5] via-[#1264E8] to-[#0944B8] rounded-[2.5rem] p-12 md:p-20 shadow-2xl shadow-blue-500/20"
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-[60px]" />
          <div 
            className="absolute inset-0 opacity-5" 
            style={{
              backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
              backgroundSize: "32px 32px"
            }} 
          />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-lg">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center gap-2 mb-6 text-blue-200"
              >
                <Zap className="w-5 h-5 fill-current" />
                <span className="text-sm font-bold tracking-widest uppercase">Dịch vụ hỗ trợ học tập</span>
              </motion.div>

              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-6 text-4xl font-extrabold text-white md:text-5xl leading-tight"
              >
                Hiểu bài ngay khi học
                <br />
                <span className="text-blue-200">Mạch học không gián đoạn</span>
              </motion.h2>

              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-10 text-lg text-blue-100/90 leading-relaxed"
              >
                Trợ lý AI đồng hành 24/7, gỡ rối mọi thắc mắc ngay lập tức giúp bạn duy trì sự tập trung tối đa.
              </motion.p>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button
                  size="lg"
                  className="h-14 px-8 text-base font-bold text-[#0B56D5] bg-white rounded-full hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl cursor-pointer"
                >
                  Học thử với AI ngay
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-8 text-base font-semibold text-white rounded-full border-white/20 bg-white/10 hover:bg-white/20 transition-all duration-200 cursor-pointer"
                >
                  Xem demo
                </Button>
              </motion.div>
            </div>

            {/* Benefit card */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="w-full max-w-sm p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-[1.75rem]"
            >
              <h4 className="mb-6 text-sm font-bold tracking-widest text-blue-200 uppercase">Giải pháp từ Maco</h4>
              <ul className="space-y-4">
                {[
                  "Hỏi đáp tức thì, không gián đoạn",
                  "Nắm ý chính nhanh hơn 3x",
                  "Lộ trình học cá nhân hóa",
                  "Hỗ trợ 24/7 bởi AI thông minh",
                ].map((item, i) => (
                  <motion.li 
                    key={i} 
                    initial={{ opacity: 0, x: 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + (i * 0.1) }}
                    className="flex items-center gap-3 text-sm font-medium text-white"
                  >
                    <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center bg-white/20 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-blue-200" />
                    </div>
                    {item}
                  </motion.li>
                ))}
              </ul>

              <div className="pt-6 mt-6 border-t border-white/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-xl">
                    <Sparkles className="w-5 h-5 text-blue-200 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Cập nhật liên tục</p>
                    <p className="text-xs text-blue-200 mt-0.5">Hệ thống tối ưu theo phản hồi của bạn.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}