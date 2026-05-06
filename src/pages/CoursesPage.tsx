import React, { useState, useMemo, useEffect, useRef } from "react";
import { Search, SlidersHorizontal, Star, Users, ChevronDown, Sparkles, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CATEGORIES, COURSES, formatPrice, type Category, type Course } from "@/data/courses.data";
import { fadeInUp, staggerContainer, scaleIn, VIEWPORT_ONCE, EASE_OUT_EXPO } from "@/lib/motion";

// ─── Category color map ────────────────────────────────────────────────────────
const categoryColors: Record<string, string> = {
    BACKEND: "bg-emerald-500/20 text-emerald-700",
    DESIGN: "bg-pink-500/20 text-pink-700",
    "AI & DATA SCIENCE": "bg-violet-500/20 text-violet-700",
    "WEB DEVELOPMENT": "bg-blue-500/20 text-blue-700",
    DEVOPS: "bg-cyan-500/20 text-cyan-700",
    CYBERSECURITY: "bg-amber-500/20 text-amber-700",
    "COMPUTER SCIENCE": "bg-rose-500/20 text-rose-700",
    CLOUD: "bg-sky-500/20 text-sky-700",
    "MOBILE APP": "bg-indigo-500/20 text-indigo-700",
};

// ─── Course Card ───────────────────────────────────────────────────────────────
const CourseCard: React.FC<{ course: Course; index: number }> = ({ course, index }) => {
    const navigate = useNavigate();

    const colorClass =
        categoryColors[course.categoryLabel] ??
        "bg-gray-200/60 text-gray-600";

    const goToDetail = () => {
        navigate(`/courses/${course.slug}`);
    };

    return (
        <motion.div
            variants={fadeInUp}
            custom={(index % 4) * 0.07}
            whileHover={{
                y: -8,
                boxShadow: "0 24px 48px rgba(11,86,213,0.12)",
                transition: { duration: 0.25, ease: EASE_OUT_EXPO },
            }}
            onClick={goToDetail}
            className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm flex flex-col h-full cursor-pointer"
        >
            {/* ─── Thumbnail ─── */}
            <div className="relative h-44 overflow-hidden bg-gray-100">
                <motion.img
                    src={course.thumbnail}
                    alt={course.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent opacity-80 pointer-events-none" />

                {/* Category */}
                <span
                    className={`absolute top-3 left-3 text-[10px] font-bold tracking-widest px-2.5 py-1 rounded-full backdrop-blur-md ${colorClass} bg-white/80`}
                >
                    {course.categoryLabel}
                </span>

                {/* New badge */}
                {course.isNew && (
                    <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wider bg-blue-600 text-white px-2.5 py-1 rounded-full shadow-md">
                        MỚI
                    </span>
                )}
            </div>

            {/* ─── Body ─── */}
            <div className="p-5 flex flex-col flex-1">
                {/* Stats */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-1 rounded-md">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-sm font-bold text-amber-600">
                            {course.rating}
                        </span>
                    </div>

                    <div className="flex items-center gap-1 text-gray-400">
                        <Users className="w-3.5 h-3.5" />
                        <span className="text-xs">
                            {course.studentCount.toLocaleString("vi-VN")}
                        </span>
                    </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 text-[16px] leading-snug mb-1.5 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    {course.title}
                </h3>

                {/* Instructor */}
                <p className="text-xs text-gray-400 mb-4">
                    {course.instructor}
                </p>

                <div className="mt-auto" />

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div>
                        <div
                            className={`font-extrabold text-lg ${
                                course.isFree
                                    ? "text-emerald-500"
                                    : "text-gray-900"
                            }`}
                        >
                            {formatPrice(course.price, course.isFree)}
                        </div>

                        {course.originalPrice && (
                            <div className="text-xs text-gray-400 line-through">
                                {formatPrice(course.originalPrice)}
                            </div>
                        )}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={(e) => {
                            e.stopPropagation();
                            goToDetail();
                        }}
                        className="h-9 px-4 rounded-xl text-sm font-bold bg-blue-600 text-white shadow-sm cursor-pointer"
                    >
                        Vào học
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

// ─── Filter Dropdown ───────────────────────────────────────────────────────────
const FilterDropdown: React.FC<{ label: string; options: string[]; value: string; onChange: (v: string) => void }> = ({ label, options, value, onChange }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
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
                        {options.map(opt => (
                            <motion.button
                                key={opt}
                                onClick={() => { onChange(opt); setOpen(false); }}
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

// ─── Main Page ─────────────────────────────────────────────────────────────────
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
        if (activeCategory !== "Tất cả") list = list.filter(c => c.category === activeCategory);
        if (search.trim()) { const q = search.toLowerCase(); list = list.filter(c => c.title.toLowerCase().includes(q) || c.instructor.toLowerCase().includes(q)); }
        if (priceFilter === "Miễn phí") list = list.filter(c => c.isFree || c.price === 0);
        else if (priceFilter === "Có phí") list = list.filter(c => !c.isFree && c.price > 0);
        if (ratingFilter === "4.5+") list = list.filter(c => c.rating >= 4.5);
        else if (ratingFilter === "4.0+") list = list.filter(c => c.rating >= 4.0);
        else if (ratingFilter === "3.5+") list = list.filter(c => c.rating >= 3.5);
        if (sortBy === "Phổ biến nhất") list.sort((a, b) => b.studentCount - a.studentCount);
        else if (sortBy === "Đánh giá cao") list.sort((a, b) => b.rating - a.rating);
        else if (sortBy === "Giá thấp nhất") list.sort((a, b) => a.price - b.price);
        return list;
    }, [activeCategory, search, sortBy, priceFilter, ratingFilter]);

    const totalPages = Math.ceil(filtered.length / PER_PAGE);
    const paged = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

    useEffect(() => { setPage(1); }, [activeCategory, search, sortBy, priceFilter, ratingFilter]);

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
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Tìm nội dung bạn muốn học..."
                                    className="w-full pl-11 pr-10 h-11 rounded-xl border border-gray-200 bg-white shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400"
                                    style={{ transition: "box-shadow 0.2s, border-color 0.2s" }}
                                />
                                {/* Nút X nhỏ xóa text search */}
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
                                {CATEGORIES.map(cat => (
                                    <motion.button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        whileHover={activeCategory !== cat ? { x: 3 } : {}}
                                        whileTap={{ scale: 0.97 }}
                                        className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between cursor-pointer ${
                                            activeCategory === cat
                                                ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                                : "text-gray-600 hover:bg-white hover:text-blue-600"
                                        }`}
                                        style={{ transition: "background-color 0.2s, color 0.2s" }}
                                    >
                                        {cat}
                                        {activeCategory === cat && <div className="w-1.5 h-1.5 rounded-full bg-white/80" />}
                                    </motion.button>
                                ))}
                            </nav>
                        </div>
                    </motion.aside>

                    {/* Grid */}
                    <div className="flex-1 min-w-0 min-h-[600px]">
                        {/* Mobile pills */}
                        <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-6 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16 xl:-mx-24 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 scrollbar-hide">
                            {CATEGORIES.map(cat => (
                                <motion.button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border cursor-pointer ${
                                        activeCategory === cat
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
                                    <p className="text-gray-400 text-sm max-w-xs">Vui lòng thử từ khóa hoặc bộ lọc khác.</p>
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
                                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                                <motion.button
                                                    key={p}
                                                    onClick={() => handlePageChange(p)}
                                                    whileHover={page !== p ? { scale: 1.08, borderColor: "#93c5fd", color: "#2563eb" } : {}}
                                                    whileTap={{ scale: 0.93 }}
                                                    animate={page === p ? { scale: 1.12 } : { scale: 1 }}
                                                    transition={{ duration: 0.2 }}
                                                    className={`w-10 h-10 rounded-xl text-sm font-bold cursor-pointer ${
                                                        page === p
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