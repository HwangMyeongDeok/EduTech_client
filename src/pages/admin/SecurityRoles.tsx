import { 
  Shield, ShieldAlert, ShieldCheck, Users, Edit, Trash2, 
  Lock, Plus, ChevronRight, KeyRound, Activity, Fingerprint
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { Button } from "@/components/ui/button";

// --- MOCK DATA ---
const ROLES = [
  { 
    id: "01", 
    name: "Super Admin", 
    headcount: 2, 
    badge: "TOÀN QUYỀN HỆ THỐNG", 
    desc: "Quản lý nhân sự, tài chính và cấu hình hệ thống.", 
    theme: "rose", 
    icon: ShieldAlert,
    letter: "S"
  },
  { 
    id: "02", 
    name: "Content Reviewer", 
    headcount: 5, 
    badge: "PHÊ DUYỆT KHÓA HỌC", 
    desc: "Kiểm duyệt nội dung video, bài tập và câu hỏi quiz.", 
    theme: "indigo", 
    icon: ShieldCheck,
    letter: "C"
  },
  { 
    id: "03", 
    name: "Financial Manager", 
    headcount: 3, 
    badge: "DOANH THU & ĐỐI SOÁT", 
    desc: "Quản lý dòng tiền, thanh toán cho giảng viên.", 
    theme: "emerald", 
    icon: Shield,
    letter: "F"
  },
];

// --- ANIMATION VARIANTS ---
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 350, damping: 25 } }
};

export default function SecurityRoles() {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-10"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Bảo mật & Phân quyền
        </h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mt-1">
          Quản lý vai trò nhân sự và cấu hình truy cập hệ thống.
        </p>
      </motion.div>

      {/* Role Management Section */}
      <motion.div variants={itemVariants} className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        {/* Section Header */}
        <div className="p-6 md:p-8 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-2xl border border-indigo-100 dark:border-indigo-500/20 shadow-inner">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white tracking-tight">Quản lý vai trò</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">Phân quyền truy cập dựa trên chức năng vận hành</p>
            </div>
          </div>
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-600/20 rounded-xl whitespace-nowrap">
            <Plus className="w-4 h-4 mr-2" />
            <span className="font-bold">Thêm vai trò mới</span>
          </Button>
        </div>

        {/* Roles List */}
        <div className="p-4 md:p-6 space-y-4">
          {ROLES.map((role) => {
            // Theme configuration based on role color
            const themes = {
              rose: "text-rose-600 bg-rose-50 border-rose-200 dark:text-rose-400 dark:bg-rose-500/10 dark:border-rose-500/20 hover:bg-rose-100 dark:hover:bg-rose-500/20",
              indigo: "text-indigo-600 bg-indigo-50 border-indigo-200 dark:text-indigo-400 dark:bg-indigo-500/10 dark:border-indigo-500/20 hover:bg-indigo-100 dark:hover:bg-indigo-500/20",
              emerald: "text-emerald-600 bg-emerald-50 border-emerald-200 dark:text-emerald-400 dark:bg-emerald-500/10 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20",
            }[role.theme];

            const avatarBg = {
              rose: "bg-gradient-to-br from-rose-400 to-rose-600 shadow-rose-500/30",
              indigo: "bg-gradient-to-br from-indigo-400 to-indigo-600 shadow-indigo-500/30",
              emerald: "bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-emerald-500/30",
            }[role.theme];

            return (
              <div 
                key={role.id} 
                className="group flex flex-col lg:flex-row lg:items-center justify-between p-5 rounded-2xl border border-slate-200 dark:border-slate-700/50 hover:border-indigo-300 dark:hover:border-indigo-500/50 bg-white dark:bg-slate-800/50 hover:shadow-md transition-all duration-300 gap-6"
              >
                {/* Left Info */}
                <div className="flex items-start gap-4">
                  {/* Role Avatar */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-lg shrink-0 ${avatarBg}`}>
                    {role.letter}
                  </div>
                  
                  {/* Role Details */}
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h4 className="text-base font-black text-slate-900 dark:text-white">{role.name}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600">
                        ID: {role.id}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <Users className="w-3.5 h-3.5" />
                        {role.headcount} nhân sự
                      </div>
                      <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                      <span className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded-md border ${themes}`}>
                        {role.badge}
                      </span>
                    </div>

                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium mt-2">
                      {role.desc}
                    </p>
                  </div>
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 lg:ml-auto border-t lg:border-t-0 border-slate-100 dark:border-slate-700 pt-4 lg:pt-0">
                  <Button variant="outline" size="sm" className="flex-1 lg:flex-none border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 h-9 rounded-xl">
                    <Edit className="w-3.5 h-3.5 mr-2" />
                    Sửa quyền
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 lg:flex-none border-rose-100 dark:border-rose-500/20 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-rose-600 dark:text-rose-400 h-9 w-12 p-0 flex items-center justify-center rounded-xl">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* 2FA Security Section */}
      <motion.div variants={itemVariants} className="relative overflow-hidden bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-8 md:p-12 text-center group">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-500/5 dark:bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute right-0 bottom-0 opacity-5 dark:opacity-10 pointer-events-none">
          <Fingerprint className="w-64 h-64 text-indigo-500 translate-x-1/4 translate-y-1/4" />
        </div>

        <div className="relative z-10 flex flex-col items-center max-w-lg mx-auto">
          {/* Glowing Lock Icon */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
            <div className="w-20 h-20 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center border border-indigo-100 dark:border-indigo-500/30 shadow-xl relative z-10">
              <Lock className="w-10 h-10 text-indigo-600 dark:text-indigo-400" />
            </div>
            {/* Tiny decoration dots */}
            <Activity className="absolute -right-4 -top-2 w-5 h-5 text-emerald-500 opacity-50" />
            <KeyRound className="absolute -left-6 bottom-2 w-6 h-6 text-amber-500 opacity-50 -rotate-12" />
          </div>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-3">Xác thực hai yếu tố (2FA)</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base leading-relaxed mb-8">
            Tăng cường bảo mật bằng cách yêu cầu mã xác minh từ <strong className="text-indigo-600 dark:text-indigo-400">Google Authenticator</strong> hoặc <strong className="text-indigo-600 dark:text-indigo-400">SMS</strong> cho mỗi lần đăng nhập.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button className="w-full sm:w-auto h-12 px-8 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white rounded-xl shadow-lg shadow-indigo-500/25 border-0">
              <span className="font-bold text-base">Kích hoạt ngay</span>
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" className="w-full sm:w-auto h-12 px-6 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl">
              <span className="font-semibold">Xem nhật ký truy cập</span>
            </Button>
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}