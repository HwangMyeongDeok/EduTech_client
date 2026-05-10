import {
    BookOpen, CheckCircle, Clock, XCircle,
    Search, Filter, Plus, MoreVertical,
    Star, TrendingUp, Medal, Flame, Download, Eye, Edit
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
// --- MOCK DATA ---
const STATS = [
    { id: 1, label: "Tổng khóa học", value: "1,248", subText: "32 khóa học mới tháng này", icon: BookOpen, theme: "blue" },
    { id: 2, label: "Đã phê duyệt", value: "1,120", subText: "Tỷ lệ: 89.7%", icon: CheckCircle, theme: "emerald" },
    { id: 3, label: "Đang chờ duyệt", value: "42", subText: "Cần xử lý gấp", icon: Clock, theme: "amber" },
    { id: 4, label: "Đã từ chối", value: "86", subText: "Vi phạm chính sách", icon: XCircle, theme: "rose" },
];

const TOP_RATED = [
    { id: 1, title: "React cho người mới bắt đầu", author: "Sơn Đặng", rating: 4.9, reviews: "2.1k" },
    { id: 2, title: "UI/UX Pro Max 2026", author: "Trần Minh Cường", rating: 4.8, reviews: "1.5k" },
    { id: 3, title: "Mastering Python & AI", author: "Lê Quang", rating: 4.8, reviews: "980" },
];

const BEST_SELLERS = [
    { id: 1, title: "Lập trình Node.js thực chiến", author: "Hoàng Nguyễn", sales: "2.4k", trend: "+12%" },
    { id: 2, title: "Kỹ năng giao tiếp công sở", author: "Lê Mỹ Linh", sales: "1.8k", trend: "+8%" },
    { id: 3, title: "English for IT Professionals", author: "David Tran", sales: "1.5k", trend: "+15%" },
];

const COURSES_LIST = [
    { id: 1, title: "Next.js 14 Masterclass", author: "Vũ Hải Đăng", category: "Lập trình", status: "Chờ duyệt", date: "2 giờ trước" },
    { id: 2, title: "Java Spring Boot API", author: "Nguyễn Văn B", category: "Backend", status: "Đã duyệt", date: "1 ngày trước" },
    { id: 3, title: "Figma to React Native", author: "Trần C", category: "Design", status: "Từ chối", date: "2 ngày trước" },
    { id: 4, title: "Kỹ năng quản lý tài chính", author: "Phạm D", category: "Kỹ năng mềm", status: "Đã duyệt", date: "3 ngày trước" },
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

const CHART_DATA = [
    { name: 'T9', total: 600, new: 50 },
    { name: 'T10', total: 800, new: 200 },
    { name: 'T11', total: 950, new: 150 },
    { name: 'T12', total: 1100, new: 150 },
    { name: 'T1', total: 1216, new: 116 },
    { name: 'T2', total: 1248, new: 32 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800">
                <p className="text-sm font-black text-slate-700 dark:text-slate-300 mb-3 border-b border-slate-100 dark:border-slate-800 pb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-3 text-xs font-semibold mb-1.5">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color, boxShadow: `0 0 8px ${entry.color}80` }} />
                        <span className="text-slate-500 dark:text-slate-400">
                            {entry.dataKey === 'total' ? 'Tổng khóa học' : 'Đăng ký mới'}:
                        </span>
                        <span className="text-slate-900 dark:text-white font-black text-sm ml-auto">{entry.value}</span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export default function CourseManagement() {
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
                        Quản lý Khóa học
                    </h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
                        Kiểm duyệt, theo dõi tăng trưởng và xếp hạng khóa học trên toàn hệ thống.
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-sm">
                        <Download className="w-4 h-4 mr-2" />
                        <span className="font-semibold text-slate-700 dark:text-slate-300">Xuất báo cáo</span>
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20">
                        <Plus className="w-4 h-4 mr-2" />
                        <span className="font-bold">Thêm khóa học</span>
                    </Button>
                </div>
            </motion.div>

            {/* 4 Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                {STATS.map((stat) => {
                    const Icon = stat.icon;
                    const colors = {
                        blue: { text: "text-blue-600 dark:text-blue-400", bg: "bg-blue-50 dark:bg-blue-500/10", border: "border-blue-100 dark:border-blue-500/20" },
                        emerald: { text: "text-emerald-600 dark:text-emerald-400", bg: "bg-emerald-50 dark:bg-emerald-500/10", border: "border-emerald-100 dark:border-emerald-500/20" },
                        amber: { text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-500/10", border: "border-amber-100 dark:border-amber-500/20" },
                        rose: { text: "text-rose-600 dark:text-rose-400", bg: "bg-rose-50 dark:bg-rose-500/10", border: "border-rose-100 dark:border-rose-500/20" },
                    }[stat.theme];

                    return (
                        <motion.div
                            key={stat.id}
                            variants={itemVariants}
                            whileHover={{ y: -4 }}
                            className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group"
                        >
                            {/* Highlight bar on top */}
                            <div className={`absolute top-0 left-0 w-full h-1 opacity-50 group-hover:opacity-100 transition-opacity bg-gradient-to-r ${stat.theme === 'blue' ? 'from-blue-400 to-blue-600' :
                                stat.theme === 'emerald' ? 'from-emerald-400 to-emerald-600' :
                                    stat.theme === 'amber' ? 'from-amber-400 to-amber-600' :
                                        'from-rose-400 to-rose-600'
                                }`}></div>

                            <div className="flex justify-between items-start mb-4">
                                <div className={`p-3.5 rounded-2xl ${colors?.bg} ${colors?.border} border shadow-inner group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className={`w-6 h-6 ${colors?.text}`} />
                                </div>
                                <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">{stat.value}</h3>
                            </div>
                            <p className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-1">{stat.label}</p>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{stat.subText}</p>
                        </motion.div>
                    );
                })}
            </div>

            {/* Main Area Chart - Upgraded with SVG & Gradient */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 relative z-10">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white">Biểu đồ tăng trưởng khóa học</h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Thống kê số lượng khóa học và lượt đăng ký mới trong 6 tháng.</p>
                    </div>
                    <div className="flex items-center gap-4 mt-4 sm:mt-0">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]"></span>
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Tổng khóa học</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"></span>
                            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">Lượt đăng ký mới</span>
                        </div>
                    </div>
                </div>

                {/* Interactive Recharts Area Chart */}
                <div className="w-full h-72 mt-6 relative z-10">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={CHART_DATA}
                            margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorNew" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="4 4" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 11, fill: '#64748b', fontWeight: 800 }}
                                dy={10}
                            />
                            <YAxis hide domain={['dataMin - 50', 'dataMax + 100']} />
                            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4' }} />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#3b82f6"
                                strokeWidth={4}
                                fillOpacity={1}
                                fill="url(#colorTotal)"
                                activeDot={{ r: 6, strokeWidth: 3, stroke: '#fff', fill: '#3b82f6' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="new"
                                stroke="#10b981"
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorNew)"
                                activeDot={{ r: 6, strokeWidth: 3, stroke: '#fff', fill: '#10b981' }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Top Lists Sections - Bento Box Style */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Rating Cao Nhất */}
                <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-amber-50 dark:bg-amber-500/10 rounded-xl">
                            <Medal className="w-5 h-5 text-amber-500" />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white">Rating cao nhất</h3>
                    </div>
                    <div className="space-y-4 flex-1">
                        {TOP_RATED.map((course, idx) => (
                            <div key={course.id} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-xs font-black text-slate-500 dark:text-slate-400">
                                        #{idx + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">{course.title}</h4>
                                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">{course.author}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="flex items-center gap-1.5 text-amber-500">
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        <span className="font-black text-sm">{course.rating}</span>
                                    </div>
                                    <p className="text-[10px] text-slate-400 font-bold mt-0.5">({course.reviews})</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Bán Chạy Nhất */}
                <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 p-6 md:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-2 bg-rose-50 dark:bg-rose-500/10 rounded-xl">
                            <Flame className="w-5 h-5 text-rose-500" />
                        </div>
                        <h3 className="text-lg font-black text-slate-900 dark:text-white">Bán chạy nhất</h3>
                    </div>
                    <div className="space-y-4 flex-1">
                        {BEST_SELLERS.map((course, idx) => (
                            <div key={course.id} className="group flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all cursor-pointer">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50">
                                        <TrendingUp className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">{course.title}</h4>
                                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">{course.author}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <span className="font-black text-blue-600 dark:text-blue-400 text-sm bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded-md">{course.sales}</span>
                                    <p className="text-[10px] text-emerald-500 font-bold mt-1">{course.trend}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Table Section */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
                <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Quản lý phê duyệt khóa học</h3>
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                        <div className="relative w-full md:w-64">
                            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Tìm khóa học, giảng viên..."
                                className="w-full h-10 pl-9 pr-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium"
                            />
                        </div>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 dark:bg-slate-800/20 text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                                <th className="px-6 py-5 pl-8">Khóa học</th>
                                <th className="px-6 py-5">Giảng viên</th>
                                <th className="px-6 py-5">Chuyên mục</th>
                                <th className="px-6 py-5">Trạng thái</th>
                                <th className="px-6 py-5 text-right pr-8"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                            {COURSES_LIST.map((course) => {
                                const statusStyles = {
                                    'Chờ duyệt': 'bg-amber-50 text-amber-600 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20',
                                    'Đã duyệt': 'bg-emerald-50 text-emerald-600 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20',
                                    'Từ chối': 'bg-rose-50 text-rose-600 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20',
                                }[course.status];

                                const StatusIcon = {
                                    'Chờ duyệt': Clock,
                                    'Đã duyệt': CheckCircle,
                                    'Từ chối': XCircle,
                                }[course.status as 'Chờ duyệt' | 'Đã duyệt' | 'Từ chối'] || Clock;

                                return (
                                    <tr key={course.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group">
                                        <td className="px-6 py-4 pl-8">
                                            <div className="flex items-center gap-4">
                                                {/* Fake Image Thumbnail */}
                                                <div className="w-14 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center overflow-hidden shrink-0">
                                                    <span className="text-[8px] font-black text-slate-400">IMG</span>
                                                </div>
                                                <div>
                                                    <p className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">{course.title}</p>
                                                    <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 mt-0.5">{course.date}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{course.author}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                                                {course.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[11px] font-black uppercase tracking-wider ${statusStyles}`}>
                                                <StatusIcon className="w-3.5 h-3.5" />
                                                {course.status}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 pr-8 text-right">
                                            <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-lg">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10 rounded-lg">
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
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
                {/* Table Footer / Pagination Placeholder */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800/60 bg-slate-50/50 dark:bg-slate-800/20 flex justify-center">
                    <Button variant="ghost" className="text-xs font-bold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400">
                        Tải thêm danh sách
                    </Button>
                </div>
            </motion.div>
        </motion.div>
    );
}