"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Bell, LayoutDashboard, BookOpen, 
  Trophy, Settings, LogOut, CheckCircle2, 
  Sparkles, Clock
} from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

export function StudentHeader() {
  const { user, logout } = useAuthStore();
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const userRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  // Click ra ngoài thì đóng các menu lại
  useOnClickOutside(userRef, () => setIsUserOpen(false));
  useOnClickOutside(notifRef, () => setIsNotifOpen(false));

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100 px-4 sm:px-6 py-3">
      <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Search Bar (Logo đã nằm bên Sidebar nên Header không cần logo nữa, trừ khi ở màn hình mobile) */}
        <div className="flex-1 flex items-center gap-4">
          {/* Logo cho Mobile (Hiển thị khi màn hình nhỏ, Sidebar bị ẩn) */}
          <div className="md:hidden flex items-center gap-2 font-black text-xl text-[#0B56D5]">
             <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-[#0B56D5] rounded-xl flex items-center justify-center text-white shadow-sm">
                M
             </div>
          </div>

          <div className="relative max-w-md w-full hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Tìm khóa học, kỹ năng..." 
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100/80 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-blue-500/30 rounded-full text-sm focus:ring-4 focus:ring-blue-500/10 transition-all outline-none text-slate-700"
            />
          </div>
        </div>

        {/* Right: Actions (Notification & User Profile) */}
        <div className="flex items-center gap-2 sm:gap-4">
          
          {/* Notification Bell */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => { setIsNotifOpen(!isNotifOpen); setIsUserOpen(false); }}
              className={`p-2.5 rounded-full transition-colors relative ${isNotifOpen ? 'bg-blue-50 text-blue-600' : 'hover:bg-slate-100 text-slate-600'}`}
            >
              <Bell className="w-5 h-5" />
              {/* Chấm đỏ thông báo */}
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
            </button>

            <AnimatePresence>
              {isNotifOpen && <NotificationDropdown />}
            </AnimatePresence>
          </div>

          {/* User Profile */}
          <div className="relative" ref={userRef}>
            <button 
              onClick={() => { setIsUserOpen(!isUserOpen); setIsNotifOpen(false); }}
              className="flex items-center gap-2 pl-1.5 pr-3 py-1.5 rounded-full border border-slate-200 hover:border-blue-200 hover:bg-blue-50/50 transition-all cursor-pointer bg-white"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white text-sm font-bold shadow-sm">
                {user?.name?.charAt(0) || "U"}
              </div>
              <span className="text-sm font-semibold text-slate-700 hidden sm:block truncate max-w-[120px]">
                {user?.name || "Học viên"}
              </span>
            </button>

            <AnimatePresence>
              {isUserOpen && <UserDropdown user={user} onLogout={logout} />}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}

// --- Sub-components (Dropdowns) ---

function UserDropdown({ user, onLogout }: { user: any, onLogout: () => void }) {
  const menuItems = [
    { icon: <LayoutDashboard className="w-4 h-4" />, label: "Tổng quan", color: "text-blue-500" },
    { icon: <BookOpen className="w-4 h-4" />, label: "Khóa học của tôi", color: "text-emerald-500" },
    { icon: <Trophy className="w-4 h-4" />, label: "Thành tích", color: "text-amber-500" },
    { icon: <Settings className="w-4 h-4" />, label: "Cài đặt", color: "text-slate-500" },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 mt-3 w-72 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden transform origin-top-right"
    >
      {/* Header Profile */}
      <div className="p-5 bg-gradient-to-b from-blue-50/50 to-transparent">
        <div className="flex items-center gap-3 mb-1">
          <p className="font-bold text-slate-800 text-lg truncate">{user?.name || 'Học viên Maco'}</p>
          <div className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold rounded-full uppercase tracking-tighter shrink-0">Pro</div>
        </div>
        <p className="text-xs text-slate-400 font-medium tracking-tight">ID: {user?.id || '280426'}</p>
      </div>

      {/* Menu List */}
      <div className="px-2 pb-2">
        {menuItems.map((item, index) => (
          <button 
            key={index}
            className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-slate-50 group-hover:bg-white group-hover:shadow-sm transition-all ${item.color}`}>
                {item.icon}
              </div>
              <span className="text-sm font-semibold text-slate-600 group-hover:text-slate-900">{item.label}</span>
            </div>
            <motion.div whileHover={{ x: 3 }} className="text-slate-300 opacity-0 group-hover:opacity-100">
              <Sparkles className="w-3 h-3" />
            </motion.div>
          </button>
        ))}
        
        <div className="h-px bg-slate-100 my-2 mx-3" />
        
        <button 
          onClick={onLogout}
          className="w-full flex items-center gap-3 p-3 rounded-xl text-red-500 hover:bg-red-50 transition-colors font-bold text-sm group"
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

function NotificationDropdown() {
  const notifications = [
    { title: "Bài giảng mới", desc: "Giảng viên vừa cập nhật chương 5 về Redux Toolkit...", time: "2 phút trước", icon: <CheckCircle2 className="text-emerald-500 w-5 h-5" /> },
    { title: "Ưu đãi khóa học", desc: "Giảm giá 50% các khóa học AI duy nhất hôm nay!", time: "1 giờ trước", icon: <Sparkles className="text-blue-500 w-5 h-5" /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute right-0 mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-slate-100 transform origin-top-right"
    >
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <h3 className="font-bold text-slate-800">Thông báo</h3>
        <button className="text-[12px] font-bold text-blue-600 hover:underline">Đánh dấu đã đọc</button>
      </div>
      <div className="max-h-[350px] overflow-y-auto p-2 scroll-smooth">
        {notifications.map((n, i) => (
          <div key={i} className="p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer flex gap-3 group">
            <div className="w-10 h-10 rounded-full bg-slate-50 group-hover:bg-white group-hover:shadow-sm transition-all flex items-center justify-center flex-shrink-0">
              {n.icon}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800 leading-tight truncate">{n.title}</p>
              <p className="text-[13px] text-slate-500 mt-1 line-clamp-2 leading-relaxed">{n.desc}</p>
              <div className="flex items-center gap-1.5 mt-2 text-[11px] text-slate-400 font-medium">
                <Clock className="w-3.5 h-3.5" /> {n.time}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 bg-slate-50 rounded-b-2xl text-center border-t border-slate-100">
        <button className="text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">Xem tất cả thông báo</button>
      </div>
    </motion.div>
  );
}