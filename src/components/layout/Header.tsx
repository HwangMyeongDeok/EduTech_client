import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Hexagon, Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Trang chủ", path: "/" },
    { name: "Khóa học", path: "/courses" },
    { name: "Giảng viên", path: "/instructors" },
    { name: "Liên hệ", path: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 z-50 w-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "bg-white/80 backdrop-blur-xl shadow-[0_2px_20px_rgba(11,86,213,0.08)] border-b border-blue-50 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container flex items-center justify-between px-4 mx-auto lg:px-24 xl:px-44">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative flex items-center justify-center w-9 h-9 overflow-hidden">
              <div className="absolute inset-0 bg-[#0B56D5] rounded-xl shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-shadow duration-300" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#1E6FFF] to-[#0B56D5] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Hexagon className="relative z-10 w-5 h-5 text-white fill-current" />
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-slate-900 group-hover:text-[#0B56D5] transition-colors duration-300">
              maco
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-semibold">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`relative px-4 py-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "text-[#0B56D5] bg-blue-50"
                      : "text-slate-600 hover:text-[#0B56D5] hover:bg-blue-50/70"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#0B56D5] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              className="hidden sm:flex font-semibold text-slate-700 hover:text-[#0B56D5] hover:bg-blue-50/70 rounded-full px-5 h-10 transition-all duration-300"
            >
              Đăng nhập
            </Button>
            <Button className="px-5 h-10 font-bold text-white bg-[#0B56D5] rounded-full shadow-lg shadow-blue-500/25 hover:bg-[#0944B8] hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-200">
              Đăng ký
            </Button>

            {/* Mobile Toggle */}
            <button
              className="flex md:hidden items-center justify-center w-10 h-10 ml-1 rounded-full text-slate-700 hover:bg-blue-50 hover:text-[#0B56D5] transition-all duration-200"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-400 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        {/* Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-72 bg-white shadow-2xl transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-6 border-b border-slate-100">
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2"
            >
              <div className="flex items-center justify-center w-8 h-8 bg-[#0B56D5] rounded-lg">
                <Hexagon className="w-4 h-4 text-white fill-current" />
              </div>
              <span className="text-xl font-extrabold text-slate-900">
                maco
              </span>
            </Link>

            <button
              onClick={() => setMobileOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-slate-500 hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <nav className="p-6 space-y-1">
            {navItems.map((item, i) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  style={{ animationDelay: `${i * 60}ms` }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 ${
                    mobileOpen ? "animate-fadeInLeft" : ""
                  } ${
                    isActive
                      ? "bg-blue-50 text-[#0B56D5]"
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#0B56D5]"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="ml-auto w-1.5 h-1.5 bg-[#0B56D5] rounded-full" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-6 border-t border-slate-100 space-y-3">
            <Button
              variant="outline"
              className="w-full font-semibold rounded-xl border-slate-200 h-11"
            >
              Đăng nhập
            </Button>
            <Button className="w-full font-bold text-white bg-[#0B56D5] rounded-xl h-11 shadow-lg shadow-blue-500/20">
              Đăng ký ngay
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}