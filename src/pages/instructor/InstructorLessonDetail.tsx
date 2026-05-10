import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, PlayCircle, Sparkles, 
  Edit3, MessageSquare, BarChart3, 
  CheckCircle2, Loader2, Trash2, Check, Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- MOCK DATA ---
const SYLLABUS = [
  {
    id: "chap-1",
    title: "Chương 1: Giới thiệu về LLMs",
    lessons: [
      { id: "l-1", title: "Khái niệm cơ bản về Transformer", duration: "12:45", isActive: true },
      { id: "l-2", title: "Lịch sử phát triển của GPT", duration: "08:20", isActive: false },
    ]
  },
  {
    id: "chap-2",
    title: "Chương 2: Prompt Engineering",
    lessons: [
      { id: "l-3", title: "Kỹ thuật Zero-shot & Few-shot", duration: "15:30", isActive: false },
      { id: "l-4", title: "Chain of Thought Prompting", duration: "22:10", isActive: false },
    ]
  }
];

const MOCK_AI_QUESTIONS = [
  {
    id: 1,
    question: "Cơ chế chính giúp Transformer xử lý song song là gì?",
    options: [
      { text: "Recurrent Neural Network", isCorrect: false },
      { text: "Self-Attention", isCorrect: true },
      { text: "Backpropagation", isCorrect: false },
      { text: "Convolutional Layer", isCorrect: false },
    ]
  },
  {
    id: 2,
    question: "Kiến trúc gốc của Transformer gồm những phần nào?",
    options: [
      { text: "Chỉ Encoder", isCorrect: false },
      { text: "Chỉ Decoder", isCorrect: false },
      { text: "Encoder và Decoder", isCorrect: true },
      { text: "Input và Output", isCorrect: false },
    ]
  },
  {
    id: 3,
    question: "Kỹ thuật nào giúp mô hình Transformer hiểu được thứ tự của các từ trong câu?",
    options: [
      { text: "Positional Encoding", isCorrect: true },
      { text: "Word Embedding", isCorrect: false },
      { text: "Layer Normalization", isCorrect: false },
      { text: "Softmax Layer", isCorrect: false },
    ]
  }
];

