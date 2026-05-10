import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { 
  Users, UserCheck, UserMinus, 
  Search, Filter, Star, ArrowUpRight, TrendingUp, TrendingDown 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from "recharts";

// --- MOCK DATA ---
const STATS = [
  { title: "Tổng đăng ký", value: "1.830", trend: "+12.5%", isPositive: true, icon: Users, iconBg: "bg-indigo-50", iconColor: "text-indigo-600" },
  { title: "Đã hoàn thành", value: "1.400", trend: "+8.2%", isPositive: true, icon: UserCheck, iconBg: "bg-emerald-50", iconColor: "text-emerald-600" },
  { title: "Bỏ giữa chừng", value: "100", trend: "-1.5%", isPositive: false, icon: UserMinus, iconBg: "bg-rose-50", iconColor: "text-rose-600" }
];

// Data: 6 tháng
const GROWTH_DATA_6M = [
  { month: "Tháng 1", current: 400, previous: 250 },
  { month: "Tháng 2", current: 600, previous: 350 },
  { month: "Tháng 3", current: 1000, previous: 500 },
  { month: "Tháng 4", current: 1200, previous: 800 },
  { month: "Tháng 5", current: 1500, previous: 1100 },
  { month: "Tháng 6", current: 1830, previous: 1400 },
];

// Data: Cả năm (Giả lập số liệu khác để thấy sự thay đổi khi filter)
const GROWTH_DATA_YEAR = [
  { month: "Q1", current: 2000, previous: 1100 },
  { month: "Q2", current: 4530, previous: 3200 },
  { month: "Q3", current: 6200, previous: 4500 },
  { month: "Q4", current: 8900, previous: 6100 },
];

const COMPLETION_DATA = [
  { name: "Hoàn thành", value: 1400, color: "#4f46e5" }, 
  { name: "Đang học", value: 330, color: "#93c5fd" },   
  { name: "Bỏ giữa chừng", value: 100, color: "#f1f5f9" } 
];

const FEEDBACKS = [
  { id: 1, student: "Học viên IT", initials: "IT", course: "Mastering LLMs", rating: 5, comment: "Kiến thức thực tế, bài tập về RAG rất hay.", time: "2 GIỜ TRƯỚC", bgColor: "bg-slate-800" },
  { id: 2, student: "Học viên AI", initials: "AI", course: "AI in Marketing", rating: 4, comment: "Nội dung tốt nhưng tốc độ giảng hơi nhanh.", time: "5 GIỜ TRƯỚC", bgColor: "bg-blue-600" },
  { id: 3, student: "Học viên UI/UX", initials: "UX", course: "UX Research", rating: 5, comment: "Giảng viên hỗ trợ cực kỳ nhiệt tình qua Discord.", time: "1 NGÀY TRƯỚC", bgColor: "bg-emerald-600" }
];

const containerVariants: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants: Variants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

// Tooltip Custom
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xl z-50">
        <p className="font-bold text-slate-800 mb-3">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between gap-6 text-sm mb-2 last:mb-0">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
              <span className="text-slate-500 font-medium">
                {entry.dataKey === 'current' ? 'Năm nay' : 'Năm ngoái'}
              </span>
            </div>
            <span className="text-slate-900 font-black">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function InstructorStudentsContent() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // THÊM STATE ĐỂ QUẢN LÝ FILTER CHART
  const [chartFilter, setChartFilter] = useState<"6m" | "year">("6m");

  // Dữ liệu sẽ được nạp vào chart tùy theo bộ lọc
  const activeChartData = chartFilter === "6m" ? GROWTH_DATA_6M : GROWTH_DATA_YEAR;

  return (
    <div className="w-full bg-slate-50/50 p-6 md:p-8 font-sans min-h-screen">
      <motion.div 
        className="w-full space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        
        {/* ================= 1. STATS ROW ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div key={idx} variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <p className="text-sm font-semibold text-slate-500 mb-2">{stat.title}</p>
                    <h3 className="text-4xl font-black text-slate-800 tracking-tight">{stat.value}</h3>
                  </div>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.iconBg} ${stat.iconColor}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className={`font-bold border-transparent px-2 py-0.5 rounded-md ${
                    stat.isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                  }`}>
                    {stat.isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {stat.trend}
                  </Badge>
                  <span className="text-[13px] font-medium text-slate-400">so với tháng trước</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= 2. CHARTS ROW ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
          
          <motion.div variants={itemVariants} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm lg:col-span-2 flex flex-col h-[450px]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-black text-slate-800">Tăng trưởng học viên</h3>
                <p className="text-sm font-medium text-slate-500 mt-1">Phân tích số lượng đăng ký theo tháng</p>
              </div>
              
              {/* ĐÃ CẮM ĐIỆN CHO 2 NÚT NÀY */}
              <div className="flex gap-2 bg-slate-100 p-1 rounded-xl">
                <button 
                  onClick={() => setChartFilter("6m")}
                  className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${
                    chartFilter === "6m" 
                      ? "bg-white text-[#0B56D5] shadow-sm" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  6 tháng
                </button>
                <button 
                  onClick={() => setChartFilter("year")}
                  className={`px-4 py-1.5 text-sm font-bold rounded-lg transition-all ${
                    chartFilter === "year" 
                      ? "bg-white text-[#0B56D5] shadow-sm" 
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  Năm nay
                </button>
              </div>
            </div>

            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                {/* TRUYỀN activeChartData VÀO ĐÂY */}
                <AreaChart data={activeChartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  
                  <XAxis 
                    dataKey="month" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                    dx={-10}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                  
                  <Area 
                    type="monotone" 
                    dataKey="previous" 
                    stroke="#10b981" 
                    strokeWidth={2} 
                    strokeDasharray="6 6" 
                    fill="none" 
                    activeDot={false}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="current" 
                    stroke="#2563eb" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorCurrent)" 
                    activeDot={{ r: 6, strokeWidth: 4, stroke: '#fff', fill: '#2563eb' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* PIE CHART VÀ TABLE DƯỚI NÀY GIỮ NGUYÊN NHƯ CŨ */}
          <motion.div variants={itemVariants} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col h-[450px]">
             {/* ... (Phần Donut chart không đổi) ... */}
            <div className="w-full text-left mb-2">
              <h3 className="text-lg font-black text-slate-800">Tỷ lệ hoàn thành</h3>
              <p className="text-sm font-medium text-slate-500 mt-1">Dựa trên 1.830 học viên</p>
            </div>

            <div className="flex-1 w-full relative min-h-0 flex items-center justify-center -mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={COMPLETION_DATA} cx="50%" cy="50%" innerRadius="65%" outerRadius="85%" paddingAngle={3} dataKey="value" stroke="none" cornerRadius={8}>
                    {COMPLETION_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${Number(value)} học viên`]} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-3xl font-black text-slate-800 tracking-tighter">92.5%</span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Retention</span>
              </div>
            </div>

            <div className="w-full space-y-3 mt-auto pt-4">
              {COMPLETION_DATA.filter(d => d.name !== "Bỏ giữa chừng").map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50/50">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wide">{item.name}</span>
                  </div>
                  <span className="text-sm font-black text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ================= 3. FEEDBACK TABLE ================= */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden w-full">
           {/* ... (Phần Bảng giữ nguyên như cũ) ... */}
          <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white relative z-10">
            <div>
              <h3 className="text-lg font-black text-slate-800 mb-1">Phản hồi gần đây</h3>
              <p className="text-sm font-medium text-slate-500">Lắng nghe ý kiến từ cộng đồng học viên</p>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Tìm tên học viên..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full h-10 pl-10 pr-4 bg-slate-50 border border-slate-200 rounded-lg text-sm font-semibold outline-none focus:border-[#0B56D5] focus:bg-white transition-all"
                />
              </div>
              <Button variant="outline" size="icon" className="h-10 w-10 rounded-lg border-slate-200 text-slate-500 hover:text-[#0B56D5]">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-wider">
                  <th className="px-6 md:px-8 py-4 w-1/4">Thông tin học viên</th>
                  <th className="px-6 md:px-8 py-4 w-1/4">Khóa học</th>
                  <th className="px-6 md:px-8 py-4 w-1/6">Xếp hạng</th>
                  <th className="px-6 md:px-8 py-4 w-auto">Nội dung nhận xét</th>
                  <th className="px-6 md:px-8 py-4 w-16 text-center"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {FEEDBACKS.filter(f => f.student.toLowerCase().includes(searchTerm.toLowerCase())).map((fb) => (
                  <tr key={fb.id} className="group hover:bg-slate-50/80 transition-colors cursor-pointer">
                    <td className="px-6 md:px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-sm ${fb.bgColor}`}>
                          {fb.initials}
                        </div>
                        <span className="font-bold text-slate-800">{fb.student}</span>
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-5">
                      <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold border-transparent rounded-md">
                        {fb.course}
                      </Badge>
                    </td>
                    <td className="px-6 md:px-8 py-5">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < fb.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-5 pr-4">
                      <p className="text-sm font-semibold text-slate-700 line-clamp-1 group-hover:text-slate-900 transition-colors">"{fb.comment}"</p>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1.5">{fb.time}</p>
                    </td>
                    <td className="px-6 md:px-8 py-5 text-right">
                      <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-[#0B56D5] hover:bg-blue-50">
                        <ArrowUpRight className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}