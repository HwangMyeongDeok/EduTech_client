import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import { 
  Wallet, CircleDollarSign, CreditCard, 
  Calendar, Download, Star, ArrowUpRight, TrendingUp 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from "recharts";

// --- MOCK DATA ---
const REVENUE_DATA = [
  { month: "T1", revenue: 12500000 },
  { month: "T2", revenue: 18200000 },
  { month: "T3", revenue: 15800000 },
  { month: "T4", revenue: 19500000 },
  { month: "T5", revenue: 16200000 },
  { month: "T6", revenue: 21400000 }, // Tháng cao nhất / hiện tại
];

const COURSE_REVENUE = [
  { id: 1, name: "Mastering Large Language Models", students: 45, rating: 4.8, revenue: 9000000 },
  { id: 2, name: "AI trong Digital Marketing", students: 32, rating: 4.9, revenue: 6400000 },
  { id: 3, name: "Usability-Testing Essentials", students: 18, rating: 4.7, revenue: 3600000 },
  { id: 4, name: "Khóa học nền tảng Python", students: 12, rating: 4.5, revenue: 2400000 },
];

// Utils format tiền
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

// Utils format số M (triệu) cho trục Y
const formatYAxis = (value: number) => {
  if (value === 0) return "0";
  return `${(value / 1000000)}M`;
};

const containerVariants: Variants = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const itemVariants: Variants = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } } };

// Tooltip Custom cho Bar Chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-xl z-50">
        <p className="font-bold text-slate-500 mb-1 text-xs uppercase tracking-wider">{label}</p>
        <p className="text-xl font-black text-slate-900">{formatCurrency(payload[0].value)}</p>
      </div>
    );
  }
  return null;
};

export default function InstructorRevenueContent() {
  // Tìm giá trị max để highlight cột đó
  const maxRevenue = Math.max(...REVENUE_DATA.map(d => d.revenue));

  return (
    <div className="w-full bg-slate-50/50 p-6 md:p-8 font-sans min-h-screen">
      <motion.div 
        className="w-full space-y-6"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        
        {/* ================= 1. STATS CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Card 1: Tổng doanh thu */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-indigo-50 text-indigo-600`}>
                <Wallet className="w-6 h-6" />
              </div>
              <Badge variant="outline" className="bg-emerald-50 text-emerald-600 font-bold border-transparent px-2.5 py-1 rounded-md">
                <TrendingUp className="w-3 h-3 mr-1" /> +12.4%
              </Badge>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tổng doanh thu</p>
              <h3 className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tight">183.000.000đ</h3>
            </div>
          </motion.div>

          {/* Card 2: Doanh thu tháng này */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-emerald-50 text-emerald-600`}>
                <CircleDollarSign className="w-6 h-6" />
              </div>
              <Badge variant="secondary" className="bg-slate-100 text-slate-600 font-bold px-2.5 py-1 rounded-md">
                THÁNG 6
              </Badge>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Doanh thu tháng này</p>
              <h3 className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tight">21.400.000đ</h3>
            </div>
          </motion.div>

          {/* Card 3: Số dư khả dụng */}
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start mb-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-amber-50 text-amber-500`}>
                <CreditCard className="w-6 h-6" />
              </div>
              <Button size="sm" className="bg-amber-100 hover:bg-amber-200 text-amber-700 font-black px-4 rounded-lg shadow-none">
                RÚT TIỀN
              </Button>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Số dư khả dụng</p>
              <h3 className="text-3xl lg:text-4xl font-black text-slate-800 tracking-tight">42.500.000đ</h3>
            </div>
          </motion.div>
        </div>

        {/* ================= 2. CHART SECTION ================= */}
        <motion.div variants={itemVariants} className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200 shadow-sm w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight">Phân tích dòng tiền</h3>
              <p className="text-sm font-medium text-slate-500 mt-1">Thống kê tăng trưởng doanh thu hệ thống</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400" />
                2026
              </div>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-5 font-bold shadow-md shadow-indigo-200">
                <Download className="w-4 h-4 mr-2" />
                Xuất báo cáo
              </Button>
            </div>
          </div>

          <div className="w-full h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={REVENUE_DATA} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 700 }}
                  tickFormatter={formatYAxis}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f8fafc' }} />
                <Bar dataKey="revenue" radius={[6, 6, 6, 6]} barSize={40}>
                  {REVENUE_DATA.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.revenue === maxRevenue ? "#4f46e5" : "#e2e8f0"} 
                      className="transition-all duration-300 hover:opacity-80"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* ================= 3. TABLE SECTION ================= */}
        <motion.div variants={itemVariants} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden w-full">
          <div className="p-6 md:p-8 border-b border-slate-100 flex items-center justify-between bg-white">
            <div>
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tight mb-1">Doanh thu theo khóa học</h3>
              <p className="text-sm font-medium text-slate-500">Chi tiết phân bổ thu nhập</p>
            </div>
            <Button variant="link" className="text-indigo-600 font-bold hover:text-indigo-700 hidden md:flex">
              Xem báo cáo chi tiết
            </Button>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-[11px] font-black text-slate-400 uppercase tracking-wider">
                  <th className="px-6 md:px-8 py-5 w-2/5">Khóa học</th>
                  <th className="px-6 md:px-8 py-5 text-center">Học viên</th>
                  <th className="px-6 md:px-8 py-5 text-center">Đánh giá</th>
                  <th className="px-6 md:px-8 py-5 text-right">Doanh thu</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {COURSE_REVENUE.map((course) => (
                  <tr key={course.id} className="group hover:bg-slate-50/80 transition-colors cursor-pointer">
                    <td className="px-6 md:px-8 py-5">
                      <span className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                        {course.name}
                      </span>
                    </td>
                    <td className="px-6 md:px-8 py-5 text-center">
                      <span className="font-bold text-slate-600">{course.students}</span>
                    </td>
                    <td className="px-6 md:px-8 py-5 text-center">
                      <div className="flex items-center justify-center gap-1 text-sm font-bold text-slate-700">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        {course.rating}
                      </div>
                    </td>
                    <td className="px-6 md:px-8 py-5 text-right">
                      <span className="font-black text-emerald-600 text-base">
                        {formatCurrency(course.revenue)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-slate-50/50 border-t border-slate-100 text-center md:hidden">
             <Button variant="link" className="text-indigo-600 font-bold w-full">Xem báo cáo chi tiết</Button>
          </div>
        </motion.div>

      </motion.div>
    </div>
  );
}