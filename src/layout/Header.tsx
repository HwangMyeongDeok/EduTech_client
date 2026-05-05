import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { Hexagon, Menu } from "lucide-react";

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
    <header
      className={`fixed top-0 z-40 w-full transition-all duration-500 ${isScrolled
          ? "bg-white/80 backdrop-blur-xl shadow-sm border-b py-3"
          : "bg-transparent py-5"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
          <div className="relative flex items-center justify-center w-9 h-9">
            <div className="absolute inset-0 bg-[#0B56D5] rounded-xl" />
            <Hexagon className="relative z-10 w-5 h-5 text-white fill-current" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900 group-hover:text-[#0B56D5]">
            maco
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-semibold">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`px-4 py-2 rounded-full transition cursor-pointer ${isActive
                    ? "text-[#0B56D5] bg-blue-50"
                    : "text-slate-600 hover:text-[#0B56D5] hover:bg-blue-50/70"
                  }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Desktop CTA */}
          <Button
            variant="ghost"
            className="hidden sm:flex font-semibold text-slate-700 hover:text-[#0B56D5]"
          >
            Đăng nhập
          </Button>

          <Button className="hidden sm:flex px-5 h-10 font-bold text-white bg-[#0B56D5] rounded-full">
            Đăng ký
          </Button>

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button className="flex md:hidden items-center justify-center w-10 h-10 rounded-full hover:bg-blue-50 cursor-pointer">
                <Menu className="w-5 h-5" />
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="w-72 p-0">
              <SheetTitle className="sr-only">Menu</SheetTitle>

              {/* Top */}
              <div className="flex items-center justify-between p-6 border-b">
                <span className="text-lg font-bold">maco</span>
              </div>

              {/* Nav */}
              <nav className="p-6 space-y-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`block px-4 py-3 rounded-xl text-sm font-semibold ${isActive
                          ? "bg-blue-50 text-[#0B56D5]"
                          : "hover:bg-slate-100"
                        }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              {/* CTA */}
              <div className="p-6 border-t space-y-3">
                <Button
                  variant="outline"
                  className="w-full font-semibold h-11"
                >
                  Đăng nhập
                </Button>

                <Button className="w-full font-bold text-white bg-[#0B56D5] h-11">
                  Đăng ký ngay
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}