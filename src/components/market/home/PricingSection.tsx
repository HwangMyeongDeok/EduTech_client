import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer, scaleIn, VIEWPORT_ONCE, EASE_OUT_EXPO } from "@/lib/motion";

const plans = [
  {
    name: "Miễn phí",
    price: { monthly: 0, yearly: 0 },
    description: "Dùng thử và trải nghiệm nền tảng",
    badge: null,
    highlight: false,
    cta: "Bắt đầu miễn phí",
    features: [
      "5 câu hỏi AI mỗi ngày",
      "Truy cập thư viện cơ bản",
      "Tóm tắt bài học giới hạn",
      "Hỗ trợ cộng đồng",
    ],
    excluded: [
      "Hỏi đáp không giới hạn",
      "Phân tích tiến độ nâng cao",
      "Ưu tiên hỗ trợ",
    ],
  },
  {
    name: "Pro",
    price: { monthly: 199000, yearly: 159000 },
    description: "Dành cho học viên muốn tiến bộ nhanh",
    badge: "Phổ biến nhất",
    highlight: true,
    cta: "Dùng thử 7 ngày",
    features: [
      "Hỏi đáp AI không giới hạn",
      "Toàn bộ thư viện khóa học",
      "Tóm tắt & giải thích tức thì",
      "Phân tích tiến độ học tập",
      "Gợi ý bài tập cá nhân hóa",
      "Hỗ trợ ưu tiên 24/7",
    ],
    excluded: [],
  },
  {
    name: "Team",
    price: { monthly: 499000, yearly: 399000 },
    description: "Cho nhóm học, lớp học hoặc doanh nghiệp",
    badge: null,
    highlight: false,
    cta: "Liên hệ tư vấn",
    features: [
      "Tất cả tính năng Pro",
      "Quản lý thành viên nhóm",
      "Dashboard theo dõi tiến độ",
      "Tùy chỉnh nội dung học",
      "Tích hợp LMS",
      "Account manager riêng",
    ],
    excluded: [],
  },
];

function formatPrice(price: number) {
  if (price === 0) return "Miễn phí";
  return new Intl.NumberFormat("vi-VN").format(price) + "đ";
}

export function PricingSection() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/40 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="text-center mb-14"
        >
          <motion.span variants={fadeInUp} custom={0} className="inline-block text-xs font-bold text-[#0B56D5] uppercase tracking-widest mb-4">
            Bảng giá
          </motion.span>
          <motion.h2 variants={fadeInUp} custom={0.08} className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-5">
            Chọn gói phù hợp với bạn
          </motion.h2>
          <motion.p variants={fadeInUp} custom={0.14} className="text-slate-500 max-w-xl mx-auto text-[15px] leading-relaxed">
            Bắt đầu miễn phí, nâng cấp khi bạn cần. Không có phí ẩn.
          </motion.p>

          {/* Billing toggle */}
          <motion.div variants={fadeInUp} custom={0.2} className="inline-flex items-center gap-1 mt-7 p-1 bg-slate-100 rounded-xl">
            {(["monthly", "yearly"] as const).map((type) => (
              <motion.button
                key={type}
                onClick={() => setBilling(type)}
                whileTap={{ scale: 0.96 }}
                className={cn(
                  "px-5 py-2 text-sm font-medium rounded-lg cursor-pointer",
                  billing === type
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
                style={{ transition: "color 0.2s" }}
              >
                {type === "monthly" ? "Hàng tháng" : (
                  <span className="flex items-center gap-1.5">
                    Hàng năm
                    <span className="text-[10px] font-bold text-[#0B56D5] bg-blue-50 px-1.5 py-0.5 rounded-full">
                      -20%
                    </span>
                  </span>
                )}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT_ONCE}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch"
        >
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              variants={scaleIn}
              custom={i * 0.08}
              whileHover={
                !plan.highlight
                  ? { y: -6, boxShadow: "0 20px 40px rgba(11,86,213,0.1)", transition: { duration: 0.25, ease: EASE_OUT_EXPO } }
                  : {}
              }
              className={cn(
                "relative rounded-2xl p-8 flex flex-col",
                plan.highlight
                  ? "bg-[#0B56D5] text-white shadow-2xl shadow-blue-500/30 scale-[1.02]"
                  : "bg-white border border-slate-100 shadow-sm"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-amber-400 text-amber-900 hover:bg-amber-400 text-xs font-bold px-3 py-0.5 shadow-sm">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div className="mb-7">
                <h3 className={cn("text-lg font-bold mb-1.5", plan.highlight ? "text-white" : "text-slate-900")}>
                  {plan.name}
                </h3>
                <p className={cn("text-xs leading-relaxed", plan.highlight ? "text-blue-100" : "text-slate-500")}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={billing + plan.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="flex items-end gap-1"
                  >
                    <span className={cn("text-4xl font-extrabold tracking-tight", plan.highlight ? "text-white" : "text-slate-900")}>
                      {formatPrice(plan.price[billing])}
                    </span>
                    {plan.price[billing] > 0 && (
                      <span className={cn("text-xs mb-2", plan.highlight ? "text-blue-200" : "text-slate-400")}>
                        / tháng
                      </span>
                    )}
                  </motion.div>
                </AnimatePresence>
                {billing === "yearly" && plan.price.yearly > 0 && (
                  <p className={cn("text-xs mt-1.5", plan.highlight ? "text-blue-200" : "text-slate-400")}>
                    Thanh toán {formatPrice(plan.price.yearly * 12)}/năm
                  </p>
                )}
              </div>

              {/* CTA */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="mb-8">
                <Button
                  className={cn(
                    "w-full font-semibold h-11 rounded-xl cursor-pointer",
                    plan.highlight
                      ? "bg-white text-[#0B56D5] hover:bg-blue-50"
                      : plan.name === "Team"
                      ? "bg-slate-900 text-white hover:bg-slate-800"
                      : "bg-[#0B56D5] text-white hover:bg-[#0944b0]"
                  )}
                >
                  {plan.cta}
                </Button>
              </motion.div>

              {/* Features */}
              <ul className="space-y-3.5 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={cn("w-4 h-4 mt-0.5 flex-shrink-0", plan.highlight ? "text-white" : "text-[#0B56D5]")}
                    />
                    <span className={plan.highlight ? "text-blue-50" : "text-slate-600"}>{f}</span>
                  </li>
                ))}
                {plan.excluded.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm opacity-35">
                    <span className="w-4 h-4 mt-0.5 flex-shrink-0 flex items-center justify-center">—</span>
                    <span className="text-slate-400 line-through">{f}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-xs text-slate-400 mt-10"
        >
          Thanh toán an toàn qua VNPay, Momo, thẻ quốc tế. Hủy bất cứ lúc nào.
        </motion.p>
      </div>
    </section>
  );
}