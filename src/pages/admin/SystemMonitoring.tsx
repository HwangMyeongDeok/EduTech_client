import { 
  Cpu, HardDrive, Globe, Activity, AlertCircle, 
  CheckCircle2, Clock, ServerCrash, AlertTriangle, Download
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer 
} from 'recharts';

// --- MOCK DATA ---
const SYSTEM_STATS = [
  { id: 1, label: "CPU USAGE", value: "42%", status: "Normal", statusColor: "emerald", icon: Cpu },
  { id: 2, label: "RAM USAGE", value: "8.4GB / 16GB", status: "Stable", statusColor: "blue", icon: HardDrive },
  { id: 3, label: "ACTIVE SESSIONS", value: "1,240", status: "+12%", statusColor: "purple", icon: Globe },
];

const PERFORMANCE_DATA = [
  { time: '12:00', cpu: 30, ram: 45 },
  { time: '12:30', cpu: 45, ram: 50 },
  { time: '13:00', cpu: 52, ram: 55 },
  { time: '13:30', cpu: 68, ram: 65 },
  { time: '14:00', cpu: 74, ram: 70 },
  { time: '14:30', cpu: 60, ram: 68 },
  { time: '15:00', cpu: 48, ram: 55 },
  { time: '15:30', cpu: 40, ram: 50 },
  { time: '16:00', cpu: 38, ram: 48 },
];

const SYSTEM_LOGS = [
  { id: 1, type: "error", message: "Database connection timeout in pool #4", time: "2 phút trước", icon: ServerCrash },
  { id: 2, type: "warning", message: "High memory usage in Video Streaming service", time: "15 phút trước", icon: AlertTriangle },
  { id: 3, type: "success", message: "Auto-backup completed for cluster-01", time: "1 giờ trước", icon: CheckCircle2 },
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

// --- CUSTOM TOOLTIP ---
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-slate-700 min-w-[180px]">
        <div className="flex items-center gap-2 mb-3 border-b border-slate-700/50 pb-2">
          <Clock className="w-4 h-4 text-slate-400" />
          <p className="text-sm font-black text-slate-200">{label}</p>
        </div>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center justify-between text-xs font-semibold mb-2 last:mb-0">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color, boxShadow: `0 0 10px ${entry.color}` }} />
              <span className="text-slate-400 uppercase tracking-wider">
                {entry.dataKey}:
              </span>
            </div>
            <span className="text-white font-black text-sm">{entry.value}%</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export default function SystemMonitoring() {
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
          <div className="flex items-center gap-3">
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Báo cáo hệ thống
            </h1>
            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live
            </span>
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
            Giám sát tài nguyên và hiệu năng server real-time.
          </p>
        </div>
        <Button variant="outline" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800">
          <Download className="w-4 h-4 mr-2" />
          <span className="font-semibold text-slate-700 dark:text-slate-300">Tải Log (.txt)</span>
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {SYSTEM_STATS.map((stat) => {
          const Icon = stat.icon;
          const isWarning = parseInt(stat.value) > 80; // Fake logic to trigger red state

          return (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-inner group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                </div>
                <div className={`px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 ${
                  stat.statusColor === 'emerald' ? 'bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20' :
                  stat.statusColor === 'blue' ? 'bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20' :
                  'bg-purple-50 text-purple-600 border border-purple-100 dark:bg-purple-500/10 dark:text-purple-400 dark:border-purple-500/20'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${isWarning ? 'bg-rose-500 animate-pulse' : 'bg-current opacity-70'}`}></span>
                  {stat.status}
                </div>
              </div>
              <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 mb-1 uppercase tracking-widest">{stat.label}</p>
              <h3 className={`text-3xl font-black tracking-tight ${isWarning ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'}`}>
                {stat.value}
              </h3>
            </motion.div>
          );
        })}
      </div>

      {/* Main Chart */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-indigo-500" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Hiệu năng hệ thống</h3>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Dữ liệu đo lường theo chu kỳ 30 phút trong 24 giờ qua.</p>
          </div>
          <div className="flex items-center gap-4 mt-4 sm:mt-0 bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-100 dark:border-slate-700/50">
            <div className="flex items-center gap-2 px-2">
              <span className="w-3 h-3 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.4)]"></span>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">CPU</span>
            </div>
            <div className="flex items-center gap-2 px-2">
              <span className="w-3 h-3 rounded-full bg-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.4)]"></span>
              <span className="text-xs font-bold text-slate-600 dark:text-slate-300">RAM</span>
            </div>
          </div>
        </div>

        <div className="w-full h-80 relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={PERFORMANCE_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorRam" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" strokeOpacity={0.4} />
              <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 700 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b', fontWeight: 700 }} dx={-10} domain={[0, 100]} />
              <RechartsTooltip content={<CustomTooltip />} cursor={{ stroke: '#64748b', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <Area type="monotone" dataKey="ram" stroke="#38bdf8" strokeWidth={3} fillOpacity={1} fill="url(#colorRam)" activeDot={{ r: 6, strokeWidth: 0, fill: '#38bdf8' }} />
              <Area type="monotone" dataKey="cpu" stroke="#6366f1" strokeWidth={4} fillOpacity={1} fill="url(#colorCpu)" activeDot={{ r: 6, strokeWidth: 0, fill: '#6366f1' }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* System Logs */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/20">
          <div className="flex items-center gap-3">
            <Activity className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">System Logs</h3>
          </div>
          <span className="px-3 py-1 bg-rose-100 dark:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-[11px] font-black uppercase tracking-wider rounded-lg border border-rose-200 dark:border-rose-500/20 animate-pulse">
            3 Cảnh báo mới
          </span>
        </div>

        <div className="p-2 md:p-4">
          <div className="space-y-1">
            {SYSTEM_LOGS.map((log) => {
              const styles = {
                error: "text-rose-600 bg-rose-50 border-rose-100 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/20",
                warning: "text-amber-600 bg-amber-50 border-amber-100 dark:text-amber-400 dark:bg-amber-500/10 dark:border-amber-500/20",
                success: "text-emerald-600 bg-emerald-50 border-emerald-100 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20",
              }[log.type];

              return (
                <div key={log.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-default">
                  <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl border shadow-sm ${styles}`}>
                      <log.icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-bold text-sm text-slate-800 dark:text-slate-200 group-hover:text-black dark:group-hover:text-white transition-colors">
                        {log.message}
                      </p>
                      <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mt-0.5 md:hidden">
                        {log.time}
                      </p>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                      {log.time}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}