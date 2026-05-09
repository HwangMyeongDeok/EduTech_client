import { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard, BookOpen, Users, Wallet, Settings,
  ChevronLeft, Sparkles, Check,
  type LucideIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface NavItem {
  name: string;
  icon: LucideIcon;
  path: string;
}

const NAV_ITEMS: NavItem[] = [
  { name: "Tổng quan", icon: LayoutDashboard, path: "/instructor/dashboard" },
  { name: "Khóa học của tôi", icon: BookOpen, path: "/instructor/courses" },
  { name: "Học viên", icon: Users, path: "/instructor/students" },
  { name: "Doanh thu", icon: Wallet, path: "/instructor/revenue" },
  { name: "Cài đặt", icon: Settings, path: "/instructor/settings" },
];

const PLANS = [
  {
    name: "Giảng viên mới",
    price: { monthly: 0, yearly: 0 },
    description: "Bắt đầu hành trình giảng dạy",
    badge: null,
    highlight: false,
    cta: "Đang sử dụng",
    features: ["Tạo tối đa 2 khóa học", "Phí nền tảng 30%", "Hỗ trợ email chuẩn", "Thống kê cơ bản"],
    excluded: ["Tạo khóa học không giới hạn", "Công cụ AI trợ giảng", "Hỗ trợ Marketing"],
  },
  {
    name: "Creator Pro",
    price: { monthly: 299000, yearly: 249000 },
    description: "Phát triển thu nhập bền vững",
    badge: "Khuyên dùng",
    highlight: true,
    cta: "Nâng cấp Pro ngay",
    features: ["Tạo khóa học KHÔNG GIỚI HẠN", "Phí nền tảng giảm còn 15%", "Công cụ AI tự tạo Quiz", "Xuất báo cáo tài chính", "Huy hiệu Top Instructor"],
    excluded: ["Quản lý chiến dịch quảng cáo"],
  },
  {
    name: "Studio / Agency",
    price: { monthly: 899000, yearly: 799000 },
    description: "Giải pháp cho trung tâm lớn",
    badge: null,
    highlight: false,
    cta: "Liên hệ đối tác",
    features: ["Mọi đặc quyền gói Pro", "Phí nền tảng CHỈ 5%", "Đội ngũ Support riêng 24/7", "Quản lý nhiều giảng viên", "Chiến dịch Marketing ưu tiên"],
    excluded: [],
  },
];

function formatPrice(price: number) {
  if (price === 0) return "Miễn phí";
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (value: boolean) => void;
}

export function InstructorSidebar({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen
}: SidebarProps) {

  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const renderSidebarContent = (collapsed: boolean, isMobile: boolean = false) => (
    <div className="flex flex-col h-full bg-white">
      {/* Logo Section */}
      <div className={cn("h-20 flex items-center px-6 shrink-0", collapsed ? "justify-center" : "justify-start")}>
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-[#0B56D5] rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20 shrink-0">
          <span className="font-black text-xl">M</span>
        </div>
        {!collapsed && (
          <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="ml-3 font-black text-2xl tracking-tighter text-slate-800 whitespace-nowrap">
            maco.
          </motion.span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto scrollbar-hide">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/instructor"}
              onClick={() => isMobile && setIsMobileOpen(false)}
              className={({ isActive }) => cn(
                "relative flex items-center gap-3.5 px-3.5 py-3.5 rounded-2xl font-bold transition-all duration-300 group/item",
                isActive ? "text-[#0B56D5]" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50",
                collapsed && "justify-center px-0"
              )}
            >
              {({ isActive }) => (
                <>
                  {isActive && <motion.div layoutId="active-nav-pill-instructor" className="absolute inset-0 bg-blue-50/80 rounded-2xl -z-10 border border-blue-100/50" />}
                  <div className={cn("shrink-0 transition-transform", (isActive || collapsed) ? "scale-110" : "group-hover/item:scale-110")}>
                    <Icon className="w-5 h-5" />
                  </div>
                  {!collapsed && <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[14px] whitespace-nowrap overflow-hidden">{item.name}</motion.span>}
                  {collapsed && !isMobile && (
                    <div className="absolute left-16 scale-0 group-hover/item:scale-100 transition-all bg-slate-900 text-white text-[10px] px-2 py-1 rounded-md pointer-events-none whitespace-nowrap z-[60]">
                      {item.name}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Upgrade Box */}
      <AnimatePresence>
        {(!collapsed || isMobile) && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="p-4 mt-auto">
            <div
              onClick={() => setIsUpgradeModalOpen(true)}
              className="bg-slate-900 rounded-[2rem] p-5 relative overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all"
            >
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-blue-500/10 blur-2xl rounded-full" />
              <p className="text-white font-bold text-xs relative z-10 flex items-center gap-2">
                CREATOR PRO <Sparkles className="w-3 h-3 text-amber-400" />
              </p>
              <p className="text-slate-400 text-[10px] mt-1 relative z-10">Tối đa hóa doanh thu</p>
              <button className="mt-3 w-full py-2 bg-white text-slate-900 rounded-xl text-[10px] font-black hover:bg-blue-600 hover:text-white transition-all active:scale-95">
                XEM BẢNG GIÁ
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 85 : 280 }}
        className="hidden md:flex flex-col bg-white border-r border-slate-100 sticky top-0 h-screen z-40 relative shrink-0"
      >
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="absolute -right-3 top-8 w-6 h-6 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-400 hover:text-[#0B56D5] hover:border-[#0B56D5] transition-all z-50 shadow-sm">
          <ChevronLeft className={cn("w-4 h-4 transition-transform duration-300", isCollapsed && "rotate-180")} />
        </button>
        {renderSidebarContent(isCollapsed)}
      </motion.aside>

      <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
        <SheetContent side="left" className="p-0 w-72 border-r-0">
          <SheetHeader className="sr-only"><SheetTitle>Menu Maco</SheetTitle></SheetHeader>
          {renderSidebarContent(false, true)}
        </SheetContent>
      </Sheet>

      <Dialog open={isUpgradeModalOpen} onOpenChange={setIsUpgradeModalOpen}>
        <DialogContent className="w-[95vw] sm:max-w-5xl md:max-w-6xl bg-white/95 backdrop-blur-xl border-none shadow-2xl rounded-3xl p-6 sm:p-10 max-h-[90vh] overflow-y-auto scrollbar-hide">
          <DialogHeader className="mb-6 flex flex-col items-center text-center">
            <div className="p-3 bg-amber-100 rounded-2xl text-amber-600 mb-3">
              <Sparkles className="w-8 h-8" />
            </div>
            <DialogTitle className="text-2xl md:text-3xl font-black text-slate-800">
              Công cụ cho Giảng viên Chuyên nghiệp
            </DialogTitle>
            <DialogDescription className="text-base text-slate-500 font-medium max-w-xl mx-auto">
              Giảm phí nền tảng, mở khóa công cụ AI tạo bài giảng và tối đa hóa thu nhập của bạn.
            </DialogDescription>

            <div className="inline-flex items-center gap-1 mt-6 p-1 bg-slate-100 rounded-xl">
              {(["monthly", "yearly"] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => setBilling(type)}
                  className={cn(
                    "px-5 py-2 text-sm font-medium rounded-lg transition-all",
                    billing === type ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
                  )}
                >
                  {type === "monthly" ? "Hàng tháng" : (
                    <span className="flex items-center gap-1.5">
                      Hàng năm
                      <span className="text-[10px] font-bold text-[#0B56D5] bg-blue-50 px-1.5 py-0.5 rounded-full">-20%</span>
                    </span>
                  )}
                </button>
              ))}
            </div>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch pb-4">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={cn(
                  "relative rounded-2xl p-6 flex flex-col transition-transform duration-300",
                  plan.highlight
                    ? "bg-[#0B56D5] text-white shadow-xl shadow-blue-500/20 scale-100 md:scale-105 z-10"
                    : "bg-white border border-slate-100 shadow-sm"
                )}
              >
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <Badge className="bg-amber-400 text-amber-900 hover:bg-amber-400 text-xs font-bold px-3 py-0.5 shadow-sm border-none">
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className={cn("text-lg font-bold mb-1", plan.highlight ? "text-white" : "text-slate-900")}>
                    {plan.name}
                  </h3>
                  <p className={cn("text-xs", plan.highlight ? "text-blue-100" : "text-slate-500")}>
                    {plan.description}
                  </p>
                </div>

                <div className="mb-6 h-16">
                  <AnimatePresence mode="wait">
                    <motion.div key={billing + plan.name} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -5 }} className="flex items-end gap-1">
                      <span className={cn("text-3xl font-extrabold tracking-tight", plan.highlight ? "text-white" : "text-slate-900")}>
                        {formatPrice(plan.price[billing])}
                      </span>
                      {plan.price[billing] > 0 && <span className={cn("text-xs mb-1.5", plan.highlight ? "text-blue-200" : "text-slate-400")}>/ tháng</span>}
                    </motion.div>
                  </AnimatePresence>
                  {billing === "yearly" && plan.price.yearly > 0 && (
                    <p className={cn("text-xs mt-1", plan.highlight ? "text-blue-200" : "text-slate-400")}>
                      Thanh toán {formatPrice(plan.price.yearly * 12)}/năm
                    </p>
                  )}
                </div>

                <Button
                  disabled={plan.name === "Giảng viên mới"}
                  className={cn(
                    "w-full font-bold h-11 rounded-xl mb-6 transition-all",
                    plan.name === "Giảng viên mới"
                      ? "bg-slate-100 text-slate-400 opacity-80 cursor-default hover:bg-slate-100"
                      : plan.highlight
                        ? "bg-white text-[#0B56D5] hover:bg-blue-50 active:scale-95"
                        : "bg-slate-900 text-white hover:bg-slate-800 active:scale-95"
                  )}
                >
                  {plan.cta}
                </Button>

                <ul className="space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs font-medium">
                      <Check className={cn("w-3.5 h-3.5 mt-0.5 flex-shrink-0", plan.highlight ? "text-white" : "text-[#0B56D5]")} />
                      <span className={plan.highlight ? "text-blue-50" : "text-slate-600"}>{f}</span>
                    </li>
                  ))}
                  {plan.excluded.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs opacity-40 font-medium">
                      <span className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 flex items-center justify-center font-bold">—</span>
                      <span className="text-slate-400 line-through">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}