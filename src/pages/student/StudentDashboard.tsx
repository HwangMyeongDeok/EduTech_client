"use client";

import { motion, type Variants } from "framer-motion";
import {
    Play, Flame, Clock, ArrowRight,
    Sparkles, Star, BookMarked, PlayCircle,
    TrendingUp, CheckCircle2
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useNavigate } from "react-router-dom";

// --- Tích hợp shadcn/ui ---
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- MOCK DATA ---
const ACTIVE_COURSE = {
    id: "react-123",
    title: "Phát triển Web với React & Next.js",
    instructor: "Trần Anh Tuấn",
    progress: 68,
    currentLesson: "Chương 4: Server-side Rendering cơ bản",
    timeLeft: "2h 15m",
};

const RECOMMENDED_COURSES = [
    { id: 1, title: "Mastering Large Language Models", price: "2.500.000đ", rating: 4.9, bg: "bg-slate-900", icon: "🧠", category: "AI & DATA" },
    { id: 2, title: "UI/UX Design cho Mobile App", price: "1.500.000đ", rating: 4.8, bg: "bg-indigo-600", icon: "✨", category: "THIẾT KẾ" },
    { id: 3, title: "Làm chủ Spring Boot 3.x", price: "1.200.000đ", rating: 4.9, bg: "bg-emerald-600", icon: "🍃", category: "BACKEND" },
];

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export default function StudentDashboard() {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    return (
        <div className="space-y-8 pb-10">

            {/* 1. HEADER & GREETING */}
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col md:flex-row md:items-end justify-between gap-4"
            >
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
                        Chào mừng trở lại, {user?.name?.split(' ').pop() || 'bạn'}! <span className="text-4xl animate-bounce origin-bottom">👋</span>
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">Hôm nay là một ngày tuyệt vời để học thêm điều mới.</p>
                </div>
            </motion.div>

            {/* 2. BENTO BOX STRATEGY (Tiến độ & Thống kê) */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            >
                {/* Box 1: Tiếp tục học (To nhất - Chiếm 2 cột) */}
                <motion.div variants={itemVariants} className="lg:col-span-2">
                    <Card className="h-full rounded-3xl border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
                        {/* Background Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none" />

                        <CardContent className="p-6 md:p-8 relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-[#0B56D5] font-bold text-sm mb-3">
                                    <PlayCircle className="w-4 h-4" /> ĐANG HỌC
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 leading-tight mb-2 group-hover:text-[#0B56D5] transition-colors line-clamp-2">
                                    {ACTIVE_COURSE.title}
                                </h2>
                                <p className="text-slate-500 text-sm font-medium mb-6">
                                    Bài học hiện tại: <span className="text-slate-700">{ACTIVE_COURSE.currentLesson}</span>
                                </p>
                            </div>

                            <div className="space-y-5">
                                {/* Progress Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm font-bold">
                                        <span className="text-slate-700">{ACTIVE_COURSE.progress}% hoàn thành</span>
                                        <span className="text-slate-400">Còn {ACTIVE_COURSE.timeLeft}</span>
                                    </div>
                                    <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${ACTIVE_COURSE.progress}%` }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            className="h-full bg-gradient-to-r from-[#0B56D5] to-blue-400 rounded-full relative"
                                        >
                                            <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
                                        </motion.div>
                                    </div>
                                </div>

                                {/* Navigate to Course Player */}
                                <Button 
                                    size="lg"
                                    onClick={() => navigate(`/student/course/${ACTIVE_COURSE.id}`)} 
                                    className="w-full sm:w-auto bg-[#0B56D5] hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/30 gap-2 hover:scale-[1.02] active:scale-95"
                                >
                                    <Play className="w-4 h-4 fill-current" /> Tiếp tục học
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Box 2: Streak (Chuỗi ngày học) */}
                <motion.div variants={itemVariants} whileHover={{ y: -5 }}>
                    <Card className="h-full bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl border-orange-100 shadow-sm flex flex-col justify-center items-center text-center">
                        <CardContent className="p-6 flex flex-col items-center justify-center h-full">
                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
                                <Flame className="w-8 h-8 text-orange-500 fill-orange-500" />
                            </div>
                            <h3 className="text-3xl font-black text-slate-800 mb-1">12 Ngày</h3>
                            <p className="text-slate-500 font-medium text-sm">Chuỗi học liên tiếp</p>
                            <Badge variant="secondary" className="mt-4 bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 font-bold border-none">
                                Top 5% học viên 🔥
                            </Badge>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Box 3: Thống kê nhanh */}
                <motion.div variants={itemVariants}>
                    <Card className="h-full bg-white rounded-3xl border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <CardContent className="p-6 flex flex-col justify-between h-full">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-bold text-slate-800">Thống kê</h3>
                                <TrendingUp className="w-4 h-4 text-slate-400" />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B56D5]">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-slate-800 leading-none">48h</p>
                                        <p className="text-xs text-slate-500 font-medium mt-1">Thời gian đã học</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                                        <CheckCircle2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-slate-800 leading-none">24</p>
                                        <p className="text-xs text-slate-500 font-medium mt-1">Bài học hoàn thành</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>

            {/* 3. SECTION: GỢI Ý CHO BẠN */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="pt-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <Sparkles className="w-6 h-6 text-[#0B56D5]" />
                        <h2 className="text-2xl font-bold text-slate-800">Gợi ý cho lộ trình của bạn</h2>
                    </div>
                    {/* Navigate to Explore Page */}
                    <Button 
                        variant="ghost" 
                        onClick={() => navigate('/student/explore')}
                        className="hidden sm:flex text-[#0B56D5] hover:text-blue-800 hover:bg-blue-50 font-bold group"
                    >
                        Xem tất cả <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {RECOMMENDED_COURSES.map((course) => (
                        <motion.div
                            key={course.id}
                            whileHover={{ y: -8 }}
                            onClick={() => navigate(`/student/course-detail/${course.id}`)} // Navigate to Course Detail
                        >
                            <Card className="rounded-3xl p-3 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(11,86,213,0.1)] transition-all cursor-pointer group flex flex-col h-full">
                                {/* Thumbnail */}
                                <div className={`w-full h-40 ${course.bg} rounded-2xl relative overflow-hidden flex items-center justify-center mb-4`}>
                                    <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {course.category}
                                    </div>
                                    <span className="text-6xl drop-shadow-xl group-hover:scale-110 transition-transform duration-500">{course.icon}</span>

                                    {/* Overlay Play Button on Hover */}
                                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
                                        <PlayCircle className="w-12 h-12 text-white/90" />
                                    </div>
                                </div>

                                {/* Card Content */}
                                <CardContent className="p-2 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex items-center gap-1 text-amber-500 mb-2">
                                            <Star className="w-3.5 h-3.5 fill-current" />
                                            <span className="text-xs font-bold text-slate-700">{course.rating}</span>
                                        </div>
                                        <h3 className="text-base font-bold text-slate-800 leading-snug mb-4 group-hover:text-[#0B56D5] transition-colors line-clamp-2">
                                            {course.title}
                                        </h3>
                                    </div>

                                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                                        <span className="text-sm font-black text-[#0B56D5]">{course.price}</span>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation(); // Ngăn sự kiện click lan ra ngoài Card (tránh redirect)
                                                console.log("Đã bookmark khóa học", course.id);
                                            }} 
                                            className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-[#0B56D5] transition-colors"
                                        >
                                            <BookMarked className="w-4 h-4" />
                                        </button>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

        </div>
    );
}