"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  PlayCircle, CheckCircle2, ChevronDown, ChevronLeft, 
  Lock, FileText, HelpCircle, List 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- DỮ LIỆU MẪU (MOCK DATA) ---
const MODULES = [
  {
    id: 1,
    title: "1. Bắt đầu",
    lessons: [
      { id: 101, title: "1.1 Bạn sẽ làm được gì sau khóa học?", duration: "03:15", status: "completed" },
      { id: 102, title: "1.2 Tìm hiểu về HTML, CSS", duration: "02:29", status: "completed" },
      { id: 103, title: "1.3 Làm quen với Dev tools", duration: "03:55", status: "playing" },
    ],
  },
  {
    id: 2,
    title: "2. Làm quen với HTML",
    lessons: [
      { id: 201, title: "2.1 Cấu trúc file HTML", duration: "18:45", status: "locked" },
      { id: 202, title: "2.2 Các thẻ định dạng văn bản", duration: "25:10", status: "locked" },
      { id: 203, title: "2.3 Thẻ Heading và Paragraph", duration: "12:30", status: "locked" },
      { id: 204, title: "2.4 Thẻ Links và Images", duration: "20:00", status: "locked" },
    ],
  },
  {
    id: 3,
    title: "3. CSS Cơ bản",
    lessons: [
      { id: 301, title: "3.1 Cách nhúng CSS", duration: "10:00", status: "locked" },
      { id: 302, title: "3.2 Selectors cơ bản", duration: "18:20", status: "locked" },
      { id: 303, title: "3.3 Màu sắc và Background", duration: "22:15", status: "locked" },
      { id: 304, title: "3.4 Box Model (Padding, Margin, Border)", duration: "30:00", status: "locked" },
    ],
  },
];

