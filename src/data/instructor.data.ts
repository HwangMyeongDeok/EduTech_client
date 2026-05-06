// ─── Data ─────────────────────────────────────────────────────────────────────
export interface InstructorCardData {
  id: string;
  categoryId: string; // Thêm trường này để mapping với categoryTabs
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

export interface LearningPathData {
  id: string;
  tag: string;
  tagColor: string;
  title: string;
  description: string;
  duration: string;
  highlight: boolean;
}

export interface TestimonialData {
  id: string;
  rating: number;
  text: string;
  author: string;
  role: string;
}

export interface CategoryTab {
  id: string;
  label: string;
}

export const featuredInstructors: InstructorCardData[] = [
  {
    id: "f1",
    categoryId: "data-science", // Thêm categoryId
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
    categoryId: "cybersecurity", // Giả sử thêm tab cybersecurity sau này, tạm để vậy
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
    categoryId: "frontend",
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

export const allInstructors: InstructorCardData[] = [
  {
    id: "a1",
    categoryId: "cybersecurity", // Note: trong categoryTabs hiện chưa có tab nào id là cybersecurity
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
    categoryId: "data-science",
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
    categoryId: "devops",
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
    categoryId: "frontend",
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
    categoryId: "backend",
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
    categoryId: "mobile", // Note: trong categoryTabs hiện chưa có tab mobile
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

export const categoryTabs: CategoryTab[] = [
  { id: "all", label: "Tất cả" },
  { id: "data-science", label: "Data Science" },
  { id: "ai-behavior", label: "AI & Behavior" },
  { id: "devops", label: "DevOps" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "cybersecurity", label: "Cybersecurity" }, // Mình thêm vào cho khớp data giảng viên
  { id: "mobile", label: "Mobile" },               // Mình thêm vào cho khớp data giảng viên
];

export const learningPaths: LearningPathData[] = [
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

export const testimonials: TestimonialData[] = [
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