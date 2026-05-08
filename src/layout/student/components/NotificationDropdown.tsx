import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, Clock } from "lucide-react";

export function NotificationDropdown() {
  const notifications = [
    { title: "Bài giảng mới", desc: "Chương 5 về Redux Toolkit đã sẵn sàng", time: "2 phút trước", icon: <CheckCircle2 className="text-emerald-500 w-4 h-4" />, bg: "bg-emerald-50" },
    { title: "Ưu đãi khóa học", desc: "Giảm giá 50% các khóa học AI", time: "1 giờ trước", icon: <Sparkles className="text-blue-500 w-4 h-4" />, bg: "bg-blue-50" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute right-0 mt-3 w-[380px] bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 transform origin-top-right z-50"
    >
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-800 text-lg">Thông báo</h3>
        <span className="px-2 py-1 bg-[#0B56D5]/10 text-[#0B56D5] text-[10px] font-bold rounded-full">2 MỚI</span>
      </div>
      <div className="max-h-[400px] overflow-y-auto p-2">
        {notifications.map((n, i) => (
          <div key={i} className="p-4 rounded-2xl hover:bg-slate-50 transition-all cursor-pointer flex gap-4 group">
            <div className={`w-11 h-11 rounded-full ${n.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
              {n.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-800 leading-snug">{n.title}</p>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2 font-medium">{n.desc}</p>
              <div className="flex items-center gap-1.5 mt-2.5 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                <Clock className="w-3 h-3" /> {n.time}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-slate-50/80 rounded-b-3xl text-center">
        <button className="text-xs font-bold text-[#0B56D5] hover:text-blue-700 transition-colors uppercase tracking-widest">Xem tất cả</button>
      </div>
    </motion.div>
  );
}