export default function CoursePlayer() {
  const navigate = useNavigate();
  
  // Quản lý các module đang mở (mặc định mở hết)
  const [expandedModules, setExpandedModules] = useState<number[]>([1, 2, 3]);
  
  // Quản lý bài học hiện tại
  const [currentLesson, setCurrentLesson] = useState(MODULES[0].lessons[2]);

  const toggleModule = (id: number) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  return (
    /** * CONTAINER CHÍNH
     * relative: Để Header/Footer absolute bám theo khung này.
     * h-full: Chiếm trọn chiều cao của div cha bọc nó.
     * overflow-hidden: Chặn mọi sự tràn nội dung ra ngoài.
     */
    <div className="relative w-full h-full bg-white overflow-hidden font-sans border border-slate-200">
      
      {/* --- 1. HEADER (Ghim cứng ở đỉnh component) --- */}
      <header className="absolute top-0 left-0 right-0 h-[50px] bg-[#29303b] flex items-center justify-between px-4 text-white z-30 border-b border-slate-800 shadow-sm">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)} 
            className="hover:bg-slate-700 p-1 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#f05123] rounded-lg flex items-center justify-center font-extrabold text-sm text-white shadow-sm">
              F8
            </div>
            <h1 className="font-bold text-sm hidden sm:block">
              HTML CSS từ Zero đến Hero
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button className="flex items-center gap-1.5 text-xs font-semibold hover:text-[#f05123] transition-colors">
            <FileText className="w-4 h-4" /> <span className="hidden md:inline">Ghi chú</span>
          </button>
          <button className="flex items-center gap-1.5 text-xs font-semibold hover:text-[#f05123] transition-colors">
            <HelpCircle className="w-4 h-4" /> <span className="hidden md:inline">Hướng dẫn</span>
          </button>
        </div>
      </header>

      {/* --- 2. VÙNG BODY (VIDEO + PLAYLIST) ---
          pt-[50px]: Chừa chỗ cho Header
          pb-[60px]: Chừa chỗ cho Footer
      */}
      <div className="flex w-full h-full pt-[50px] pb-[60px] overflow-hidden">
        
        {/* CỘT TRÁI: NỘI DUNG BÀI GIẢNG (Cuộn độc lập) */}
        <main className="flex-1 overflow-y-auto bg-white custom-scrollbar h-full">
          {/* Video Player */}
          <div className="w-full bg-black aspect-video flex items-center justify-center relative">
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
             <button className="w-16 h-16 bg-[#f05123] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all z-10">
               <PlayCircle className="w-10 h-10 text-white fill-white/20" />
             </button>
          </div>

          {/* Text Content */}
          <div className="p-6 md:p-10 max-w-4xl mx-auto w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2">
              {currentLesson.title}
            </h2>
            <p className="text-sm text-slate-500 mb-8 border-b border-slate-100 pb-4 italic">
              Cập nhật tháng 11 năm 2022
            </p>

            <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4">
              <p className="font-medium text-lg">Chào mừng các bạn đến với bài giảng!</p>
              <p>
                Đây là khu vực hiển thị nội dung chi tiết bài học. Khi nội dung này dài ra, 
                nó sẽ tự động tạo thanh cuộn riêng ở cột bên trái này mà không làm ảnh hưởng 
                đến danh sách bài học bên phải hay Header/Footer.
              </p>
              {/* Giả lập nội dung rất dài */}
              <div className="h-[800px] bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400">
                [ Nội dung bài giảng rất dài để kiểm tra scroll ]
              </div>
            </article>
          </div>
        </main>

        {/* CỘT PHẢI: PLAYLIST (Cuộn độc lập) */}
        <aside className="w-[350px] lg:w-[400px] border-l border-slate-200 hidden lg:flex flex-col bg-white h-full shrink-0">
          <div className="p-4 border-b border-slate-100 shrink-0 bg-white shadow-sm z-10">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase text-xs tracking-wider">
              <List className="w-4 h-4 text-[#f05123]" /> Nội dung khóa học
            </h3>
          </div>

          {/* Khu vực cuộn của Playlist */}
          <div className="flex-1 overflow-y-auto no-scrollbar">
            {MODULES.map((module) => (
              <div key={module.id} className="border-b border-slate-50">
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors sticky top-0 z-10 border-b border-slate-200/50"
                >
                  <div className="text-left">
                    <span className="font-bold text-slate-800 text-[13px]">
                      {module.title}
                    </span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      0/{module.lessons.length} | 21:39
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                      expandedModules.includes(module.id) ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {expandedModules.includes(module.id) && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      className="overflow-hidden bg-white"
                    >
                      {module.lessons.map((lesson) => {
                        const isActive = currentLesson.id === lesson.id;
                        const isLocked = lesson.status === "locked";
                        return (
                          <div
                            key={lesson.id}
                            onClick={() => !isLocked && setCurrentLesson(lesson)}
                            className={`flex items-start gap-3 px-5 py-3 transition-all border-b border-slate-50 cursor-pointer ${
                              isActive ? "bg-[#f0512310] border-l-4 border-l-[#f05123]" : "hover:bg-slate-50"
                            } ${isLocked ? "opacity-50 grayscale-[0.3] cursor-not-allowed" : ""}`}
                          >
                            <div className="flex-1">
                              <p className={`text-[13px] font-medium leading-tight ${isActive ? "text-[#f05123]" : "text-slate-800"}`}>
                                {lesson.title}
                              </p>
                              <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400">
                                <PlayCircle className={`w-3.5 h-3.5 ${isActive ? "text-[#f05123]" : ""}`} />
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                            <div className="mt-1 shrink-0">
                              {lesson.status === "completed" ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-50" />
                              ) : isLocked ? (
                                <Lock className="w-3.5 h-3.5 text-slate-300" />
                              ) : (
                                <div className={`w-3.5 h-3.5 rounded-full border-2 ${isActive ? "border-[#f05123]" : "border-slate-300"}`} />
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </aside>
      </div>

      {/* --- 3. FOOTER (Ghim cứng ở đáy component) --- */}
      <footer className="absolute bottom-0 left-0 right-0 h-[60px] bg-white border-t border-slate-200 flex items-center justify-between px-6 z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <button className="flex items-center gap-1.5 text-[13px] font-bold text-slate-600 hover:text-[#f05123] transition-colors group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> BÀI TRƯỚC
        </button>

        <button className="px-6 py-2 bg-white border-2 border-[#f05123] text-[#f05123] rounded-full text-sm font-bold hover:bg-[#f05123] hover:text-white transition-all transform active:scale-95 flex items-center gap-2">
          BÀI TIẾP THEO <span className="text-lg">→</span>
        </button>

        <div className="hidden md:flex items-center gap-2 text-slate-800 font-bold cursor-pointer hover:bg-slate-50 py-1.5 px-3 rounded-lg transition-colors border border-transparent hover:border-slate-200">
          <span className="text-[13px]">{MODULES[0].title}</span>
          <div className="p-1 bg-slate-100 rounded-full">
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>
      </footer>
    </div>
  );
}