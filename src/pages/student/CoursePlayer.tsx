import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  PlayCircle,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  Lock,
  FileText,
  HelpCircle,
  List,
  X,
  Plus,
  Paperclip,
  Send,
  Bot,
  Clock,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- DỮ LIỆU MẪU (MOCK DATA) ---
const MODULES = [
  {
    id: 1,
    title: "1. Bắt đầu",
    lessons: [
      {
        id: 101,
        title: "1.1 Bạn sẽ làm được gì sau khóa học?",
        duration: "03:15",
        status: "completed",
      },
      {
        id: 102,
        title: "1.2 Tìm hiểu về HTML, CSS",
        duration: "02:29",
        status: "completed",
      },
      {
        id: 103,
        title: "1.3 Làm quen với Dev tools",
        duration: "03:55",
        status: "playing",
      },
    ],
  },
  {
    id: 2,
    title: "2. Làm quen với HTML",
    lessons: [
      {
        id: 201,
        title: "2.1 Cấu trúc file HTML",
        duration: "18:45",
        status: "locked",
      },
      {
        id: 202,
        title: "2.2 Các thẻ định dạng văn bản",
        duration: "25:10",
        status: "locked",
      },
      {
        id: 203,
        title: "2.3 Thẻ Heading và Paragraph",
        duration: "12:30",
        status: "locked",
      },
      {
        id: 204,
        title: "2.4 Thẻ Links và Images",
        duration: "20:00",
        status: "locked",
      },
    ],
  },
  {
    id: 3,
    title: "3. CSS Cơ bản",
    lessons: [
      {
        id: 301,
        title: "3.1 Cách nhúng CSS",
        duration: "10:00",
        status: "locked",
      },
      {
        id: 302,
        title: "3.2 Selectors cơ bản",
        duration: "18:20",
        status: "locked",
      },
      {
        id: 303,
        title: "3.3 Màu sắc và Background",
        duration: "22:15",
        status: "locked",
      },
      {
        id: 304,
        title: "3.4 Box Model (Padding, Margin, Border)",
        duration: "30:00",
        status: "locked",
      },
    ],
  },
];

