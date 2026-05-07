import React, { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, COURSES, type Category } from "@/data/courses.data";
import { staggerContainer, EASE_OUT_EXPO } from "@/lib/motion";
import { CourseCard } from "@/components/market/courses/CourseCard";
import { FilterDropdown } from "@/components/market/courses/FilterDropdown";

const CoursesPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("Tất cả");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("Mới nhất");
  const [priceFilter, setPriceFilter] = useState("Mọi mức giá");
  const [ratingFilter, setRatingFilter] = useState("Tất cả đánh giá");
  const [page, setPage] = useState(1);
  const PER_PAGE = 8;

  // Kích hoạt khi có ít nhất 1 filter được thay đổi
  const hasActiveFilters =
    activeCategory !== "Tất cả" ||
    search.trim() !== "" ||
    priceFilter !== "Mọi mức giá" ||
    ratingFilter !== "Tất cả đánh giá" ||
    sortBy !== "Mới nhất";

  // Hàm xóa toàn bộ bộ lọc
  const handleClearFilters = () => {
    setActiveCategory("Tất cả");
    setSearch("");
    setPriceFilter("Mọi mức giá");
    setRatingFilter("Tất cả đánh giá");
    setSortBy("Mới nhất");
    setPage(1);
  };

  const filtered = useMemo(() => {
    let list = [...COURSES];
    if (activeCategory !== "Tất cả") list = list.filter((c) => c.category === activeCategory);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) => c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q)
      );
    }
    if (priceFilter === "Miễn phí") list = list.filter((c) => c.isFree || c.price === 0);
    else if (priceFilter === "Có phí") list = list.filter((c) => !c.isFree && c.price > 0);
    if (ratingFilter === "4.5+") list = list.filter((c) => c.rating >= 4.5);
    else if (ratingFilter === "4.0+") list = list.filter((c) => c.rating >= 4.0);
    else if (ratingFilter === "3.5+") list = list.filter((c) => c.rating >= 3.5);
    if (sortBy === "Phổ biến nhất") list.sort((a, b) => b.studentCount - a.studentCount);
    else if (sortBy === "Đánh giá cao") list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "Giá thấp nhất") list.sort((a, b) => a.price - b.price);
    return list;
  }, [activeCategory, search, sortBy, priceFilter, ratingFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  useEffect(() => {
    setPage(1);
  }, [activeCategory, search, sortBy, priceFilter, ratingFilter]);

  const handlePageChange = (p: number) => {
    setPage(p);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#EEF2FF]">
      {/* ── Hero / Header section ── */}
      <section className="relative z-20 bg-[#EEF2FF] pt-14 pb-8 border-b border-blue-100/60">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            {/* Left: Badge + Title + Desc */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
              className="max-w-xl"
            >
              <div className="inline-flex items-center gap-2 bg-blue-600/10 text-blue-600 text-[11px] font-bold px-3 py-1.5 rounded-full mb-5 tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                TINH HOA TRI THỨC
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight mb-3">
                Khám phá{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
                  Khóa học
                </span>
              </h1>
              <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                Hệ thống bài giảng thông minh trích xuất từ cộng đồng chuyên gia toàn cầu.
              </p>
            </motion.div>
          </div>

          {/* Filter bar + Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: EASE_OUT_EXPO }}
            className="flex flex-col md:flex-row md:items-center gap-4 mt-8 pt-6 border-t border-blue-100/80"
          >
            {/* Left: Filter */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-gray-400 tracking-widest mr-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                LỌC THEO:
              </div>

              <FilterDropdown
                label="Mức giá"
                options={["Mọi mức giá", "Miễn phí", "Có phí"]}
                value={priceFilter}
                onChange={setPriceFilter}
              />

              <FilterDropdown
                label="Sắp xếp"
                options={["Mới nhất", "Phổ biến nhất", "Đánh giá cao", "Giá thấp nhất"]}
                value={sortBy}
                onChange={setSortBy}
              />

              <FilterDropdown
                label="Đánh giá"
                options={["Tất cả đánh giá", "4.5+", "4.0+", "3.5+"]}
                value={ratingFilter}
                onChange={setRatingFilter}
              />

              {/* Nút Clear Filters */}
              <AnimatePresence>
                {hasActiveFilters && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8, x: -10 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.8, x: -10 }}
                    whileTap={{ scale: 0.94 }}
                    onClick={handleClearFilters}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-red-500 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                    style={{ transition: "background-color 0.2s, color 0.2s" }}
                  >
                    <X className="w-4 h-4" />
                    <span>Xóa lọc</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Search */}
            <div className="w-full md:w-80 md:ml-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Tìm nội dung bạn muốn học..."
                  className="w-full pl-11 pr-10 h-11 rounded-xl border border-gray-200 bg-white shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400"
                  style={{ transition: "box-shadow 0.2s, border-color 0.2s" }}
                />
                <AnimatePresence>
                  {search && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.7 }}
                      onClick={() => setSearch("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-10">
        <div className="flex gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT_EXPO }}
            className="hidden lg:block w-56 flex-shrink-0"
          >
            <div className="sticky top-6">
              <p className="text-[10px] font-black tracking-widest text-gray-400 mb-4 uppercase">
                Chủ đề chính
              </p>
              <nav className="flex flex-col gap-1">
                {CATEGORIES.map((cat) => (
                  <motion.button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    whileHover={activeCategory !== cat ? { x: 3 } : {}}
                    whileTap={{ scale: 0.97 }}
                    className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between cursor-pointer ${activeCategory === cat
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                        : "text-gray-600 hover:bg-white hover:text-blue-600"
                      }`}
                    style={{ transition: "background-color 0.2s, color 0.2s" }}
                  >
                    {cat}
                    {activeCategory === cat && (
                      <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
                    )}
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.aside>

          {/* Grid */}
          <div className="flex-1 min-w-0 min-h-[600px]">
            {/* Mobile pills */}
            <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-6 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16 xl:-mx-24 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 scrollbar-hide">
              {CATEGORIES.map((cat) => (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border cursor-pointer ${activeCategory === cat
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-200 bg-white text-gray-600"
                    }`}
                  style={{ transition: "background-color 0.2s, color 0.2s, border-color 0.2s" }}
                >
                  {cat}
                </motion.button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {paged.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-dashed border-gray-200 text-center"
                >
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-7 h-7 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-700 mb-2">Không tìm thấy kết quả</h3>
                  <p className="text-gray-400 text-sm max-w-xs">
                    Vui lòng thử từ khóa hoặc bộ lọc khác.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleClearFilters}
                    className="mt-5 px-5 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-blue-400 hover:text-blue-600 bg-white cursor-pointer"
                    style={{ transition: "border-color 0.2s, color 0.2s" }}
                  >
                    Xóa toàn bộ lọc
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key={`page-${page}-${activeCategory}-${search}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5"
                  >
                    {paged.map((course, i) => (
                      <CourseCard key={course.id} course={course} index={i} />
                    ))}
                  </motion.div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center gap-2 mt-14 pt-8 border-t border-blue-100/60">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                        <motion.button
                          key={p}
                          onClick={() => handlePageChange(p)}
                          whileHover={
                            page !== p ? { scale: 1.08, borderColor: "#93c5fd", color: "#2563eb" } : {}
                          }
                          whileTap={{ scale: 0.93 }}
                          animate={page === p ? { scale: 1.12 } : { scale: 1 }}
                          transition={{ duration: 0.2 }}
                          className={`w-10 h-10 rounded-xl text-sm font-bold cursor-pointer ${page === p
                              ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                              : "bg-white border border-gray-200 text-gray-600"
                            }`}
                        >
                          {p}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;