"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, type ReactNode } from "react";
import {
  Star,
  Users,
  ChevronRight,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MapPin,
  Clock,
  Zap,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface InstructorCardData {
  id: string;
  specialty: string;
  specialtyColor: string;
  name: string;
  subName: string;
  description: string;
  rating: number;
  ratingCount: string;
  students: string;
  featured?: boolean;
  avatarBg: string;
}

interface LearningPathData {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  duration: string;
  highlight: boolean;
}

interface TestimonialData {
  id: string;
  rating: number;
  text: string;
  author: string;
  role: string;
}

interface CategoryTab {
  id: string;
  label: string;
}

// ─── Reveal Wrapper ────────────────────────────────────────────────────────────

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  direction?: "up" | "left" | "right";
}

function Reveal({ children, className = "", delay = 0, direction = "up" }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  const initial =
    direction === "left"
      ? { opacity: 0, x: -28, y: 0 }
      : direction === "right"
        ? { opacity: 0, x: 28, y: 0 }
        : { opacity: 0, x: 0, y: 24 };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

// ─── StarRow ──────────────────────────────────────────────────────────────────

function StarRow({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          style={{ width: size, height: size }}
          className={
            i <= Math.round(rating)
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-200 text-gray-200"
          }
        />
      ))}
    </div>
  );
}

// ─── Instructor Card ──────────────────────────────────────────────────────────

