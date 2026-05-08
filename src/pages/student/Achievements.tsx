import { motion } from "framer-motion";
import { Trophy, Star, Target, Zap, ShieldCheck, Flame, Award } from "lucide-react";

const BADGES = [
  { id: 1, title: "Học Bá Thức Khuya", desc: "Học sau 12h đêm trong 3 ngày liên tiếp", icon: <Star className="w-8 h-8" />, unlocked: true, color: "from-amber-400 to-orange-500" },
  { id: 2, title: "Tốc Độ Ánh Sáng", desc: "Hoàn thành 1 khóa học dưới 24h", icon: <Zap className="w-8 h-8" />, unlocked: true, color: "from-blue-400 to-indigo-500" },
  { id: 3, title: "Chuỗi 30 Ngày", desc: "Đăng nhập và học 30 ngày liên tiếp", icon: <Flame className="w-8 h-8" />, unlocked: false, color: "from-slate-300 to-slate-400" },
  { id: 4, title: "Chuyên Gia Đa Ngành", desc: "Hoàn thành khóa học ở 3 danh mục khác nhau", icon: <Target className="w-8 h-8" />, unlocked: false, color: "from-slate-300 to-slate-400" },
];

export default function Achievements() {
  return (
    <div className="space-y-8 pb-10">
      
      {/* Hero Stats Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#0B56D5] to-indigo-900 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden text-white shadow-2xl shadow-blue-900/20"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex items-center gap-6 flex-col md:flex-row">
            <div className="w-24 h-24 rounded-full border-4 border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center">
              <Trophy className="w-12 h-12 text-amber-400" />
            </div>
            <div>
              <p className="text-blue-200 font-bold tracking-widest uppercase text-sm mb-1">Cấp độ hiện tại</p>
              <h1 className="text-4xl md:text-5xl font-black mb-2">Thợ Săn Tri Thức</h1>
              <p className="text-blue-100 font-medium">Top 12% học viên xuất sắc nhất tuần này.</p>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 text-center min-w-[200px]">
            <p className="text-blue-200 font-bold mb-1">Tổng điểm XP</p>
            <p className="text-4xl font-black text-amber-400">12,450</p>
          </div>
        </div>
      </motion.div>

      {/* Badges Section */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <ShieldCheck className="w-6 h-6 text-[#0B56D5]" /> Bộ Sưu Tập Huy Hiệu
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BADGES.map((badge, idx) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1, type: "spring" }}
              className={`relative bg-white rounded-3xl p-6 border ${badge.unlocked ? 'border-amber-100 shadow-xl shadow-amber-500/10' : 'border-slate-100 opacity-70'} flex flex-col items-center text-center group overflow-hidden`}
            >
              {badge.unlocked && (
                <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-50" />
              )}
              
              <div className={`relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-white shadow-lg mb-4 transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                {badge.icon}
                {!badge.unlocked && (
                  <div className="absolute inset-0 bg-slate-800/20 rounded-2xl backdrop-blur-[1px]" />
                )}
              </div>
              
              <h3 className={`font-bold text-lg mb-2 relative z-10 ${badge.unlocked ? 'text-slate-800' : 'text-slate-500'}`}>
                {badge.title}
              </h3>
              <p className="text-sm text-slate-500 font-medium relative z-10">
                {badge.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificates (Optional) */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
          <Award className="w-6 h-6 text-[#0B56D5]" /> Chứng nhận đã cấp
        </h2>
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm text-center flex flex-col items-center justify-center h-48">
          <Award className="w-12 h-12 text-slate-300 mb-3" />
          <p className="text-slate-500 font-medium">Bạn chưa có chứng nhận nào. Hoàn thành một khóa học để nhận ngay!</p>
        </div>
      </div>

    </div>
  );
}