import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, Users, BookOpen, ShieldCheck, 
  DollarSign, Settings, LogOut, 
  ServerCrash
} from "lucide-react";
import { motion } from "framer-motion";

const MENU_ITEMS = [
  { path: "/admin/dashboard", label: "Tổng quan", icon: LayoutDashboard },
  { path: "/admin/users", label: "Người dùng", icon: Users },
  { path: "/admin/courses", label: "Khóa học", icon: BookOpen },
  { path: "/admin/finance", label: "Tài chính", icon: DollarSign },
  { path: "/admin/system-monitoring", label: "Giám sát hệ thống", icon: ServerCrash },
  { path: "/admin/security-roles", label: "Vai trò bảo mật", icon: ShieldCheck },
  { path: "/admin/system-settings", label: "Cài đặt", icon: Settings },
];

export default function AdminSidebar() {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-slate-900 border-r border-slate-800 flex flex-col hidden lg:flex sticky top-0">
      {/* Logo */}
      <div className="h-20 flex items-center px-8 border-b border-slate-800">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-black text-white tracking-tight">ADMIN<span className="text-blue-500">PRO</span></span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
        {MENU_ITEMS.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all duration-300 ${
                isActive 
                  ? "text-white bg-blue-600/10" 
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              }`}
            >
              {isActive && (
                <motion.div 
                  layoutId="admin-sidebar-active"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-blue-600 rounded-r-full" 
                />
              )}
              <Icon className={`w-5 h-5 ${isActive ? "text-blue-500" : ""}`} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-800">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-bold text-rose-400 hover:text-rose-300 hover:bg-rose-400/10 transition-colors">
          <LogOut className="w-5 h-5" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}