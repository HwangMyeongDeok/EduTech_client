import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Import thêm cái này
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { pathname } = useLocation(); // Lấy đường dẫn hiện tại

  // 1. TÍNH NĂNG MỚI: Tự động cuộn lên đầu ngay lập tức khi chuyển trang
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, [pathname]);

  // 2. TÍNH NĂNG GỐC: Hiển thị/ẩn nút bấm dựa vào độ cuộn của trang
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Khi bấm nút thì vẫn cuộn mượt mà (smooth)
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-8 right-8 z-50",
            "flex items-center justify-center w-12 h-12",
            "bg-[#0B56D5] text-white rounded-full shadow-lg shadow-blue-500/30",
            "hover:bg-blue-600 transition-colors cursor-pointer border border-white/20"
          )}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-6 h-6" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}