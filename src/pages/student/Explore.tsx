"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Star, BookOpen, Clock, ChevronLeft, Filter, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CATEGORIES = ["Tất cả", "Frontend", "Backend", "UI/UX Design", "AI & Data", "Mobile"];

const ALL_COURSES = [
  { id: 1, title: "Mastering Large Language Models", price: "2.500.000đ", rating: 4.9, bg: "bg-slate-900", icon: "🧠", category: "AI & Data", lessons: 42, duration: "12h 30m" },
  { id: 2, title: "UI/UX Design cho Mobile App", price: "1.500.000đ", rating: 4.8, bg: "bg-indigo-600", icon: "✨", category: "UI/UX Design", lessons: 28, duration: "8h 15m" },
  { id: 3, title: "Làm chủ Spring Boot 3.x", price: "1.200.000đ", rating: 4.9, bg: "bg-emerald-600", icon: "🍃", category: "Backend", lessons: 55, duration: "18h 00m" },
  { id: 4, title: "Phát triển Web với React & Next.js", price: "Miễn phí", rating: 4.7, bg: "bg-teal-500", icon: "⚛️", category: "Frontend", lessons: 34, duration: "10h 45m" },
  { id: 5, title: "Xây dựng App đa nền tảng với Flutter", price: "1.800.000đ", rating: 4.8, bg: "bg-blue-500", icon: "📱", category: "Mobile", lessons: 60, duration: "22h 10m" },
  { id: 6, title: "Vue.js 3 Composition API & Pinia", price: "990.000đ", rating: 4.7, bg: "bg-emerald-500", icon: "🖖", category: "Frontend", lessons: 25, duration: "7h 20m" },
  { id: 7, title: "Backend API với Node.js & Express", price: "1.400.000đ", rating: 4.9, bg: "bg-green-600", icon: "⚙️", category: "Backend", lessons: 40, duration: "14h 00m" },
  { id: 8, title: "Machine Learning cơ bản với Python", price: "2.800.000đ", rating: 5.0, bg: "bg-amber-500", icon: "📊", category: "AI & Data", lessons: 85, duration: "30h 45m" },
  { id: 9, title: "Làm chủ Design System với Figma", price: "1.200.000đ", rating: 4.9, bg: "bg-pink-500", icon: "🎨", category: "UI/UX Design", lessons: 32, duration: "9h 30m" },
  { id: 10, title: "iOS Development với Swift & SwiftUI", price: "2.000.000đ", rating: 4.8, bg: "bg-orange-500", icon: "🍎", category: "Mobile", lessons: 50, duration: "16h 00m" },
  { id: 11, title: "Nghệ thuật CSS Animation đỉnh cao", price: "Miễn phí", rating: 4.6, bg: "bg-cyan-500", icon: "💫", category: "Frontend", lessons: 15, duration: "3h 45m" },
  { id: 12, title: "Kiến trúc Microservices với Golang", price: "3.000.000đ", rating: 5.0, bg: "bg-sky-500", icon: "🐹", category: "Backend", lessons: 70, duration: "25h 00m" },
  { id: 13, title: "Phân tích dữ liệu Data Analytics Bootcamp", price: "1.900.000đ", rating: 4.7, bg: "bg-violet-600", icon: "📈", category: "AI & Data", lessons: 48, duration: "15h 20m" },
  { id: 14, title: "Tâm lý học hành vi trong UI/UX Design", price: "800.000đ", rating: 4.8, bg: "bg-rose-500", icon: "💡", category: "UI/UX Design", lessons: 20, duration: "5h 15m" },
];

