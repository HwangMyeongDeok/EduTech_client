import { MessageSquare, Zap, PlayCircle, Target } from "lucide-react";

export function FeaturesGridSection() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
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
  );
}