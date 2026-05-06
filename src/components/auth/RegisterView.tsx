import React from "react";
import { User, GraduationCap, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface RegisterViewProps {
  onSwitchToLogin: () => void;
}

export const RegisterView: React.FC<RegisterViewProps> = ({ onSwitchToLogin }) => {
  return (
    <motion.div
      key="register"
      initial={{ x: 30, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -30, opacity: 0 }}
      transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
    >
      <div className="text-center mb-8 mt-2">
        <h3 className="text-2xl font-black text-slate-900 mb-2">Bắt đầu thôi</h3>
        <p className="text-slate-500 text-sm">Bạn muốn trải nghiệm Maco với vai trò gì?</p>
      </div>

      <div className="space-y-4 mb-8">
        <button className="w-full flex items-center p-4 border border-slate-200 rounded-2xl bg-white hover:border-[#5442f5] hover:bg-[#5442f5]/5 transition-all group text-left cursor-pointer shadow-sm hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center flex-shrink-0 mr-4 group-hover:bg-[#5442f5] group-hover:text-white transition-colors duration-300">
            <User className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-slate-900 mb-0.5 group-hover:text-[#5442f5] transition-colors duration-300">
              Tôi là Học viên
            </h4>
            <p className="text-[13px] text-slate-500">Tìm kiếm khóa học AI đỉnh cao</p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#5442f5] transition-colors duration-300" />
        </button>

        <button className="w-full flex items-center p-4 border border-slate-200 rounded-2xl bg-white hover:border-[#10b981] hover:bg-[#10b981]/5 transition-all group text-left cursor-pointer shadow-sm hover:shadow-md">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center flex-shrink-0 mr-4 group-hover:bg-[#10b981] group-hover:text-white transition-colors duration-300">
            <GraduationCap className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h4 className="font-bold text-slate-900 mb-0.5 group-hover:text-[#10b981] transition-colors duration-300">
              Tôi là Giảng viên
            </h4>
            <p className="text-[13px] text-slate-500">Chia sẻ kiến thức & tạo thu nhập</p>
          </div>
          <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-[#10b981] transition-colors duration-300" />
        </button>
      </div>

      <div className="text-center">
        <p className="text-[13px] text-slate-500">
          Đã có tài khoản?{" "}
          <button
            onClick={onSwitchToLogin}
            className="font-bold text-[#5442f5] hover:text-[#4636d1] transition-colors cursor-pointer"
          >
            Đăng nhập
          </button>
        </p>
      </div>
    </motion.div>
  );
};