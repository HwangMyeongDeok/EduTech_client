import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { 
  Wallet, Users, BookOpen, Star, TrendingUp, TrendingDown, 
  MoreHorizontal, PlayCircle, Loader2, Plus
} from "lucide-react";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";

// --- MOCK DATA CHO BIỂU ĐỒ TƯƠNG TÁC ---
const chartDataSets = {
  "7d": [
    { name: "T2", total: 1200000 }, { name: "T3", total: 2100000 }, { name: "T4", total: 800000 },
    { name: "T5", total: 3400000 }, { name: "T6", total: 2900000 }, { name: "T7", total: 4500000 }, { name: "CN", total: 5200000 },
  ],
  "30d": [
    { name: "Tuần 1", total: 12000000 }, { name: "Tuần 2", total: 18000000 }, 
    { name: "Tuần 3", total: 15000000 }, { name: "Tuần 4", total: 24000000 },
  ],
  "1y": [
    { name: "Tháng 1", total: 12000000 }, { name: "Tháng 2", total: 15000000 }, { name: "Tháng 3", total: 18000000 },
    { name: "Tháng 4", total: 14000000 }, { name: "Tháng 5", total: 22000000 }, { name: "Tháng 6", total: 28000000 },
    { name: "Tháng 7", total: 32000000 },
  ]
};

