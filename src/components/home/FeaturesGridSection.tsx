import { motion } from "framer-motion";
import { MessageSquare, Zap, PlayCircle, Target } from "lucide-react";

export function FeaturesGridSection() {
  const features = [
    {
      icon: MessageSquare,
      title: "Hỏi ngay khi học, đáp tức thì",
      desc: "Mọi thắc mắc được giải đáp ngay trong lúc bạn xem video, không cần rời trang.",
      gradient: "from-blue-500 to-blue-700",
      shadow: "shadow-blue-500/25",
    },
    {
      icon: Zap,
      title: "Hiểu sâu kiến thức trong vài giây",
      desc: "AI tóm tắt và giải thích những khái niệm khó một cách dễ hiểu nhất.",
      gradient: "from-amber-400 to-orange-500",
      shadow: "shadow-amber-500/25",
    },
    {
      icon: PlayCircle,
      title: "Học liên tục, không bị ngắt quãng",
      desc: "Tập trung hoàn toàn vào bài giảng, không lo bị kẹt lại giữa chừng.",
      gradient: "from-purple-500 to-violet-700",
      shadow: "shadow-purple-500/25",
    },
    {
      icon: Target,
      title: "Gợi ý bài tập đúng chỗ hổng",
      desc: "Hệ thống tự nhận diện phần bạn chưa hiểu để củng cố thêm hiệu quả.",
      gradient: "from-emerald-500 to-teal-600",
      shadow: "shadow-emerald-500/25",
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 text-xs font-bold text-[#0B56D5] uppercase bg-blue-50 rounded-full border border-blue-100 tracking-widest"
          >
            Đặc quyền của bạn
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl font-extrabold text-slate-900 md:text-4xl lg:text-5xl"
          >
            Hỗ trợ tức thì
            <br />
            <span className="gradient-text">trong từng khoảnh khắc học</span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto"
          >
            AI trả lời và giải thích ngay khi bạn cần, liền mạch, không gián đoạn.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid max-w-6xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-4">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.5, 
                delay: i * 0.1, // Stagger hiệu ứng dựa trên index
                ease: "easeOut" 
              }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.2 } 
              }}
              className="group p-8 bg-white border border-slate-100 rounded-[1.75rem] shadow-sm hover:shadow-xl hover:shadow-slate-200/50 text-center flex flex-col items-center cursor-default transition-shadow duration-300"
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`flex items-center justify-center w-16 h-16 mb-6 text-white bg-gradient-to-br ${item.gradient} rounded-2xl shadow-lg ${item.shadow}`}
              >
                <item.icon className="w-7 h-7" />
              </motion.div>
              
              <h3 className="mb-3 text-lg font-bold text-slate-900 group-hover:text-[#0B56D5] transition-colors">
                {item.title}
              </h3>
              
              <p className="text-sm text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}