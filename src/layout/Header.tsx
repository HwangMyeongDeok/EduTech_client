import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { Hexagon, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { AuthModal, type AuthView } from "@/components/auth/AuthModal";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState<AuthView>(null);
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
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: EASE_OUT_EXPO }}
        className={`fixed top-0 z-40 w-full transition-all duration-500 ${
          isScrolled
            ? "bg-white/85 backdrop-blur-2xl shadow-sm border-b border-slate-100/80 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
              <div className="relative flex items-center justify-center w-9 h-9">
                <div className="absolute inset-0 bg-[#0B56D5] rounded-xl" />
                <Hexagon className="relative z-10 w-5 h-5 text-white fill-current" />
              </div>
              <span className="text-2xl font-extrabold text-slate-900 group-hover:text-[#0B56D5] transition-colors duration-300">
                maco
              </span>
            </Link>
          </motion.div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-semibold">
            {navItems.map((item, i) => {
              const isActive = location.pathname === item.path;
              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 * i, ease: EASE_OUT_EXPO }}
                >
                  <Link
                    to={item.path}
                    className={`relative px-4 py-2 rounded-full cursor-pointer transition-colors duration-200 ${
                      isActive
                        ? "text-[#0B56D5] bg-blue-50"
                        : "text-slate-600 hover:text-[#0B56D5] hover:bg-blue-50/70"
                    }`}
                  >
                    {item.name}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 bg-blue-50 rounded-full -z-10"
                        transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
                      />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Right side */}
          <motion.div
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT_EXPO }}
          >
            {/* Desktop CTA */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={() => setAuthModalView("login")}
                variant="ghost"
                className="hidden sm:flex font-semibold text-slate-700 hover:text-[#0B56D5] cursor-pointer"
              >
                Đăng nhập
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={() => setAuthModalView("register")}
                className="hidden sm:flex px-5 h-10 font-bold text-white bg-[#0B56D5] rounded-full shadow-md shadow-blue-500/25 cursor-pointer"
              >
                Đăng ký
              </Button>
            </motion.div>

            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  className="flex md:hidden items-center justify-center w-10 h-10 rounded-full hover:bg-blue-50 cursor-pointer"
                >
                  <Menu className="w-5 h-5" />
                </motion.button>
              </SheetTrigger>

              <SheetContent side="right" className="w-72 p-0">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="flex items-center justify-between p-6 border-b">
                  <span className="text-lg font-bold">maco</span>
                </div>
                <nav className="p-6 space-y-2">
                  <AnimatePresence>
                    {navItems.map((item, i) => {
                      const isActive = location.pathname === item.path;
                      return (
                        <motion.div
                          key={item.name}
                          initial={{ opacity: 0, x: 16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: i * 0.06 }}
                        >
                          <Link
                            to={item.path}
                            onClick={() => setMobileOpen(false)}
                            className={`block px-4 py-3 rounded-xl text-sm font-semibold ${
                              isActive ? "bg-blue-50 text-[#0B56D5]" : "hover:bg-slate-100"
                            }`}
                          >
                            {item.name}
                          </Link>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </nav>
                <div className="p-6 border-t space-y-3">
                  <Button
                    onClick={() => { setMobileOpen(false); setAuthModalView("login"); }}
                    variant="outline"
                    className="w-full font-semibold h-11 cursor-pointer"
                  >
                    Đăng nhập
                  </Button>
                  <Button
                    onClick={() => { setMobileOpen(false); setAuthModalView("register"); }}
                    className="w-full font-bold text-white bg-[#0B56D5] hover:bg-[#094bb8] h-11 cursor-pointer"
                  >
                    Đăng ký ngay
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </motion.div>
        </div>
      </motion.header>

      {/* Import Auth Modal */}
      <AuthModal 
        view={authModalView} 
        onClose={() => setAuthModalView(null)} 
        onViewChange={setAuthModalView} 
      />
    </>
  );
}