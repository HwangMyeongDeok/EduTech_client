import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { LayoutDashboard, Award, Settings, LogOut, Sparkles, Compass, BookOpen } from "lucide-react"; 

interface UserDropdownProps {
  user: any;
  onLogout: () => void;
  onClose: () => void;
}

export function UserDropdown({ user, onLogout, onClose }: UserDropdownProps) {
  // Thay đổi menuItems theo đúng Route của ông
  const menuItems = [
    { icon: <LayoutDashboard className="w-4 h-4" />, label: "Bảng điều khiển", color: "text-blue-500", bg: "bg-blue-50", link: "/student/dashboard" },
    { icon: <Award className="w-4 h-4" />, label: "Thành tựu", color: "text-amber-500", bg: "bg-amber-50", link: "/student/achievements" },
    { icon: <Settings className="w-4 h-4" />, label: "Cài đặt tài khoản", color: "text-slate-500", bg: "bg-slate-100", link: "/student/settings" },
  ];

  // Links dành riêng cho màn hình Mobile (vì Header bị ẩn chữ)
  const mobileMenuItems = [
    { icon: <Compass className="w-4 h-4" />, label: "Khám phá khóa học", color: "text-indigo-500", bg: "bg-indigo-50", link: "/student/explore" },
    { icon: <BookOpen className="w-4 h-4" />, label: "Khóa học của tôi", color: "text-emerald-500", bg: "bg-emerald-50", link: "/student/my-courses" },
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
        <p className="text-xs text-slate-400 font-medium">Học viên Pro</p>
      </div>

      <div className="space-y-1">
        {/* Render Mobile Links (Chỉ hiện trên màn nhỏ) */}
        <div className="lg:hidden mb-2 pb-2 border-b border-slate-100">
          {mobileMenuItems.map((item, index) => (
            <Link 
              key={`mobile-${index}`}
              to={item.link}
              onClick={onClose}
              className="w-full flex items-center p-3 rounded-xl hover:bg-slate-50 transition-all group"
            >
              <div className={`p-2 rounded-lg ${item.bg} ${item.color} mr-3`}>
                {item.icon}
              </div>
              <span className="text-sm font-semibold text-slate-600 group-hover:text-[#0B56D5]">{item.label}</span>
            </Link>
          ))}
        </div>

        {/* Render Main Links */}
        {menuItems.map((item, index) => (
          <Link 
            key={index}
            to={item.link}
            onClick={onClose}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-all group block"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${item.bg} ${item.color} group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900">{item.label}</span>
            </div>
            <Sparkles className="w-3 h-3 text-[#0B56D5] opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
        
        <div className="h-px bg-slate-100 my-2 mx-2" />
        
        <button 
          onClick={() => {
            onClose();
            onLogout();
          }}
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