import React from "react";
import { Star, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { formatPrice, type Course } from "@/data/courses.data";
import { fadeInUp, EASE_OUT_EXPO } from "@/lib/motion";

// ─── Category color map ────────────────────────────────────────────────────────
const categoryColors: Record<string, string> = {
  BACKEND: "bg-emerald-500/20 text-emerald-700",
  DESIGN: "bg-pink-500/20 text-pink-700",
  "AI & DATA SCIENCE": "bg-violet-500/20 text-violet-700",
  "WEB DEVELOPMENT": "bg-blue-500/20 text-blue-700",
  DEVOPS: "bg-cyan-500/20 text-cyan-700",
  CYBERSECURITY: "bg-amber-500/20 text-amber-700",
  "COMPUTER SCIENCE": "bg-rose-500/20 text-rose-700",
  CLOUD: "bg-sky-500/20 text-sky-700",
  "MOBILE APP": "bg-indigo-500/20 text-indigo-700",
};

interface CourseCardProps {
  course: Course;
  index: number;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, index }) => {
  const navigate = useNavigate();

  const colorClass = categoryColors[course.categoryLabel] ?? "bg-gray-200/60 text-gray-600";

  const goToDetail = () => {
    navigate(`/courses/${course.slug}`);
  };

  return (
    <motion.div
      variants={fadeInUp}
      custom={(index % 4) * 0.07}
      whileHover={{
        y: -8,
        boxShadow: "0 24px 48px rgba(11,86,213,0.12)",
        transition: { duration: 0.25, ease: EASE_OUT_EXPO },
      }}
      onClick={goToDetail}
      className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col h-full cursor-pointer"
    >
      {/* ─── Thumbnail ─── */}
      <div className="relative h-44 overflow-hidden bg-gray-100">
        <motion.img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-full object-cover"
          loading="lazy"
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-80 pointer-events-none" />

        {/* Category */}
        <span
          className={`absolute top-3 left-3 text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full backdrop-blur-md ${colorClass} bg-white/80`}
        >
          {course.categoryLabel}
        </span>

        {/* New badge */}
        {course.isNew && (
          <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wider bg-blue-600 text-white px-2.5 py-1 rounded-full shadow-md">
            MỚI
          </span>
        )}
      </div>

      {/* ─── Body ─── */}
      <div className="p-5 flex flex-col flex-1">
        {/* Stats */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-md">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span className="text-sm font-bold text-amber-600">{course.rating}</span>
          </div>

          <div className="flex items-center gap-1 text-gray-400">
            <Users className="w-3.5 h-3.5" />
            <span className="text-xs">{course.studentCount.toLocaleString("vi-VN")}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="font-bold text-gray-900 text-[16px] leading-snug mb-1.5 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-xs text-gray-400 mb-4">{course.instructor}</p>

        <div className="mt-auto" />

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <div
              className={`font-extrabold text-lg ${
                course.isFree ? "text-emerald-500" : "text-gray-900"
              }`}
            >
              {formatPrice(course.price, course.isFree)}
            </div>

            {course.originalPrice && (
              <div className="text-xs text-gray-400 line-through">
                {formatPrice(course.originalPrice)}
              </div>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={(e) => {
              e.stopPropagation();
              goToDetail();
            }}
            className="h-9 px-4 rounded-xl text-sm font-bold bg-blue-600 text-white shadow-sm cursor-pointer"
          >
            Vào học
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};