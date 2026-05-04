import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Hexagon } from "lucide-react";

// Dùng SVG trực tiếp cho Brand Icons để không phụ thuộc thư viện
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const TwitterIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
  </svg>
);

export default function Footer() {
  return (
    <footer className="w-full py-16 mt-24 bg-[#0B1121] text-slate-400 border-t border-slate-800">
      
      <div className="container mx-auto px-4 lg:px-24 xl:px-44">
        
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-8 mb-16">
          {/* Cột 1: Logo & Info */}
          <div className="lg:col-span-2 max-w-sm">
            <div className="flex items-center gap-2 mb-6 w-max">
              <Hexagon className="w-8 h-8 text-[#0B56D5] fill-current" />
              <span className="text-2xl font-extrabold tracking-tight text-white">maco</span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-slate-400">
              Tập trung ứng dụng AI để giải quyết những rào cản trong việc học trực tuyến, giúp bạn duy trì sự tập trung và xây dựng nền tảng kiến thức vững chắc.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <a href="#" className="hover:text-white transition-colors"><FacebookIcon /></a>
              <a href="#" className="hover:text-white transition-colors"><TwitterIcon /></a>
              <a href="#" className="hover:text-white transition-colors"><GithubIcon /></a>
            </div>
          </div>

          {/* Các cột Link */}
          <div>
            <h4 className="mb-6 text-sm font-semibold text-white uppercase tracking-wider">Tài nguyên</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Thư viện</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Thành công</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tài liệu</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-sm font-semibold text-white uppercase tracking-wider">Nền tảng</h4>
            <ul className="space-y-4 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Dịch vụ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Tính năng</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Đối tác</a></li>
            </ul>
          </div>

          {/* Cột Newsletter */}
          <div>
            <h4 className="mb-6 text-sm font-semibold text-white uppercase tracking-wider">Luôn dẫn đầu</h4>
            <p className="mb-4 text-sm text-slate-400">Thông tin hàng tuần về tương lai của các kỹ năng.</p>
            <div className="flex flex-col gap-3">
              <Input 
                type="email" 
                placeholder="Email của bạn" 
                className="bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-[#0B56D5] rounded-lg h-11"
              />
              <Button className="w-full h-11 font-bold text-white bg-[#0B56D5] rounded-lg hover:bg-[#0B56D5]/80">
                Đăng ký
              </Button>
            </div>
          </div>
        </div>

        {/* Thanh bản quyền */}
        <div className="pt-8 flex flex-col items-center justify-between gap-4 border-t border-slate-800/80 md:flex-row text-xs text-slate-500 font-medium uppercase tracking-widest">
          <p>© 2026 MACO VIETNAM</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Điều khoản</a>
            <a href="#" className="hover:text-white transition-colors">An ninh</a>
          </div>
        </div>

      </div>
    </footer>
  );
}