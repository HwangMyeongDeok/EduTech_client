import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sparkles, Play, Compass, Search, VideoOff,
  MessageSquare, Zap, PlayCircle, Target, CheckCircle2,
  ArrowRight, Star, ChevronRight, Brain, Lightbulb, TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

// ========================================
// ANIMATED COUNTER HOOK
// ========================================
function useCounter(end: number, duration: number = 2000, start: boolean = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

// ========================================
// ANIMATED STATS COMPONENT
// ========================================
function StatCard({ value, label, suffix = "", delay = 0 }: { value: number; label: string; suffix?: string; delay?: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCounter(value, 1800, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className="reveal text-center"
    >
      <div className="text-4xl md:text-5xl font-extrabold text-[#0B56D5] mb-1 tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-sm font-medium text-slate-500">{label}</div>
    </div>
  );
}

// ========================================
// TYPING ANIMATION COMPONENT
// ========================================
function TypingText({ words }: { words: string[] }) {
  const [currentWord, setCurrentWord] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWord];
    const speed = isDeleting ? 50 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(word.substring(0, displayText.length + 1));
        if (displayText.length === word.length - 1) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayText(word.substring(0, displayText.length - 1));
        if (displayText.length === 1) {
          setIsDeleting(false);
          setCurrentWord((prev) => (prev + 1) % words.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentWord, words]);

  return (
    <span className="gradient-text">
      {displayText}
      <span className="inline-block w-0.5 h-[0.9em] bg-[#0B56D5] ml-0.5 animate-[blink_1s_ease_infinite]" />
    </span>
  );
}

// ========================================
// MAIN HOME PAGE
// ========================================
export default function Home() {
  const [videoPaused, setVideoPaused] = useState(false);

  return (
    <div className="w-full overflow-x-hidden">

      {/* ================================================
          SECTION 1: HERO
      ================================================ */}
      <section className="relative min-h-screen flex items-center pt-20 pb-32 overflow-hidden">
        {/* Ambient gradient blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-blue-400/15 blur-[140px] rounded-full animate-floatY" />
          <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] bg-indigo-400/10 blur-[100px] rounded-full" style={{ animation: "floatY 6s ease-in-out 1s infinite" }} />
          <div className="absolute bottom-0 -right-20 w-[500px] h-[400px] bg-blue-300/10 blur-[120px] rounded-full" style={{ animation: "floatY 7s ease-in-out 2s infinite" }} />
          {/* Decorative dots grid */}
          <div className="absolute inset-0 opacity-30" style={{
            backgroundImage: "radial-gradient(circle, #0B56D5 1px, transparent 1px)",
            backgroundSize: "48px 48px"
          }} />
        </div>

        <div className="container relative z-10 px-4 mx-auto lg:px-24 xl:px-44">
          <div className="text-center max-w-5xl mx-auto">

            {/* Badge */}
            <div className="animate-fadeInDown inline-flex items-center gap-2 px-5 py-2.5 mb-8 text-sm font-semibold text-[#0B56D5] bg-white rounded-full shadow-md shadow-blue-100 border border-blue-100/80">
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full w-2 h-2 bg-[#0B56D5]" />
              </span>
              MACO AI — Nền tảng học tập thế hệ mới
            </div>

            {/* Headline */}
            <h1 className="animate-fadeInUp delay-100 mb-6 text-5xl font-extrabold tracking-tight text-slate-900 md:text-6xl lg:text-7xl leading-[1.1]">
              Không chỉ là học
              <br />
              <TypingText words={["mà là hiểu ngay", "mà là tiến nhanh", "mà là thành công"]} />
            </h1>

            <p className="animate-fadeInUp delay-200 max-w-2xl mx-auto mb-10 text-lg text-slate-500 leading-relaxed">
              Nền tảng học tập thế hệ mới giúp bạn không còn học lan man, không còn mất động lực. Mọi thứ bạn cần – lộ trình, giải thích, tương tác – đều có ngay trong một trải nghiệm duy nhất.
            </p>

            {/* CTAs */}
            <div className="animate-fadeInUp delay-300 flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <Button
                size="lg"
                className="group h-14 px-8 text-base font-bold text-white bg-[#0B56D5] rounded-full shadow-xl shadow-blue-500/30 hover:bg-[#0944B8] hover:shadow-blue-500/50 hover:scale-105 active:scale-95 transition-all duration-200 animate-pulseGlow"
              >
                Khám phá tính năng AI
                <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="group h-14 px-8 text-base font-semibold text-slate-700 rounded-full bg-white/70 backdrop-blur-sm border border-slate-200 hover:bg-white hover:border-blue-200 transition-all duration-200"
              >
                <Play className="w-4 h-4 mr-2 text-[#0B56D5]" />
                Xem demo
              </Button>
            </div>

            {/* Trust badges */}
            <div className="animate-fadeInUp delay-400 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400 font-medium">
              {[
                { icon: Star, text: "4.9/5 đánh giá" },
                { icon: CheckCircle2, text: "Miễn phí thử nghiệm" },
                { icon: Zap, text: "Không cần thẻ tín dụng" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-blue-400" />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ---- VIDEO MOCKUP ---- */}
          <div className="animate-scaleIn delay-500 relative max-w-5xl mx-auto mt-20">
            {/* Glow ring under video */}
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/20 via-indigo-400/20 to-blue-400/20 rounded-[2rem] blur-2xl" />

            {/* Main video card */}
            <div className="relative z-10 overflow-hidden bg-slate-900 rounded-[1.5rem] shadow-[0_40px_80px_rgba(11,86,213,0.20)] border border-white/20 aspect-[16/9] flex items-center justify-center group cursor-pointer"
              onClick={() => setVideoPaused(!videoPaused)}
            >
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"
                alt="Platform preview"
                className="absolute inset-0 object-cover w-full h-full opacity-50 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700"
              />

              {/* Play button */}
              <div className="relative z-20 flex items-center justify-center w-20 h-20 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 ml-1 text-[#0B56D5]" fill="currentColor" />
              </div>

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
            </div>

            {/* Floating AI Card — Right */}
            <div className="absolute hidden lg:block z-20 -right-16 top-[20%] w-80 animate-floatCard">
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
            </div>

            {/* Floating Progress Card — Left */}
            <div className="absolute hidden lg:block z-20 -left-14 bottom-[15%] w-56" style={{ animation: "floatCard 6s ease-in-out 1s infinite" }}>
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
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          SECTION: STATS
      ================================================ */}
      <section className="py-16 bg-white border-y border-slate-100">
        <div className="container px-4 mx-auto lg:px-24 xl:px-44">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-slate-100">
            <StatCard value={12000} suffix="+" label="Học viên tin dùng" delay={0} />
            <StatCard value={98} suffix="%" label="Tỷ lệ hài lòng" delay={100} />
            <StatCard value={500} suffix="+" label="Khóa học chất lượng" delay={200} />
            <StatCard value={24} suffix="/7" label="Hỗ trợ AI mọi lúc" delay={300} />
          </div>
        </div>
      </section>

      {/* ================================================
          SECTION 2: CHALLENGES
      ================================================ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-80 h-80 bg-blue-100/50 rounded-full blur-[80px]" />
        </div>
        <div className="container px-4 mx-auto lg:px-24 xl:px-44">
          <div className="text-center mb-16">
            <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-bold text-[#0B56D5] uppercase bg-blue-50 rounded-full border border-blue-100 tracking-widest">
              Thách thức
            </div>
            <h2 className="reveal delay-100 text-3xl font-extrabold text-slate-900 md:text-4xl lg:text-5xl">
              Bạn đã từng gặp vấn đề này?
            </h2>
          </div>

          <div className="grid max-w-5xl grid-cols-1 gap-6 mx-auto md:grid-cols-3 mb-20">
            {[
              { icon: Compass, title: "Học online nhưng không biết bắt đầu từ đâu", desc: "Quá nhiều nguồn tài nguyên, không có lộ trình rõ ràng khiến bạn bị lạc hướng.", color: "from-blue-500 to-blue-700" },
              { icon: Search, title: "Xem video nhưng không hiểu, phải tự tìm câu trả lời", desc: "Phải thoát ra ngoài để tra cứu, mất tập trung và thời gian quý báu.", color: "from-indigo-500 to-indigo-700" },
              { icon: VideoOff, title: "Dễ mất động lực và bỏ dở giữa chừng", desc: "Không có ai hỗ trợ, bạn dần mất động lực và không thể hoàn thành khóa học.", color: "from-violet-500 to-violet-700" },
            ].map((item, i) => (
              <div
                key={i}
                data-delay={`${i * 100}`}
                className="reveal hover-lift group p-8 bg-white border border-slate-100 rounded-[1.75rem] shadow-sm cursor-default"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 mb-6 text-white bg-gradient-to-br ${item.color} rounded-2xl shadow-lg`}>
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Solution callout */}
          <div className="reveal-scale max-w-3xl mx-auto relative overflow-hidden bg-white border border-blue-100 rounded-[2rem] shadow-xl shadow-blue-900/5 p-10 md:p-14">
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
              <button className="group inline-flex items-center gap-2 text-sm font-bold text-[#0B56D5] hover:gap-3 transition-all duration-200">
                Khám phá giải pháp
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          SECTION 3: SEAMLESS LEARNING
      ================================================ */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container px-4 mx-auto lg:px-24 xl:px-44">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-bold text-[#0B56D5] uppercase bg-blue-50 rounded-full border border-blue-100 tracking-widest">
              Cách học của chúng tôi
            </div>
            <h2 className="reveal delay-100 text-4xl font-extrabold text-slate-900 md:text-5xl leading-tight">
              Một cách học{" "}
              <span className="gradient-text">liền mạch</span>{" "}
              và được{" "}
              <span className="gradient-text">hỗ trợ ngay</span>{" "}
              trong lúc bạn cần
            </h2>
            <p className="reveal delay-200 mt-6 text-lg text-slate-500 leading-relaxed">
              Nền tảng tích hợp AI giúp bạn hiểu bài, đặt câu hỏi và tiến bộ ngay — không gián đoạn, không mơ hồ.
            </p>
          </div>

          {/* Steps */}
          <div className="max-w-6xl mx-auto space-y-20">
            {[
              {
                num: "01",
                title: "Bắt đầu đúng hướng",
                desc: "Lộ trình học được định hình rõ ràng theo mục tiêu của bạn. AI phân tích kỹ năng hiện tại và đề xuất con đường nhanh nhất để đạt mục tiêu.",
                imgSrc: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
                imgAlt: "Learning path",
                side: "right",
                badge: "Lộ trình cá nhân hóa",
                badgeColor: "text-blue-600 bg-blue-50",
              },
              {
                num: "02",
                title: "Học sâu với AI đồng hành",
                desc: "Đặt câu hỏi ngay tại bất kỳ thời điểm nào trong video và nhận giải thích tức thì. AI hiểu context bài học và cung cấp giải thích phù hợp nhất.",
                imgSrc: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
                imgAlt: "AI learning",
                side: "left",
                badge: "AI hỏi đáp thông minh",
                badgeColor: "text-purple-600 bg-purple-50",
              },
              {
                num: "03",
                title: "Củng cố và tiến bộ",
                desc: "Hệ thống theo dõi tiến độ và tự động gợi ý bài tập củng cố những điểm bạn còn hổng. Không bao giờ bỏ lại phía sau.",
                imgSrc: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070&auto=format&fit=crop",
                imgAlt: "Progress tracking",
                side: "right",
                badge: "Cá nhân hóa theo lỗ hổng",
                badgeColor: "text-emerald-600 bg-emerald-50",
              },
            ].map((step, i) => (
              <div
                key={i}
                className={`grid items-center grid-cols-1 gap-16 lg:grid-cols-2 ${
                  step.side === "left" ? "lg:flex-row-reverse" : ""
                }`}
              >
                <div className={step.side === "left" ? "reveal-right" : "reveal-left"} data-delay="0">
<div
  className={cn(
    "inline-flex items-center gap-2 px-3 py-1 mb-4 text-xs font-bold rounded-full border",
    step.badgeColor,
    "border-current/20"
  )}
>                    {step.badge}
                  </div>
                  <div className="border-l-4 border-[#0B56D5] pl-6 mb-6">
                    <p className="text-sm font-bold text-slate-400 mb-1">{step.num}</p>
                    <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900">{step.title}</h3>
                  </div>
                  <p className="text-slate-500 leading-relaxed text-lg">{step.desc}</p>
                  <button className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0B56D5] hover:gap-3 transition-all duration-200">
                    Tìm hiểu thêm
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>

                <div className={`${step.side === "left" ? "reveal-left lg:order-first" : "reveal-right"} relative`} data-delay="100">
                  <div className="absolute -inset-3 bg-gradient-to-br from-blue-100/50 to-indigo-100/50 rounded-[2.5rem] blur-xl" />
                  <div className="relative p-2 bg-gradient-to-br from-slate-100 to-slate-50 rounded-[2rem] border border-slate-200 shadow-lg overflow-hidden">
                    <img
                      src={step.imgSrc}
                      alt={step.imgAlt}
                      className="rounded-[1.5rem] w-full object-cover aspect-video"
                    />

                    {/* AI Tooltip overlay */}
                    <div className="absolute left-4 bottom-8 right-16 p-4 bg-white/95 backdrop-blur-sm shadow-xl rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-6 h-6 flex items-center justify-center bg-[#0B56D5] rounded-lg">
                          <Sparkles className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-xs font-bold text-slate-800">MACO AI</span>
                        <span className="ml-auto text-[10px] font-medium text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">Live</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        "Phần này giải thích cách <span className="font-semibold text-[#0B56D5]">thuật toán tối ưu hóa</span> hoạt động trong thực tế..."
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          SECTION 4: AI Q&A EXPERIENCE  
      ================================================ */}
      <section className="py-24 bg-gradient-to-br from-[#EEF3FC] to-[#E8F0FF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-200/30 rounded-full blur-[100px]" />
        </div>

        <div className="container px-4 mx-auto lg:px-24 xl:px-44">
          <div className="text-center mb-16">
            <h2 className="reveal text-3xl font-extrabold text-slate-900 md:text-4xl lg:text-5xl leading-tight">
              Trải nghiệm học tập với AI
              <br />
              <span className="gradient-text">hỗ trợ ngay khi bạn cần</span>
            </h2>
            <p className="reveal delay-100 mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              MACO kết hợp khoa học với AI để hỗ trợ bạn hiểu bài, đặt câu hỏi và xử lý ngay qua từng khoảnh khắc học tập.
            </p>
          </div>

          <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2 max-w-5xl mx-auto">
            {/* Chat UI */}
            <div className="reveal-left">
              <div className="p-6 bg-[#0B1121] rounded-[1.75rem] shadow-2xl shadow-blue-900/20">
                {/* Header */}
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

                {/* Messages */}
                <div className="space-y-4">
                  {/* System message */}
                  <div className="text-center">
                    <span className="text-[10px] text-slate-500 bg-slate-800 px-3 py-1 rounded-full">Đang xem video tại 05:20</span>
                  </div>

                  {/* User */}
                  <div className="flex justify-end">
                    <div className="max-w-[80%] bg-slate-700 rounded-2xl rounded-tr-sm px-4 py-3">
                      <p className="text-xs text-slate-400 font-medium mb-1">Bạn hỏi:</p>
                      <p className="text-sm text-white">"Giải thích phần này ở phút 05:20 cho mình với?"</p>
                    </div>
                  </div>

                  {/* AI response */}
                  <div className="flex gap-2.5">
                    <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-blue-600 rounded-xl">
                      <Sparkles className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div className="max-w-[80%] bg-blue-600/15 border border-blue-500/20 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-xs font-bold text-blue-400">MACO AI phản hồi:</p>
                      </div>
                      <p className="text-sm text-slate-200 leading-relaxed">
                        Tại phút <span className="text-blue-400 font-bold">05:20</span>, bài giảng định nghĩa <span className="text-white font-semibold">Closure</span> là một hàm có khả năng "nhớ" scope nơi nó được tạo ra...
                      </p>
                      <div className="flex gap-2 mt-3 pt-3 border-t border-blue-500/20">
                        <button className="text-[10px] text-blue-400 font-medium bg-blue-600/10 hover:bg-blue-600/20 px-3 py-1.5 rounded-lg transition-colors">📌 Lưu ghi chú</button>
                        <button className="text-[10px] text-blue-400 font-medium bg-blue-600/10 hover:bg-blue-600/20 px-3 py-1.5 rounded-lg transition-colors">🔁 Hỏi thêm</button>
                      </div>
                    </div>
                  </div>

                  {/* Typing input */}
                  <div className="flex items-center gap-2 mt-2 pt-4 border-t border-slate-700/60">
                    <div className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-2.5 text-sm text-slate-400">
                      Đặt câu hỏi về bài học...
                    </div>
                    <button className="w-9 h-9 flex items-center justify-center bg-blue-600 rounded-xl text-white hover:bg-blue-700 transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Feature list */}
            <div className="reveal-right">
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
                  <div key={i} className={`hover-lift flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-sm`}>
                    <div className={`flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-xl ${color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================
          SECTION 5: FEATURES GRID
      ================================================ */}
      <section className="py-24 bg-white">
        <div className="container px-4 mx-auto lg:px-24 xl:px-44">
          <div className="text-center mb-16">
            <div className="reveal inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-bold text-[#0B56D5] uppercase bg-blue-50 rounded-full border border-blue-100 tracking-widest">
              Đặc quyền của bạn
            </div>
            <h2 className="reveal delay-100 text-3xl font-extrabold text-slate-900 md:text-4xl lg:text-5xl">
              Hỗ trợ tức thì
              <br />
              <span className="gradient-text">trong từng khoảnh khắc học</span>
            </h2>
            <p className="reveal delay-200 mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
              AI trả lời và giải thích ngay khi bạn cần, liền mạch, không gián đoạn.
            </p>
          </div>

          <div className="grid max-w-6xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: MessageSquare,
                title: "Hỏi ngay khi học, đáp tức thì",
                desc: "Mọi thắc mắc được giải đáp ngay trong lúc bạn xem video, không cần rời trang.",
                gradient: "from-blue-500 to-blue-700",
                shadow: "shadow-blue-500/25",
                delay: 0,
              },
              {
                icon: Zap,
                title: "Hiểu sâu kiến thức trong vài giây",
                desc: "AI tóm tắt và giải thích những khái niệm khó một cách dễ hiểu nhất.",
                gradient: "from-amber-400 to-orange-500",
                shadow: "shadow-amber-500/25",
                delay: 100,
              },
              {
                icon: PlayCircle,
                title: "Học liên tục, không bị ngắt quãng",
                desc: "Tập trung hoàn toàn vào bài giảng, không lo bị kẹt lại giữa chừng.",
                gradient: "from-purple-500 to-violet-700",
                shadow: "shadow-purple-500/25",
                delay: 200,
              },
              {
                icon: Target,
                title: "Gợi ý bài tập đúng chỗ hổng",
                desc: "Hệ thống tự nhận diện phần bạn chưa hiểu để củng cố thêm hiệu quả.",
                gradient: "from-emerald-500 to-teal-600",
                shadow: "shadow-emerald-500/25",
                delay: 300,
              },
            ].map((item, i) => (
              <div
                key={i}
                data-delay={`${item.delay}`}
                className="reveal hover-lift group p-8 bg-white border border-slate-100 rounded-[1.75rem] shadow-sm text-center flex flex-col items-center cursor-default"
              >
                <div className={`flex items-center justify-center w-16 h-16 mb-6 text-white bg-gradient-to-br ${item.gradient} rounded-2xl shadow-lg ${item.shadow} group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="mb-3 text-lg font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          SECTION 6: TESTIMONIALS
      ================================================ */}
      <section className="py-20 bg-gradient-to-br from-[#EEF3FC] to-[#E8F0FF] overflow-hidden">
        <div className="container px-4 mx-auto lg:px-24 xl:px-44">
          <div className="text-center mb-12">
            <h2 className="reveal text-3xl font-extrabold text-slate-900 md:text-4xl">
              Học viên nói gì về <span className="gradient-text">MACO</span>?
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: "Nguyễn Minh Khoa", role: "Sinh viên CNTT", text: "MACO AI giúp mình hiểu bài ngay trong lúc xem video. Không còn phải dừng lại và tra Google nữa!", avatar: "MK", delay: 0 },
              { name: "Trần Thị Hoa", role: "Kế toán viên", text: "Lộ trình học rõ ràng, AI hỗ trợ tận tâm. Mình học Python trong 3 tháng mà cảm giác rất tự tin.", avatar: "TH", delay: 100 },
              { name: "Lê Văn Dũng", role: "Product Manager", text: "Tính năng hỏi đáp ngay tại video là thứ mình tìm kiếm bấy lâu nay. Tuyệt vời!", avatar: "LV", delay: 200 },
            ].map((t, i) => (
              <div
                key={i}
                data-delay={`${t.delay}`}
                className="reveal hover-lift bg-white rounded-[1.75rem] p-6 border border-slate-100 shadow-sm"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400" fill="currentColor" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0B56D5] to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================
          SECTION 7: CTA BANNER
      ================================================ */}
      <section className="py-20 bg-white">
        <div className="container px-4 mx-auto lg:px-24 xl:px-44">
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

    </div>
  );
}