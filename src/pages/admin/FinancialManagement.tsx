import { 
  DollarSign, Users, Briefcase, TrendingUp, Download, 
  Server, Cpu, Megaphone, Wallet
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

// --- MOCK DATA ---
const STATS = [
  { id: 1, label: "Tổng doanh thu", value: "84,500,000 đ", subText: "Tháng này (T2/2026)", trend: "+10.1%", trendUp: true, icon: DollarSign, theme: "emerald" },
  { id: 2, label: "Doanh thu học viên", value: "65,000,000 đ", subText: "Giao dịch trực tiếp", icon: Users, theme: "blue" },
  { id: 3, label: "Phí giảng viên", value: "19,500,000 đ", subText: "Hoa hồng sàn 20-30%", icon: Briefcase, theme: "purple" },
  { id: 4, label: "Lợi nhuận ròng", value: "47,200,000 đ", subText: "Sau khi trừ Server/Ads", icon: TrendingUp, theme: "indigo" },
];

const REVENUE_DATA = [
  { name: 'T9', student: 48000, teacher: 15000 },
  { name: 'T10', student: 52000, teacher: 16500 },
  { name: 'T11', student: 61000, teacher: 18000 },
  { name: 'T12', student: 59000, teacher: 17500 },
  { name: 'T1', student: 65000, teacher: 19500 },
];

const PIE_DATA = [
  { name: 'Backend (Java/Spring)', value: 45, color: '#6366f1' }, // Indigo
  { name: 'Frontend (React/Next)', value: 25, color: '#10b981' }, // Emerald
  { name: 'AI Integration', value: 20, color: '#f59e0b' },        // Amber
  { name: 'Mobile/Database', value: 10, color: '#f43f5e' },       // Rose
];

const OPERATION_COSTS = [
  { id: 1, label: "Cloud Infrastructure", cost: "22,500k đ", percent: 60, color: "bg-blue-500", icon: Server },
  { id: 2, label: "AI API (Gemini/GPT)", cost: "10,000k đ", percent: 26.6, color: "bg-purple-500", icon: Cpu },
  { id: 3, label: "Marketing & Sale", cost: "5,000k đ", percent: 13.4, color: "bg-emerald-500", icon: Megaphone },
];

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } }
};

// --- CUSTOM TOOLTIPS ---
const CustomAreaTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 min-w-[200px]">
        <p className="text-sm font-black text-slate-700 dark:text-slate-300 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between text-xs font-semibold mb-2 last:mb-0">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color, boxShadow: `0 0 8px ${entry.color}80` }} />
              <span className="text-slate-500 dark:text-slate-400">
                {entry.dataKey === 'student' ? 'Học viên' : 'Giảng viên'}:
              </span>
            </div>
            <span className="text-slate-900 dark:text-white font-black text-sm">{entry.value.toLocaleString()}k đ</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const CustomPieTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="bg-white dark:bg-slate-900 p-3 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.color }} />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{data.name}</span>
        </div>
        <p className="text-lg font-black pl-4 text-slate-900 dark:text-white">{data.value}%</p>
      </div>
    );
  }
  return null;
};

