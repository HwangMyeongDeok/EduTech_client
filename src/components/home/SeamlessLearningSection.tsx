import { cn } from "@/lib/utils";
import { ArrowRight, Sparkles } from "lucide-react";


export function SeamlessLearningSection() {
    return (
        <section className="py-24 bg-white relative overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
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
                            className={`grid items-center grid-cols-1 gap-16 lg:grid-cols-2 ${step.side === "left" ? "lg:flex-row-reverse" : ""
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
                                <button className="group mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#0B56D5] hover:gap-3 transition-all duration-200 cursor-pointer">
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
    );
}