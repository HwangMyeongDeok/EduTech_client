import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { LoginView } from "./LoginView";
import { RegisterView } from "./RegisterView";

export type AuthView = "login" | "register" | null;

interface AuthModalProps {
  view: AuthView;
  onClose: () => void;
  onViewChange: (view: AuthView) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ view, onClose, onViewChange }) => {
  // Xử lý chống cuộn trang khi mở modal
  useEffect(() => {
    if (view) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [view]);

  return (
    <AnimatePresence>
      {view && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="relative w-full max-w-[440px] bg-white rounded-[28px] shadow-2xl p-7 md:p-9 z-10 overflow-hidden"
          >
            {/* Nút Đóng */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Content thay đổi linh hoạt */}
            <AnimatePresence mode="wait">
              {view === "register" && (
                <RegisterView onSwitchToLogin={() => onViewChange("login")} />
              )}
              {view === "login" && (
                <LoginView onSwitchToRegister={() => onViewChange("register")} />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};