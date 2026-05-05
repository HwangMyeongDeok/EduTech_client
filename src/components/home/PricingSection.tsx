import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
    <section className="relative py-24 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/40 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 xl:px-24 relative">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold text-[#0B56D5] uppercase tracking-widest mb-3">
            Bảng giá
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
            Chọn gói phù hợp với bạn
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm leading-relaxed">
            Bắt đầu miễn phí, nâng cấp khi bạn cần. Không có phí ẩn.
          </p>

          {/* Billing toggle */}
          <div className="inline-flex items-center gap-1 mt-6 p-1 bg-slate-100 rounded-xl">
            {(["monthly", "yearly"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setBilling(type)}
                className={cn(
                  "px-5 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  billing === type
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                )}
              >
                {type === "monthly" ? "Hàng tháng" : (
                  <span className="flex items-center gap-1.5">
                    Hàng năm
                    <span className="text-[10px] font-bold text-[#0B56D5] bg-blue-50 px-1.5 py-0.5 rounded-full">
                      -20%
                    </span>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-2xl p-7 flex flex-col transition-all duration-300",
                plan.highlight
                  ? "bg-[#0B56D5] text-white shadow-2xl shadow-blue-500/25 scale-[1.02]"
                  : "bg-white border border-slate-100 shadow-sm hover:shadow-md"
              )}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge className="bg-amber-400 text-amber-900 hover:bg-amber-400 text-xs font-bold px-3 py-0.5 shadow-sm">
                    {plan.badge}
                  </Badge>
                </div>
              )}

              <div className="mb-6">
                <h3
                  className={cn(
                    "text-lg font-bold mb-1",
                    plan.highlight ? "text-white" : "text-slate-900"
                  )}
                >
                  {plan.name}
                </h3>
                <p
                  className={cn(
                    "text-xs leading-relaxed",
                    plan.highlight ? "text-blue-100" : "text-slate-500"
                  )}
                >
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-7">
                <div className="flex items-end gap-1">
                  <span
                    className={cn(
                      "text-3xl font-extrabold",
                      plan.highlight ? "text-white" : "text-slate-900"
                    )}
                  >
                    {formatPrice(plan.price[billing])}
                  </span>
                  {plan.price[billing] > 0 && (
                    <span
                      className={cn(
                        "text-xs mb-1.5",
                        plan.highlight ? "text-blue-200" : "text-slate-400"
                      )}
                    >
                      / tháng
                    </span>
                  )}
                </div>
                {billing === "yearly" && plan.price.yearly > 0 && (
                  <p
                    className={cn(
                      "text-xs mt-1",
                      plan.highlight ? "text-blue-200" : "text-slate-400"
                    )}
                  >
                    Thanh toán{" "}
                    {formatPrice(plan.price.yearly * 12)}/năm
                  </p>
                )}
              </div>

              {/* CTA */}
              <Button
                className={cn(
                  "w-full mb-7 font-semibold",
                  plan.highlight
                    ? "bg-white text-[#0B56D5] hover:bg-blue-50"
                    : plan.name === "Team"
                    ? "bg-slate-900 text-white hover:bg-slate-800"
                    : "bg-[#0B56D5] text-white hover:bg-[#0944b0]"
                )}
              >
                {plan.cta}
              </Button>

              {/* Features */}
              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <Check
                      className={cn(
                        "w-4 h-4 mt-0.5 flex-shrink-0",
                        plan.highlight ? "text-white" : "text-[#0B56D5]"
                      )}
                    />
                    <span className={plan.highlight ? "text-blue-50" : "text-slate-600"}>
                      {f}
                    </span>
                  </li>
                ))}
                {plan.excluded.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm opacity-40">
                    <span className="w-4 h-4 mt-0.5 flex-shrink-0 flex items-center justify-center">
                      —
                    </span>
                    <span className="text-slate-400 line-through">{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <p className="text-center text-xs text-slate-400 mt-8">
          Thanh toán an toàn qua VNPay, Momo, thẻ quốc tế. Hủy bất cứ lúc nào.
        </p>
      </div>
    </section>
  );
}