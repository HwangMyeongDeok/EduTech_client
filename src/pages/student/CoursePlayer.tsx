"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PlayCircle, CheckCircle2, ChevronDown, MessageCircle, FileText, ChevronLeft, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock Data Bài giảng
const MODULES = [
  {
    id: 1, title: "Chương 1: Khởi đầu",
    lessons: [
      { id: 101, title: "Giới thiệu khóa học", duration: "05:12", status: "completed" },
      { id: 102, title: "Cài đặt môi trường", duration: "12:30", status: "completed" },
    ]
  },
  {
    id: 2, title: "Chương 2: Kiến thức cốt lõi",
    lessons: [
      { id: 201, title: "Components & Props", duration: "18:45", status: "playing" },
      { id: 202, title: "State & Lifecycle", duration: "25:10", status: "locked" },
    ]
  }
];

export default function CoursePlayer() {
  const navigate = useNavigate();
  const [expandedModules, setExpandedModules] = useState<number[]>([1, 2]);

  const toggleModule = (id: number) => {
    setExpandedModules(prev => 
      prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="flex flex-col xl:flex-row gap-6 pb-10">
      
      {/* CỘT TRÁI: VIDEO PLAYER & CHI TIẾT */}
      <div className="flex-1 space-y-6">
        
        {/* Nút quay lại */}
        <button 
          onClick={() => navigate('/student/dashboard')}
          className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" /> Quay lại Dashboard
        </button>

        {/* Khung Video (Giả lập) */}
        <div className="w-full aspect-video bg-slate-900 rounded-2xl overflow-hidden relative shadow-xl group">
          {/* Màn hình chờ của Video */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white bg-[url('https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80')] bg-cover bg-center">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
            <div className="relative z-10 flex flex-col items-center">
              <button className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                <PlayCircle className="w-8 h-8 fill-current" />
              </button>
              <p className="mt-4 font-bold text-lg">Components & Props</p>
            </div>
          </div>
        </div>

        {/* Tabs dưới Video */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
          <div className="flex gap-6 border-b border-slate-100 pb-4 mb-4">
            <button className="text-blue-600 font-bold border-b-2 border-blue-600 pb-4 -mb-[18px]">Tổng quan</button>
            <button className="text-slate-500 font-semibold hover:text-slate-800 pb-4">Hỏi đáp <span className="ml-1 px-2 py-0.5 bg-slate-100 text-[10px] rounded-full">12</span></button>
            <button className="text-slate-500 font-semibold hover:text-slate-800 pb-4">Tài liệu</button>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-2xl font-black text-slate-800">Components & Props trong React</h2>
            <p className="text-slate-600 leading-relaxed">
              Trong bài học này, chúng ta sẽ tìm hiểu cách bóc tách giao diện thành các thành phần độc lập (Components) và cách truyền dữ liệu giữa chúng thông qua Props...
            </p>
          </div>
        </div>
      </div>

      {/* CỘT PHẢI: DANH SÁCH BÀI GIẢNG (PLAYLIST) */}
      <div className="w-full xl:w-96 flex-shrink-0">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm sticky top-24 overflow-hidden flex flex-col max-h-[80vh]">
          
          <div className="p-5 border-b border-slate-100 bg-slate-50/50">
            <h3 className="font-bold text-lg text-slate-800">Nội dung khóa học</h3>
            <div className="flex items-center gap-2 mt-2 text-sm text-slate-500">
              <span className="text-[#0B56D5] font-bold">2/24</span> bài học đã xong
            </div>
            {/* Progress Bar nhỏ */}
            <div className="h-1.5 w-full bg-slate-200 rounded-full mt-3 overflow-hidden">
              <div className="h-full bg-emerald-500 w-[15%]" />
            </div>
          </div>

          <div className="overflow-y-auto flex-1 p-2 space-y-2 scroll-smooth custom-scrollbar">
            {MODULES.map((module) => (
              <div key={module.id} className="border border-slate-100 rounded-xl overflow-hidden">
                {/* Header Module */}
                <button 
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors"
                >
                  <span className="font-bold text-slate-700 text-sm">{module.title}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedModules.includes(module.id) ? "rotate-180" : ""}`} />
                </button>

                {/* Danh sách bài học */}
                <AnimatePresence>
                  {expandedModules.includes(module.id) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-2 space-y-1">
                        {module.lessons.map(lesson => (
                          <div 
                            key={lesson.id} 
                            className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                              lesson.status === 'playing' ? 'bg-blue-50 border border-blue-100' : 'hover:bg-slate-50'
                            } ${lesson.status === 'locked' ? 'opacity-60 cursor-not-allowed' : ''}`}
                          >
                            <div className="mt-0.5 flex-shrink-0">
                              {lesson.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                              {lesson.status === 'playing' && <PlayCircle className="w-4 h-4 text-blue-600 fill-blue-100" />}
                              {lesson.status === 'locked' && <Lock className="w-4 h-4 text-slate-400" />}
                            </div>
                            <div className="flex-1">
                              <p className={`text-sm font-semibold line-clamp-2 ${lesson.status === 'playing' ? 'text-blue-700' : 'text-slate-700'}`}>
                                {lesson.title}
                              </p>
                              <div className="flex items-center gap-2 mt-1 text-xs text-slate-400 font-medium">
                                <PlayCircle className="w-3 h-3" /> {lesson.duration}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}