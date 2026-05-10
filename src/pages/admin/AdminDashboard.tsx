import {
    Users, BookOpen, DollarSign, AlertCircle,
    ArrowUpRight, ArrowDownRight, CheckCircle2,
    XCircle, MoreHorizontal, Download, BarChart3,
    Calendar, Mail, Ban, ShieldAlert, Sparkles,
    Filter, Search
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

// --- ENRICHED MOCK DATA ---
const STATS = [
    { id: 1, label: "Tổng người dùng", value: "3,842", change: "+12.5%", isUp: true, icon: Users, theme: "blue" },
    { id: 2, label: "Khóa học Active", value: "128", change: "+8.2%", isUp: true, icon: BookOpen, theme: "indigo" },
    { id: 3, label: "Doanh thu (Tháng)", value: "84.5M", change: "+15.3%", isUp: true, icon: DollarSign, theme: "emerald" },
    { id: 4, label: "Cảnh báo hệ thống", value: "2", change: "-50%", isUp: false, icon: AlertCircle, theme: "rose" },
];

const RECENT_USERS = [
    { id: 1, avatar: "U", name: "Nguyễn Văn A", email: "nguyenvana@edu.vn", role: "Học viên", status: "Active", time: "Vừa xong", courses: 3 },
    { id: 2, avatar: "I", name: "Trần Thị B", email: "tranthib@ai-lab.com", role: "Giảng viên", status: "Pending", time: "12 phút trước", courses: 0 },
    { id: 3, avatar: "U", name: "Lê Hoàng C", email: "lehoangc.dev@gmail.com", role: "Học viên", status: "Active", time: "1 giờ trước", courses: 5 },
    { id: 4, avatar: "U", name: "Phạm D", email: "phamd_bot@edu.vn", role: "Học viên", status: "Banned", time: "3 giờ trước", courses: 1 },
    { id: 5, avatar: "E", name: "Vũ Chuyên Gia", email: "dev_expert@learning.io", role: "Giảng viên", status: "Active", time: "5 giờ trước", courses: 12 },
];

const PENDING_COURSES = [
    { id: 1, title: "Java Backend Masterclass", instructor: "Trần Thị B", price: "1,299,000đ", category: "Lập trình" },
    { id: 2, title: "UI/UX Design Cơ bản", instructor: "Lê Văn E", price: "899,000đ", category: "Thiết kế" },
    { id: 3, title: "AI in Marketing", instructor: "Phạm F", price: "1,500,000đ", category: "Marketing" },
];

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.05 } }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 400, damping: 30 } }
};