const recentStudents = [
  { id: 1, name: "Nguyễn Văn A", course: "ReactJS Pro Masterclass", time: "2 giờ trước", price: "1.299.000đ", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=A" },
  { id: 2, name: "Trần Thị B", course: "UI/UX Design Cơ bản", time: "5 giờ trước", price: "899.000đ", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=B" },
  { id: 3, name: "Lê Hoàng C", course: "Khoá học NodeJS Thực chiến", time: "1 ngày trước", price: "1.499.000đ", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=C" },
  { id: 4, name: "Phạm D", course: "ReactJS Pro Masterclass", time: "1 ngày trước", price: "1.299.000đ", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=D" },
];

const topCourses = [
  { id: 1, name: "ReactJS Pro Masterclass", sales: 342, rating: 4.9, revenue: "444M" },
  { id: 2, name: "Khoá học NodeJS Thực chiến", sales: 215, rating: 4.8, revenue: "322M" },
  { id: 3, name: "UI/UX Design Cơ bản", sales: 189, rating: 4.7, revenue: "169M" },
];

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function InstructorDashboard() {
  const navigate = useNavigate();
  const [chartPeriod, setChartPeriod] = useState<"7d" | "30d" | "1y">("1y");
  
  // States cho Modal Tạo khóa học
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Lấy data biểu đồ tương ứng
  const currentChartData = useMemo(() => chartDataSets[chartPeriod], [chartPeriod]);

  // Hàm giả lập submit tạo khóa học
  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsCreateModalOpen(false);
      // Gắn thông báo thành công ở đây (nếu có thư viện toast)
      // toast.success("Đã tạo sườn khóa học thành công!");
      navigate("/instructor/courses"); // Chuyển sang trang danh sách khóa học
    }, 1500);
  };

  return (
    <>
      <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-6 pb-10">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">
              Chào mừng trở lại, Giảng viên! 👋
            </h1>
            <p className="text-sm text-slate-500 font-medium mt-1">
              Đây là tình hình kinh doanh các khóa học của bạn trong thời gian qua.
            </p>
          </div>
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-[#0B56D5] hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
          >
            <Plus className="w-5 h-5 mr-1" />
            Tạo khóa học mới
          </Button>
        </div>

        {/* STAT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard title="Tổng doanh thu" value="143.000.000đ" trend="+12.5%" isPositive={true} icon={Wallet} color="blue" />
          <StatCard title="Tổng học viên" value="1,248" trend="+8.2%" isPositive={true} icon={Users} color="indigo" />
          <StatCard title="Đánh giá trung bình" value="4.8/5.0" trend="+0.2" isPositive={true} icon={Star} color="amber" />
          <StatCard title="Khóa học đang bán" value="12" trend="-1" isPositive={false} icon={BookOpen} color="emerald" />
        </div>

        {/* MAIN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* CHART: DOANH THU */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <Card className="rounded-2xl border-slate-100 shadow-sm overflow-hidden h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-50 bg-slate-50/50">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-bold text-slate-800">Báo cáo doanh thu</CardTitle>
                  <p className="text-xs text-slate-500 font-medium">Theo dõi thu nhập theo thời gian</p>
                </div>
                {/* NÚT FILTER BIỂU ĐỒ */}
                <div className="bg-white border border-slate-200 rounded-lg p-1 flex items-center shadow-sm">
                  {(["7d", "30d", "1y"] as const).map((period) => (
                    <button
                      key={period}
                      onClick={() => setChartPeriod(period)}
                      className={`px-3 py-1 text-xs font-bold rounded-md transition-all ${
                        chartPeriod === period 
                          ? "bg-[#0B56D5] text-white shadow-sm" 
                          : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {period === "7d" ? "7 ngày" : period === "30d" ? "30 ngày" : "1 năm"}
                    </button>
                  ))}
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={currentChartData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#0B56D5" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#0B56D5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }} dy={10} />
                      <YAxis 
                        axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b', fontWeight: 500 }}
                        tickFormatter={(value) => `${value / 1000000}M`} dx={-10}
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                        formatter={(value: any) => [new Intl.NumberFormat('vi-VN').format(Number(value)) + 'đ', 'Doanh thu']}
                      />
                      <Area 
                        key={chartPeriod} /* Bắt buộc có key để chart rerender mượt khi đổi data */
                        type="monotone" dataKey="total" stroke="#0B56D5" strokeWidth={3}
                        fillOpacity={1} fill="url(#colorRevenue)" activeDot={{ r: 6, strokeWidth: 0, fill: '#0B56D5' }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">
            
            {/* Top Khóa học */}
            <motion.div variants={itemVariants}>
              <Card className="rounded-2xl border-slate-100 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-bold text-slate-800 flex items-center justify-between">
                    Top Khóa Học
                    <Button onClick={() => navigate("/instructor/courses")} variant="ghost" size="icon" className="w-8 h-8 text-slate-400 hover:text-[#0B56D5]">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {topCourses.map((course, idx) => (
                    <div key={course.id} className="flex items-center gap-4 group cursor-pointer" onClick={() => navigate(`/instructor/courses`)}>
                      <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center font-black text-slate-400 shrink-0 group-hover:bg-blue-50 group-hover:text-[#0B56D5] transition-colors">
                        #{idx + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate group-hover:text-[#0B56D5] transition-colors">{course.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-medium text-slate-500">{course.sales} lượt bán</span>
                          <span className="w-1 h-1 bg-slate-300 rounded-full" />
                          <span className="text-xs font-bold text-amber-500 flex items-center">
                            <Star className="w-3 h-3 mr-0.5 fill-current" /> {course.rating}
                          </span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-black text-slate-800">{course.revenue}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Học viên mới đăng ký */}
            <motion.div variants={itemVariants}>
              <Card className="rounded-2xl border-slate-100 shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-bold text-slate-800 flex items-center justify-between">
                    Học viên mới đây
                    <Button onClick={() => navigate("/instructor/students")} variant="link" className="text-xs text-[#0B56D5] h-auto p-0 font-bold">Xem tất cả</Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recentStudents.map((student) => (
                    <div key={student.id} className="flex items-center gap-3">
                      <Avatar className="w-9 h-9 border border-slate-100">
                        <AvatarImage src={student.avatar} />
                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800 truncate">{student.name}</p>
                        <p className="text-xs text-slate-500 truncate">{student.course}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="text-sm font-bold text-emerald-600">+{student.price}</p>
                        <p className="text-[10px] text-slate-400">{student.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

          </div>
        </div>
      </motion.div>

      {/* MODAL TẠO KHÓA HỌC NHANH */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[425px] rounded-2xl bg-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-black text-slate-800">Tạo khóa học mới</DialogTitle>
            <DialogDescription className="text-slate-500">
              Nhập thông tin cơ bản để khởi tạo sườn khóa học. Bạn có thể thêm video và nội dung chi tiết sau.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateCourse} className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">Tên khóa học</label>
              <input 
                type="text" 
                required
                placeholder="VD: ReactJS Thực chiến từ A-Z..." 
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0B56D5] focus:ring-1 focus:ring-[#0B56D5] transition-all text-sm font-medium"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Danh mục</label>
                <select className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0B56D5] focus:ring-1 focus:ring-[#0B56D5] transition-all text-sm font-medium bg-white">
                  <option>Lập trình</option>
                  <option>Thiết kế</option>
                  <option>Marketing</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Giá dự kiến (VNĐ)</label>
                <input 
                  type="number" 
                  placeholder="VD: 500000" 
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-[#0B56D5] focus:ring-1 focus:ring-[#0B56D5] transition-all text-sm font-medium"
                />
              </div>
            </div>
            <DialogFooter className="mt-6 pt-4 border-t border-slate-100">
              <Button type="button" variant="ghost" onClick={() => setIsCreateModalOpen(false)} className="rounded-xl font-bold">
                Hủy bỏ
              </Button>
              <Button type="submit" disabled={isSubmitting} className="bg-[#0B56D5] hover:bg-blue-600 text-white rounded-xl font-bold w-32 transition-all">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Khởi tạo ngay"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

// --- SUB COMPONENTS ---
interface StatCardProps {
  title: string; value: string; trend: string; isPositive: boolean; icon: any; color: "blue" | "indigo" | "amber" | "emerald";
}

function StatCard({ title, value, trend, isPositive, icon: Icon, color }: StatCardProps) {
  const colorMap = {
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    amber: "bg-amber-50 text-amber-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <motion.div variants={itemVariants}>
      <Card className="rounded-2xl border-slate-100 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
              <h3 className="text-2xl font-black text-slate-800">{value}</h3>
            </div>
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[color]}`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <Badge variant="secondary" className={`px-1.5 py-0.5 text-xs font-bold ${isPositive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'} hover:bg-transparent border-none`}>
              {isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
              {trend}
            </Badge>
            <span className="text-xs font-medium text-slate-400">so với tháng trước</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}