import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  Play,
  CheckCircle2,
  Target,
  Sparkles,
  BookOpen,
  MessageSquare,
} from "lucide-react";
import { motion } from "framer-motion";
import { COURSES, formatPrice } from "@/data/courses.data";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer, VIEWPORT_ONCE, EASE_OUT_EXPO } from "@/lib/motion";

import { StarRating } from "@/components/market/course-detail/StarRating";
import { SectionHeader } from "@/components/market/course-detail/SectionHeader";
import { ChapterAccordion } from "@/components/market/course-detail/ChapterAccordion";
import { StickyPurchaseCard } from "@/components/market/course-detail/StickyPurchaseCard";

const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const course = COURSES.find((c) => c.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [slug]);

  if (!course) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center min-h-[60vh] gap-5"
      >
        <span className="text-6xl">😕</span>
        <h2 className="text-2xl font-bold">Không tìm thấy khóa học</h2>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Button onClick={() => navigate("/courses")}>Quay lại danh sách</Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative bg-gradient-to-br from-slate-950 via-[#0d1525] to-slate-950 pt-8 pb-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 left-1/4 w-[600px] h-[350px] bg-primary/8 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-blue-500/6 rounded-full blur-[80px]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `linear-gradient(hsl(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)`,
              backgroundSize: "64px 64px",
            }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          >
            <motion.div whileHover={{ x: -3 }}>
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm mb-10 group cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Trở lại danh sách
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            {course.isNew && (
              <motion.div variants={fadeInUp} custom={0}>
                <div className="inline-flex items-center gap-1.5 bg-primary/15 text-primary text-xs font-semibold px-3 py-1 rounded-full border border-primary/25 mb-5">
                  <Sparkles className="w-3 h-3" />
                  Khóa học được đề xuất
                </div>
              </motion.div>
            )}

            <motion.h1
              variants={fadeInUp}
              custom={0.05}
              className="text-4xl md:text-5xl font-black text-white leading-[1.1] mb-5 tracking-tight"
            >
              {course.title}
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              custom={0.12}
              className="text-slate-300/80 text-[15px] leading-relaxed mb-8 max-w-2xl"
            >
              {course.description}
            </motion.p>

            <motion.div
              variants={fadeInUp}
              custom={0.18}
              className="flex flex-wrap items-center gap-5"
            >
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── BODY ── */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-14">
          <div className="flex-1 min-w-0 space-y-12">

            {/* Chi tiết khóa học */}
            <motion.section
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT_ONCE}
              className="space-y-6"
            >
              <SectionHeader icon={<BookOpen className="w-4 h-4" />} title="Chi tiết khóa học" />
              <motion.p
                variants={fadeInUp}
                custom={0}
                className="text-muted-foreground leading-relaxed text-[15px] max-w-3xl"
              >
                {course.description}
              </motion.p>

              <motion.div variants={staggerContainer} className="grid sm:grid-cols-2 gap-5">
                <motion.div
                  variants={fadeInUp}
                  custom={0.05}
                  whileHover={{ y: -3, borderColor: "hsl(var(--primary) / 0.35)" }}
                  transition={{ duration: 0.2 }}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <Target className="w-4 h-4 text-primary flex-shrink-0" />
                    <h3 className="font-semibold text-sm text-foreground">Đối tượng học</h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{course.target}</p>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  custom={0.1}
                  whileHover={{ y: -3, borderColor: "hsl(var(--primary) / 0.35)" }}
                  transition={{ duration: 0.2 }}
                  className="bg-card border border-border rounded-2xl p-6"
                >
                  <div className="flex items-center gap-2.5 mb-4">
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
                </motion.div>
              </motion.div>
            </motion.section>

            {/* Lộ trình */}
            <section className="space-y-5">
              <SectionHeader icon={<Play className="w-4 h-4" />} title="Lộ trình học bài bản" />
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                className="space-y-3"
              >
                {course.chapters.map((chapter, i) => (
                  <ChapterAccordion key={chapter.id} chapter={chapter} defaultOpen={i === 0} index={i} />
                ))}
              </motion.div>
            </section>

            {/* Reviews */}
            <section className="space-y-5">
              <SectionHeader icon={<MessageSquare className="w-4 h-4" />} title="Phản hồi từ học viên" />
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={VIEWPORT_ONCE}
                className="space-y-4"
              >
                {course.reviews.map((review, i) => (
                  <motion.div
                    key={review.id}
                    variants={fadeInUp}
                    custom={i * 0.07}
                    whileHover={{ y: -3, borderColor: "hsl(var(--primary) / 0.2)" }}
                    transition={{ duration: 0.2 }}
                    className="bg-card border border-border rounded-2xl p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-indigo-500/20 flex items-center justify-center text-primary ring-1 ring-border flex-shrink-0">
                          <Users className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{review.author}</p>
                          <p className="text-xs text-muted-foreground">{review.date}</p>
                        </div>
                      </div>
                      <StarRating rating={review.rating} size="w-3.5 h-3.5" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed italic">
                      "{review.content}"
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </section>
          </div>

          {/* ── Sidebar ── */}
          <div className="hidden lg:block w-[320px] xl:w-[360px] flex-shrink-0">
            <StickyPurchaseCard course={course} />
          </div>
        </div>
      </div>

      {/* ── Mobile purchase bar ── */}
      <motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.4 }}
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50"
      >
        <div className="bg-card/95 backdrop-blur-xl border-t border-border px-4 sm:px-6 py-3.5 flex items-center justify-between">
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
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.96 }}>
            <Button
              className="h-11 px-6 rounded-xl font-bold cursor-pointer"
              style={{ background: "hsl(var(--primary))" }}
            >
              Đăng ký ngay
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default CourseDetailPage;