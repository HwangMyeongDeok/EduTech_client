import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, PlayCircle, Clock, Sparkles, 
  UploadCloud, Edit3, MessageSquare, BarChart3, 
  Users, CheckCircle2, FileText, Settings
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- MOCK DATA GIỮ NGUYÊN ---
const SYLLABUS = [
  {
    id: "chap-1",
    title: "Chương 1: Giới thiệu về LLMs",
    lessons: [
      { id: "l-1", title: "Khái niệm cơ bản về Transformer", duration: "12:45", isActive: true },
      { id: "l-2", title: "Lịch sử phát triển của GPT", duration: "08:20", isActive: false },
      { id: "l-21", title: "Lịch sử phát triển của GPT", duration: "08:20", isActive: false },
      { id: "l-22", title: "Lịch sử phát triển của GPT", duration: "08:20", isActive: false },
      { id: "l-23", title: "Lịch sử phát triển của GPT", duration: "08:20", isActive: false },
    ]
  },
  {
    id: "chap-2",
    title: "Chương 2: Prompt Engineering",
    lessons: [
      { id: "l-3", title: "Kỹ thuật Zero-shot & Few-shot", duration: "15:30", isActive: false },
      { id: "l-4", title: "Chain of Thought Prompting", duration: "22:10", isActive: false },
      { id: "l-41", title: "Chain of Thought Prompting", duration: "22:10", isActive: false },
      { id: "l-42", title: "Chain of Thought Prompting", duration: "22:10", isActive: false },
      { id: "l-43", title: "Chain of Thought Prompting", duration: "22:10", isActive: false },
    ]
  }
];

export default function InstructorLessonDetail() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    // BỌC NGOÀI CÙNG: Khóa cứng chiều cao, không cho phép cuộn
    <div className="w-full h-full flex flex-col bg-slate-50 overflow-hidden font-sans">
      
      {/* ===================== HEADER ===================== */}
      <div className="h-16 shrink-0 border-b border-slate-200 flex items-center justify-between px-6 bg-white shadow-sm z-30">
        <Button asChild variant="ghost" className="text-slate-500 hover:text-slate-800 font-bold -ml-2">
          <Link to="/courses/1">
            <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại Course
          </Link>
        </Button>

        <div className="hidden md:flex items-center gap-3">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 font-bold">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Đã xuất bản
          </Badge>
          <span className="font-semibold text-slate-400 text-sm">Cập nhật: 2 ngày trước</span>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="text-slate-600 border-slate-200 hover:bg-slate-50 font-bold">
            <Settings className="w-4 h-4 mr-2" /> Cài đặt
          </Button>
          <Button className="bg-[#0B56D5] hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20">
            <Sparkles className="w-4 h-4 mr-2" /> TẠO QUIZ BẰNG AI
          </Button>
        </div>
      </div>

      {/* ===================== BODY (Chứa 2 cột) ===================== */}
      {/* Thẻ này khóa cứng (overflow-hidden), chiếm phần chiều cao còn lại */}
      <div className="flex-1 flex overflow-hidden w-full">
        
        {/* CỘT TRÁI: Nội dung (Video, Tabs...) */}
        <main className="flex-1 h-full overflow-y-auto bg-slate-50">
          
          <div className="w-full bg-slate-900 aspect-video max-h-[60vh] relative flex flex-col items-center justify-center shrink-0">
            <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 hover:scale-110 transition-transform cursor-pointer">
              <PlayCircle className="w-8 h-8 text-white ml-1" />
            </div>
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <h2 className="text-white font-bold text-xl drop-shadow-md">Khái niệm cơ bản về Transformer</h2>
            </div>
          </div>

          <div className="bg-white border-b border-slate-200 px-6 pt-2 sticky top-0 z-20 shrink-0">
            <div className="flex gap-6">
              {[
                { id: "overview", label: "Tổng quan", icon: BarChart3 },
                { id: "content", label: "Nội dung", icon: Edit3 },
                { id: "qa", label: "Hỏi đáp (12)", icon: MessageSquare },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 pt-2 flex items-center gap-2 font-bold text-sm border-b-2 transition-colors ${
                    activeTab === tab.id 
                      ? "border-[#0B56D5] text-[#0B56D5]" 
                      : "border-transparent text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <tab.icon className="w-4 h-4" /> {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dùng h-[1000px] để test thanh cuộn bên trái */}
          <div className="p-6 md:px-8 pb-20 w-full min-h-[1000px]">
            {activeTab === "overview" && (
              <div className="grid grid-cols-3 gap-6 mb-6">
                <div className="bg-white p-5 rounded-2xl border shadow-sm"><p>Lượt xem: 1,284</p></div>
                <div className="bg-white p-5 rounded-2xl border shadow-sm"><p>Hoàn thành: 86%</p></div>
                <div className="bg-white p-5 rounded-2xl border shadow-sm"><p>Tương tác: 45</p></div>
              </div>
            )}
            <div className="bg-white p-6 rounded-2xl border shadow-sm">
              Nội dung siêu dài bên trái để test scroll. Cuộn thoải mái nhé!
            </div>
          </div>
        </main>

        {/* CỘT PHẢI: Danh sách bài học */}
        {/* Khóa khung right bằng h-full và flex-col */}
        <aside className="w-full lg:w-[400px] bg-white border-l border-slate-200 flex flex-col h-full shrink-0 shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)]">
          
          {/* Header cột phải: Dùng shrink-0 để không bị ép nhỏ lại */}
          <div className="p-5 border-b border-slate-100 shrink-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-800 uppercase tracking-tight">Danh sách bài học</h3>
              <Button size="icon" variant="ghost" className="text-[#0B56D5]">
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Khu vực danh sách: Dùng flex-1 overflow-y-auto để chỉ cuộn phần này */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-6">
            {SYLLABUS.map((chapter) => (
              <div key={chapter.id}>
                <div className="flex items-center justify-between mb-3 px-2">
                  <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">{chapter.title}</h4>
                </div>
                <div className="space-y-1.5">
                  {chapter.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      className={`w-full text-left flex items-start gap-3 p-3 rounded-xl transition-all ${
                        lesson.isActive 
                          ? "bg-blue-50 border border-blue-200 shadow-sm" 
                          : "hover:bg-slate-50 border border-transparent"
                      }`}
                    >
                      <PlayCircle className={`w-5 h-5 shrink-0 mt-0.5 ${lesson.isActive ? "text-[#0B56D5]" : "text-slate-400"}`} />
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-bold leading-tight ${lesson.isActive ? "text-[#0B56D5]" : "text-slate-700"}`}>
                          {lesson.title}
                        </p>
                        <p className="text-xs font-semibold text-slate-400 mt-1">{lesson.duration}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full border-dashed border-slate-300 text-slate-500 hover:text-[#0B56D5] mt-4 mb-4">
              + Thêm bài học mới
            </Button>
          </div>

        </aside>

      </div>
    </div>
  );
}