import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Hexagon, Share2, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer, VIEWPORT_ONCE, EASE_OUT_EXPO } from "@/lib/motion";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050A15] text-slate-400">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-20">
        {/* Main grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-12 mb-16"
        >
          {/* Col 1: Logo + desc + social */}
          <motion.div
            variants={fadeInUp}
            custom={0}
            className="lg:col-span-3"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                <Hexagon className="w-6 h-6 text-[#050A15]" fill="currentColor" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">maco</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-8 max-w-sm">
              Tập trung ứng dụng AI để giải quyết những rào cản trong việc học trực tuyến, giúp bạn duy trì sự tập trung và xây dựng nền tảng kiến thức vững chắc.
            </p>
            <div className="flex gap-3">
              {[{ icon: Share2, label: "Share" }, { icon: Globe, label: "Website" }].map(({ icon: Icon, label }) => (
                <motion.button
                  key={label}
                  aria-label={label}
                  whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.92 }}
                  className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors duration-200 cursor-pointer"
                >
                  <Icon className="w-4 h-4" />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Col 2: Tài nguyên */}
          <motion.div variants={fadeInUp} custom={0.08} className="lg:col-span-2">
            <h4 className="mb-6 text-[13px] font-bold text-[#5B7FFF] uppercase tracking-widest">
              Tài nguyên
            </h4>
            <ul className="space-y-4 text-sm">
              {["Thư viện", "Câu chuyện Thành công", "Tài liệu"].map((item) => (
                <li key={item}>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link to="#" className="text-slate-300 hover:text-white transition-colors duration-200">
                      {item}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3: Nền tảng */}
          <motion.div variants={fadeInUp} custom={0.12} className="lg:col-span-2">
            <h4 className="mb-6 text-[13px] font-bold text-[#5B7FFF] uppercase tracking-widest">
              Nền tảng
            </h4>
            <ul className="space-y-4 text-sm">
              {["Dịch vụ", "Tính năng", "Mạng lưới Đối tác"].map((item) => (
                <li key={item}>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link to="#" className="text-slate-300 hover:text-white transition-colors duration-200">
                      {item}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4: Công ty */}
          <motion.div variants={fadeInUp} custom={0.16} className="lg:col-span-2">
            <h4 className="mb-6 text-[13px] font-bold text-[#5B7FFF] uppercase tracking-widest">
              Công ty
            </h4>
            <ul className="space-y-4 text-sm">
              {["Câu chuyện của chúng tôi", "Tuyển dụng", "Trung tâm Tin cậy"].map((item) => (
                <li key={item}>
                  <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                    <Link to="#" className="text-slate-300 hover:text-white transition-colors duration-200">
                      {item}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 5: Newsletter */}
          <motion.div variants={fadeInUp} custom={0.2} className="lg:col-span-3">
            <h4 className="mb-6 text-[13px] font-bold text-[#5B7FFF] uppercase tracking-widest">
              Luôn dẫn đầu
            </h4>
            <p className="text-sm text-slate-300 mb-6 leading-relaxed pr-4">
              Thông tin hàng tuần về tương lai của các kỹ năng.
            </p>
            <div className="flex flex-col gap-3">
              <Input
                type="email"
                placeholder="Email công việc"
                className="bg-[#121A2F] border-transparent text-white placeholder:text-slate-500 text-sm h-11 rounded-full focus-visible:ring-1 focus-visible:ring-[#5B7FFF] focus-visible:border-transparent px-5"
              />
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
                <Button
                  className="w-full bg-[#5D42FF] hover:bg-[#4E35E8] text-white text-sm font-semibold h-11 rounded-full transition-all duration-200 shadow-[0_0_20px_rgba(93,66,255,0.35)] cursor-pointer"
                  style={{ transition: "none" }}
                >
                  Đăng ký
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <Separator className="bg-slate-800/60 mb-8" />

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={VIEWPORT_ONCE}
          transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
          className="flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-medium tracking-widest text-slate-500 uppercase"
        >
          <p>© 2026 MACO VIETNAM</p>
          <div className="flex gap-8">
            {["Bảo mật", "Điều khoản", "An ninh"].map((item) => (
              <motion.div key={item} whileHover={{ color: "#ffffff" }}>
                <Link to="#" className="hover:text-white transition-colors duration-200">
                  {item}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}