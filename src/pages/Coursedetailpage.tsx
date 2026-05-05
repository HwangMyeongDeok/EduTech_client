import React, { useState, useEffect } from "react";
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
  Shield,
  Zap,
  Trophy,
} from "lucide-react";
import { COURSES, formatPrice, type Course, type Chapter } from "@/data/courses.data";
import { CourseThumbnail } from "@/components/courses/CourseThumbnail";
import { Button } from "@/components/ui/button";

// ─── Star renderer ─────────────────────────────────────────────────────────────
const StarRating: React.FC<{ rating: number; size?: string }> = ({
  rating,
  size = "w-4 h-4",
}) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((s) => (
      <Star
        key={s}
        className={`${size} ${s <= Math.round(rating)
            ? "fill-amber-400 text-amber-400"
            : "fill-slate-200 text-slate-200"
          }`}
      />
    ))}
  </div>
);

// ─── Chapter Accordion ─────────────────────────────────────────────────────────
const ChapterAccordion: React.FC<{
  chapter: Chapter;
  defaultOpen?: boolean;
  index: number;
}> = ({ chapter, defaultOpen = false, index }) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-muted/30 transition-colors cursor-pointer"
      >
        <div className="text-left">
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-primary mb-0.5">
            {chapter.part}
          </p>
          <p className="font-semibold text-foreground text-sm">
            {chapter.title}
          </p>
        </div>
        {open ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        )}
      </button>

      {open && (
        <div className="border-t border-border">
          {chapter.lessons.map((lesson, i) => (
            <div
              key={lesson.id}
              className={`flex items-center gap-4 px-6 py-3 transition-colors ${i < chapter.lessons.length - 1 ? "border-b border-border/40" : ""
                } ${lesson.isLocked ? "opacity-60" : "hover:bg-muted/20 cursor-pointer"}`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${lesson.isLocked ? "bg-muted" : "bg-primary/10"
                  }`}
              >
                {lesson.isLocked ? (
                  <Lock className="w-3 h-3 text-muted-foreground" />
                ) : (
                  <Play className="w-2.5 h-2.5 text-primary ml-0.5" />
                )}
              </div>
              <span className="flex-1 text-sm text-foreground/80">{lesson.title}</span>
              {lesson.duration && (
                <span className="text-xs text-muted-foreground font-mono">
                  {lesson.duration}
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─── Sticky Sidebar Card ───────────────────────────────────────────────────────
const StickyPurchaseCard: React.FC<{ course: Course }> = ({ course }) => {
  return (
    <div className="sticky top-24">
      <div className="relative rounded-3xl overflow-hidden border border-border/60 bg-card shadow-xl">

        {/* Glow background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 pointer-events-none" />

        {/* ─── Thumbnail ─── */}
        <div className="relative h-48 overflow-hidden">
          <CourseThumbnail
            thumbnail={course.thumbnail}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* badge */}
          {course.isNew && (
            <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider bg-blue-600 text-white px-2.5 py-1 rounded-full shadow">
              MỚI
            </span>
          )}
        </div>

        {/* ─── Content ─── */}
        <div className="p-6 relative">

          {/* Price */}
          <div className="flex items-end gap-3 mb-5">
            <span
              className={`text-3xl font-black tracking-tight ${course.isFree
                  ? "text-emerald-500"
                  : "bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent"
                }`}
            >
              {formatPrice(course.price, course.isFree)}
            </span>

            {course.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {formatPrice(course.originalPrice)}
              </span>
            )}
          </div>

          {/* CTA */}
          <Button
            className="w-full h-12 rounded-xl font-bold text-sm mb-5 transition-all duration-300
            bg-gradient-to-r from-blue-600 to-indigo-600 text-white
            shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
          >
            🚀 Đăng ký ngay
          </Button>

          {/* Trust info */}
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
            <div className="flex items-center gap-1">
              ⭐ {course.rating}
              <span className="text-[10px]">
                ({course.reviewCount})
              </span>
            </div>
            <div>👨‍🎓 {course.studentCount.toLocaleString("vi-VN")}</div>
          </div>

          {/* Divider */}
          <div className="h-px bg-border my-4" />

          {/* Meta */}
          <div className="space-y-3">
            <MetaRow
              icon={<Clock className="w-4 h-4" />}
              label="Thời lượng"
              value={course.duration}
            />
            <MetaRow
              icon={<Bot className="w-4 h-4" />}
              label="Hỗ trợ AI"
              value="24/7"
              highlight
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const MetaRow: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}> = ({ icon, label, value, highlight }) => (
  <div className="flex items-center justify-between text-sm">
    <div className="flex items-center gap-2 text-muted-foreground">
      <span>{icon}</span>
      <span>{label}</span>
    </div>
    <span className={`font-semibold ${highlight ? "text-primary" : "text-foreground"}`}>
      {value}
    </span>
  </div>
);

// ─── Section Header (border-left style like in screenshot) ────────────────────
const SectionHeader: React.FC<{
  icon: React.ReactNode;
  title: string;
}> = ({ icon, title }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
      {icon}
    </div>
    <h2 className="text-lg font-bold text-foreground">{title}</h2>
  </div>
);

// ─── Main Detail Page ──────────────────────────────────────────────────────────
const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const course = COURSES.find((c) => c.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <span className="text-6xl">😕</span>
        <h2 className="text-2xl font-bold">Không tìm thấy khóa học</h2>
        <Button onClick={() => navigate("/courses")}>Quay lại danh sách</Button>
      </div>
    );
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-slate-950 via-[#0d1525] to-slate-950 pt-8 pb-16 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-1/4 w-[600px] h-[350px] bg-primary/8 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-blue-500/6 rounded-full blur-[80px]" />
          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          {/* Back link */}
          <Link
            to="/courses"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-8 group cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Trở lại danh sách
          </Link>

          {/* Hero content — full width, no sidebar here */}
          <div className="max-w-3xl">
            {/* Badge */}
            {course.isNew && (
              <div className="inline-flex items-center gap-1.5 bg-primary/15 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/25 mb-4">
                <Sparkles className="w-3 h-3" />
                Khóa học được đề xuất
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-4 tracking-tight">
              {course.title}
            </h1>

            <p className="text-slate-300/80 text-[15px] leading-relaxed mb-7 max-w-2xl">
              {course.description}
            </p>

            {/* Rating + Instructor */}
            <div className="flex flex-wrap items-center gap-5">
              {/* Stars */}
              <div className="flex items-center gap-2">
                <StarRating rating={course.rating} />
                <span className="text-amber-400 font-bold text-base leading-none">
                  {course.rating}
                </span>
                <span className="text-slate-400 text-sm">
                  ({course.reviewCount.toLocaleString()} đánh giá)
                </span>
              </div>

              <div className="w-px h-5 bg-white/10 hidden sm:block" />

              {/* Instructor */}
              <div className="flex items-center gap-2.5">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0 ring-2 ring-primary/40"
                  style={{ background: "hsl(var(--primary))" }}
                >
                  {course.instructor.split(" ").pop()?.charAt(0)}
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold leading-none mb-0.5">
                    Giảng viên
                  </p>
                  <p className="text-sm font-semibold text-white">{course.instructor}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-10 lg:py-14">
        <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">

          {/* ── Main content ── */}
          <div className="flex-1 min-w-0 space-y-10">

            {/* Chi tiết khóa học */}
            <section className="space-y-6">
              <SectionHeader
                icon={<BookOpen className="w-4 h-4" />}
                title="Chi tiết khóa học"
              />

              <p className="text-muted-foreground leading-relaxed text-[15px] max-w-3xl">
                {course.description}
              </p>

              <div className="grid sm:grid-cols-2 gap-5">
                {/* Target */}
                <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2.5 mb-3">
                    <Target className="w-4 h-4 text-primary flex-shrink-0" />
                    <h3 className="font-semibold text-sm text-foreground">Đối tượng học</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {course.target}
                  </p>
                </div>

                {/* Requirements */}
                <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors">
                  <div className="flex items-center gap-2.5 mb-3">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    <h3 className="font-semibold text-sm text-foreground">Yêu cầu đầu vào</h3>
                  </div>
                  <ul className="space-y-2">
                    {course.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-[6px] flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Lộ trình */}
            <section className="space-y-5">
              <SectionHeader
                icon={<Play className="w-4 h-4" />}
                title="Lộ trình học bài bản"
              />
              <div className="space-y-3">
                {course.chapters.map((chapter, i) => (
                  <ChapterAccordion
                    key={chapter.id}
                    chapter={chapter}
                    defaultOpen={i === 0}
                    index={i}
                  />
                ))}
              </div>
            </section>

            {/* Reviews */}
            <section className="space-y-5">
              <SectionHeader
                icon={<MessageSquare className="w-4 h-4" />}
                title="Phản hồi từ học viên"
              />

              <div className="space-y-4">
                {course.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-card border border-border rounded-xl p-5 hover:border-primary/20 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-muted-foreground ring-1 ring-border flex-shrink-0">
                          <Users className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{review.author}</p>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} size="w-3.5 h-3.5" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      "{review.content}"
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* ── Sidebar ── */}
          <div className="hidden lg:block w-[320px] xl:w-[360px] flex-shrink-0">
            <StickyPurchaseCard course={course} />
          </div>
        </div>
      </div>

      {/* ── Mobile purchase bar ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-card/95 backdrop-blur-xl border-t border-border px-4 sm:px-6 py-3 flex items-center justify-between">
          <div>
            <p
              className={`font-black text-xl leading-none ${course.isFree ? "text-emerald-500" : "text-foreground"
                }`}
            >
              {formatPrice(course.price, course.isFree)}
            </p>
            {course.originalPrice && (
              <p className="text-xs text-muted-foreground line-through mt-0.5">
                {formatPrice(course.originalPrice)}
              </p>
            )}
          </div>
          <Button
            className="h-11 px-6 rounded-xl font-bold"
            style={{ background: "hsl(var(--primary))" }}
          >
            Đăng ký ngay
          </Button>
        </div>
      </div>
    </>
  );
};

export default CourseDetailPage;