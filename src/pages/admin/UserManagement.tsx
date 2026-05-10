import { 
  Users, GraduationCap, UserMinus, UserX, 
  Search, Filter, Download, Mail, MoreVertical, 
  ShieldCheck, Ban, Plus, MessageSquare, TrendingUp
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

// --- MOCK DATA ---
const STATS = [
  { id: 1, label: "Giảng viên", value: "365", subText: "110 đang giảng dạy", progress: 30, icon: GraduationCap, theme: "emerald" },
  { id: 2, label: "Học viên Active", value: "8,500", subText: "+15% so với tháng trước", progress: 85, icon: Users, theme: "blue" },
  { id: 3, label: "Học viên bỏ học", value: "1,250", subText: "Tỷ lệ bỏ học: 12.8%", progress: 12, icon: UserMinus, theme: "rose" },
  { id: 4, label: "GV ngừng hoạt động", value: "55", subText: "Vượt ngưỡng 15%", progress: 15, icon: UserX, theme: "amber" },
];

const USERS_LIST = [
  { id: 1, avatar: "N", name: "Trần Hoàng Nam", email: "nam.th@gmail.com", role: "Học viên", status: "Đang học", courses: 12 },
  { id: 2, avatar: "M", name: "TS. Lê Quang Minh", email: "minh.lq@university.edu", role: "Giảng viên", status: "Hoạt động", courses: 8 },
  { id: 3, avatar: "L", name: "Phạm Mỹ Linh", email: "linh.pham@outlook.com", role: "Học viên", status: "Bỏ học", courses: 1 },
  { id: 4, avatar: "H", name: "Nguyễn Văn Hùng", email: "hung.nv@instructor.vn", role: "Giảng viên", status: "Ngừng dùng", courses: 4 },
  { id: 5, avatar: "A", name: "Lê Thị An", email: "an.lethi@gmail.com", role: "Học viên", status: "Đang học", courses: 5 },
];

const FEEDBACK_DATA = [
  { month: 'T10', value: 60 },
  { month: 'T11', value: 75 },
  { month: 'T12', value: 85 },
  { month: 'T1', value: 92 },
  { month: 'T2', value: 100 },
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

export default function UserManagement() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-10"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Quản lý Người dùng
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
            Theo dõi, phân tích và quản lý toàn bộ học viên & giảng viên trên hệ thống.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
            <Download className="w-4 h-4 mr-2 text-slate-600 dark:text-slate-300" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">Xuất CSV</span>
          </Button>
        </div>
      </motion.div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {STATS.map((stat) => {
          const Icon = stat.icon;
          const colors = {
            emerald: { text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", bar: "bg-emerald-500" },
            blue: { text: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10", bar: "bg-blue-500" },
            rose: { text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10", bar: "bg-rose-500" },
            amber: { text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", bar: "bg-amber-500" },
          }[stat.theme];

          return (
            <motion.div
              key={stat.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all group relative overflow-hidden"
            >
              <div className="flex justify-between items-start mb-4">
                <div className={`p-3 rounded-2xl ${colors?.bg}`}>
                  <Icon className={`w-6 h-6 ${colors?.text}`} />
                </div>
                <h3 className="text-3xl font-black text-slate-900 dark:text-white">{stat.value}</h3>
              </div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">{stat.label}</p>
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.subText}</span>
              </div>
              {/* Custom Progress Bar */}
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${stat.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className={`h-full rounded-full ${colors?.bar}`}
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Donut Chart: Phân tích trạng thái */}
        <motion.div variants={itemVariants} className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Phân tích trạng thái người dùng</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Dữ liệu phân bổ được cập nhật theo thời gian thực.</p>
            </div>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 text-xs font-bold rounded-full">Học viên</span>
              <span className="px-3 py-1 bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300 text-xs font-bold rounded-full">Giảng viên</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-10 lg:gap-20 flex-1">
            {/* Custom SVG Donut Chart */}
            <div className="relative w-48 h-48">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90 drop-shadow-xl">
                {/* Background Ring */}
                <path className="text-slate-100 dark:text-slate-800" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                {/* Blue Ring (Active) */}
                <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "70, 100" }} transition={{ duration: 1.5, ease: "easeOut" }} className="text-blue-500" strokeWidth="4" strokeDasharray="70, 100" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                {/* Rose Ring (Dropped) */}
                <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "15, 100" }} transition={{ duration: 1.5, delay: 0.5 }} className="text-rose-500" strokeWidth="4" strokeDasharray="15, 100" strokeDashoffset="-70" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                {/* Emerald Ring (Active Ins) */}
                <motion.path initial={{ strokeDasharray: "0, 100" }} animate={{ strokeDasharray: "10, 100" }} transition={{ duration: 1.5, delay: 1 }} className="text-emerald-400" strokeWidth="4" strokeDasharray="10, 100" strokeDashoffset="-85" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-black text-slate-900 dark:text-white">10.1k</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Tổng số</span>
              </div>
            </div>

            {/* Legend */}
            <div className="space-y-4 w-full max-w-[200px]">
              <div className="flex justify-between items-center group cursor-pointer">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] group-hover:scale-125 transition-transform" /> <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Đang theo học</span></div>
                <span className="font-black text-slate-900 dark:text-white">8,500</span>
              </div>
              <div className="flex justify-between items-center group cursor-pointer">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)] group-hover:scale-125 transition-transform" /> <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Đã bỏ học</span></div>
                <span className="font-black text-slate-900 dark:text-white">1,250</span>
              </div>
              <div className="flex justify-between items-center group cursor-pointer">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.5)] group-hover:scale-125 transition-transform" /> <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Đang hoạt động</span></div>
                <span className="font-black text-slate-900 dark:text-white">310</span>
              </div>
              <div className="flex justify-between items-center group cursor-pointer">
                <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.5)] group-hover:scale-125 transition-transform" /> <span className="text-sm font-semibold text-slate-600 dark:text-slate-300">Không sử dụng</span></div>
                <span className="font-black text-slate-900 dark:text-white">55</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Feedback & Satisfaction */}
        <div className="space-y-6 lg:col-span-1 h-full flex flex-col">
          {/* Feedback Bar Chart Card */}
          <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex-1 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">Feedback</h3>
              <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-xl text-blue-600 dark:text-blue-400">
                <MessageSquare className="w-4 h-4" />
              </div>
            </div>
            
            {/* Custom CSS Bar Chart */}
            <div className="flex-1 flex items-end justify-between gap-2 pt-4">
              {FEEDBACK_DATA.map((item, index) => (
                <div key={index} className="flex flex-col items-center gap-2 w-full group">
                  <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-md relative flex items-end justify-center h-32">
                    <motion.div 
                      initial={{ height: 0 }}
                      animate={{ height: `${item.value}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      className="w-full bg-indigo-400 dark:bg-indigo-500 rounded-t-md group-hover:bg-indigo-600 dark:group-hover:bg-indigo-400 transition-colors"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-slate-500">{item.month}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Satisfaction Premium Card */}
          <motion.div variants={itemVariants} className="rounded-3xl p-6 bg-gradient-to-br from-indigo-600 to-violet-800 text-white shadow-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:scale-110 transition-transform duration-500">
              <TrendingUp className="w-24 h-24" />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-indigo-100 mb-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-sm font-bold uppercase tracking-widest">Chỉ số hài lòng</span>
              </div>
              <h3 className="text-4xl font-black mb-1">4.9 <span className="text-2xl text-indigo-200">/ 5.0</span></h3>
              <div className="inline-block px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold mt-2">
                Tăng 0.2 điểm so với tháng trước
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* User Table Section */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Danh sách chi tiết</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-1">Quản lý học viên và giảng viên toàn hệ thống.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Tìm tên, email, ID..." 
                className="w-full h-10 pl-9 pr-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>
            <Button variant="outline" size="icon" className="h-10 w-10 rounded-xl border-slate-200 dark:border-slate-700">
              <Filter className="w-4 h-4 text-slate-600 dark:text-slate-300" />
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/20 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                <th className="px-6 py-5 pl-8">Người dùng</th>
                <th className="px-6 py-5">Vai trò</th>
                <th className="px-6 py-5">Trạng thái</th>
                <th className="px-6 py-5">Khóa học</th>
                <th className="px-6 py-5 text-right pr-8">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
              {USERS_LIST.map((user) => {
                // Determine styling based on status
                const statusStyles = {
                  'Đang học': 'bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-500/10 dark:text-blue-400',
                  'Hoạt động': 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400',
                  'Bỏ học': 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400',
                  'Ngừng dùng': 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400',
                }[user.status];

                const statusDot = {
                  'Đang học': 'bg-blue-500',
                  'Hoạt động': 'bg-emerald-500',
                  'Bỏ học': 'bg-rose-500',
                  'Ngừng dùng': 'bg-amber-500',
                }[user.status];

                return (
                  <tr key={user.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group">
                    <td className="px-6 py-4 pl-8">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg border shadow-sm ${
                          user.role === 'Giảng viên' 
                            ? 'bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-900/50 dark:to-purple-900/50 border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300' 
                            : 'bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200'
                        }`}>
                          {user.avatar}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 dark:text-white">{user.name}</p>
                          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider ${
                        user.role === 'Giảng viên' 
                          ? 'bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400' 
                          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-bold ${statusStyles}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
                        {user.status}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-black text-slate-700 dark:text-slate-300">{user.courses} <span className="font-semibold text-slate-400 text-xs ml-1">K.Học</span></span>
                    </td>
                    <td className="px-6 py-4 pr-8 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-xl">
                          <Mail className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl">
                          <Ban className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-800/20 text-center">
          <Button variant="link" className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700">
            Xem thêm người dùng (12/8.500) →
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}