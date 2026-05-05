import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export function CtaSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        <div className="reveal-scale relative overflow-hidden bg-gradient-to-br from-[#0B56D5] via-[#1264E8] to-[#0944B8] rounded-[2.5rem] p-12 md:p-20 animate-gradientShift">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-[80px]" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-blue-400/10 rounded-full blur-[60px]" />
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
            backgroundSize: "32px 32px"
          }} />

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="max-w-lg">
              <div className="flex items-center gap-2 mb-6 text-blue-200">
                <Zap className="w-5 h-5" />
                <span className="text-sm font-bold tracking-widest uppercase">Dịch vụ hỗ trợ học tập</span>
              </div>
              <h2 className="mb-6 text-4xl font-extrabold text-white md:text-5xl leading-tight">
                Hiểu bài ngay khi học
                <br />
                <span className="text-blue-200">Mạch học không gián đoạn</span>
              </h2>
              <p className="mb-10 text-lg text-blue-100/90 leading-relaxed">
                Trợ lý AI đồng hành 24/7, gỡ rối mọi thắc mắc ngay lập tức giúp bạn duy trì sự tập trung tối đa.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="h-14 px-8 text-base font-bold text-[#0B56D5] bg-white rounded-full hover:bg-slate-50 hover:scale-105 active:scale-95 transition-all duration-200 shadow-xl"
                >
                  Học thử với AI ngay
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="h-14 px-8 text-base font-semibold text-white/90 rounded-full border border-white/20 hover:bg-white/10 transition-all duration-200"
                >
                  Xem demo
                </Button>
              </div>
            </div>

            {/* Benefit card */}
            <div className="w-full max-w-sm p-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-[1.75rem]">
              <h4 className="mb-6 text-sm font-bold tracking-widest text-blue-200 uppercase">Giải pháp từ Maco</h4>
              <ul className="space-y-4">
                {[
                  "Hỏi đáp tức thì, không gián đoạn",
                  "Nắm ý chính nhanh hơn 3x",
                  "Lộ trình học cá nhân hóa",
                  "Hỗ trợ 24/7 bởi AI thông minh",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-white">
                    <div className="w-5 h-5 flex-shrink-0 flex items-center justify-center bg-white/20 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-blue-200" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="pt-6 mt-6 border-t border-white/20">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/10 rounded-xl">
                    <Sparkles className="w-5 h-5 text-blue-200" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Cập nhật liên tục</p>
                    <p className="text-xs text-blue-200 mt-0.5">Hệ thống tối ưu theo phản hồi của bạn.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}