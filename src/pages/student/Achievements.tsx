import { motion } from "framer-motion";
import { Trophy, Star, Target, Zap, ShieldCheck, Flame, Award, Clock, Calendar, CheckCircle2, BarChart3, PieChart } from "lucide-react";
import { useState } from "react";

// Dữ liệu mock cho biểu đồ và thống kê
const STATS = [
  { label: "Tổng giờ học", value: "128.5h", icon: <Clock className="w-5 h-5 text-blue-500" />, bg: "bg-blue-50" },
  { label: "Chuỗi ngày", value: "12 ngày", icon: <Flame className="w-5 h-5 text-orange-500" />, bg: "bg-orange-50" },
  { label: "Hoàn thành", value: "84 bài", icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, bg: "bg-emerald-50" },
  { label: "Huy hiệu", value: "15", icon: <Star className="w-5 h-5 text-purple-500" />, bg: "bg-purple-50" },
];

const WEEKLY_DATA = [
  { day: "T2", hours: 2.5, percent: 40 },
  { day: "T3", hours: 4.0, percent: 65 },
  { day: "T4", hours: 5.5, percent: 90 },
  { day: "T5", hours: 3.5, percent: 55 },
  { day: "T6", hours: 6.2, percent: 100 },
  { day: "T7", hours: 1.5, percent: 30 },
  { day: "CN", hours: 4.8, percent: 80 },
];

const BADGES = [
  { id: 1, title: "Học Bá Thức Khuya", desc: "Học sau 12h đêm trong 3 ngày", icon: <Star className="w-8 h-8" />, unlocked: true, color: "from-amber-400 to-orange-500" },
  { id: 2, title: "Tốc Độ Ánh Sáng", desc: "Hoàn thành 1 khóa dưới 24h", icon: <Zap className="w-8 h-8" />, unlocked: true, color: "from-blue-400 to-indigo-500" },
  { id: 3, title: "Chuỗi 30 Ngày", desc: "Đăng nhập học 30 ngày liên tiếp", icon: <Flame className="w-8 h-8" />, unlocked: false, color: "from-slate-300 to-slate-400" },
  { id: 4, title: "Chuyên Gia Đa Ngành", desc: "Hoàn thành ở 3 danh mục", icon: <Target className="w-8 h-8" />, unlocked: false, color: "from-slate-300 to-slate-400" },
];

