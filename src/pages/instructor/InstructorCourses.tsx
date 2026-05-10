import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search, Filter, Edit2, Trash2, Eye, Plus, Loader2,
    AlertCircle, CheckCircle2, FileEdit, Users, Star,
    ChevronLeft, ChevronRight, SlidersHorizontal, ArrowUpDown
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Dialog, DialogContent, DialogDescription, DialogFooter,
    DialogHeader, DialogTitle
} from "@/components/ui/dialog";
import {
    AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
    AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem,
    DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
    DropdownMenuRadioGroup, DropdownMenuRadioItem
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";

// --- MOCK DATA ---
const INITIAL_COURSES = [
    { id: "1", name: "Mastering Large Language Models", level: "Advanced", category: "AI & Machine Learning", status: "Published", students: 1205, rating: 4.9, createdAt: "2024-03-11", thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&q=80" },
    { id: "2", name: "AI trong Digital Marketing", level: "Intermediate", category: "Marketing", status: "Published", students: 842, rating: 4.8, createdAt: "2024-04-15", thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80" },
    { id: "3", name: "Usability-Testing Essentials", level: "Beginner", category: "Design", status: "Draft", students: 0, rating: 0, createdAt: "2024-06-30", thumbnail: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?w=400&q=80" },
    { id: "4", name: "Fullstack Web Development", level: "Beginner", category: "Programming", status: "Published", students: 2150, rating: 4.7, createdAt: "2024-01-12", thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&q=80" },
    { id: "5", name: "UX Research Fundamentals", level: "Intermediate", category: "Design", status: "Draft", students: 0, rating: 0, createdAt: "2024-08-05", thumbnail: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&q=80" },
    { id: "6", name: "ReactJS Advanced Patterns", level: "Advanced", category: "Programming", status: "Published", students: 532, rating: 4.9, createdAt: "2024-02-20", thumbnail: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?w=400&q=80" },
    { id: "7", name: "SEO Mastery 2024", level: "Intermediate", category: "Marketing", status: "Published", students: 920, rating: 4.6, createdAt: "2024-05-10", thumbnail: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=400&q=80" },
    { id: "8", name: "Figma Prototyping Masterclass", level: "Advanced", category: "Design", status: "Published", students: 1100, rating: 4.9, createdAt: "2024-01-25", thumbnail: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&q=80" },
];

const ITEMS_PER_PAGE = 5;

// Hàm hỗ trợ map màu cho Level
const getLevelBadgeStyles = (level: string) => {
    switch (level.toLowerCase()) {
        case "beginner":
            return "bg-emerald-100 text-emerald-700 border-emerald-200";
        case "intermediate":
            return "bg-amber-100 text-amber-700 border-amber-200";
        case "advanced":
            return "bg-rose-100 text-rose-700 border-rose-200";
        default:
            return "bg-slate-100 text-slate-700 border-slate-200";
    }
};

export default function InstructorCourses() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState(INITIAL_COURSES);

    // States Filter & Search & Sort
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState<"All" | "Published" | "Draft">("All");
    const [categoryFilter, setCategoryFilter] = useState<string>("All");
    const [levelFilter, setLevelFilter] = useState<string>("All");
    const [sortBy, setSortBy] = useState<"newest" | "oldest" | "name">("newest");

    // Pagination & CRUD
    const [currentPage, setCurrentPage] = useState(1);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const categories = ["All", ...Array.from(new Set(courses.map(c => c.category)))];
    const levels = ["All", ...Array.from(new Set(courses.map(c => c.level)))];

    // Xử lý Filter & Sort
    const processedCourses = useMemo(() => {
        let result = [...courses];
        if (searchQuery) result = result.filter(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
        if (activeTab !== "All") result = result.filter(c => c.status === activeTab);
        if (categoryFilter !== "All") result = result.filter(c => c.category === categoryFilter);
        if (levelFilter !== "All") result = result.filter(c => c.level === levelFilter);

        result.sort((a, b) => {
            if (sortBy === "name") return a.name.localeCompare(b.name);
            const dateA = new Date(a.createdAt).getTime();
            const dateB = new Date(b.createdAt).getTime();
            return sortBy === "newest" ? dateB - dateA : dateA - dateB;
        });
        return result;
    }, [courses, searchQuery, activeTab, categoryFilter, levelFilter, sortBy]);

    const totalPages = Math.ceil(processedCourses.length / ITEMS_PER_PAGE);
    const paginatedCourses = processedCourses.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    useMemo(() => setCurrentPage(1), [searchQuery, activeTab, categoryFilter, levelFilter, sortBy]);

    const handleDelete = () => {
        if (!isDeleting) return;
        setCourses(courses.filter(c => c.id !== isDeleting));
        setIsDeleting(null);
        if (paginatedCourses.length === 1 && currentPage > 1) setCurrentPage(p => p - 1);
    };

    const handleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            const newCourse = {
                id: Math.random().toString(),
                name: "Khóa học chưa đặt tên",
                level: "Beginner",
                category: "Programming",
                status: "Draft",
                students: 0, rating: 0,
                createdAt: new Date().toISOString().split('T')[0],
                thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&q=80",
            };
            setCourses([newCourse, ...courses]);
            setIsLoading(false);
            setIsCreateOpen(false);
            setActiveTab("Draft");
            setCurrentPage(1);
        }, 1000);
    };

    const countActiveFilters = (categoryFilter !== "All" ? 1 : 0) + (levelFilter !== "All" ? 1 : 0);

    return (
        <div className="mx-auto space-y-6 pb-12 animate-in fade-in duration-500">

            {/* HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                        Quản lý <span className="text-[#0B56D5]">Khóa Học</span>
                    </h1>
                    <p className="text-slate-500 font-medium mt-1">
                        Tổng cộng <strong className="text-slate-800">{courses.length}</strong> khóa học trên hệ thống.
                    </p>
                </div>
                <Button
                    onClick={() => setIsCreateOpen(true)}
                    className="bg-[#0B56D5] hover:bg-blue-700 text-white font-bold rounded-xl h-12 px-6 shadow-lg shadow-blue-500/20"
                >
                    <Plus className="w-5 h-5 mr-2" /> Tạo khóa học mới
                </Button>
            </div>

            {/* FILTER CONTROLS */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 space-y-4">
                <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">
                    <div className="flex bg-slate-100 p-1 rounded-xl w-full lg:w-auto">
                        {(["All", "Published", "Draft"] as const).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 lg:flex-none px-6 py-2.5 text-sm font-bold rounded-lg transition-all ${activeTab === tab
                                    ? "bg-white text-[#0B56D5] shadow-sm"
                                    : "text-slate-500 hover:text-slate-700"
                                    }`}
                            >
                                {tab === "All" ? "Tất cả" : tab === "Published" ? "Đang bán" : "Bản nháp"}
                                <span className="ml-2 text-xs bg-slate-100 text-slate-400 px-2 py-0.5 rounded-full">
                                    {tab === "All" ? courses.length : courses.filter(c => c.status === tab).length}
                                </span>
                            </button>
                        ))}
                    </div>

                    <div className="relative w-full lg:w-[400px]">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <Input
                            placeholder="Tìm kiếm theo tên khóa học..."
                            className="pl-12 h-11 rounded-xl border-slate-200 bg-white focus-visible:ring-[#0B56D5] w-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="text-sm font-bold text-slate-400 flex items-center">
                            <SlidersHorizontal className="w-4 h-4 mr-2" /> Bộ lọc:
                        </span>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-9 rounded-lg border-slate-200 text-slate-600 bg-slate-50">
                                    {categoryFilter === "All" ? "Danh mục" : categoryFilter}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 rounded-xl">
                                {categories.map(cat => (
                                    <DropdownMenuCheckboxItem
                                        key={cat} checked={categoryFilter === cat}
                                        onCheckedChange={() => setCategoryFilter(cat)}
                                    >
                                        {cat === "All" ? "Tất cả danh mục" : cat}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-9 rounded-lg border-slate-200 text-slate-600 bg-slate-50">
                                    {levelFilter === "All" ? "Cấp độ" : levelFilter}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-48 rounded-xl">
                                {levels.map(lvl => (
                                    <DropdownMenuCheckboxItem
                                        key={lvl} checked={levelFilter === lvl}
                                        onCheckedChange={() => setLevelFilter(lvl)}
                                    >
                                        {lvl === "All" ? "Tất cả cấp độ" : lvl}
                                    </DropdownMenuCheckboxItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {countActiveFilters > 0 && (
                            <Button
                                variant="ghost" onClick={() => { setCategoryFilter("All"); setLevelFilter("All"); }}
                                className="h-9 px-3 text-rose-500 hover:text-rose-600 hover:bg-rose-50 font-bold text-xs"
                            >
                                Xóa lọc ({countActiveFilters})
                            </Button>
                        )}
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-9 rounded-lg text-slate-600 font-bold">
                                <ArrowUpDown className="w-4 h-4 mr-2" />
                                {sortBy === "newest" ? "Mới nhất" : sortBy === "oldest" ? "Cũ nhất" : "Tên A-Z"}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48 rounded-xl">
                            <DropdownMenuRadioGroup value={sortBy} onValueChange={(val: any) => setSortBy(val)}>
                                <DropdownMenuRadioItem value="newest">Mới nhất</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="oldest">Cũ nhất</DropdownMenuRadioItem>
                                <DropdownMenuRadioItem value="name">Tên (A-Z)</DropdownMenuRadioItem>
                            </DropdownMenuRadioGroup>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            {/* MAIN DATA LIST */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
                <div className="divide-y divide-slate-100">
                    <AnimatePresence mode="popLayout">
                        {paginatedCourses.length > 0 ? (
                            paginatedCourses.map((course) => (
                                <motion.div
                                    key={course.id}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    // ĐÃ THÊM: Chuyển trang khi click vào dòng & cursor-pointer
                                    onClick={() => navigate(`/instructor/courses/${course.id}`)}
                                    className="p-4 md:p-5 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 hover:bg-slate-50 transition-colors group cursor-pointer"
                                >
                                    {/* 1. Ảnh + Info */}
                                    <div className="flex items-start md:items-center gap-5 w-full xl:w-5/12">
                                        <div className="relative shrink-0 rounded-xl overflow-hidden border border-slate-200 group-hover:shadow-md transition-all">
                                            <img src={course.thumbnail} alt={course.name} className="w-32 h-20 object-cover" />
                                            <div className="absolute top-1.5 left-1.5">
                                                {course.status === "Published" ? (
                                                    <div className="bg-emerald-500/90 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center shadow-sm">
                                                        <CheckCircle2 className="w-3 h-3 mr-1" /> Public
                                                    </div>
                                                ) : (
                                                    <div className="bg-amber-500/90 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center shadow-sm">
                                                        <FileEdit className="w-3 h-3 mr-1" /> Draft
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            {/* Chỗ này bỏ thẻ <Link> đi cho đỡ thừa vì cả dòng đã click được rồi */}
                                            <h3 className="font-bold text-slate-800 text-base md:text-lg truncate group-hover:text-[#0B56D5] transition-colors leading-tight">
                                                {course.name}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-2 mt-2">
                                                <Badge variant="outline" className="bg-white text-slate-600 border-slate-200 px-2 py-0.5 text-xs font-semibold">
                                                    {course.category}
                                                </Badge>
                                                <Badge variant="outline" className={`px-2 py-0.5 text-xs font-bold border ${getLevelBadgeStyles(course.level)}`}>
                                                    {course.level}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>

                                    {/* 2. Chỉ số */}
                                    <div className="flex items-center gap-8 w-full xl:w-4/12 px-2">
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Học viên</p>
                                            <p className="text-sm font-black text-slate-700 flex items-center">
                                                <Users className="w-4 h-4 mr-1.5 text-blue-500" />
                                                {course.students > 0 ? course.students.toLocaleString('vi-VN') : '-'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Đánh giá</p>
                                            <p className="text-sm font-black text-slate-700 flex items-center">
                                                <Star className={`w-4 h-4 mr-1.5 ${course.rating > 0 ? 'text-amber-500 fill-amber-500' : 'text-slate-300'}`} />
                                                {course.rating > 0 ? course.rating : 'Chưa có'}
                                            </p>
                                        </div>
                                        <div className="hidden md:block">
                                            <p className="text-xs font-bold text-slate-400 uppercase mb-1">Cập nhật</p>
                                            <p className="text-sm font-bold text-slate-600">{new Date(course.createdAt).toLocaleDateString('vi-VN')}</p>
                                        </div>
                                    </div>

                                    {/* 3. Actions */}
                                    {/* ĐÃ THÊM: onClick chặn nổi bọt (stopPropagation) để bấm nút không bị nhảy vào chi tiết */}
                                    <div
                                        className="flex items-center gap-2 w-full xl:w-auto xl:justify-end pt-4 xl:pt-0 border-t xl:border-none border-slate-100 relative z-10"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <Button asChild variant="outline" className="h-9 px-3 rounded-lg border-slate-200 text-slate-600 hover:text-[#0B56D5] hover:border-[#0B56D5] hover:bg-blue-50 font-bold cursor-pointer">
                                            <Link to={`/instructor/courses/${course.id}`}>
                                                <Eye className="w-4 h-4 mr-1.5" /> Xem
                                            </Link>
                                        </Button>

                                        <Button asChild variant="outline" className="h-9 px-3 rounded-lg border-slate-200 text-slate-600 hover:text-amber-600 hover:border-amber-600 hover:bg-amber-50 font-bold cursor-pointer">
                                            <Link to={`/instructor/courses/${course.id}/edit`}>
                                                <Edit2 className="w-4 h-4 mr-1.5" /> Sửa
                                            </Link>
                                        </Button>

                                        <Button
                                            onClick={() => setIsDeleting(course.id)}
                                            variant="outline"
                                            className="h-9 px-3 rounded-lg border-slate-200 text-slate-600 hover:text-rose-600 hover:border-rose-600 hover:bg-rose-50 font-bold"
                                        >
                                            <Trash2 className="w-4 h-4 mr-1.5" /> Xóa
                                        </Button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="p-16 flex flex-col items-center justify-center">
                                <AlertCircle className="w-16 h-16 text-slate-200 mb-4" />
                                <h3 className="text-xl font-black text-slate-700">Không có dữ liệu</h3>
                                <p className="text-slate-500 font-medium mt-2 text-center max-w-md">
                                    Không tìm thấy khóa học nào. Hãy thay đổi từ khóa hoặc xóa bộ lọc.
                                </p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-slate-200 shadow-sm mt-6">
                    <p className="text-sm font-bold text-slate-500 hidden md:block">
                        Hiển thị <span className="text-slate-800">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> - <span className="text-slate-800">{Math.min(currentPage * ITEMS_PER_PAGE, processedCourses.length)}</span> trong tổng số <span className="text-slate-800">{processedCourses.length}</span>
                    </p>
                    <div className="flex items-center gap-2 w-full md:w-auto justify-center">
                        <Button variant="outline" size="icon" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="rounded-xl">
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <Button
                                    key={i + 1}
                                    variant={currentPage === i + 1 ? "default" : "ghost"}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-10 h-10 rounded-xl font-bold ${currentPage === i + 1 ? "bg-[#0B56D5] text-white" : "text-slate-600 hover:bg-slate-100"}`}
                                >
                                    {i + 1}
                                </Button>
                            ))}
                        </div>
                        <Button variant="outline" size="icon" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="rounded-xl">
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}
            <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogContent className="sm:max-w-[425px] rounded-3xl bg-white">
                    <form onSubmit={handleCreate}>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black text-slate-800">Tạo khóa học</DialogTitle>
                            <DialogDescription className="text-slate-500 font-medium">Nhập tên khóa học để bắt đầu.</DialogDescription>
                        </DialogHeader>
                        <div className="py-6">
                            <Input required placeholder="VD: ReactJS Thực chiến..." className="h-12 rounded-xl focus-visible:ring-[#0B56D5] text-base" />
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="ghost" onClick={() => setIsCreateOpen(false)} className="rounded-xl font-bold">Hủy</Button>
                            <Button disabled={isLoading} type="submit" className="bg-[#0B56D5] text-white rounded-xl font-bold">
                                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Tạo khóa học"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <AlertDialog open={!!isDeleting} onOpenChange={() => setIsDeleting(null)}>
                <AlertDialogContent className="rounded-3xl bg-white">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl text-rose-600 font-black">Xóa khóa học?</AlertDialogTitle>
                        <AlertDialogDescription>Hành động này không thể hoàn tác.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl font-bold">Hủy</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-rose-600 text-white rounded-xl font-bold">Vẫn xóa</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}