function InstructorCard({
  d,
  index,
}: {
  d: InstructorCardData;
  index: number;
}) {
  return (
    <Reveal delay={index * 0.07}>
      <div
        className={`bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 relative ${d.featured ? "ring-2 ring-blue-500/20" : ""
          }`}
      >
        {d.featured && (
          <div className="absolute -top-2 -right-2 bg-blue-600 text-white text-[9px] font-bold px-2 py-0.5 rounded-full flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5" /> Nổi bật
          </div>
        )}

        <div className="mb-3">
          <span
            className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${d.specialtyColor}`}
          >
            {d.specialty}
          </span>
        </div>

        <div className="flex items-start gap-3 mb-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${d.avatarBg}`}
          >
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-bold text-sm text-gray-900 leading-tight">{d.name}</p>
            <p className="text-xs text-gray-400">{d.subName}</p>
          </div>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">
          {d.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5">
            <StarRow rating={d.rating} />
            <span className="text-xs font-semibold text-gray-700">{d.rating}</span>
            <span className="text-[10px] text-gray-400">({d.ratingCount})</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-gray-400">
            <Users className="w-3 h-3" />
            {d.students}
          </div>
        </div>

        <button className="text-xs font-semibold text-blue-600 flex items-center gap-1 hover:gap-1.5 transition-all">
          Tìm hiểu thêm <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </Reveal>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const featuredInstructors: InstructorCardData[] = [
  {
    id: "f1",
    specialty: "AI & Data Science",
    specialtyColor: "bg-purple-100 text-purple-700",
    name: "Giảng viên AI Specialist",
    subName: "Machine Learning Expert",
    description:
      "Chuyên gia với 10 năm kinh nghiệm, giúp học viên nắm vững thuật toán và cho thực tế.",
    rating: 4.8,
    ratingCount: "1.2k",
    students: "2.4k",
    avatarBg: "bg-purple-500",
  },
  {
    id: "f2",
    specialty: "Cybersecurity",
    specialtyColor: "bg-orange-100 text-orange-700",
    name: "Giảng viên Cybersecurity",
    subName: "Security Engineer",
    description:
      "Tốt nghiệp an ninh mạng tại Đại học Bách Khoa, 12 năm làm bảo mật hệ thống doanh nghiệp.",
    rating: 4.7,
    ratingCount: "980",
    students: "1.8k",
    avatarBg: "bg-orange-500",
  },
  {
    id: "f3",
    specialty: "Frontend",
    specialtyColor: "bg-blue-100 text-blue-700",
    name: "Giảng viên Frontend",
    subName: "React & TypeScript Lead",
    description:
      "Chuyên gia React với 8 năm kinh nghiệm tại các startup công nghệ hàng đầu khu vực.",
    rating: 4.9,
    ratingCount: "1.5k",
    students: "3.1k",
    avatarBg: "bg-blue-500",
  },
];

const allInstructors: InstructorCardData[] = [
  {
    id: "a1",
    specialty: "Cybersecurity",
    specialtyColor: "bg-orange-100 text-orange-700",
    name: "Giảng viên Cybersecurity",
    subName: "Penetration Tester",
    description:
      "Tốt nghiệp an ninh mạng và bảo mật hệ thống, kinh nghiệm thực tế trong nhiều dự án lớn.",
    rating: 4.6,
    ratingCount: "720",
    students: "1.4k",
    avatarBg: "bg-orange-500",
  },
  {
    id: "a2",
    specialty: "AI & Data Science",
    specialtyColor: "bg-purple-100 text-purple-700",
    name: "Giảng viên AI Specialist",
    subName: "Deep Learning Researcher",
    description:
      "Chuyên gia với 8 năm nghiên cứu AI, từng làm tại các công ty công nghệ hàng đầu thế giới.",
    rating: 4.8,
    ratingCount: "1.1k",
    students: "2.2k",
    featured: true,
    avatarBg: "bg-purple-500",
  },
  {
    id: "a3",
    specialty: "DevOps",
    specialtyColor: "bg-green-100 text-green-700",
    name: "Giảng viên Cloud & DevOps",
    subName: "AWS Solutions Architect",
    description:
      "Certified AWS Solutions Architect với kinh nghiệm triển khai hệ thống cloud quy mô lớn.",
    rating: 4.7,
    ratingCount: "890",
    students: "1.9k",
    avatarBg: "bg-green-600",
  },
  {
    id: "a4",
    specialty: "Frontend",
    specialtyColor: "bg-blue-100 text-blue-700",
    name: "Giảng viên Frontend",
    subName: "Fullstack Developer",
    description:
      "Fullstack developer với 6 năm kinh nghiệm xây dựng sản phẩm thương mại điện tử lớn.",
    rating: 4.5,
    ratingCount: "640",
    students: "1.2k",
    avatarBg: "bg-blue-500",
  },
  {
    id: "a5",
    specialty: "Backend",
    specialtyColor: "bg-red-100 text-red-700",
    name: "Giảng viên Backend",
    subName: "Node.js & Microservices",
    description:
      "Node.js và Microservices expert, đã xây dựng hệ thống xử lý hàng triệu request mỗi ngày.",
    rating: 4.7,
    ratingCount: "830",
    students: "1.7k",
    avatarBg: "bg-red-500",
  },
  {
    id: "a6",
    specialty: "Mobile",
    specialtyColor: "bg-pink-100 text-pink-700",
    name: "Giảng viên Mobile App",
    subName: "Flutter & React Native",
    description:
      "Thư giảng viên nhận nhiều bằng khen từ các học viên đang làm tại các tập đoàn lớn.",
    rating: 4.8,
    ratingCount: "950",
    students: "2.0k",
    featured: true,
    avatarBg: "bg-pink-500",
  },
];

const categoryTabs: CategoryTab[] = [
  { id: "all", label: "Tất cả" },
  { id: "data-science", label: "Data Science" },
  { id: "ai-behavior", label: "AI & Behavior" },
  { id: "devops", label: "DevOps" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
];

const learningPaths: LearningPathData[] = [
  {
    id: "lp1",
    tag: "AI & DATA SCIENCE",
    tagColor: "text-purple-600 bg-purple-50",
    title:
      "Lộ trình phát triển Xây dựng nền tảng vững chắc và tạo ra sản phẩm thực tế ngay lần đầu",
    description:
      "Xây dựng nền tảng vững chắc trong lĩnh vực AI và Data Science, từ cơ bản đến nâng cao với các dự án thực tế.",
    duration: "6 tháng học",
    highlight: false,
  },
  {
    id: "lp2",
    tag: "AI & DATA SCIENCE",
    tagColor: "text-purple-600 bg-purple-50",
    title:
      "Lộ trình phát triển Hiểu sách AI hoạt động và áp dụng vào bài toán thực tế",
    description:
      "Hiểu sâu về cách AI hoạt động và áp dụng vào các bài toán thực tế để tạo ra sản phẩm có giá trị cao.",
    duration: "4 tháng học",
    highlight: false,
  },
  {
    id: "lp3",
    tag: "DEVOPS",
    tagColor: "text-green-600 bg-green-50",
    title:
      "Lộ trình phát triển Nắm cách hệ thống tín tin công và cách bảo vệ chúng",
    description:
      "Nắm vững cách hệ thống tin tức công và cách bảo vệ chúng trước các mối nguy hại trong môi trường thực tế.",
    duration: "5 tháng học",
    highlight: true,
  },
];

const testimonials: TestimonialData[] = [
  {
    id: "t1",
    rating: 5,
    text: "Giảng viên hướng dẫn rất tận tâm và chi tiết. Tôi đã có thêm rất nhiều kiến thức hữu ích và tự tin hơn nhiều trong công việc hiện tại.",
    author: "Học viên A",
    role: "Software Engineer",
  },
  {
    id: "t2",
    rating: 4,
    text: "Khóa học rất thực tế và bổ ích. Giảng viên luôn sẵn sàng hỗ trợ và giải đáp thắc mắc một cách nhanh chóng và rõ ràng.",
    author: "Học viên B",
    role: "Data Analyst",
  },
  {
    id: "t3",
    rating: 5,
    text: "Tôi thực sự ấn tượng với chất lượng giảng dạy. Học viên được thực hành nhiều và có thể áp dụng ngay vào công việc thực tế.",
    author: "Học viên FB",
    role: "Product Manager",
  },
];

// ─── Page Component ────────────────────────────────────────────────────────────

export default function InstructorPage() {
  const [activeTab, setActiveTab] = useState<string>("all");

  return (
    <div className="min-h-screen font-sans overflow-x-hidden">

      {/* ══════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════ */}
      <section className="relative bg-[#EEF2FF] pt-16 pb-24 overflow-hidden">
        {/* Deco dots */}
        <div className="absolute top-10 right-[18%] w-3 h-3 rounded-full border-2 border-blue-300/70 pointer-events-none" />
        <div className="absolute top-24 right-[35%] w-2 h-2 rounded-full bg-blue-400/40 pointer-events-none" />
        <div className="absolute bottom-20 left-[8%] w-2 h-2 rounded-full bg-purple-400/40 pointer-events-none" />
        <div className="absolute top-1/3 right-3 w-5 h-5 rounded-full border-2 border-blue-200/60 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 grid lg:grid-cols-2 gap-10 items-center">
          {/* Left text */}
          <div>
            <motion.h1
              className="text-[2.5rem] lg:text-[2.8rem] font-extrabold leading-[1.15] text-gray-900 mb-5"
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              Học trực tiếp từ{" "}
              <span className="text-blue-600">
                những người đang
                <br />
                làm nghề
              </span>
            </motion.h1>

            <motion.p
              className="text-gray-500 text-[15px]  leading-[1.6] mb-8 max-w-[360px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
            >
              Giảng viên là các kỹ sư đang làm việc thực tế, giúp bạn học đúng
              thứ doanh nghiệp cần.
            </motion.p>

            <motion.button
              className="relative inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-sm font-bold px-5 py-3 rounded-xl shadow-lg shadow-blue-500/25 transition-all"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22 }}
            >
              <Users className="w-4 h-4" />
              Đổi thoại học với mentor
            </motion.button>
          </div>

          {/* Right – floating cards */}
          <div className="relative h-60 lg:h-72 hidden lg:block">
            {/* Main card */}
            <motion.div
              className="absolute top-0 right-0 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4"
              initial={{ opacity: 0, y: 20, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: 2 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              style={{
                animation: "floatCard 5s ease-in-out infinite",
              }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate">
                    Senior Java Developer
                  </p>
                  <StarRow rating={4.5} size={11} />
                </div>
                <span className="text-[10px] bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">
                  Đang dạy
                </span>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-gray-500">
                  <span>Độ hoàn thành</span>
                  <span className="text-blue-600 font-semibold">80%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all"
                    style={{ width: "80%" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Bottom small card */}
            <motion.div
              className="absolute bottom-0 left-6 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 flex items-center gap-3 w-52"
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.42 }}
              style={{
                animation: "floatY 6s ease-in-out infinite",
                animationDelay: "1.5s",
              }}
            >
              <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-4 h-4 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900">Chuẩn bị phỏng vấn</p>
                <p className="text-[10px] text-gray-400">Mock Interview AI</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED INSTRUCTORS
      ══════════════════════════════════════════════ */}
      <section className="bg-[#F5F7FF] py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          <Reveal className="text-center mb-12">
            <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex items-center justify-center gap-1.5 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
              Đội ngũ dẫn đầu
            </p>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-2">
              Giảng viên{" "}
              <span className="text-blue-600">được đánh giá cao</span>
            </h2>
            <p className="text-gray-400 text-sm">
              Được công nhận bởi cộng đồng học viên
            </p>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            {featuredInstructors.map((d, i) => (
              <InstructorCard key={d.id} d={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          ALL INSTRUCTORS + FILTER
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          {/* Header */}
          <Reveal className="flex items-center justify-between mb-5 flex-wrap gap-3">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1 mb-1">
                <Users className="w-3 h-3" /> Hỗ trợ lọc
              </p>
              <p className="text-sm text-gray-500">
                Tìm kiếm theo chuyên ngành
              </p>
            </div>
            <button className="inline-flex items-center gap-1.5 bg-blue-600 text-white text-xs font-bold px-3.5 py-2 rounded-lg">
              <Sparkles className="w-3 h-3" /> 3 Chuyên gia
            </button>
          </Reveal>

          {/* Tabs */}
          <Reveal delay={0.07} className="flex gap-2 flex-wrap mb-8">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${activeTab === tab.id
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600"
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </Reveal>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allInstructors.map((d, i) => (
              <InstructorCard key={d.id} d={d} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          LEARNING PATHS
      ══════════════════════════════════════════════ */}
      <section className="bg-[#F5F7FF] py-20 relative overflow-hidden">
        <div className="absolute top-8 right-10 w-3.5 h-3.5 rounded-full border-2 border-blue-300/60 pointer-events-none" />
        <div className="absolute bottom-12 left-16 w-2.5 h-2.5 rounded-full bg-purple-300/50 pointer-events-none" />

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-[1fr,2fr] gap-10 items-start mb-12">
            <Reveal direction="left">
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-1.5 mb-3">
                <MapPin className="w-3.5 h-3.5" /> Định hướng chuyên môn
              </p>
              <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 leading-tight">
                Từng bước tiến đều có{" "}
                <span className="text-blue-600">định hướng</span> rõ ràng
              </h2>
            </Reveal>
            <Reveal direction="right" delay={0.1}>
              <p className="text-gray-500 text-sm leading-relaxed lg:mt-12">
                Mỗi giảng viên mang đến một hướng đi cụ thể, giúp bạn không bị
                lạc lối trên con đường phát triển sự nghiệp của mình.
              </p>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {learningPaths.map((lp, i) => (
              <Reveal key={lp.id} delay={i * 0.09}>
                <div
                  className={`rounded-2xl p-6 h-full flex flex-col transition-all duration-300 hover:-translate-y-1 cursor-pointer ${lp.highlight
                    ? "bg-blue-600 text-white shadow-xl shadow-blue-500/20"
                    : "bg-white border border-gray-100 shadow-sm hover:shadow-md"
                    }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${lp.highlight ? "bg-white/20" : "bg-gray-100"
                      }`}
                  >
                    <MapPin
                      className={`w-5 h-5 ${lp.highlight ? "text-white" : "text-gray-500"
                        }`}
                    />
                  </div>

                  {/* Tag */}
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full w-fit mb-3 ${lp.highlight
                      ? "bg-white/20 text-white"
                      : lp.tagColor
                      }`}
                  >
                    {lp.tag}
                  </span>

                  {/* Title */}
                  <h3
                    className={`font-bold text-sm leading-snug mb-3 flex-1 ${lp.highlight ? "text-white" : "text-gray-900"
                      }`}
                  >
                    {lp.title}
                  </h3>

                  {/* Description */}
                  <p
                    className={`text-xs leading-relaxed mb-5 ${lp.highlight ? "text-blue-100" : "text-gray-400"
                      }`}
                  >
                    {lp.description}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-1.5">
                      <Clock
                        className={`w-3.5 h-3.5 ${lp.highlight ? "text-blue-200" : "text-gray-400"
                          }`}
                      />
                      <span
                        className={`text-[11px] font-medium ${lp.highlight ? "text-blue-200" : "text-gray-400"
                          }`}
                      >
                        {lp.duration}
                      </span>
                    </div>
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center ${lp.highlight ? "bg-white/20" : "bg-blue-50"
                        }`}
                    >
                      <ArrowRight
                        className={`w-3.5 h-3.5 ${lp.highlight ? "text-white" : "text-blue-600"
                          }`}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════ */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          <Reveal className="text-center mb-10">
            <h2 className="text-2xl lg:text-3xl font-extrabold text-gray-900">
              Học viên đã{" "}
              <span className="text-blue-600">trải nghiệm và chia sẻ</span>
            </h2>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 0.08}>
                <div className="bg-[#F8FAFF] rounded-2xl p-5 border border-gray-100 h-full flex flex-col">
                  <StarRow rating={t.rating} size={14} />
                  <p className="text-sm text-gray-600 leading-relaxed mt-3 mb-5 flex-1">
                    {t.text}
                  </p>
                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                    <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center">
                      <Users className="w-3.5 h-3.5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-900">{t.author}</p>
                      <p className="text-[10px] text-gray-400">{t.role}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          AI SOLUTION – LIGHT
      ══════════════════════════════════════════════ */}
      <section className="bg-[#F5F7FF] py-20">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          <Reveal className="text-center mb-14">
            <div className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-blue-600 bg-blue-50 border border-blue-100 px-3 py-1 rounded-full mb-4">
              <Sparkles className="w-3 h-3" /> Giải pháp cho Giảng viên
            </div>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
              Giải pháp cho Giảng viên{" "}
              <span className="text-blue-600">
                tạo câu hỏi từ video với AI
              </span>
            </h2>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              MACO giúp bạn đơn giản hóa quy trình và tổ chức bài giảng tốt hơn
            </p>
          </Reveal>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <Reveal direction="left">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-[9px] font-black text-white">01</span>
                  </div>
                  <p className="text-sm font-bold text-gray-900">
                    Đối với Giảng viên
                  </p>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-7">
                  Vai trò của bạn là dạy và chia sẻ kiến thức, không phải lãng
                  phí thời gian vào việc tự xây dựng câu hỏi, dễ dàng tổ chức
                  bài giảng và tạo câu hỏi ôn tập.
                </p>
              </Reveal>

              <div className="space-y-3">
                {[
                  "Tạo quiz trực tiếp từ video bài giảng",
                  "Tổ chức và sử dụng nội dung câu hỏi dễ dàng",
                ].map((text, i) => (
                  <Reveal key={i} delay={0.1 + i * 0.07} direction="left">
                    <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 border border-gray-100 shadow-sm">
                      <div className="w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center flex-shrink-0">
                        <span className="text-[9px] font-black text-blue-600">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 font-medium">{text}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Right – Quiz mockup */}
            <Reveal direction="right" delay={0.1}>
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-5 max-w-[340px] mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                      Quiz Synthesis
                    </p>
                    <p className="text-[10px] text-gray-400">AI-Powered</p>
                  </div>
                  <span className="text-[10px] bg-green-100 text-green-700 font-semibold px-2.5 py-0.5 rounded-full">
                    ● Live
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 mb-4">
                  {[
                    { label: "Quiz", emoji: "📋" },
                    { label: "Flashcard", emoji: "🃏" },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className="flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 border-blue-100 bg-blue-50 hover:border-blue-400 transition-colors"
                    >
                      <span className="text-lg">{item.emoji}</span>
                      <span className="text-xs font-semibold text-gray-700">
                        {item.label}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="space-y-2.5">
                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="text-[10px] text-gray-400 mb-1">
                      🤖 Câu hỏi AI tạo ra:
                    </p>
                    <p className="text-xs text-gray-800 font-medium">
                      Tại phút 05:25, Logic được dùng để làm gì?
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-blue-50 border border-blue-100">
                    <p className="text-[10px] text-blue-600 font-bold mb-1">
                      ✓ Đáp án đề xuất
                    </p>
                    <p className="text-xs text-gray-700">
                      A. Kiểm tra tính hợp lệ
                    </p>
                  </div>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-colors active:scale-95">
                    <Zap className="w-3 h-3" /> Tạo câu hỏi tổng hợp
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA DARK
      ══════════════════════════════════════════════ */}
      <section className="bg-[#111827] py-20 relative overflow-hidden">
        <div className="absolute -top-20 right-[-10%] w-[300px] h-[300px] bg-blue-300/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
        {/* Deco */}
        <div className="absolute top-8 right-16 w-4 h-4 rounded-full border border-blue-500/30" />
        <div className="absolute bottom-10 left-20 w-3 h-3 rounded-full bg-blue-500/20" />

        <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <Reveal direction="left">
              <p className="text-[11px] font-bold uppercase tracking-widest text-blue-400 flex items-center gap-1.5 mb-3">
                <Sparkles className="w-3.5 h-3.5" /> Dành riêng cho giảng viên
              </p>
              <h2 className="text-3xl lg:text-[2.1rem] font-extrabold text-white mb-4 leading-tight">
                Tạo câu hỏi từ video{" "}
                <span className="text-blue-400">và quản lý nội dung</span>{" "}
                dễ dàng hơn
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed mb-8">
                MACO hỗ trợ giảng viên tạo câu hỏi từ video bài giảng theo tốc
                độ tức thì, đồng thời theo dõi và quản lý nội dung thông qua
                quá trình tổng hợp nhanh chóng và dễ dùng.
              </p>
              <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-sm font-bold px-6 py-3 rounded-xl shadow-lg shadow-blue-500/25 transition-all">
                Trở thành giảng viên
                <ArrowRight className="w-4 h-4" />
              </button>
            </Reveal>

            <div className="space-y-3 lg:pt-12">
              {[
                {
                  icon: <CheckCircle2 className="w-4 h-4 text-blue-400" />,
                  title: "Quản lý nội dung đầu quản",
                  desc: "Tổng hợp và theo dõi nội dung bài giảng một cách hiệu quả và có hệ thống.",
                },
                {
                  icon: <Zap className="w-4 h-4 text-yellow-400" />,
                  title: "Tạo quiz từ video bài giảng",
                  desc: "AI tự động phân tích nội dung video và tạo câu hỏi phù hợp, tiết kiệm thời gian.",
                },
              ].map((item, i) => (
                <Reveal key={i} delay={0.1 + i * 0.09} direction="right">
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors">
                    <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white mb-0.5">
                        {item.title}
                      </p>
                      <p className="text-xs text-gray-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}