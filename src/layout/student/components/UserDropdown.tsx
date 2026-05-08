import { motion } from "framer-motion";
import { LayoutDashboard, BookOpen, Trophy, Settings, Sparkles, LogOut } from "lucide-react";

interface UserDropdownProps {
  user: any;
  onLogout: () => void;
}

export function UserDropdown({ user, onLogout }: UserDropdownProps) {
  const menuItems = [
    { icon: <LayoutDashboard className="w-4 h-4" />, label: "Tổng quan", color: "text-blue-500", bg: "bg-blue-50" },
    { icon: <BookOpen className="w-4 h-4" />, label: "Khóa học của tôi", color: "text-emerald-500", bg: "bg-emerald-50" },
    { icon: <Trophy className="w-4 h-4" />, label: "Thành tích", color: "text-amber-500", bg: "bg-amber-50" },
    { icon: <Settings className="w-4 h-4" />, label: "Cài đặt", color: "text-slate-500", bg: "bg-slate-50" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute right-0 mt-3 w-72 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-slate-100 p-2 transform origin-top-right z-50"
    >
      <div className="p-4 mb-2 bg-slate-50/50 rounded-2xl">
        <p className="font-bold text-slate-800 text-base">{user?.name || 'Học viên'}</p>
        <p className="text-xs text-slate-400 font-medium">ID: {user?.id?.slice(0, 8) || '280426'}</p>
      </div>

      <div className="space-y-1">
        {menuItems.map((item, index) => (
          <motion.button 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900">{item.label}</span>
            </div>
            <Sparkles className="w-3 h-3 text-[#0B56D5] opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        ))}
        
        <div className="h-px bg-slate-100 my-2 mx-2" />
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-all font-bold text-sm group"
        >
          <div className="p-2 rounded-lg bg-red-50 group-hover:bg-red-100 transition-colors">
            <LogOut className="w-4 h-4" />
          </div>
          Đăng xuất
        </button>
      </div>
    </motion.div>
  );
}