export default function FinancialManagement() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-10"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Quản lý Tài chính
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
            Báo cáo doanh thu hệ thống cập nhật thời gian thực
          </p>
        </div>
        <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 rounded-xl">
          <Download className="w-4 h-4 mr-2" />
          <span className="font-bold">Xuất báo cáo PDF</span>
        </Button>
      </motion.div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          const colors = {
            emerald: "from-emerald-500/20 to-emerald-500/0 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/20 bg-emerald-50 dark:bg-emerald-500/10",
            blue: "from-blue-500/20 to-blue-500/0 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-500/20 bg-blue-50 dark:bg-blue-500/10",
            purple: "from-purple-500/20 to-purple-500/0 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-500/20 bg-purple-50 dark:bg-purple-500/10",
            indigo: "from-indigo-500/20 to-indigo-500/0 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-500/20 bg-indigo-50 dark:bg-indigo-500/10",
          }[stat.theme];

          return (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colors} rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity blur-2xl -z-10`}></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className={`p-3 rounded-2xl border ${colors?.split(' ')[4]} ${colors?.split(' ')[5]} shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${colors?.split(' ')[2]}`} />
                </div>
                {stat.trend && (
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-black tracking-wider ${stat.trendUp ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400'}`}>
                    {stat.trendUp ? '↗' : '↘'} {stat.trend}
                  </span>
                )}
              </div>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1 uppercase tracking-wider">{stat.label}</p>
              <h3 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">{stat.value}</h3>
              <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">{stat.subText}</p>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left: Area Chart (Phân tích tăng trưởng) */}
        <motion.div variants={itemVariants} className="xl:col-span-2 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Phân tích tăng trưởng</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">So sánh nguồn thu chính (Đơn vị: 1.000đ)</p>
            </div>
            <div className="flex items-center gap-4 mt-4 sm:mt-0 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <div className="flex items-center gap-2 px-2">
                <span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]"></span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Học viên</span>
              </div>
              <div className="flex items-center gap-2 px-2">
                <span className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]"></span>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Giảng viên</span>
              </div>
            </div>
          </div>

          <div className="w-full h-72 flex-1">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={REVENUE_DATA} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorStudent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorTeacher" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#a855f7" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" strokeOpacity={0.4} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 700 }} dy={10} />
                <YAxis hide domain={['dataMin - 10000', 'dataMax + 10000']} />
                <RechartsTooltip content={<CustomAreaTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area type="monotone" dataKey="student" stroke="#3b82f6" strokeWidth={4} fillOpacity={1} fill="url(#colorStudent)" activeDot={{ r: 6, strokeWidth: 0, fill: '#3b82f6' }} />
                <Area type="monotone" dataKey="teacher" stroke="#a855f7" strokeWidth={4} fillOpacity={1} fill="url(#colorTeacher)" activeDot={{ r: 6, strokeWidth: 0, fill: '#a855f7' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Right: Donut Chart (Tỉ trọng khóa học) */}
        <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
          <h3 className="text-xl font-black text-slate-900 dark:text-white mb-6">Tỉ trọng khóa học</h3>
          
          <div className="w-full h-56 flex justify-center items-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={PIE_DATA}
                  innerRadius={70}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {PIE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip content={<CustomPieTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            {/* Center Icon in Donut */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center border border-slate-100 dark:border-slate-700 shadow-inner">
                <Wallet className="w-7 h-7 text-slate-400" />
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-6">
            {PIE_DATA.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between group cursor-default">
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full transition-transform group-hover:scale-125" style={{ backgroundColor: item.color }} />
                  <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{item.name}</span>
                </div>
                <span className="text-sm font-black text-slate-900 dark:text-white">{item.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom: Operating Costs Progress Bars */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <h3 className="text-xl font-black text-slate-900 dark:text-white">Ước tính phí vận hành</h3>
          <div className="mt-2 sm:mt-0 bg-rose-50 dark:bg-rose-500/10 border border-rose-100 dark:border-rose-500/20 px-4 py-2 rounded-xl">
            <span className="text-xs font-bold text-rose-500 dark:text-rose-400 uppercase tracking-wider">Tổng chi: </span>
            <span className="text-sm font-black text-rose-600 dark:text-rose-400">~37.5M đ / THÁNG</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {OPERATION_COSTS.map((cost) => (
            <div key={cost.id} className="space-y-3">
              <div className="flex justify-between items-end">
                <div className="flex items-center gap-2">
                  <cost.icon className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{cost.label}</span>
                </div>
                <span className="text-sm font-black text-slate-900 dark:text-white">{cost.cost}</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${cost.percent}%` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
                  className={`h-full rounded-full ${cost.color} shadow-[0_0_10px_currentColor]`}
                  style={{ color: cost.color.replace('bg-', '') }} // Trick to pass color to shadow
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

    </motion.div>
  );
}