export default function Achievements() {
  const [chartMode, setChartMode] = useState<"hours" | "percent">("hours");
  return (
    <div className="space-y-8 pb-10">

      {/* 1. Hero Stats Card (Của ông - Giữ nguyên vì quá đẹp) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-[#0B56D5] to-indigo-900 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden text-white shadow-2xl shadow-blue-900/20"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          <div className="flex items-center gap-6 flex-col md:flex-row">
            <div className="w-24 h-24 rounded-full border-4 border-white/20 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-inner">
              <Trophy className="w-12 h-12 text-amber-400 drop-shadow-md" />
            </div>
            <div>
              <p className="text-blue-200 font-bold tracking-widest uppercase text-sm mb-1">Cấp độ hiện tại</p>
              <h1 className="text-4xl md:text-5xl font-black mb-2 drop-shadow-md">Thợ Săn Tri Thức</h1>
              <p className="text-blue-100 font-medium">Top 12% học viên xuất sắc nhất tuần này.</p>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 text-center min-w-[200px]">
            <p className="text-blue-200 font-bold mb-1">Tổng điểm XP</p>
            <p className="text-4xl font-black text-amber-400 drop-shadow-md">12,450</p>
          </div>
        </div>
      </motion.div>

      {/* 2. Thống kê nhanh (Thêm mới từ Demo) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STATS.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-xl font-black text-slate-800">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 3. Khu vực Biểu đồ (Thêm mới từ Demo) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Biểu đồ Cột - Giờ học theo ngày */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col"
        >
          {/* Header & Toggle Switch */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-[#0B56D5]" /> Giờ học theo tuần
            </h3>

            {/* Toggle Button chuẩn Shadcn/Tailwind */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl self-start sm:self-auto">
              <button
                onClick={() => setChartMode("hours")}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${chartMode === "hours" ? "bg-white text-[#0B56D5] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                Giờ thực tế
              </button>
              <button
                onClick={() => setChartMode("percent")}
                className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all duration-200 ${chartMode === "percent" ? "bg-white text-[#0B56D5] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
              >
                % Mục tiêu
              </button>
            </div>
          </div>

          {/* Vùng vẽ biểu đồ - Thêm pt-8 để có khoảng trống cho text ở trên cùng không bị lẹm */}
          <div className="flex-1 h-56 flex items-end justify-between gap-2 sm:gap-4 mt-auto border-b border-slate-100 pb-2 pt-8">
            {WEEKLY_DATA.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center justify-end flex-1 h-full gap-2 group">

                {/* Vùng chứa cột */}
                <div className="relative w-full max-w-[48px] flex flex-col justify-end h-full">

                  {/* Số liệu LUÔN HIỂN THỊ ở trên đỉnh cột (có animation khi đổi mode) */}
                  <motion.div
                    key={chartMode} // Thêm key để Framer Motion chạy lại hiệu ứng khi thay đổi
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`absolute -top-7 left-1/2 -translate-x-1/2 text-xs font-bold whitespace-nowrap transition-colors ${item.percent === 100 ? 'text-[#0B56D5]' : 'text-slate-600'}`}
                  >
                    {chartMode === "hours" ? `${item.hours}h` : `${item.percent}%`}
                  </motion.div>

                  {/* Cột Framer Motion */}
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${item.percent}%` }}
                    transition={{ duration: 0.8, delay: idx * 0.1, type: "spring", bounce: 0.3 }}
                    className={`w-full rounded-t-md transition-colors duration-300 relative overflow-hidden ${item.percent === 100 ? 'bg-[#0B56D5]' : 'bg-indigo-100 group-hover:bg-indigo-300'}`}
                  >
                    {/* Hiệu ứng gradient mờ */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.div>
                </div>

                {/* Nhãn trục X */}
                <span className={`text-sm font-bold transition-colors ${item.percent === 100 ? 'text-[#0B56D5]' : 'text-slate-400 group-hover:text-slate-700'}`}>
                  {item.day}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Biểu đồ Donut - Phân bổ nỗ lực */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex flex-col items-center"
        >
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2 w-full mb-8">
            <PieChart className="w-5 h-5 text-orange-500" /> Phân bổ nỗ lực
          </h3>

          {/* Vẽ Donut chart bằng pure CSS (conic-gradient) */}
          <div className="relative w-40 h-40 rounded-full flex items-center justify-center mb-6"
            style={{ background: "conic-gradient(#6366f1 0% 45%, #f59e0b 45% 75%, #10b981 75% 100%)" }}>
            <div className="w-28 h-28 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
              <span className="text-2xl font-black text-slate-800">85%</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase">Tập trung</span>
            </div>
          </div>

          <div className="w-full space-y-3">
            <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-indigo-500" /> Video</div>
              <span>45%</span>
            </div>
            <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-amber-500" /> Bài tập</div>
              <span>30%</span>
            </div>
            <div className="flex items-center justify-between text-sm font-semibold text-slate-600">
              <div className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-emerald-500" /> Dự án</div>
              <span>25%</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4. Badges Section (Của ông - Giữ nguyên) */}
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
              className={`relative bg-white rounded-3xl p-6 border ${badge.unlocked ? 'border-amber-100 shadow-xl shadow-amber-500/10' : 'border-slate-100 opacity-70 grayscale-[50%]'} flex flex-col items-center text-center group overflow-hidden`}
            >
              {badge.unlocked && <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-transparent opacity-50" />}
              <div className={`relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br ${badge.color} flex items-center justify-center text-white shadow-lg mb-4 transform transition-transform group-hover:scale-110 group-hover:rotate-3`}>
                {badge.icon}
                {!badge.unlocked && <div className="absolute inset-0 bg-slate-800/20 rounded-2xl backdrop-blur-[1px]" />}
              </div>
              <h3 className={`font-bold text-lg mb-2 relative z-10 ${badge.unlocked ? 'text-slate-800' : 'text-slate-500'}`}>{badge.title}</h3>
              <p className="text-sm text-slate-500 font-medium relative z-10">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 5. Certificates (Của ông - Giữ nguyên) */}
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