import React from "react";
import { Clock, Bot } from "lucide-react";
import { motion } from "framer-motion";
import { formatPrice, type Course } from "@/data/courses.data";
import { CourseThumbnail } from "@/components/market/courses/CourseThumbnail";
import { Button } from "@/components/ui/button";
import { fadeInRight, EASE_OUT_EXPO } from "@/lib/motion";

interface StickyPurchaseCardProps {
  course: Course;
}

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

export const StickyPurchaseCard: React.FC<StickyPurchaseCardProps> = ({ course }) => {
  return (
    <motion.div
      variants={fadeInRight}
      initial="hidden"
      animate="visible"
      custom={0.3}
      className="sticky top-24"
    >
      <motion.div
        whileHover={{ boxShadow: "0 32px 64px rgba(11,86,213,0.14)", y: -2 }}
        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
        className="relative rounded-3xl overflow-hidden border border-border/60 bg-card shadow-xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-indigo-500/10 pointer-events-none" />

        <div className="relative h-48 overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
            className="w-full h-full"
          >
            <CourseThumbnail
              thumbnail={course.thumbnail}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {course.isNew && (
            <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider bg-blue-600 text-white px-2.5 py-1 rounded-full shadow">
              MỚI
            </span>
          )}
        </div>

        <div className="p-6 relative">
          <div className="flex items-end gap-3 mb-6">
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

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="mb-5">
            <Button
              className="w-full h-12 rounded-xl font-bold text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/30 cursor-pointer"
            >
              🚀 Đăng ký ngay
            </Button>
          </motion.div>

          <div className="flex items-center justify-between text-xs text-muted-foreground mb-5">
            <div className="flex items-center gap-1">
              ⭐ {course.rating}
              <span className="text-[10px]">
                ({course.reviewCount})
              </span>
            </div>
            <div>👨‍🎓 {course.studentCount.toLocaleString("vi-VN")}</div>
          </div>

          <div className="h-px bg-border my-4" />

          <div className="space-y-3.5">
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
      </motion.div>
    </motion.div>
  );
};