export default function AdminDashboard() {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="space-y-8 pb-10"
        >
            {/* Header Section */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <div className="p-1.5 bg-blue-500/10 rounded-lg">
                            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                            Bảng điều khiển
                        </h1>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">
                        Tổng quan hiệu suất và hoạt động hệ thống hôm nay.
                    </p>
                </div>

                {/* Global Actions */}
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="hidden sm:flex bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800">
                        <Calendar className="w-4 h-4 mr-2 text-slate-500" />
                        <span className="font-semibold text-slate-700 dark:text-slate-300">30 ngày qua</span>
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 transition-all active:scale-95">
                        <Download className="w-4 h-4 mr-2" />
                        <span className="font-bold">Xuất báo cáo</span>
                    </Button>
                </div>
            </motion.div>

            {/* Stats Grid - Premium SaaS Style */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {STATS.map((stat) => {
                    const Icon = stat.icon;
                    const isUp = stat.isUp;

                    // Dynamic colors based on theme
                    const colors = {
                        blue: "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 border-blue-100 dark:border-blue-500/20",
                        indigo: "text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 border-indigo-100 dark:border-indigo-500/20",
                        emerald: "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-100 dark:border-emerald-500/20",
                        rose: "text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-100 dark:border-rose-500/20",
                    }[stat.theme];

                    return (
                        <motion.div
                            key={stat.id}
                            variants={itemVariants}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-black/50 transition-all relative overflow-hidden group"
                        >
                            {/* Background Glow */}
                            <div className={`absolute -right-10 -top-10 w-32 h-32 rounded-full blur-3xl opacity-20 dark:opacity-10 pointer-events-none transition-transform group-hover:scale-150 duration-700 ${stat.theme === 'blue' ? 'bg-blue-500' : stat.theme === 'indigo' ? 'bg-indigo-500' : stat.theme === 'emerald' ? 'bg-emerald-500' : 'bg-rose-500'}`} />

                            <div className="flex justify-between items-start mb-4 relative z-10">
                                <div className={`p-3 rounded-2xl border ${colors}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-black tracking-wide ${isUp
                                        ? 'bg-emerald-100/80 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                                        : 'bg-rose-100/80 text-rose-700 dark:bg-rose-500/10 dark:text-rose-400'
                                    }`}>
                                    {stat.change}
                                    {isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                </div>
                            </div>

                            <div className="relative z-10 mt-6">
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-1">
                                    {stat.value}
                                </h3>
                                <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                                    {stat.label}
                                </p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">

                {/* Left Column: Users Table (Takes up 2 cols on XL) */}
                <motion.div variants={itemVariants} className="xl:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
                    {/* Table Header */}
                    <div className="p-6 border-b border-slate-100 dark:border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Người dùng mới</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Học viên và giảng viên vừa đăng ký.</p>
                        </div>

                        <div className="flex items-center gap-2">
                            <div className="relative hidden md:block">
                                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    type="text"
                                    placeholder="Tìm email, tên..."
                                    className="h-9 pl-9 pr-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all w-48"
                                />
                            </div>
                            <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-slate-200 dark:border-slate-700">
                                <Filter className="w-4 h-4 text-slate-600 dark:text-slate-300" />
                            </Button>
                        </div>
                    </div>

                    {/* Table Content */}
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50 dark:bg-slate-800/20 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                                    <th className="px-6 py-4">Tài khoản</th>
                                    <th className="px-4 py-4">Vai trò</th>
                                    <th className="px-4 py-4">Trạng thái</th>
                                    <th className="px-4 py-4">Khóa học</th>
                                    <th className="px-6 py-4 text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                                {RECENT_USERS.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 font-bold border border-white dark:border-slate-600 shadow-sm">
                                                        {user.avatar}
                                                    </div>
                                                    {user.status === 'Active' && (
                                                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></span>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-900 dark:text-white text-sm">{user.name}</p>
                                                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className={`px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider ${user.role === 'Giảng viên'
                                                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400'
                                                    : 'bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-4 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' :
                                                        user.status === 'Pending' ? 'bg-amber-500' : 'bg-rose-500'
                                                    }`} />
                                                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{user.status}</span>
                                            </div>
                                        </td>
                                        <td className="px-4 py-4">
                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{user.courses}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {/* Thao tác hiển thị khi hover */}
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg">
                                                    <Mail className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg">
                                                    <Ban className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                                                    <MoreHorizontal className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-4 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-800/20 text-center mt-auto">
                        <Button variant="link" className="text-sm font-bold text-blue-600 dark:text-blue-400">
                            Xem toàn bộ danh sách →
                        </Button>
                    </div>
                </motion.div>

                {/* Right Column: Approvals & Quick Reports */}
                <div className="space-y-8">

                    {/* Pending Approvals Card */}
                    <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 relative flex flex-col h-full overflow-hidden">
                        {/* Top Warning Highlight - Đã làm mượt lại dải màu */}
                        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400"></div>

                        <div className="flex justify-between items-center mb-5 mt-2">
                            <div className="flex items-center gap-3">
                                <div className="p-2.5 bg-amber-50 dark:bg-amber-500/10 rounded-2xl text-amber-500 border border-amber-100 dark:border-amber-500/20">
                                    <ShieldAlert className="w-5 h-5" />
                                </div>
                                <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Chờ duyệt</h3>
                            </div>
                            <span className="flex items-center justify-center min-w-7 h-7 px-2 rounded-full bg-rose-50 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400 text-xs font-black border border-rose-100 dark:border-rose-500/20">
                                3
                            </span>
                        </div>

                        <div className="space-y-3 flex-1">
                            {PENDING_COURSES.map((course) => (
                                <div key={course.id} className="group relative p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 bg-white dark:bg-slate-800/20 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-all duration-300 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-500/30">

                                    {/* Indicator Line mọc ra khi hover */}
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-blue-500 rounded-r-full transition-all duration-300 group-hover:h-2/3 opacity-0 group-hover:opacity-100"></div>

                                    <div className="flex flex-col gap-3">
                                        <div>
                                            <h4 className="font-bold text-slate-900 dark:text-white text-sm line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                                {course.title}
                                            </h4>
                                            <div className="flex items-center gap-2 mt-1.5">
                                                <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10 px-2 py-0.5 rounded-md">
                                                    {course.category}
                                                </span>
                                                <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                                    • {course.instructor}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action Buttons - Nâng cấp lên Soft UI */}
                                        <div className="flex items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-700/50 mt-1">
                                            <motion.button
                                                whileTap={{ scale: 0.96 }}
                                                className="flex-1 bg-blue-50 dark:bg-blue-500/10 hover:bg-blue-600 dark:hover:bg-blue-500 text-blue-700 dark:text-blue-400 hover:text-white h-9 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                                            >
                                                <CheckCircle2 className="w-4 h-4" /> Duyệt khóa học
                                            </motion.button>
                                            <motion.button
                                                whileTap={{ scale: 0.96 }}
                                                className="flex-none w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-500/10 dark:hover:text-rose-400 transition-all flex items-center justify-center"
                                            >
                                                <XCircle className="w-4 h-4" />
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Button variant="ghost" className="w-full mt-4 text-sm font-bold text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 rounded-xl h-11 transition-colors">
                            Xem toàn bộ yêu cầu
                        </Button>
                    </motion.div>

                    {/* Premium Report Card */}
                    <motion.div variants={itemVariants} className="rounded-3xl p-8 bg-slate-900 dark:bg-slate-800 text-white shadow-2xl relative overflow-hidden group">
                        {/* Animated gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-slate-900 dark:to-slate-800 opacity-50 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Glass decoration */}
                        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-500/30 rounded-full blur-3xl"></div>
                        <div className="absolute top-10 -left-10 w-32 h-32 bg-purple-500/30 rounded-full blur-3xl"></div>

                        <div className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-2xl flex items-center justify-center mb-6 border border-white/20 shadow-inner">
                                    <BarChart3 className="w-6 h-6 text-blue-300" />
                                </div>
                                <h3 className="text-2xl font-black mb-2 text-white">Báo cáo tự động</h3>
                                <p className="text-slate-300 text-sm font-medium leading-relaxed mb-8">
                                    Hệ thống AI đã tổng hợp xong báo cáo tăng trưởng và dòng tiền của tháng này.
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-white text-slate-900 hover:bg-blue-50 h-12 rounded-xl text-sm font-black shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all flex items-center justify-center gap-2"
                            >
                                <Download className="w-4 h-4" /> Tải File PDF
                            </motion.button>
                        </div>
                    </motion.div>

                </div>
            </div>
        </motion.div>
    );
}