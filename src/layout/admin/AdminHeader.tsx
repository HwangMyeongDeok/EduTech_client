import { Search, Bell, Sun, Moon, Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AdminHeader() {
  const [isDark, setIsDark] = useState(false);

  // Logic đơn giản để toggle class 'dark' trên thẻ <html>
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 lg:px-10 flex items-center justify-between sticky top-0 z-40 transition-colors duration-300">
      
      {/* Left: Mobile Menu & Search */}
      <div className="flex items-center gap-4 flex-1">
        <Button variant="ghost" size="icon" className="lg:hidden text-slate-500 dark:text-slate-400">
          <Menu className="w-6 h-6" />
        </Button>
        
        <div className="hidden md:flex items-center relative w-full max-w-md">
          <Search className="w-5 h-5 absolute left-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Tìm kiếm khóa học, người dùng, giao dịch..." 
            className="w-full h-11 pl-12 pr-4 bg-slate-100 dark:bg-slate-800 border-transparent rounded-full text-sm font-medium text-slate-800 dark:text-slate-200 placeholder:text-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 md:gap-5">
        
        {/* Nút bật/tắt Sáng/Tối */}
        <button 
          onClick={() => setIsDark(!isDark)}
          className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Thông báo */}
        <button className="relative w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-rose-500 border-2 border-white dark:border-slate-800"></span>
        </button>

        <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

        {/* Admin Profile */}
        <button className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">Super Admin</p>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">System</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-600 border-2 border-white dark:border-slate-800 shadow-sm flex items-center justify-center text-white font-bold">
            AD
          </div>
        </button>

      </div>
    </header>
  );
}