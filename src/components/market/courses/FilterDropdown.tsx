import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface FilterDropdownProps {
  label: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ options, value, onChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <motion.button
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.97 }}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium min-w-[140px] justify-between cursor-pointer ${
          open
            ? "border-blue-500 bg-blue-50 text-blue-600"
            : "border-gray-200 bg-white text-gray-600 hover:border-blue-300"
        }`}
        style={{ transition: "border-color 0.2s, color 0.2s, background-color 0.2s" }}
      >
        <span>{value}</span>
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
        >
          <ChevronDown className={`w-4 h-4 ${open ? "text-blue-500" : "text-gray-400"}`} />
        </motion.div>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: EASE_OUT_EXPO }}
            className="absolute top-full left-0 mt-1.5 bg-white border border-gray-100 rounded-xl shadow-xl z-50 min-w-full overflow-hidden"
          >
            {options.map((opt) => (
              <motion.button
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                whileHover={{ backgroundColor: opt === value ? undefined : "rgba(0,0,0,0.03)" }}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between cursor-pointer ${
                  value === opt ? "bg-blue-50 text-blue-600 font-bold" : "text-gray-600"
                }`}
              >
                {opt}
                {value === opt && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};