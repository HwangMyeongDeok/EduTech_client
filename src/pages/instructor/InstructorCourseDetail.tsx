import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft, Edit2, Share2, Users, Star, BookOpen,
  PlayCircle, FileText, Download, ChevronDown, ChevronUp,
  MoreVertical, FileArchive, BarChart
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

// --- MOCK DATA ---
const COURSE_INFO = {
  title: "Mastering Large Language Models",
  category: "ARTIFICIAL INTELLIGENCE",
  students: 1284,
  rating: 4.9,
  reviewsCount: 428,
  totalLessons: 24,
};

const SYLLABUS = [
  {
    id: "chap-1",
    title: "Chương 1: Giới thiệu về LLMs",
    lessonsCount: 2,
    duration: "45 PHÚT",
    lessons: [
      { id: "l-1", title: "Khái niệm cơ bản về Transformer", desc: "Tìm hiểu về kiến trúc Encoder-Decoder và cơ chế Self-Attention mang tính cách mạng.", time: "12:45", type: "VIDEO" },
      { id: "l-2", title: "Lịch sử phát triển của GPT", desc: "Điểm lại các cột mốc từ GPT-1 đến GPT-4.", time: "08:20", type: "VIDEO" },
    ]
  },
  {
    id: "chap-2",
    title: "Chương 2: Prompt Engineering Cơ bản & Nâng cao",
    lessonsCount: 3,
    duration: "1 GIỜ 15 PHÚT",
    lessons: [
      { id: "l-3", title: "Cấu trúc của một Prompt hoàn hảo", desc: "Các thành phần: Context, Task, Instructions, Output Format.", time: "15:30", type: "VIDEO" },
      { id: "l-4", title: "Tài liệu: Tổng hợp 100+ Prompts Mẫu", desc: "Tài liệu đọc tham khảo và áp dụng thực tế.", time: "10 Trang", type: "DOCUMENT" },
      { id: "l-5", title: "Kỹ thuật Few-Shot & Chain-of-Thought", desc: "Hướng dẫn model suy luận logic qua từng bước.", time: "22:10", type: "VIDEO" },
    ]
  },
  {
    id: "chap-3",
    title: "Chương 3: Fine-tuning & RAG (Retrieval-Augmented Generation)",
    lessonsCount: 2,
    duration: "55 PHÚT",
    lessons: [
      { id: "l-6", title: "Khi nào cần Fine-tuning?", desc: "Phân biệt giữa Prompting, RAG và Fine-tuning.", time: "18:00", type: "VIDEO" },
      { id: "l-7", title: "Xây dựng hệ thống RAG cơ bản", desc: "Tích hợp Vector Database và Embedding models.", time: "25:40", type: "VIDEO" },
    ]
  }
];

