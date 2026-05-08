import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, CheckCircle2, Clock, Award, BookOpen } from "lucide-react";

// Mock Data
const MY_COURSES = [
  { id: 1, title: "Phát triển Web với React & Next.js", instructor: "Trần Anh Tuấn", progress: 68, status: "in-progress", lastViewed: "2 giờ trước", bg: "bg-teal-500", icon: "⚛️" },
  { id: 2, title: "Mastering Large Language Models", instructor: "Lê Minh", progress: 12, status: "in-progress", lastViewed: "Hôm qua", bg: "bg-[#0B1121]", icon: "🧠" },
  { id: 3, title: "Nhập môn UI/UX căn bản", instructor: "Nguyễn Mai", progress: 100, status: "completed", lastViewed: "1 tuần trước", bg: "bg-indigo-500", icon: "✨" },
];

export default function MyCourses() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredCourses = MY_COURSES.filter(course => {
    if (activeTab === "all") return true;
    return course.status === activeTab;
  });

  const tabs = [
    { id: "all", label: "Tất cả" },
    { id: "in-progress", label: "Đang học" },
    { id: "completed", label: "Đã hoàn thành" },
  ];

  return (
    <div className="space-y-8">
      {/* Header & Tabs */}
      <div>
        <h1 className="text-3xl font-black text-slate-800 mb-6 flex items-center gap-3">
          <BookOpen className="w-8 h-8 text-[#0B56D5]" /> Khóa học của tôi
        </h1>
        
        <div className="flex items-center gap-6 border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative pb-4 text-sm font-bold transition-colors ${
                activeTab === tab.id ? "text-[#0B56D5]" : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-[#0B56D5] rounded-t-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Danh sách khóa học */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredCourses.map((course) => (
            <motion.div
              key={course.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-3xl p-4 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-xl transition-shadow flex flex-col group"
            >
              <div className={`w-full h-36 ${course.bg} rounded-2xl flex items-center justify-center text-5xl mb-5 relative overflow-hidden`}>
                <span className="group-hover:scale-110 transition-transform duration-500 drop-shadow-lg">{course.icon}</span>
                {course.status === "completed" && (
                  <div className="absolute top-3 right-3 bg-white text-emerald-600 p-1.5 rounded-full shadow-md">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 flex flex-col">
                <h3 className="text-lg font-bold text-slate-800 leading-snug mb-1 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-sm text-slate-500 font-medium mb-4">{course.instructor}</p>
                
                <div className="mt-auto space-y-4">
                  <div>
                    <div className="flex justify-between text-xs font-bold mb-2">
                      <span className={course.progress === 100 ? "text-emerald-600" : "text-[#0B56D5]"}>
                        {course.progress}% Hoàn thành
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${course.progress}%` }}
                        transition={{ duration: 1 }}
                        className={`h-full rounded-full ${course.progress === 100 ? "bg-emerald-500" : "bg-[#0B56D5]"}`}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                      <Clock className="w-3.5 h-3.5" /> Học lần cuối: {course.lastViewed}
                    </div>
                    {course.status === "completed" ? (
                      <button className="px-4 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-xl text-sm font-bold transition-colors flex items-center gap-2">
                        <Award className="w-4 h-4" /> Chứng nhận
                      </button>
                    ) : (
                      <button className="px-4 py-2 bg-[#0B56D5] text-white hover:bg-blue-700 rounded-xl text-sm font-bold transition-colors shadow-md shadow-blue-500/20 flex items-center gap-2">
                        <PlayCircle className="w-4 h-4" /> Tiếp tục
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}