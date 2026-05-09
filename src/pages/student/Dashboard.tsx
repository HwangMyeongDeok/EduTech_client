"";

import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/authStore";

// --- Tích hợp shadcn/ui ---
import { Button } from "@/components/ui/button";

// --- Import các Sub-components ---
import { ActiveCourseCard } from "@/components/student/dashboard/ActiveCourseCard";
import { StreakCard, QuickStatsCard } from "@/components/student/dashboard/StatCards";
import { RecommendedCourseCard } from "@/components/student/dashboard/RecommendedCourseCard";
import { WelcomeHeader } from "@/components/student/dashboard/WelcomeHeader";

// --- MOCK DATA (Dữ liệu mẫu) ---
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
const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
        opacity: 1, 
        transition: { staggerChildren: 0.1 } 
    }
};

export default function StudentDashboard() {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    return (
        <div className="space-y-8 pb-10 px-4 md:px-0 max-w-[1600px] mx-auto">

            {/* 1. HEADER & GREETING */}
            <WelcomeHeader name={user?.name} />

            {/* 2. BENTO BOX STRATEGY (Tiến độ & Thống kê) */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
            >
                {/* Box 1: Tiếp tục học (To nhất - Chiếm 2 cột trên Desktop) */}
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="lg:col-span-2">
                    <ActiveCourseCard 
                        course={ACTIVE_COURSE} 
                        onNavigate={() => navigate(`/student/course/${ACTIVE_COURSE.id}`)} 
                    />
                </motion.div>

                {/* Box 2: Streak (Chuỗi ngày học) */}
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                    <StreakCard days={12} />
                </motion.div>

                {/* Box 3: Thống kê nhanh */}
                <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
                    <QuickStatsCard />
                </motion.div>
            </motion.div>

            {/* 3. SECTION: GỢI Ý CHO BẠN */}
            <section className="pt-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 rounded-xl">
                            <Sparkles className="w-5 h-5 text-[#0B56D5]" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-slate-800">Gợi ý cho lộ trình của bạn</h2>
                    </div>
                    
                    <Button 
                        variant="ghost" 
                        onClick={() => navigate('/student/explore')}
                        className="text-[#0B56D5] hover:text-blue-800 hover:bg-blue-50 font-bold group"
                    >
                        Xem tất cả <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </div>

                {/* Grid Responsive cho Khóa học: 1 cột mobile, 2 cột tablet, 3 cột desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {RECOMMENDED_COURSES.map((course) => (
                        <RecommendedCourseCard key={course.id} course={course} />
                    ))}
                </div>
            </section>

        </div>
    );
}