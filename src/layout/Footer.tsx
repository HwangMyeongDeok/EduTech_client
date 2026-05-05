import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { Hexagon, Share2, Globe } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#050A15] text-slate-400">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-16">
        {/* Main grid — 12 cols setup for precise width control */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-12 mb-16">
          
          {/* Col 1: Logo + desc + social (Takes 4 columns on large screens) */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
                {/* Giả lập logo MACO như trong hình */}
                <Hexagon className="w-6 h-6 text-[#050A15]" fill="currentColor" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">maco</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-8 max-w-sm">
              Tập trung ứng dụng AI để giải quyết những rào cản trong việc học trực tuyến, giúp bạn duy trì sự tập trung và xây dựng nền tảng kiến thức vững chắc.
            </p>
            <div className="flex gap-4">
              <button 
                aria-label="Share" 
                className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-200"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button 
                aria-label="Website" 
                className="w-10 h-10 rounded-full border border-slate-700 flex items-center justify-center text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-200"
              >
                <Globe className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Col 2: Tài nguyên (Takes 2 columns) */}
          <div className="lg:col-span-2">
            <h4 className="mb-6 text-[13px] font-bold text-[#5B7FFF] uppercase tracking-widest">
              Tài nguyên
            </h4>
            <ul className="space-y-4 text-sm">
              {["Thư viện", "Câu chuyện Thành công", "Tài liệu"].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-slate-300 hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Nền tảng (Takes 2 columns) */}
          <div className="lg:col-span-2">
            <h4 className="mb-6 text-[13px] font-bold text-[#5B7FFF] uppercase tracking-widest">
              Nền tảng
            </h4>
            <ul className="space-y-4 text-sm">
              {["Dịch vụ", "Tính năng", "Mạng lưới Đối tác"].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-slate-300 hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Công ty (Takes 2 columns) */}
          <div className="lg:col-span-2">
            <h4 className="mb-6 text-[13px] font-bold text-[#5B7FFF] uppercase tracking-widest">
              Công ty
            </h4>
            <ul className="space-y-4 text-sm">
              {["Câu chuyện của chúng tôi", "Tuyển dụng", "Trung tâm Tin cậy"].map((item) => (
                <li key={item}>
                  <Link
                    to="#"
                    className="text-slate-300 hover:text-white transition-colors duration-200"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 5: Newsletter (Takes 2 columns) */}
          <div className="lg:col-span-3">
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
              <Button
                className="w-full bg-[#5D42FF] hover:bg-[#4E35E8] text-white text-sm font-semibold h-11 rounded-full transition-all duration-200 shadow-[0_0_15px_rgba(93,66,255,0.3)]"
              >
                Đăng ký
              </Button>
            </div>
          </div>
        </div>

        <Separator className="bg-slate-800/60 mb-8" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-medium tracking-widest text-slate-500 uppercase">
          <p>© 2026 MACO VIETNAM</p>
          <div className="flex gap-8">
            {["Bảo mật", "Điều khoản", "An ninh"].map((item) => (
              <Link
                key={item}
                to="#"
                className="hover:text-white transition-colors duration-200"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}