export default function InstructorLessonDetail() {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Trạng thái điều hướng màn hình: 'lesson' | 'generating' | 'review'
  const [viewState, setViewState] = useState<"lesson" | "generating" | "review">("lesson");
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Logic fake loading AI
  useEffect(() => {
    if (viewState === "generating") {
      setLoadingProgress(0);
      const interval = setInterval(() => {
        setLoadingProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setViewState("review"), 500); // Chờ nửa giây ở 100% rồi chuyển màn
            return 100;
          }
          // Tăng random từ 5% đến 20% mỗi 400ms cho giống người thật đang chạy
          return prev + Math.floor(Math.random() * 15) + 5; 
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [viewState]);

  const handleGenerateAI = () => {
    setViewState("generating");
  };

  // ===================== MÀN HÌNH LOADING AI =====================
  if (viewState === "generating") {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-slate-50 font-sans">
        <div className="max-w-md w-full p-8 bg-white rounded-3xl border border-slate-200 shadow-xl shadow-blue-900/5 text-center flex flex-col items-center">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6 relative">
            <Sparkles className="w-10 h-10 text-[#0B56D5] animate-pulse relative z-10" />
            <div className="absolute inset-0 border-4 border-blue-200 rounded-full border-t-[#0B56D5] animate-spin"></div>
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-2">AI đang phân tích bài giảng...</h2>
          <p className="text-slate-500 font-medium mb-8">Vui lòng đợi một chút, chúng tôi đang trích xuất kiến thức cốt lõi để tạo bộ câu hỏi trắc nghiệm.</p>
          
          {/* Progress Bar */}
          <div className="w-full">
            <div className="flex justify-between text-sm font-bold text-slate-600 mb-2">
              <span>Tiến trình</span>
              <span className="text-[#0B56D5]">{loadingProgress}%</span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-blue-500 to-[#0B56D5] rounded-full transition-all duration-300 ease-out"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ===================== MÀN HÌNH REVIEW QUIZ AI =====================
  if (viewState === "review") {
    return (
      <div className="w-full h-full flex flex-col bg-slate-50 font-sans">
        {/* Header Review */}
        <div className="h-20 shrink-0 border-b border-slate-200 flex items-center justify-between px-6 bg-white shadow-sm z-30 sticky top-0">
          <div className="flex items-center gap-4">
            <Button onClick={() => setViewState("lesson")} variant="ghost" size="icon" className="text-slate-500 hover:text-slate-800">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="font-black text-xl text-slate-800 tracking-tight">Review AI Quiz</h1>
              <p className="text-sm font-medium text-slate-500 mt-0.5">Bài học: Khái niệm cơ bản về Transformer</p>
            </div>
          </div>

          <Button className="bg-[#0B56D5] hover:bg-blue-700 text-white font-bold h-11 px-6 rounded-xl shadow-md shadow-blue-500/20">
            <CheckCircle2 className="w-5 h-5 mr-2" /> Xác nhận & Lưu Quiz
          </Button>
        </div>

        {/* List Câu hỏi */}
        <div className="flex-1 overflow-y-auto p-6 md:p-10">
          <div className="max-w-4xl mx-auto space-y-6">
            {MOCK_AI_QUESTIONS.map((q, index) => (
              <div key={q.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative group hover:shadow-md transition-shadow">
                
                {/* Nút Xóa (Hiển thị khi hover) */}
                <Button variant="ghost" size="icon" className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-rose-500 hover:bg-rose-50">
                  <Trash2 className="w-5 h-5" />
                </Button>

                {/* Tiêu đề câu hỏi */}
                <div className="flex gap-4 items-start mb-6 pr-10">
                  <div className="w-8 h-8 shrink-0 bg-slate-900 text-white rounded-full flex items-center justify-center font-black text-sm mt-0.5">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 leading-snug">{q.question}</h3>
                </div>

                {/* Các đáp án */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-0 md:pl-12">
                  {q.options.map((opt, i) => (
                    <div 
                      key={i} 
                      className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        opt.isCorrect 
                          ? 'border-emerald-500 bg-emerald-50/50' 
                          : 'border-slate-100 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        opt.isCorrect ? 'border-emerald-500 bg-emerald-500' : 'border-slate-300'
                      }`}>
                        {opt.isCorrect && <Check className="w-3 h-3 text-white" strokeWidth={4} />}
                      </div>
                      <span className={`font-semibold text-sm ${opt.isCorrect ? 'text-emerald-800' : 'text-slate-600'}`}>
                        {opt.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Nút thêm câu hỏi thủ công */}
            <Button variant="outline" className="w-full h-14 border-dashed border-2 border-slate-300 text-slate-500 hover:text-[#0B56D5] hover:border-[#0B56D5] hover:bg-blue-50 font-bold rounded-2xl transition-colors">
              <Plus className="w-5 h-5 mr-2" /> Thêm câu hỏi thủ công
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // ===================== MÀN HÌNH BÀI HỌC (MẶC ĐỊNH) =====================
  return (
    <div className="w-full h-full flex flex-col bg-slate-50 overflow-hidden font-sans">
      
      <div className="h-16 shrink-0 border-b border-slate-200 flex items-center justify-between px-6 bg-white shadow-sm z-30">
        <Button asChild variant="ghost" className="text-slate-500 hover:text-slate-800 font-bold -ml-2">
          <Link to="/instructor/courses/1">
            <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại Course
          </Link>
        </Button>

        <div className="hidden md:flex items-center gap-3">
          <Badge variant="outline" className="bg-emerald-50 text-emerald-600 border-emerald-200 font-bold">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Đã xuất bản
          </Badge>
          <span className="font-semibold text-slate-400 text-sm">Cập nhật: 2 ngày trước</span>
        </div>

        {/* Đã xóa nút "Cài đặt" theo yêu cầu */}
        <div className="flex items-center gap-3">
          <Button 
            onClick={handleGenerateAI}
            className="bg-[#0B56D5] hover:bg-blue-700 text-white font-bold rounded-xl shadow-md shadow-blue-500/20"
          >
            <Sparkles className="w-4 h-4 mr-2" /> TẠO QUIZ BẰNG AI
          </Button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden w-full">
        
        {/* CỘT TRÁI */}
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

        {/* CỘT PHẢI */}
        <aside className="w-full lg:w-[400px] bg-white border-l border-slate-200 flex flex-col h-full shrink-0 shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)]">
          <div className="p-5 border-b border-slate-100 shrink-0 bg-white z-10">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-black text-slate-800 uppercase tracking-tight">Danh sách bài học</h3>
              <Button size="icon" variant="ghost" className="text-[#0B56D5]">
                <Edit3 className="w-4 h-4" />
              </Button>
            </div>
          </div>

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