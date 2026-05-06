import React, { useState } from "react";
import { ChevronDown, Lock, Play } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { type Chapter } from "@/data/courses.data";
import { fadeInUp, EASE_OUT_EXPO } from "@/lib/motion";

interface ChapterAccordionProps {
  chapter: Chapter;
  defaultOpen?: boolean;
  index: number;
}

export const ChapterAccordion: React.FC<ChapterAccordionProps> = ({
  chapter,
  defaultOpen = false,
  index,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <motion.div
      variants={fadeInUp}
      custom={index * 0.05}
      className="border border-border rounded-2xl overflow-hidden"
    >
      <motion.button
        onClick={() => setOpen(!open)}
        whileHover={{ backgroundColor: "rgba(0,0,0,0.02)" }}
        className="w-full flex items-center justify-between px-6 py-5 cursor-pointer"
      >
        <div className="text-left">
          <p className="text-[10px] font-bold tracking-[0.18em] uppercase text-primary mb-1">
            {chapter.part}
          </p>
          <p className="font-semibold text-foreground text-sm">
            {chapter.title}
          </p>
        </div>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
        >
          <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
        </motion.div>
      </motion.button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="overflow-hidden border-t border-border"
          >
            {chapter.lessons.map((lesson, i) => (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04, duration: 0.25 }}
                className={`flex items-center gap-4 px-6 py-3.5 ${
                  i < chapter.lessons.length - 1 ? "border-b border-border/40" : ""
                } ${lesson.isLocked ? "opacity-60" : "cursor-pointer"}`}
                {...(!lesson.isLocked && {
                  whileHover: { backgroundColor: "rgba(11,86,213,0.03)" },
                })}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                    lesson.isLocked ? "bg-muted" : "bg-primary/10"
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
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};