import React, { useState, useMemo, useEffect, useRef } from "react";
import { Search, SlidersHorizontal, Star, Users, ChevronDown, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CATEGORIES, COURSES, formatPrice, type Category, type Course } from "@/data/courses.data";

// ─── Types ─────────────────────────────────────────────────────────────────────
// type Category =
//     | "Tất cả"
//     | "AI & Data Science"
//     | "Web Development"
//     | "Backend"
//     | "DevOps"
//     | "Cybersecurity"
//     | "Computer Science"
//     | "Design";

// interface Course {
//     id: string;
//     slug: string;
//     title: string;
//     category: Exclude<Category, "Tất cả">;
//     categoryLabel: string;
//     instructor: string;
//     rating: number;
//     studentCount: number;
//     price: number;
//     originalPrice?: number;
//     isFree?: boolean;
//     thumbnail: string;
//     isNew?: boolean;
// }

// ─── Mock Data ─────────────────────────────────────────────────────────────────
// const COURSES: Course[] = [
//     { id: "1", slug: "nhap-mon-spring-boot", title: "Nhập môn Spring Boot", category: "Backend", categoryLabel: "BACKEND", instructor: "Dr. Alex Rivera", rating: 4.9, studentCount: 8500, price: 1200000, originalPrice: 3000000, thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f70d504d0?w=400&h=300&fit=crop", isNew: false },
//     { id: "2", slug: "uiux-design-mobile-app", title: "UI/UX Design cho Mobile App", category: "Design", categoryLabel: "DESIGN", instructor: "Sarah Chen", rating: 4.9, studentCount: 5200, price: 1500000, thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop", isNew: true },
//     { id: "3", slug: "mastering-large-language-models", title: "Mastering Large Language Models", category: "AI & Data Science", categoryLabel: "AI & DATA SCIENCE", instructor: "Michael Smith", rating: 4.8, studentCount: 12000, price: 2500000, thumbnail: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=400&h=300&fit=crop", isNew: false },
//     { id: "4", slug: "phat-trien-web-react-nextjs", title: "Phát triển Web với React & Next.js", category: "Web Development", categoryLabel: "WEB DEVELOPMENT", instructor: "David Miller", rating: 4.9, studentCount: 9800, price: 2000000, thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop", isNew: false },
//     { id: "5", slug: "postgresql-database", title: "Hệ quản trị Cơ sở dữ liệu PostgreSQL", category: "Backend", categoryLabel: "BACKEND", instructor: "Lê Văn Thành", rating: 4.7, studentCount: 3100, price: 1100000, thumbnail: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=300&fit=crop", isNew: false },
//     { id: "6", slug: "devops-docker-kubernetes", title: "DevOps với Docker & Kubernetes", category: "DevOps", categoryLabel: "DEVOPS", instructor: "Trần Minh Hoàng", rating: 4.9, studentCount: 4200, price: 2800000, thumbnail: "https://images.unsplash.com/photo-1605745341812-721e64eab012?w=400&h=300&fit=crop", isNew: true },
//     { id: "7", slug: "backend-golang", title: "Phát triển Backend với Golang", category: "Backend", categoryLabel: "BACKEND", instructor: "Nguyễn Vũ Long", rating: 4.8, studentCount: 2800, price: 1850000, thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f70d504d0?w=400&h=300&fit=crop", isNew: false },
//     { id: "8", slug: "an-toan-thong-tin", title: "An toàn thông tin & Ethical Hacking", category: "Cybersecurity", categoryLabel: "CYBERSECURITY", instructor: "Phạm Anh Khoa", rating: 4.9, studentCount: 1500, price: 3200000, thumbnail: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop", isNew: true },
//     { id: "9", slug: "microservices-spring-boot", title: "Xây dựng Microservices với Spring Boot", category: "Backend", categoryLabel: "BACKEND", instructor: "Vũ Công Thành", rating: 4.7, studentCount: 6300, price: 2100000, thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop", isNew: false },
//     { id: "10", slug: "flutter-mobile-app", title: "Lập trình Mobile Flutter từ zero", category: "Web Development", categoryLabel: "MOBILE APP", instructor: "Bùi Tiến Dũng", rating: 4.8, studentCount: 7200, price: 1450000, thumbnail: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop", isNew: false },
//     { id: "11", slug: "cau-truc-du-lieu", title: "Cấu trúc dữ liệu & Giải thuật", category: "Computer Science", categoryLabel: "COMPUTER SCIENCE", instructor: "GS. Đặng Thái Sơn", rating: 4.9, studentCount: 15000, price: 0, isFree: true, thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop", isNew: false },
//     { id: "12", slug: "cloud-computing-aws", title: "Cloud Computing với AWS Cloud", category: "DevOps", categoryLabel: "CLOUD", instructor: "Lâm Nhật Minh", rating: 4.6, studentCount: 2100, price: 2400000, thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop", isNew: false },
// ];

// const CATEGORIES: Category[] = ["Tất cả", "AI & Data Science", "Web Development", "Backend", "DevOps", "Cybersecurity", "Computer Science", "Design"];

