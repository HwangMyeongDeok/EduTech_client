"use client";

import { NavLink } from "react-router-dom";
import { 
  Compass, BookOpen, Trophy, Settings, 
  ChevronLeft, Sparkles, type LucideIcon 
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface NavItem {
  name: string;
  icon: LucideIcon;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Khám phá", icon: Compass, path: "/student/dashboard" },
  { name: "Khóa học của tôi", icon: BookOpen, path: "/student/my-courses" },
  { name: "Thành tích", icon: Trophy, path: "/student/achievements" },
  { name: "Cài đặt", icon: Settings, path: "/student/settings" },
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

export function StudentSidebar({ 
  isCollapsed, 
  setIsCollapsed, 
  isMobileOpen, 
  setIsMobileOpen 
}: SidebarProps) {

  // --- Hàm render nội dung bên trong Sidebar ---
  const renderSidebarContent = (collapsed: boolean, isMobile: boolean = false) => (
    <div className="flex flex-col h-full bg-white">
      {/* Logo Section */}
      <div className={cn(
        "h-20 flex items-center px-6 shrink-0", 
        collapsed ? "justify-center" : "justify-start"
      )}>
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-[#0B56D5] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
          <span className="font-black text-xl">M</span>
        </div>
        {!collapsed && (
          <motion.span 
            initial={{ opacity: 0, x: -10 }} 
            animate={{ opacity: 1, x: 0 }}
            className="ml-3 font-black text-2xl tracking-tighter text-slate-800 whitespace-nowrap"
          >
            maco.
          </motion.span>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto scrollbar-hide">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              // Nếu là mobile, click xong thì đóng sidebar
              onClick={() => isMobile && setIsMobileOpen(false)}
              className={({ isActive }) => cn(
                "relative flex items-center gap-3.5 px-3.5 py-3.5 rounded-2xl font-bold transition-all duration-300 group/item",
                isActive ? "text-[#0B56D5]" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50",
                collapsed && "justify-center px-0"
              )}
            >
              {({ isActive }) => (
                <>
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-blue-50/80 rounded-2xl -z-10 border border-blue-100/50"
                    />
                  )}
                  <div className={cn("shrink-0 transition-transform", (isActive || collapsed) ? "scale-110" : "group-hover/item:scale-110")}>
                    <Icon className="w-5 h-5" />
                  </div>
                  
                  {!collapsed && (
                    <motion.span 
                      initial={{ opacity: 0 }} 
                      animate={{ opacity: 1 }}
                      className="text-[14px] whitespace-nowrap overflow-hidden"
                    >
                      {item.name}
                    </motion.span>
                  )}

                  {/* Tooltip khi thu gọn */}
                  {collapsed && !isMobile && (
                    <div className="absolute left-16 scale-0 group-hover/item:scale-100 transition-all bg-slate-900 text-white text-[10px] px-2 py-1 rounded-md pointer-events-none whitespace-nowrap z-[60]">
                      {item.name}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Upgrade Box - Ẩn khi thu gọn (trừ khi trên mobile) */}
      <AnimatePresence>
        {(!collapsed || isMobile) && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 20 }}
            className="p-4 mt-auto"
          >
            <div className="bg-slate-900 rounded-[2rem] p-5 relative overflow-hidden group cursor-pointer shadow-xl">
               <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-500/10 blur-2xl rounded-full" />
               <p className="text-white font-bold text-xs relative z-10 flex items-center gap-2">
                 PRO USER <Sparkles className="w-3 h-3 text-amber-400" />
               </p>
               <p className="text-slate-400 text-[10px] mt-1 relative z-10">Mở khóa mọi giới hạn</p>
               <button className="mt-3 w-full py-2 bg-white text-slate-900 rounded-xl text-[10px] font-black hover:bg-blue-600 hover:text-white transition-all active:scale-95">
                  NÂNG CẤP
               </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      {/* 1. DESKTOP SIDEBAR: Co dãn mượt mà */}
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 85 : 280 }}
        className="hidden md:flex flex-col bg-white border-r border-slate-100 sticky top-0 h-screen z-40 relative shrink-0"
      >
        {/* Nút Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="absolute -right-3 top-8 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-[#0B56D5] hover:border-[#0B56D5] transition-all z-50 shadow-sm"
        >
          <ChevronLeft className={cn("w-4 h-4 transition-transform duration-300", isCollapsed && "rotate-180")} />
        </button>

        {renderSidebarContent(isCollapsed)}
      </motion.aside>

      {/* 2. MOBILE SIDEBAR: Trượt ra từ bên trái (Dùng Sheet) */}
      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 w-72 border-r-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Menu Maco</SheetTitle>
          </SheetHeader>
          {/* Trên mobile thì mặc định là không collapsed */}
          {renderSidebarContent(false, true)}
        </SheetContent>
      </Sheet>
    </>
  );
}