export default function InstructorCourseDetail() {
  // Mặc định mở chương 1
  const [expandedChapters, setExpandedChapters] = useState<string[]>(["chap-1"]);
  const [quickNote, setQuickNote] = useState("");

  const toggleChapter = (id: string) => {
    setExpandedChapters(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };

  const toggleAllChapters = () => {
    if (expandedChapters.length === SYLLABUS.length) {
      setExpandedChapters([]); // Đóng tất cả
    } else {
      setExpandedChapters(SYLLABUS.map(c => c.id)); // Mở tất cả
    }
  };

  return (
    <div className="mx-auto space-y-8 pb-12 animate-in fade-in duration-500">

      {/* TOP BAR: Back & Actions */}
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" className="text-slate-500 hover:text-slate-800 hover:bg-slate-100 font-bold rounded-xl h-11 px-4 cursor-pointer">
          <Link to="/instructor/courses">
            <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại danh sách
          </Link>
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-11 rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 font-bold px-4">
            <Share2 className="w-4 h-4 mr-2" /> Chia sẻ
          </Button>
          <Button className="h-11 bg-[#0B56D5] hover:bg-blue-700 text-white rounded-xl font-bold px-6 shadow-lg shadow-blue-500/20">
            <Edit2 className="w-4 h-4 mr-2" /> Chỉnh sửa khóa học
          </Button>
        </div>
      </div>

      {/* HERO BANNER - Đã tinh chỉnh lại giao diện Premium */}
      <div className="relative overflow-hidden rounded-3xl bg-[#0a1128] border border-slate-800 p-8 md:p-10 shadow-2xl">

        {/* Lớp nền mờ Pattern chìm (để ảnh không bị trống) */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80')] bg-cover bg-center opacity-10" style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black)' }}></div>

        {/* Cục Glow màu Core (#0B56D5) phát sáng từ góc phải, tạo độ sâu */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0B56D5] rounded-full blur-[120px] opacity-30 translate-x-1/3 -translate-y-1/4 pointer-events-none"></div>

        {/* Nội dung chính */}
        <div className="relative z-10 max-w-3xl">
          <Badge className="bg-[#0B56D5]/20 text-blue-200 border border-blue-500/30 font-bold tracking-wide uppercase mb-5 px-3 py-1.5 backdrop-blur-md">
            {COURSE_INFO.category}
          </Badge>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-[1.15] mb-8 drop-shadow-md">
            {COURSE_INFO.title}
          </h1>

          {/* Cụm thống kê bọc trong khối Glassmorphism */}
          <div className="flex flex-wrap items-center gap-4 text-sm md:text-base font-medium text-slate-300">
            <div className="flex items-center bg-white/5 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-sm shadow-sm">
              <Users className="w-5 h-5 mr-2.5 text-blue-400" />
              <span className="text-white font-bold">{COURSE_INFO.students.toLocaleString('vi-VN')}</span>&nbsp;Học viên
            </div>

            <div className="flex items-center bg-white/5 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-sm shadow-sm">
              <Star className="w-5 h-5 mr-2.5 text-amber-400 fill-amber-400" />
              <span className="text-white font-bold">{COURSE_INFO.rating}</span>&nbsp;
              <span className="text-slate-400 text-sm">({COURSE_INFO.reviewsCount} đánh giá)</span>
            </div>

            <div className="flex items-center bg-white/5 px-4 py-2 rounded-xl border border-white/10 backdrop-blur-sm shadow-sm">
              <BookOpen className="w-5 h-5 mr-2.5 text-emerald-400" />
              <span className="text-white font-bold">{COURSE_INFO.totalLessons}</span>&nbsp;Bài giảng
            </div>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* LEFT COLUMN: SYLLABUS (CHI TIẾT NỘI DUNG) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-end justify-between border-b border-slate-200 pb-4">
            <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Chi tiết nội dung</h2>
            <button
              onClick={toggleAllChapters}
              className="text-sm font-bold text-[#0B56D5] hover:text-blue-800 transition-colors"
            >
              {expandedChapters.length === SYLLABUS.length ? "Thu gọn tất cả" : "Mở tất cả chương"}
            </button>
          </div>

          <div className="space-y-4">
            {SYLLABUS.map((chapter, index) => {
              const isExpanded = expandedChapters.includes(chapter.id);
              return (
                <div key={chapter.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all hover:border-slate-300 shadow-sm">
                  {/* Chapter Header (Bấm để mở rộng) */}
                  <div
                    onClick={() => toggleChapter(chapter.id)}
                    className="p-5 flex items-center justify-between cursor-pointer bg-slate-50/50 hover:bg-slate-50 transition-colors select-none"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-[#0B56D5] text-white flex items-center justify-center font-black text-lg shadow-md shadow-blue-500/20 shrink-0">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-800 text-lg">{chapter.title}</h3>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">
                          {chapter.lessonsCount} BÀI GIẢNG • {chapter.duration}
                        </p>
                      </div>
                    </div>
                    <div className="text-slate-400">
                      {isExpanded ? <ChevronUp className="w-6 h-6" /> : <ChevronDown className="w-6 h-6" />}
                    </div>
                  </div>

                  {/* Chapter Content (Lessons) - Framer Motion Animation */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="border-t border-slate-100"
                      >
                        <div className="p-3 space-y-2">
                          {chapter.lessons.map((lesson) => (
                            <Link
                              key={lesson.id}
                              to={`/instructor/courses/1/lessons/${lesson.id}`}
                              className="group flex items-start gap-4 p-3 rounded-xl hover:bg-blue-50/50 hover:border-blue-100 border border-transparent transition-all cursor-pointer block w-full"
                            >
                              <div className="mt-1 bg-white p-2 rounded-lg border border-slate-200 shadow-sm text-[#0B56D5] group-hover:bg-[#0B56D5] group-hover:text-white transition-colors">
                                {lesson.type === "VIDEO" ? <PlayCircle className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                              </div>

                              {/* Info bài học */}
                              <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-slate-800 text-base group-hover:text-[#0B56D5] transition-colors">{lesson.title}</h4>
                                <p className="text-sm text-slate-500 line-clamp-1 mt-0.5">{lesson.desc}</p>
                                <div className="flex items-center gap-3 mt-2">
                                  <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-semibold px-2 py-0 text-[10px] uppercase">
                                    {lesson.type}
                                  </Badge>
                                  <span className="text-xs font-bold text-slate-400 flex items-center">
                                    {lesson.time}
                                  </span>
                                </div>
                              </div>

                              {/* Nút Action (Chỉ hiện khi hover) */}
                              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-[#0B56D5]">
                                <MoreVertical className="w-5 h-5" />
                              </Button>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR (TÀI LIỆU & GHI CHÚ) - SỬ DỤNG STICKY */}
        <div className="lg:col-span-4">
          <div className="sticky top-6 space-y-6">

            {/* Widget: Tài liệu đính kèm */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-4">Tài liệu đính kèm</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="bg-rose-100 text-rose-600 p-2 rounded-lg">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-700 text-sm group-hover:text-slate-900">Full_Syllabus_2026.pdf</p>
                      <p className="text-xs font-medium text-slate-400 mt-0.5">1.2 MB</p>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-[#0B56D5]" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 text-[#0B56D5] p-2 rounded-lg">
                      <FileArchive className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-700 text-sm group-hover:text-slate-900">Lab_Environment_Setup.zip</p>
                      <p className="text-xs font-medium text-slate-400 mt-0.5">45 MB</p>
                    </div>
                  </div>
                  <Download className="w-4 h-4 text-slate-400 group-hover:text-[#0B56D5]" />
                </div>
              </div>
            </div>

            {/* Widget: Ghi chú nhanh */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight mb-4">Ghi chú nhanh</h3>
              <Textarea
                placeholder="Viết ghi chú cá nhân cho khóa học này (VD: Cần cập nhật lại video bài 2)..."
                className="min-h-[120px] rounded-xl border-slate-200 focus-visible:ring-[#0B56D5] resize-none text-sm"
                value={quickNote}
                onChange={(e) => setQuickNote(e.target.value)}
              />
              <div className="mt-3 flex justify-end">
                <Button size="sm" variant="ghost" className="text-[#0B56D5] font-bold hover:bg-blue-50 rounded-lg">
                  Lưu ghi chú
                </Button>
              </div>
            </div>

            {/* Nút Xuất báo cáo */}
            <Button className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white rounded-2xl font-black text-base shadow-lg transition-transform active:scale-[0.98]">
              <BarChart className="w-5 h-5 mr-2" /> XUẤT BÁO CÁO TIẾN ĐỘ
            </Button>

          </div>
        </div>

      </div>
    </div>
  );
}