// const formatPrice = (price: number, isFree?: boolean) => {
//     if (isFree || price === 0) return "Miễn phí";
//     return price.toLocaleString("vi-VN") + "đ";
// };

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
    const [visible, setVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const obs = new IntersectionObserver(
            ([e]) => {
                if (e.isIntersecting) {
                    setVisible(true);
                    obs.disconnect();
                }
            },
            { threshold: 0.08 }
        );

        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const colorClass =
        categoryColors[course.categoryLabel] ??
        "bg-gray-200/60 text-gray-600";

    const goToDetail = () => {
        navigate(`/courses/${course.slug}`);
    };

    return (
        <div
            ref={ref}
            className="transition-all duration-500 ease-out"
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transitionDelay: `${(index % 4) * 70}ms`,
            }}
        >
            <div
                onClick={goToDetail}
                className="group relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer"
            >

                {/* ─── Thumbnail ─── */}
                <div className="relative h-44 overflow-hidden bg-gray-100">
                    <img
                        src={course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                    />

                    {/* FIX: không chặn click */}
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
                    <h3 className="font-bold text-gray-900 text-[16px] leading-snug mb-1.5 line-clamp-2 group-hover:text-blue-600 transition-colors">
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

                        {/* FIX: không trigger click card */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                goToDetail();
                            }}
                            className="h-9 px-4 rounded-xl text-sm font-bold bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                        >
                            Vào học
                        </button>
                    </div>
                </div>
            </div>
        </div>
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
            <button
                onClick={() => setOpen(!open)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-medium transition-all min-w-[140px] justify-between cursor-pointer ${open ? "border-blue-500 bg-blue-50 text-blue-600" : "border-gray-200 bg-white text-gray-600 hover:border-blue-300"}`}
            >
                <span>{value}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180 text-blue-500" : "text-gray-400"}`} />
            </button>
            {open && (
                <div className="absolute top-full left-0 mt-1.5 bg-white border border-gray-100 rounded-xl shadow-xl z-50 min-w-full overflow-hidden">
                    {options.map(opt => (
                        <button
                            key={opt}
                            onClick={() => { onChange(opt); setOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors cursor-pointer ${value === opt ? "bg-blue-50 text-blue-600 font-bold" : "text-gray-600 hover:bg-gray-50"}`}
                        >
                            {opt}
                            {value === opt && <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />}
                        </button>
                    ))}
                </div>
            )}
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
    const listRef = useRef<HTMLDivElement>(null);

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
            <section className="bg-[#EEF2FF] pt-14 pb-8 border-b border-blue-100/60">
                <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
                        {/* Left: Badge + Title + Desc */}
                        <div className="max-w-xl">
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
                        </div>
                    </div>

                    {/* Filter bar + Search */}
                    <div className="flex flex-col md:flex-row md:items-center gap-4 mt-8 pt-6 border-t border-blue-100/80">

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
                        </div>

                        {/* Right: Search */}
                        <div className="w-full md:w-80 md:ml-auto">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    value={search}
                                    onChange={e => setSearch(e.target.value)}
                                    placeholder="Tìm nội dung bạn muốn học..."
                                    className="w-full pl-11 pr-4 h-11 rounded-xl border border-gray-200 bg-white shadow-sm text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400/40 focus:border-blue-400 transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Main Content ── */}
            <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-10">
                <div className="flex gap-8">

                    {/* Sidebar */}
                    <aside className="hidden lg:block w-56 flex-shrink-0">
                        <div className="sticky top-6">
                            <p className="text-[10px] font-black tracking-widest text-gray-400 mb-4 uppercase">
                                Chủ đề chính
                            </p>
                            <nav className="flex flex-col gap-1">
                                {CATEGORIES.map(cat => (
                                    <button
                                        key={cat}
                                        onClick={() => setActiveCategory(cat)}
                                        className={`text-left px-4 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${activeCategory === cat
                                            ? "bg-blue-600 text-white shadow-md shadow-blue-200"
                                            : "text-gray-600 hover:bg-white hover:text-blue-600"
                                            }`}
                                    >
                                        {cat}
                                        {activeCategory === cat && <div className="w-1.5 h-1.5 rounded-full bg-white/80" />}
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* Grid */}
                    <div className="flex-1 min-w-0 min-h-[600px]">
                        {/* Mobile pills */}
                        <div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-6 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-16 xl:-mx-24 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 scrollbar-hide">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-semibold border transition-all cursor-pointer ${activeCategory === cat ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 bg-white text-gray-600"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {paged.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-32 bg-white rounded-3xl border border-dashed border-gray-200 text-center">
                                <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <Search className="w-7 h-7 text-gray-400" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-700 mb-2">Không tìm thấy kết quả</h3>
                                <p className="text-gray-400 text-sm max-w-xs">Vui lòng thử từ khóa hoặc bộ lọc khác.</p>
                                <button
                                    onClick={() => { setSearch(""); setPriceFilter("Mọi mức giá"); setRatingFilter("Tất cả đánh giá"); setSortBy("Mới nhất"); }}
                                    className="mt-5 px-5 py-2 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-all bg-white cursor-pointer"
                                >
                                    Xóa toàn bộ lọc
                                </button>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                                    {paged.map((course, i) => (
                                        <CourseCard key={course.id} course={course} index={i} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex justify-center items-center gap-2 mt-14 pt-8 border-t border-blue-100/60">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                                            <button
                                                key={p}
                                                onClick={() => handlePageChange(p)}
                                                className={`w-10 h-10 rounded-xl text-sm font-bold transition-all cursor-pointer ${page === p
                                                    ? "bg-blue-600 text-white shadow-md shadow-blue-200 scale-110"
                                                    : "bg-white border border-gray-200 text-gray-600 hover:border-blue-400 hover:text-blue-600"
                                                    }`}
                                            >
                                                {p}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CoursesPage;