export default function Explore() {
  const navigate = useNavigate();
  const [activeTag, setActiveTag] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");

  // State Filter
  const [showFilters, setShowFilters] = useState(false);
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all");
  const [ratingFilter, setRatingFilter] = useState<"all" | "4.8" | "4.9">("all");

  const filteredCourses = ALL_COURSES.filter(course => {
    const matchCategory = activeTag === "Tất cả" || course.category === activeTag;
    const matchSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchPrice =
      priceFilter === "all" ||
      (priceFilter === "free" && course.price === "Miễn phí") ||
      (priceFilter === "paid" && course.price !== "Miễn phí");
    const matchRating =
      ratingFilter === "all" ||
      (ratingFilter === "4.8" && course.rating >= 4.8) ||
      (ratingFilter === "4.9" && course.rating >= 4.9);

    return matchCategory && matchSearch && matchPrice && matchRating;
  });

  const activeFiltersCount = (priceFilter !== "all" ? 1 : 0) + (ratingFilter !== "all" ? 1 : 0);

  return (
    <div className="space-y-8 pb-10 px-4 md:px-0">
      <div className="space-y-4">
        <Button
          variant="ghost" size="sm" onClick={() => navigate(-1)}
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

          {/* Vùng Search và Filter Nổi */}
          <div className="flex w-full md:w-auto items-center gap-3 relative z-40">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="text"
                placeholder="Tìm kiếm khóa học..."
                className="pl-10 pr-10 h-12 rounded-2xl bg-white border-slate-200 focus-visible:ring-[#0B56D5] shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant={showFilters || activeFiltersCount > 0 ? "default" : "outline"}
              className={`h-12 px-5 rounded-2xl shadow-sm transition-all relative ${showFilters || activeFiltersCount > 0 ? "bg-[#0B56D5] text-white hover:bg-blue-700" : "bg-white text-slate-600 hover:bg-slate-50 border-slate-200"}`}
            >
              <Filter className="w-4 h-4 md:mr-2" />
              <span className="font-bold hidden md:inline">Lọc</span>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md border-2 border-white">
                  {activeFiltersCount}
                </span>
              )}
            </Button>

            {/* BẢNG LỌC NỔI (DROP-DOWN) CAO CẤP */}
            <AnimatePresence>
              {showFilters && (
                <>
                  {/* Backdrop trong suốt để click ra ngoài đóng filter (tuỳ chọn) */}
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="fixed inset-0 z-40 hidden md:block"
                    onClick={() => setShowFilters(false)}
                  />

                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 top-full mt-3 w-[calc(100vw-32px)] md:w-[380px] bg-white rounded-3xl shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)] border border-slate-100 z-50 p-6 origin-top-right"
                  >
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="font-black text-slate-800 text-lg flex items-center gap-2">
                        <Filter className="w-5 h-5 text-[#0B56D5]" /> Lọc nâng cao
                      </h3>
                      <button onClick={() => setShowFilters(false)} className="w-8 h-8 flex items-center justify-center bg-slate-100 text-slate-500 rounded-full hover:bg-slate-200 hover:text-slate-700 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-6">
                      {/* Segmented Control: Giá */}
                      <div>
                        <p className="text-sm font-bold text-slate-700 mb-3">Phân loại giá</p>
                        <div className="flex bg-slate-100/80 p-1 rounded-xl">
                          {[{ id: "all", label: "Tất cả" }, { id: "free", label: "Miễn phí" }, { id: "paid", label: "Có phí" }].map(item => (
                            <button
                              key={item.id}
                              onClick={() => setPriceFilter(item.id as any)}
                              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${priceFilter === item.id ? "bg-white text-[#0B56D5] shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Segmented Control: Đánh giá */}
                      <div>
                        <p className="text-sm font-bold text-slate-700 mb-3">Đánh giá tối thiểu</p>
                        <div className="flex bg-slate-100/80 p-1 rounded-xl">
                          {[{ id: "all", label: "Tất cả" }, { id: "4.8", label: "Từ 4.8 ⭐" }, { id: "4.9", label: "Từ 4.9 ⭐" }].map(item => (
                            <button
                              key={item.id}
                              onClick={() => setRatingFilter(item.id as any)}
                              className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all duration-300 ${ratingFilter === item.id ? "bg-white text-amber-500 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                            >
                              {item.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex gap-3 pt-4 border-t border-slate-100">
                      {activeFiltersCount > 0 && (
                        <Button variant="ghost" onClick={() => { setPriceFilter("all"); setRatingFilter("all"); }} className="flex-1 font-bold text-rose-500 hover:text-rose-600 hover:bg-rose-50 h-11 rounded-xl">
                          Xóa bộ lọc
                        </Button>
                      )}
                      <Button onClick={() => setShowFilters(false)} className={`flex-1 font-bold h-11 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-all active:scale-95 ${activeFiltersCount === 0 && "w-full"}`}>
                        Áp dụng & Xem
                      </Button>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Tabs Category kiểu Apple */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-slate-100 pb-4">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveTag(category)}
            className={`whitespace-nowrap px-4 py-2 text-sm font-bold rounded-full transition-all duration-300 ${activeTag === category
                ? "bg-slate-900 text-white shadow-md shadow-slate-900/20"
                : "bg-transparent text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Danh sách Card */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 relative z-10">
        {filteredCourses.length > 0 ? (
          filteredCourses.map((course, idx) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (idx % 10) * 0.05 }}
              onClick={() => navigate(`/student/course-detail/${course.id}`)}
            >
              <Card className="rounded-3xl overflow-hidden cursor-pointer group hover:shadow-[0_20px_40px_rgba(11,86,213,0.1)] transition-all border-slate-100 h-full flex flex-col bg-white">
                <CardContent className="p-3 flex-1 flex flex-col">
                  <div className={`w-full h-40 ${course.bg} rounded-2xl relative flex items-center justify-center mb-4 overflow-hidden`}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 transform -translate-x-full" />

                    <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wider">
                      {course.category}
                    </div>
                    <span className="text-6xl drop-shadow-xl group-hover:scale-110 transition-transform duration-500 relative z-10">{course.icon}</span>
                  </div>

                  <div className="flex items-center gap-1 text-amber-500 mb-2">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span className="text-xs font-bold text-slate-700">{course.rating}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-800 leading-snug mb-3 group-hover:text-[#0B56D5] transition-colors line-clamp-2">
                    {course.title}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium mb-4 mt-auto">
                    <span className="flex items-center gap-1.5"><BookOpen className="w-3.5 h-3.5" /> {course.lessons} bài</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {course.duration}</span>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className={`text-base font-black ${course.price === "Miễn phí" ? "text-emerald-500" : "text-[#0B56D5]"}`}>
                      {course.price}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-slate-700 font-bold text-xl mb-2">Không tìm thấy kết quả</h3>
            <p className="text-slate-400 font-medium max-w-sm">Thử thay đổi từ khóa tìm kiếm hoặc điều chỉnh lại bộ lọc để xem các khóa học khác nhé.</p>
          </div>
        )}
      </motion.div>
    </div>
  );
}