import { motion } from "framer-motion";
import type { InstructorCardData } from "@/data/instructor.data";
import { ChevronRight, Sparkles, Star, Users } from "lucide-react";
import { fadeInUp, iconHover } from "@/lib/motion";

export function StarRow({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={
            i <= Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
    </div>
  );
}

export function InstructorCard({ d }: { d: InstructorCardData }) {
  return (
    <motion.div
      variants={fadeInUp}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className={`relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex flex-col cursor-pointer ${d.featured ? "ring-2 ring-blue-500/20" : ""
        }`}
    >
      {/* Glassmorphism featured badge */}
      {d.featured && (
        <div className="absolute -top-2.5 -right-2.5 bg-blue-600/90 backdrop-blur-sm text-white text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-blue-500/30 border border-blue-400/30">
          <Sparkles className="w-2.5 h-2.5" /> Nổi bật
        </div>
      )}

      <div className="mb-3">
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${d.specialtyColor}`}
        >
          {d.specialty}
        </span>
      </div>

      <div className="flex items-start gap-3 mb-4">
        <motion.div
          variants={iconHover}
          className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${d.avatarBg}`}
        >
          <Users className="w-5 h-5 text-white" />
        </motion.div>
        <div>
          <p className="font-bold text-sm tracking-tight text-gray-900 leading-tight">
            {d.name}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">{d.subName}</p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed mb-5 line-clamp-2 flex-1">
        {d.description}
      </p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1.5">
          <StarRow rating={d.rating} />
          <span className="text-xs font-semibold text-gray-700">{d.rating}</span>
          <span className="text-[10px] text-muted-foreground">({d.ratingCount})</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
          <Users className="w-3 h-3" />
          {d.students}
        </div>
      </div>

      <motion.button
        whileHover={{ x: 3 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="text-xs font-semibold text-blue-600 flex items-center gap-1 self-start cursor-pointer"
      >
        Tìm hiểu thêm <ChevronRight className="w-3.5 h-3.5" />
      </motion.button>
    </motion.div>
  );
}