// ----------------------------------------------------------------
// COMPONENT CHÍNH
// ----------------------------------------------------------------
export default function CoursePlayer() {
  const navigate = useNavigate();

  // States
  const [expandedModules, setExpandedModules] = useState<number[]>([1, 2, 3]);
  const [currentLesson, setCurrentLesson] = useState(MODULES[0].lessons[2]);
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"content" | "attachments">(
    "content",
  );

  // Chat States
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([
    {
      role: "bot",
      text: `Chào bạn! Mình là trợ lý AI. Trong bài <b>${MODULES[0].lessons[2].title}</b> này có đoạn nào bạn chưa hiểu không?`,
    },
  ]);

  const toggleModule = (id: number) => {
    setExpandedModules((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id],
    );
  };

  const handleSendChat = () => {
    const text = chatInput.trim();
    if (!text) return;
    setChatMessages((prev) => [...prev, { role: "user", text }]);
    setChatInput("");
    // Giả lập AI trả lời
    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "Cảm ơn câu hỏi của bạn! Mình sẽ hỗ trợ bạn ngay. Bạn có thể mô tả thêm vấn đề bạn gặp phải không?",
        },
      ]);
    }, 800);
  };

  return (
    <div className="relative w-full h-screen flex flex-col bg-white overflow-hidden font-sans border border-slate-200">
      {/* ===================== HEADER ===================== */}
      <header className="h-[50px] shrink-0 bg-[#29303b] flex items-center justify-between px-4 text-white z-30 shadow-sm relative">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="hover:bg-slate-700 p-1.5 rounded-full transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#0B56D5] rounded-lg flex items-center justify-center font-extrabold text-sm text-white shadow-sm">
              F8
            </div>
            <h1 className="font-bold text-sm hidden sm:block">
              HTML CSS từ Zero đến Hero
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button
            onClick={() => setIsNoteOpen(true)}
            className="flex items-center gap-1.5 text-xs font-semibold hover:text-blue-300 transition-colors"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden md:inline">Ghi chú</span>
          </button>
          <button className="flex items-center gap-1.5 text-xs font-semibold hover:text-blue-300 transition-colors">
            <HelpCircle className="w-4 h-4" />
            <span className="hidden md:inline">Hướng dẫn</span>
          </button>
        </div>
      </header>

      {/* ===================== BODY (3 CỘT) ===================== */}
      <div className="flex-1 flex overflow-hidden w-full relative">
        {/* CỘT 1 (TRÁI): PLAYLIST NỘI DUNG KHÓA HỌC */}
        <aside className="w-[300px] xl:w-[350px] border-r border-slate-200 hidden lg:flex flex-col bg-white h-full shrink-0 z-10">
          <div className="p-4 border-b border-slate-100 shrink-0 bg-white shadow-sm z-10">
            <h3 className="font-bold text-slate-800 flex items-center gap-2 uppercase text-[11px] tracking-wider">
              <List className="w-4 h-4 text-[#0B56D5]" /> Nội dung khóa học
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto no-scrollbar pb-10">
            {MODULES.map((module) => (
              <div key={module.id} className="border-b border-slate-50">
                <button
                  onClick={() => toggleModule(module.id)}
                  className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors sticky top-0 z-10 border-b border-slate-200/50"
                >
                  <div className="text-left pr-4">
                    <span className="font-bold text-slate-800 text-[13px] leading-snug block">
                      {module.title}
                    </span>
                    <p className="text-[11px] font-medium text-slate-500 mt-1">
                      0/{module.lessons.length} | 21:39
                    </p>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-300 shrink-0 ${
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
                            onClick={() =>
                              !isLocked && setCurrentLesson(lesson)
                            }
                            className={`flex items-start gap-3 px-5 py-3 transition-all border-b border-slate-50 cursor-pointer ${
                              isActive
                                ? "bg-[#0B56D510] border-l-4 border-l-[#0B56D5]"
                                : "hover:bg-slate-50 border-l-4 border-l-transparent"
                            } ${
                              isLocked
                                ? "opacity-50 grayscale-[0.3] cursor-not-allowed"
                                : ""
                            }`}
                          >
                            <div className="flex-1">
                              <p
                                className={`text-[13px] font-medium leading-tight ${
                                  isActive ? "text-[#0B56D5]" : "text-slate-800"
                                }`}
                              >
                                {lesson.title}
                              </p>
                              <div className="flex items-center gap-2 mt-2 text-[11px] text-slate-400 font-medium">
                                <PlayCircle
                                  className={`w-3.5 h-3.5 ${isActive ? "text-[#0B56D5]" : ""}`}
                                />
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                            <div className="mt-1 shrink-0">
                              {lesson.status === "completed" ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-50" />
                              ) : isLocked ? (
                                <Lock className="w-3.5 h-3.5 text-slate-300" />
                              ) : (
                                <div
                                  className={`w-3.5 h-3.5 rounded-full border-2 ${
                                    isActive
                                      ? "border-[#0B56D5]"
                                      : "border-slate-300"
                                  }`}
                                />
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

        {/* CỘT 2 (GIỮA): NỘI DUNG BÀI GIẢNG */}
        <main className="flex-1 overflow-y-auto bg-slate-50 relative h-full">
          {/* Video Player */}
          <div className="w-full bg-black flex justify-center border-b border-slate-800">
            <div className="w-full max-w-[1200px] aspect-video flex items-center justify-center relative">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <button className="w-16 h-16 bg-[#0B56D5] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(11,86,213,0.4)] hover:scale-110 transition-all z-10 group">
                <PlayCircle className="w-10 h-10 text-white fill-white/20 group-hover:fill-white/40 transition-colors" />
              </button>
            </div>
          </div>

          {/* Text Content & Tabs */}
          <div className="p-6 md:p-8 lg:p-10 mx-auto w-full bg-white xl:mt-6 xl:rounded-2xl xl:shadow-sm xl:border xl:border-slate-200 mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-2">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight">
                {currentLesson.title}
              </h2>
              <button
                onClick={() => setIsNoteOpen(true)}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-sm font-semibold transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                Thêm ghi chú tại <span className="text-[#0B56D5]">00:00</span>
              </button>
            </div>

            <p className="text-sm text-slate-500 mb-6 italic">
              Cập nhật tháng 11 năm 2022
            </p>

            {/* TABS */}
            <div className="border-b border-slate-200 flex gap-8 mb-6">
              <button
                onClick={() => setActiveTab("content")}
                className={`pb-3 text-sm font-bold border-b-2 transition-colors duration-300 ${
                  activeTab === "content"
                    ? "border-[#0B56D5] text-[#0B56D5]"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                Nội dung văn bản
              </button>
              <button
                onClick={() => setActiveTab("attachments")}
                className={`pb-3 text-sm font-bold border-b-2 transition-colors duration-300 ${
                  activeTab === "attachments"
                    ? "border-[#0B56D5] text-[#0B56D5]"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                Tài liệu đính kèm
              </button>
            </div>

            {/* NỘI DUNG TAB */}
            <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed min-h-[300px]">
              <AnimatePresence mode="wait">
                {activeTab === "content" ? (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-1"
                  >
                    {[
                      {
                        time: "00:00",
                        text: "Giới thiệu Khởi tạo dự án Spring Boot và lộ trình cấu trúc ứng dụng.",
                      },
                      {
                        time: "01:24",
                        text: "Tạo project với Spring Initializer và lựa chọn dependencies cơ bản.",
                      },
                      {
                        time: "04:45",
                        text: "Giải thích cấu hình pom.xml/build.gradle và cách khởi chạy ứng dụng.",
                      },
                      {
                        time: "08:12",
                        text: "Cấu trúc mã nguồn, package chuẩn và lớp chính @SpringBootApplication.",
                      },
                      {
                        time: "12:30",
                        text: "Chạy ứng dụng Spring Boot lần đầu và kiểm tra endpoint mặc định.",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-4 p-3 hover:bg-slate-50 rounded-xl cursor-pointer group transition-colors"
                      >
                        <div className="flex items-center gap-1.5 text-[#0B56D5] bg-[#0B56D510] px-2 py-1 rounded-lg font-mono text-sm font-bold min-w-[65px] justify-center border border-[#0B56D520]">
                          <Clock className="w-3.5 h-3.5" />
                          {item.time}
                        </div>
                        <p className="text-slate-700 text-sm md:text-[15px] leading-relaxed group-hover:text-black mt-0.5">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="attachments"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between hover:bg-slate-100 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                          <Paperclip className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-bold text-slate-800 text-sm">
                            Source_Code_Bai_1.zip
                          </p>
                          <p className="text-xs text-slate-500 mt-0.5">
                            1.2 MB • ZIP Archive
                          </p>
                        </div>
                      </div>
                      <button className="text-sm font-bold text-[#0B56D5]">
                        Tải xuống
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          </div>
        </main>

        {/* CỘT 3 (PHẢI): CHAT AI */}
        <aside className="w-[300px] xl:w-[350px] border-l border-slate-200 hidden md:flex flex-col bg-white h-full shrink-0 z-10 min-h-0">
          <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center gap-3 shrink-0">
            <div className="bg-[#0B56D5] p-2 rounded-lg shadow-sm">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm">
                F8 AI Assistant
              </h3>
              <p className="text-[11px] text-slate-500 font-medium">
                Sẵn sàng giải đáp thắc mắc
              </p>
            </div>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 bg-white space-y-4 text-sm no-scrollbar">
            {chatMessages.map((msg, i) =>
              msg.role === "bot" ? (
                <div key={i} className="flex gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0 border border-blue-100">
                    <Bot className="w-4 h-4 text-[#0B56D5]" />
                  </div>
                  <div
                    className="bg-slate-50 border border-slate-100 p-3 rounded-2xl rounded-tl-sm text-slate-700"
                    dangerouslySetInnerHTML={{ __html: msg.text }}
                  />
                </div>
              ) : (
                <div key={i} className="flex justify-end">
                  <div className="bg-[#0B56D5] text-white p-3 rounded-2xl rounded-tr-sm text-sm max-w-[85%] shadow-sm">
                    {msg.text}
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100 shrink-0">
            <div className="relative flex items-center shadow-sm rounded-full bg-slate-50 border border-slate-200 focus-within:border-[#0B56D5]/50 focus-within:ring-2 focus-within:ring-[#0B56D5]/10 transition-all">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                placeholder="Hỏi AI về bài học..."
                className="w-full bg-transparent text-sm rounded-full pl-4 pr-12 py-3 outline-none"
              />
              <button
                onClick={handleSendChat}
                className="absolute right-1.5 w-8 h-8 bg-[#0B56D5] hover:bg-[#0944b0] transition-colors text-white rounded-full flex items-center justify-center"
              >
                <Send className="w-4 h-4 ml-[-2px]" />
              </button>
            </div>
          </div>
        </aside>
      </div>

      {/* ===================== SIDE SHEET GHI CHÚ ===================== */}
      <AnimatePresence>
        {isNoteOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsNoteOpen(false)}
              className="absolute inset-0 bg-black/40 z-[40]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute top-0 right-0 bottom-0 w-full max-w-[600px] bg-white z-[50] flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <h3 className="text-xl font-bold text-slate-800">
                  Ghi chú của tôi
                </h3>
                <button
                  onClick={() => setIsNoteOpen(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-4 flex gap-3 bg-slate-50 border-b border-slate-100">
                <select className="flex-1 px-3 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-[#0B56D5]">
                  <option>Trong chương hiện tại</option>
                  <option>Tất cả các chương</option>
                </select>
                <select className="px-3 py-2 bg-white border border-slate-200 rounded-md text-sm outline-none focus:border-[#0B56D5]">
                  <option>Mới nhất</option>
                  <option>Cũ nhất</option>
                </select>
              </div>

              <div className="flex-1 overflow-y-auto p-6 flex flex-col items-center justify-center text-center">
                <div className="w-64 h-64 opacity-80 mb-6">
                  <img
                    src="https://fullstack.edu.vn/static/media/no-note.7a641a29f8f2666a014a.png"
                    alt="No notes"
                  />
                </div>
                <h4 className="text-lg font-bold text-slate-800 mb-2">
                  Bạn chưa có ghi chú nào
                </h4>
                <p className="text-slate-500 text-sm max-w-[280px]">
                  Hãy ghi chép để nhớ những gì bạn đã học!
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ===================== FOOTER ===================== */}
      <footer className="h-[60px] shrink-0 bg-white border-t border-slate-200 flex items-center justify-between px-6 z-30 shadow-[0_-4px_12px_rgba(0,0,0,0.03)] relative">
        <button className="flex items-center gap-1.5 text-[12px] font-bold text-slate-500 hover:text-[#0B56D5] transition-colors group">
          <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />{" "}
          BÀI TRƯỚC
        </button>

        <button className="px-6 py-2 bg-white border-2 border-[#0B56D5] text-[#0B56D5] rounded-full text-sm font-bold hover:bg-[#0B56D5] hover:text-white transition-all transform active:scale-95 flex items-center gap-2">
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
