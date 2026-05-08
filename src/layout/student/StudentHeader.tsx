import { useState, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Bell, Menu } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";

// Import components con
import { SearchBar } from "./components/SearchBar";
import { NotificationDropdown } from "./components/NotificationDropdown";
import { UserDropdown } from "./components/UserDropdown";

interface HeaderProps {
  onOpenMobileMenu: () => void;
}

export function StudentHeader({ onOpenMobileMenu }: HeaderProps) {
  const { user, logout } = useAuthStore();
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  
  const userRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(userRef, () => setIsUserOpen(false));
  useOnClickOutside(notifRef, () => setIsNotifOpen(false));

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-slate-200/60 px-4 sm:px-8 py-3">
      <div className="max-w-[1600px] mx-auto flex items-center justify-between gap-8">
        
        {/* Left Section */}
        <div className="flex-1 flex items-center gap-4">
          <div className="md:hidden flex items-center gap-3">
             <button 
               onClick={onOpenMobileMenu}
               className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
             >
               <Menu className="w-6 h-6" />
             </button>
             <div className="w-9 h-9 bg-[#0B56D5] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 font-black text-sm">
               M
             </div>
          </div>
          <SearchBar />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Notifications */}
          <div className="relative" ref={notifRef}>
            <button 
              onClick={() => { setIsNotifOpen(!isNotifOpen); setIsUserOpen(false); }}
              className={`p-2.5 rounded-xl transition-all relative ${isNotifOpen ? 'bg-[#0B56D5]/10 text-[#0B56D5]' : 'hover:bg-slate-100 text-slate-600'}`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            </button>
            <AnimatePresence>
              {isNotifOpen && <NotificationDropdown />}
            </AnimatePresence>
          </div>

          {/* User Profile */}
          <div className="relative" ref={userRef}>
            <button 
              onClick={() => { setIsUserOpen(!isUserOpen); setIsNotifOpen(false); }}
              className="flex items-center gap-3 p-1 pr-4 rounded-2xl border border-slate-200 hover:border-[#0B56D5]/30 hover:bg-white hover:shadow-sm transition-all group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#0B56D5] to-blue-400 flex items-center justify-center text-white text-sm font-bold shadow-md shadow-blue-500/20 group-hover:scale-95 transition-transform">
                {user?.name?.charAt(0) || "U"}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-slate-800 leading-none mb-0.5">{user?.name || "Học viên"}</p>
                <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Học viên Pro</p>
              </div>
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