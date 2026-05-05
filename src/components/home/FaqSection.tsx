import { useState } from "react";
import { cn } from "@/lib/utils";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "MACO AI hoạt động như thế nào?",
    answer:
      "MACO tích hợp AI trực tiếp vào quá trình học của bạn. Khi học, bạn có thể đặt câu hỏi bất cứ lúc nào — AI sẽ giải thích, tóm tắt, hoặc gợi ý bài tập phù hợp với tiến độ của bạn ngay lập tức, không cần chờ đợi.",
  },
  {
    question: "Tôi có thể dùng thử trước khi mua không?",
    answer:
      "Có! Gói miễn phí cho phép bạn trải nghiệm 5 câu hỏi AI mỗi ngày và truy cập thư viện cơ bản. Gói Pro cũng có 7 ngày dùng thử miễn phí — không cần nhập thông tin thanh toán.",
  },
  {
    question: "Nội dung học trên MACO có cập nhật không?",
    answer:
      "Thư viện được cập nhật liên tục. Đội ngũ nội dung của MACO thêm bài mới hàng tuần, và AI luôn được cải thiện để trả lời chính xác hơn theo từng lĩnh vực học tập.",
  },
  {
    question: "MACO phù hợp với những đối tượng nào?",
    answer:
      "MACO phù hợp với học sinh, sinh viên, người đi làm muốn học kỹ năng mới, và cả giảng viên muốn tích hợp AI vào lớp học. Gói Team còn hỗ trợ quản lý nhóm học và theo dõi tiến độ tập thể.",
  },
  {
    question: "Tôi có thể hủy gói bất cứ lúc nào không?",
    answer:
      "Hoàn toàn có thể. Bạn có thể hủy gói Pro hoặc Team bất cứ lúc nào từ trang tài khoản mà không phát sinh phí phạt. Nếu hủy, bạn vẫn giữ quyền truy cập đến hết kỳ thanh toán hiện tại.",
  },
  {
    question: "Dữ liệu học tập của tôi có được bảo mật không?",
    answer:
      "Có. Chúng tôi mã hóa toàn bộ dữ liệu người dùng và không chia sẻ thông tin cá nhân với bên thứ ba. Lịch sử học tập của bạn chỉ được dùng để cải thiện trải nghiệm cá nhân hóa cho chính bạn.",
  },
];

function FaqItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "border rounded-xl overflow-hidden transition-all duration-200",
        isOpen
          ? "border-[#0B56D5]/30 bg-blue-50/50 shadow-sm"
          : "border-slate-100 bg-white hover:border-slate-200"
      )}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left"
      >
        <span
          className={cn(
            "text-sm font-semibold leading-snug",
            isOpen ? "text-[#0B56D5]" : "text-slate-800"
          )}
        >
          {faq.question}
        </span>
        <span
          className={cn(
            "flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200",
            isOpen
              ? "bg-[#0B56D5] text-white"
              : "bg-slate-100 text-slate-500"
          )}
        >
          {isOpen ? (
            <Minus className="w-3.5 h-3.5" />
          ) : (
            <Plus className="w-3.5 h-3.5" />
          )}
        </span>
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <p className="px-6 pb-5 text-sm text-slate-600 leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* Left: heading */}
          <div className="lg:sticky lg:top-24">
            <span className="inline-block text-xs font-semibold text-[#0B56D5] uppercase tracking-widest mb-3">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
              Câu hỏi<br />
              <span className="text-[#0B56D5]">thường gặp</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-6">
              Không tìm thấy câu trả lời bạn cần? Liên hệ đội ngũ hỗ trợ của chúng tôi.
            </p>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0B56D5] hover:underline underline-offset-2"
            >
              Liên hệ hỗ trợ →
            </a>
          </div>

          {/* Right: accordion */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}