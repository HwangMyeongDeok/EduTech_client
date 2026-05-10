import { useState } from "react";
import { 
  Settings, Percent, Link as LinkIcon, Database, 
  CreditCard, Sparkles, Save, RefreshCw, ChevronRight,
  ShieldCheck, DollarSign
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } }
};

export default function SystemSettings() {
  const [isTesting, setIsTesting] = useState(false);

  const handleTestConnection = () => {
    setIsTesting(true);
    setTimeout(() => setIsTesting(false), 2000); // Fake delay
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-24 relative min-h-screen"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3">
          <Settings className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          Cấu hình hệ thống
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-2">
          Thiết lập tỷ lệ phân chia doanh thu, thuế và kết nối các dịch vụ bên ngoài.
        </p>
      </motion.div>

      {/* Revenue Configuration */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4 bg-slate-50/50 dark:bg-slate-800/20">
          <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 shadow-inner">
            <Percent className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Cấu hình doanh thu</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">Thiết lập tỉ lệ chia sẻ doanh thu và ngưỡng thanh toán</p>
          </div>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Input Item */}
          <div className="space-y-2 group">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Hoa hồng giảng viên (%)</label>
            <div className="relative">
              <input 
                type="number" 
                defaultValue={70}
                className="w-full h-12 pl-4 pr-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-black text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 pointer-events-none">%</span>
            </div>
          </div>

          <div className="space-y-2 group">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Phí nền tảng (%)</label>
            <div className="relative">
              <input 
                type="number" 
                defaultValue={30}
                className="w-full h-12 pl-4 pr-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-black text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 pointer-events-none">%</span>
            </div>
          </div>

          <div className="space-y-2 group">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Thuế VAT học viên (%)</label>
            <div className="relative">
              <input 
                type="number" 
                defaultValue={10}
                className="w-full h-12 pl-4 pr-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-black text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 pointer-events-none">%</span>
            </div>
          </div>

          <div className="space-y-2 group">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Ngưỡng thanh toán tối thiểu</label>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <DollarSign className="w-4 h-4 text-slate-400" />
              </div>
              <input 
                type="text" 
                defaultValue="500,000"
                className="w-full h-12 pl-10 pr-12 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-black text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 font-bold text-slate-400 pointer-events-none">đ</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* API Integrations */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-800/20">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-50 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-2xl border border-amber-100 dark:border-amber-500/20 shadow-inner">
              <LinkIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Kết nối API & Third-party</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">Quản lý tích hợp dịch vụ bên ngoài</p>
            </div>
          </div>
          <Button 
            onClick={handleTestConnection}
            variant="outline" 
            className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-xl whitespace-nowrap"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isTesting ? 'animate-spin text-indigo-500' : ''}`} />
            <span className="font-semibold">{isTesting ? 'Đang kiểm tra...' : 'Kiểm tra kết nối'}</span>
          </Button>
        </div>

        <div className="p-4 md:p-6 space-y-3">
          {/* API Item 1 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-colors group cursor-pointer gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">AWS S3 Storage</h4>
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 tracking-wider">AKIA**********F3QL</p>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 justify-between sm:justify-end">
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Active</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
            </div>
          </div>

          {/* API Item 2 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-colors group cursor-pointer gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">VNPAY Merchant Gateway</h4>
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 tracking-wider">MID: 948213</p>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 justify-between sm:justify-end">
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Active</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
            </div>
          </div>

          {/* API Item 3 */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-colors group cursor-pointer gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">Google Gemini AI</h4>
                <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400 mt-1 tracking-wider">Model: Pro-2.0-Flash</p>
              </div>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 justify-between sm:justify-end">
              <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 rounded-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Active</span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating Action Bar (Save Button) */}
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 20 }}
        className="fixed bottom-6 left-6 right-6 md:left-72 md:right-10 z-50"
      >
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-4 md:p-6 rounded-3xl shadow-2xl shadow-indigo-600/30 flex flex-col sm:flex-row items-center justify-between gap-4 border border-indigo-500/30">
          <div className="flex items-center gap-3 text-indigo-100">
            <ShieldCheck className="w-5 h-5 opacity-80" />
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold">Chưa có thay đổi nào cần lưu</p>
              <p className="text-[11px] opacity-70 mt-0.5">Cập nhật lần cuối: 16/03/2026 - 18:04</p>
            </div>
          </div>
          
          <Button className="w-full sm:w-auto h-12 bg-white text-indigo-600 hover:bg-slate-50 hover:scale-105 transition-all shadow-lg rounded-xl px-8 border-0 group">
            <Save className="w-4 h-4 mr-2 group-hover:animate-bounce" />
            <span className="font-black text-base">Lưu tất cả thay đổi</span>
          </Button>
        </div>
      </motion.div>

    </motion.div>
  );
}