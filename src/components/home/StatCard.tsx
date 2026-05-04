import { useEffect, useRef, useState } from "react";
import { useCounter } from "@/hooks/useCounter";

export function StatCard({ value, label, suffix = "", delay = 0 }: { value: number; label: string; suffix?: string; delay?: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const count = useCounter(value, 1800, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className="reveal text-center"
    >
      <div className="text-4xl md:text-5xl font-extrabold text-[#0B56D5] mb-1 tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-sm font-medium text-slate-500">{label}</div>
    </div>
  );
}