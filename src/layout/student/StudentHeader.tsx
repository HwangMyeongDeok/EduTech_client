import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Bell, Compass, BookOpen } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

// Import components con
import { SearchBar } from "./components/SearchBar";
import { NotificationDropdown } from "./components/NotificationDropdown";
import { UserDropdown } from "./components/UserDropdown";

export function StudentHeader() {
  const { user, logout } = useAuthStore();
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const userRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(userRef, () => setIsUserOpen(false));
  useOnClickOutside(notifRef, () => setIsNotifOpen(false));

  return (
    <header className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-slate-200/60 px-4 sm:px-6 lg:px-8 py-3 shadow-sm">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-4 md:gap-8">
        
        {/* Left: Logo & Main Navigation */}
        <div className="flex items-center gap-8">
          <Link to="/student/dashboard" className="text-2xl font-black text-[#0B56D5] tracking-tight">
            moca.
          </Link>
          
          {/* Quick Links cho Desktop */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link to="/student/explore" className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#0B56D5] transition-colors">
              <Compass className="w-4 h-4" />
              Khám phá
            </Link>
            <Link to="/student/my-courses" className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-[#0B56D5] transition-colors">
              <BookOpen className="w-4 h-4" />
              Khóa học của tôi
            </Link>
          </nav>
        </div>

        {/* Center: SearchBar (Coursera style để thanh search ở giữa) */}
        <div className="flex-1 max-w-2xl hidden md:block">
          <SearchBar />
        </div>

        {/* Right: Actions & User */}
        <div className="flex items-center gap-3">
          {/* SearchBar icon cho Mobile */}
          <div className="md:hidden">
            <SearchBar />
          </div>

          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => { setIsNotifOpen(!isNotifOpen); setIsUserOpen(false); }}
              className={`p-2.5 rounded-full transition-all relative ${isNotifOpen ? 'bg-[#0B56D5]/10 text-[#0B56D5]' : 'hover:bg-slate-100 text-slate-600'}`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            </button>
            <AnimatePresence>
              {isNotifOpen && <NotificationDropdown />}
            </AnimatePresence>
          </div>

          {/* User Profile */}
          <div className="relative" ref={userRef}>
            <button 
              onClick={() => { setIsUserOpen(!isUserOpen); setIsNotifOpen(false); }}
              className="flex items-center gap-3 p-1 pr-3 md:pr-4 rounded-full border border-slate-200 hover:border-[#0B56D5]/30 hover:bg-slate-50 transition-all group"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0B56D5] to-blue-400 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-blue-500/20 group-hover:scale-95 transition-transform">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-none mb-0.5">{user?.name || "Học viên"}</p>
              </div>
            </button>
            <AnimatePresence>
              {isUserOpen && (
                <UserDropdown 
                  user={user} 
                  onLogout={logout} 
                  onClose={() => setIsUserOpen(false)} // Thêm prop này để đóng menu khi click link
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
}