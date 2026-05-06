import React from "react";
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface LoginViewProps {
  onSwitchToRegister: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onSwitchToRegister }) => {
  return (
    <motion.div
      key="login"
      initial={{ x: -30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 30, opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
    >
      <div className="text-center mb-6 mt-2">
        <h3 className="text-2xl font-black text-slate-900 mb-2">Maco chào bạn!</h3>
        <p className="text-slate-500 text-sm">Đăng nhập để tiếp tục hành trình</p>
      </div>

      <button className="w-full flex items-center justify-center gap-3 border border-slate-200 rounded-2xl py-3 font-semibold text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer mb-6">
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
        Tiếp tục với Google
      </button>

      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 h-px bg-slate-100" />
        <span className="text-[10px] font-bold text-slate-400 tracking-wider">HOẶC</span>
        <div className="flex-1 h-px bg-slate-100" />
      </div>

      <div className="space-y-3 mb-6">
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="email"
            placeholder="Email đăng nhập"
            className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-[#5442f5]/10 focus:border-[#5442f5] focus:bg-white transition-all placeholder:text-slate-400 font-medium"
          />
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="password"
            placeholder="Mật khẩu (nhập 123)"
            className="w-full pl-11 pr-4 py-3 bg-slate-50/50 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-[#5442f5]/10 focus:border-[#5442f5] focus:bg-white transition-all placeholder:text-slate-400 font-medium"
          />
        </div>
      </div>

      <button className="w-full bg-[#5442f5] hover:bg-[#4636d1] text-white font-bold py-3.5 rounded-2xl transition-colors cursor-pointer mb-6 shadow-lg shadow-[#5442f5]/25">
        Đăng nhập
      </button>

      <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6">
        <p className="text-[10px] font-bold text-slate-500 mb-2">TÀI KHOẢN DEMO (MẬT KHẨU: 123)</p>
        <ul className="text-xs text-slate-600 font-medium space-y-1.5">
          <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-slate-400" />student@gmail.com</li>
          <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-slate-400" />instructor@gmail.com</li>
          <li className="flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-slate-400" />admin@gmail.com</li>
        </ul>
      </div>

      <div className="text-center">
        <p className="text-[13px] text-slate-500">
          Chưa có tài khoản?{" "}
          <button
            onClick={onSwitchToRegister}
            className="font-bold text-[#5442f5] hover:text-[#4636d1] transition-colors cursor-pointer"
          >
            Đăng ký ngay
          </button>
        </p>
      </div>
    </motion.div>
  );
};