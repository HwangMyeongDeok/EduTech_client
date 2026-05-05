import { useState } from "react";
import { motion } from "framer-motion"; // Thay thế useInView
import { useCounter } from "@/hooks/useCounter";

export function StatCard({ 
  value, 
  label, 
  suffix = "", 
  delay = 0 
}: { 
  value: number; 
  label: string; 
  suffix?: string; 
  delay?: number 
}) {
  // Dùng state để biết khi nào số bắt đầu chạy
  const [startCount, setStartCount] = useState(false);
  const count = useCounter(value, 1800, startCount);

  return (
    <motion.div
      // Hiệu ứng Reveal
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ 
        duration: 0.6, 
        delay: delay / 1000, 
        ease: "easeOut" 
      }}
      // Khi lọt vào tầm mắt thì kích hoạt chạy số
      onViewportEnter={() => setStartCount(true)}
      className="text-center"
    >
      <div className="text-4xl md:text-5xl font-extrabold text-[#0B56D5] mb-1 tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-sm font-medium text-slate-500">{label}</div>
    </motion.div>
  );
}