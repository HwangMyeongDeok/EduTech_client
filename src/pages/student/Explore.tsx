"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, Star, BookOpen, Clock, ChevronLeft } from "lucide-react"; // Thêm ChevronLeft
import { useNavigate } from "react-router-dom";

// Tích hợp shadcn/ui
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const CATEGORIES = ["Tất cả", "Frontend", "Backend", "UI/UX Design", "AI & Data", "Mobile"];

const ALL_COURSES = [
  { id: 1, title: "Mastering Large Language Models", price: "2.500.000đ", rating: 4.9, bg: "bg-slate-900", icon: "🧠", category: "AI & Data", lessons: 42, duration: "12h 30m" },
  { id: 2, title: "UI/UX Design cho Mobile App", price: "1.500.000đ", rating: 4.8, bg: "bg-indigo-600", icon: "✨", category: "UI/UX Design", lessons: 28, duration: "8h 15m" },
  { id: 3, title: "Làm chủ Spring Boot 3.x", price: "1.200.000đ", rating: 4.9, bg: "bg-emerald-600", icon: "🍃", category: "Backend", lessons: 55, duration: "18h 00m" },
  { id: 4, title: "Phát triển Web với React & Next.js", price: "Miễn phí", rating: 4.7, bg: "bg-teal-500", icon: "⚛️", category: "Frontend", lessons: 34, duration: "10h 45m" },
];

export default function Explore() {
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCourses = ALL_COURSES.filter(course => {
    const matchCategory = activeTag === "Tất cả" || course.category === activeTag;
    const matchSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="space-y-8 pb-10 px-4 md:px-0">
      {/* Nút Back & Header Section */}
      <div className="space-y-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate(-1)} // Quay lại trang trước đó trong lịch sử
          className="group p-0 hover:bg-transparent text-slate-500 hover:text-[#0B56D5] transition-colors"
        >
          <ChevronLeft className="w-5 h-5 mr-1 group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold">Quay lại</span>
        </Button>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3 mb-2">
              Khám phá tri thức <Sparkles className="w-6 h-6 text-[#0B56D5]" />
            </h1>
            <p className="text-slate-500 font-medium">Hàng trăm khóa học chất lượng cao đang chờ bạn chinh phục.</p>
          </div>
          
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              type="text" 
              placeholder="Tìm kiếm khóa học..." 
              className="pl-10 h-12 rounded-xl bg-white border-slate-200 focus-visible:ring-[#0B56D5] shadow-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Categories Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES.map(category => (
          <Badge 
            key={category}
            variant={activeTag === category ? "default" : "secondary"}
            className={`cursor-pointer px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-all border-none ${
              activeTag === category 
                ? "bg-[#0B56D5] text-white hover:bg-blue-700 shadow-md shadow-blue-200" 
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
            }`}
            onClick={() => setActiveTag(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Danh sách Card */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => navigate(`/student/course-detail/${course.id}`)}
            >
              <Card className="rounded-3xl overflow-hidden cursor-pointer group hover:shadow-[0_20px_40px_rgba(11,86,213,0.1)] transition-all border-slate-100 h-full flex flex-col">
                <CardContent className="p-3 flex-1 flex flex-col">
                  <div className={`w-full h-40 ${course.bg} rounded-2xl relative flex items-center justify-center mb-4`}>
                    <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider">
                      {course.category}
                    </div>
                    <span className="text-6xl drop-shadow-xl group-hover:scale-110 transition-transform duration-500">{course.icon}</span>
                  </div>
                  
                  <div className="flex items-center gap-1 text-amber-500 mb-2">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-bold text-slate-700">{course.rating}</span>
                  </div>
                  
                  <h3 className="text-base font-bold text-slate-800 leading-snug mb-3 group-hover:text-[#0B56D5] transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mb-4">
                    <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5"/> {course.lessons} bài</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5"/> {course.duration}</span>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-base font-black text-[#0B56D5]">{course.price}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <p className="text-slate-400 font-medium text-lg">Không tìm thấy khóa học nào phù hợp.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}