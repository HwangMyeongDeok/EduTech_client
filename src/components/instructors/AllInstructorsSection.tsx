"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Sparkles } from "lucide-react";
import { staggerContainerFast, VIEWPORT_ONCE } from "@/lib/motion";
import { allInstructors, categoryTabs } from "@/data/instructor.data";
import { InstructorCard } from "@/components/instructors/InstructorCard";
import { Reveal } from "@/components/instructors/Reveal";

export function AllInstructorsSection() {
  const [activeTab, setActiveTab] = useState<string>("all");

  // 1. Thêm logic lọc ở đây
  // Lưu ý: Cậu kiểm tra lại trong file instructor.data.ts xem field category của instructor tên là gì nhé (ví dụ: 'category', 'categoryId', 'type'...)
  // Ở đây mình ví dụ nó là trường 'categoryId'
  const filteredInstructors = activeTab === "all" 
    ? allInstructors 
    : allInstructors.filter((instructor) => instructor.categoryId === activeTab);

  // Tính số lượng chuyên gia sau khi lọc để hiển thị lên nút (tuỳ chọn cho xịn)
  const count = filteredInstructors.length;

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        {/* Header */}
        <Reveal className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-1 mb-1">
              <Users className="w-3 h-3" /> Hỗ trợ lọc
            </p>
            <p className="text-sm text-muted-foreground">Tìm kiếm theo chuyên ngành</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-sm shadow-blue-500/20 cursor-pointer"
          >
            <Sparkles className="w-3 h-3" /> {count} Chuyên gia
          </motion.button>
        </Reveal>

        {/* Tabs */}
        <Reveal delay={0.07} className="flex gap-2 flex-wrap mb-10">
          {categoryTabs.map((tab) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 cursor-pointer ${
                activeTab === tab.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm shadow-blue-500/20"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {tab.label}
            </motion.button>
          ))}
        </Reveal>

        {/* Grid */}
        <motion.div
          // 2. Thêm key vào motion.div để animation chạy lại mỗi khi đổi tab
          key={activeTab}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainerFast} initial="hidden" whileInView="visible" viewport={VIEWPORT_ONCE}
        >
          {/* 3. Thay allInstructors thành filteredInstructors */}
          {filteredInstructors.length > 0 ? (
            filteredInstructors.map((d) => (
              <InstructorCard key={d.id} d={d} />
            ))
          ) : (
            <div className="col-span-full text-center py-10 text-muted-foreground">
              Không tìm thấy giảng viên nào trong chuyên mục này.
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}