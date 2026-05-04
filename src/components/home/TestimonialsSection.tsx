import { Star } from "lucide-react";

export function TestimonialsSection() {
  return (
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
  );
}