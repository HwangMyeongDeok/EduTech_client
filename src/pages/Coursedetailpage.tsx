import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Users,
  Clock,
  Bot,
  ChevronDown,
  ChevronUp,
  Lock,
  Play,
  CheckCircle2,
  Target,
  Sparkles,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { COURSES, formatPrice, type Course, type Chapter } from "@/data/courses.data";
import { CourseThumbnail } from "@/components/courses/CourseThumbnail";
import { Button } from "@/components/ui/button";

// ─── Star renderer ─────────────────────────────────────────────────────────────
const StarRating: React.FC<{ rating: number; size?: string }> = ({ rating, size = "w-4 h-4" }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        className={`${size} ${s <= Math.round(rating) ? "fill-amber-400 text-amber-400" : "fill-muted text-muted"}`}
      />
    ))}
  </div>
);

// ─── Chapter Accordion ─────────────────────────────────────────────────────────
const ChapterAccordion: React.FC<{ chapter: Chapter; defaultOpen?: boolean }> = ({ chapter, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-border rounded-2xl overflow-hidden transition-all duration-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/50 transition-colors"
      >
        <div className="text-left">
          <p className="text-[11px] font-bold tracking-widest text-primary uppercase">{chapter.part}</p>
          <p className="font-semibold text-foreground text-sm mt-0.5">{chapter.title}</p>
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />}
      </button>

      {open && (
        <div className="border-t border-border bg-muted/20">
          {chapter.lessons.map((lesson, i) => (
            <div
              key={lesson.id}
              className={`flex items-center gap-3 px-5 py-3 transition-colors ${
                i < chapter.lessons.length - 1 ? "border-b border-border/50" : ""
              } ${lesson.isLocked ? "opacity-60" : "hover:bg-muted/50 cursor-pointer"}`}
            >
              {lesson.isLocked ? (
                <Lock className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              ) : (
                <Play className="w-4 h-4 text-primary flex-shrink-0" />
              )}
              <span className="flex-1 text-sm text-foreground">{lesson.title}</span>
              {lesson.duration && (
                <span className="text-xs text-muted-foreground font-mono">{lesson.duration}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Sticky Sidebar Card ───────────────────────────────────────────────────────
const StickyPurchaseCard: React.FC<{ course: Course }> = ({ course }) => (
  <div className="sticky top-24">
    <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-xl shadow-black/5">
      {/* Thumbnail */}
      <div className="h-44 overflow-hidden">
        <CourseThumbnail thumbnail={course.thumbnail} className="w-full h-full" />
      </div>

      <div className="p-5">
        {/* Price */}
        <div className="flex items-baseline gap-2 mb-4">
          <span className={`text-3xl font-black ${course.isFree ? "text-emerald-500" : "text-foreground"}`}>
            {formatPrice(course.price, course.isFree)}
          </span>
          {course.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">{formatPrice(course.originalPrice)}</span>
          )}
        </div>

        {/* CTA */}
        <Button className="w-full h-12 rounded-xl font-bold text-base bg-primary hover:bg-primary/90 shadow-sm shadow-primary/30 mb-4">
          Đăng ký ngay
        </Button>

        {/* Meta */}
        <div className="space-y-3 pt-3 border-t border-border">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>Thời lượng</span>
            </div>
            <span className="font-semibold text-foreground">{course.duration}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Bot className="w-4 h-4" />
              <span>Hỗ trợ AI</span>
            </div>
            <span className="font-semibold text-foreground">24/7</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>Học viên</span>
            </div>
            <span className="font-semibold text-foreground">{course.studentCount.toLocaleString("vi-VN")}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// ─── Main Detail Page ──────────────────────────────────────────────────────────
const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const course = COURSES.find((c) => c.slug === slug);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [slug]);

  if (!course) {
    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
          <span className="text-6xl">😕</span>
          <h2 className="text-2xl font-bold">Không tìm thấy khóa học</h2>
          <Button onClick={() => navigate("/courses")}>Quay lại danh sách</Button>
        </div>
      </>
    );
  }

  return (
    <>
      {/* ── HERO (dark) ── */}
      <section
        ref={heroRef}
        className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-8 pb-16 overflow-hidden"
      >
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-64 bg-primary/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          {/* Back link */}
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Trở lại danh sách
          </Link>

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left: content */}
            <div className="flex-1 animate-fadeInLeft">
              {/* Badge */}
              {course.isNew && (
                <div className="inline-flex items-center gap-1.5 bg-primary/20 text-primary text-xs font-bold px-3 py-1.5 rounded-full border border-primary/30 mb-4">
                  <Sparkles className="w-3 h-3" />
                  Khóa học được đề xuất
                </div>
              )}

              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
                {course.title}
              </h1>
              <p className="text-slate-300 text-base leading-relaxed mb-6 max-w-xl">
                {course.description}
              </p>

              {/* Rating row */}
              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-2">
                  <StarRating rating={course.rating} />
                  <span className="text-amber-400 font-bold">{course.rating}</span>
                  <span className="text-slate-400 text-sm">({course.reviewCount.toLocaleString()} đánh giá)</span>
                </div>
                <div className="flex items-center gap-2 text-slate-300">
                  <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                    {course.instructor.split(" ").pop()?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 uppercase tracking-wider">Giảng viên</p>
                    <p className="text-sm font-semibold text-white">{course.instructor}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: purchase card (desktop) */}
            <div className="hidden lg:block w-72 flex-shrink-0 animate-fadeInRight">
              <StickyPurchaseCard course={course} />
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-12">

            {/* Course details */}
            <section className="animate-fadeInUp">
              <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-5">
                <BookOpen className="w-5 h-5 text-primary" />
                Chi tiết khóa học
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{course.description}</p>

              {/* Target + Requirements */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Target className="w-4 h-4 text-primary" />
                    <h3 className="font-bold text-sm text-foreground">Đối tượng học</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{course.target}</p>
                </div>
                <div className="bg-card border border-border rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <h3 className="font-bold text-sm text-foreground">Yêu cầu đầu vào</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {course.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Curriculum */}
            <section className="animate-fadeInUp delay-100">
              <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-5">
                <Play className="w-5 h-5 text-primary" />
                Lộ trình học bài bản
              </h2>
              <div className="space-y-3">
                {course.chapters.map((chapter, i) => (
                  <ChapterAccordion key={chapter.id} chapter={chapter} defaultOpen={i === 0} />
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="animate-fadeInUp delay-200">
              <h2 className="flex items-center gap-2 text-xl font-bold text-foreground mb-5">
                <MessageSquare className="w-5 h-5 text-primary" />
                Phản hồi từ học viên
              </h2>
              <div className="space-y-4">
                {course.reviews.map((review) => (
                  <div key={review.id} className="bg-card border border-border rounded-2xl p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{review.author}</p>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} size="w-3.5 h-3.5" />
                    </div>
                    <p className="text-sm text-muted-foreground italic">"{review.content}"</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar (desktop sticky) */}
          <div className="hidden lg:block w-72 flex-shrink-0">
            <StickyPurchaseCard course={course} />
          </div>
        </div>

        {/* Mobile purchase bar */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur border-t border-border p-4 flex items-center justify-between z-50">
          <div>
            <p className="font-black text-xl text-foreground">{formatPrice(course.price, course.isFree)}</p>
            {course.originalPrice && (
              <p className="text-xs text-muted-foreground line-through">{formatPrice(course.originalPrice)}</p>
            )}
          </div>
          <Button className="h-11 px-8 rounded-xl font-bold bg-primary hover:bg-primary/90">
            Đăng ký ngay
          </Button>
        </div>
      </div>
    </>
  );
};

export default CourseDetailPage;