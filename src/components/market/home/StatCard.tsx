import { useState } from "react";
import { motion } from "framer-motion";
import { useCounter } from "@/hooks/useCounter";
import { EASE_OUT_EXPO } from "@/lib/motion";

export function StatCard({
  value,
  label,
  suffix = "",
  delay = 0,
}: {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}) {
  const [startCount, setStartCount] = useState(false);
  const count = useCounter(value, 1800, startCount);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.65, delay: delay / 1000, ease: EASE_OUT_EXPO }}
      onViewportEnter={() => setStartCount(true)}
      className="text-center px-4"
    >
      <motion.div
        className="text-4xl md:text-5xl font-extrabold text-[#0B56D5] mb-2 tabular-nums"
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.2 }}
      >
        {count}{suffix}
      </motion.div>
      <div className="text-sm font-medium text-slate-500 leading-snug">{label}</div>
    </motion.div>
  );
}