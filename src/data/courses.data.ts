export type Category =
  | "Tất cả"
  | "AI & Data Science"
  | "Web Development"
  | "Backend"
  | "DevOps"
  | "Cybersecurity"
  | "Computer Science"
  | "Design";

export interface Lesson {
  id: string;
  title: string;
  duration?: string;
  isLocked?: boolean;
}

export interface Chapter {
  id: string;
  part: string;
  title: string;
  lessons: Lesson[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  content: string;
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  category: Exclude<Category, "Tất cả">;
  categoryLabel: string;
  instructor: string;
  rating: number;
  reviewCount: number;
  studentCount: number;
  price: number;
  originalPrice?: number;
  isFree?: boolean;
  duration: string;
  thumbnail: string;
  gradient: string;
  isNew?: boolean;
  target: string;
  requirements: string[];
  chapters: Chapter[];
  reviews: Review[];
}

export const COURSES: Course[] = [
  {
    id: "1",
    slug: "nhap-mon-spring-boot",
    title: "Nhập môn Spring Boot",
    shortDescription:
      "Khóa học này được thiết kế để cung cấp cho bạn cái nhìn toàn diện và thực tế nhất về công nghệ hiện đại.",
    description:
      "Khóa học này được thiết kế để cung cấp cho bạn cái nhìn toàn diện và thực tế nhất về công nghệ hiện đại. Không chỉ dừng lại ở lý thuyết, bạn sẽ được tham gia trực tiếp vào việc xây dựng các hệ thống thực tế từ con số 0. Qua khóa học này, bạn sẽ không chỉ học cú pháp mà còn học cách tư duy hệ thống, cách giải quyết các bài toán hóc búa trong thực tế sản phẩm.",
    category: "Backend",
    categoryLabel: "BACKEND",
    instructor: "Dr. Alex Rivera",
    rating: 4.9,
    reviewCount: 1240,
    studentCount: 8500,
    price: 1200000,
    originalPrice: 3000000,
    duration: "24 giờ",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f70d504d0?w=400&h=300&fit=crop",
    gradient: "from-emerald-900 via-emerald-800 to-slate-900",
    isNew: false,
    target: "Sinh viên CNTT, Lập trình viên muốn nâng cấp kỹ năng, hoặc người làm kỹ thuật muốn chuyển đổi công nghệ.",
    requirements: [
      "Đã có kiến thức cơ bản về lập trình",
      "Sử dụng máy tính thành thạo",
      "Tinh thần tự học cao",
    ],
    chapters: [
      {
        id: "c1",
        part: "PHẦN 1",
        title: "Chương 1: Tổng quan và Cài đặt",
        lessons: [
          { id: "l1", title: "Giới thiệu về lộ trình", duration: "12:30" },
          { id: "l2", title: "Chuẩn bị môi trường thực hành", duration: "18:45" },
          { id: "l3", title: "Bài tập khởi động", duration: "25:00", isLocked: true },
        ],
      },
      {
        id: "c2",
        part: "PHẦN 2",
        title: "Chương 2: Kiến thức nền tảng",
        lessons: [
          { id: "l4", title: "Spring Core & IoC Container", duration: "32:10", isLocked: true },
          { id: "l5", title: "Dependency Injection thực chiến", duration: "28:00", isLocked: true },
        ],
      },
      {
        id: "c3",
        part: "PHẦN 3",
        title: "Chương 3: Kỹ thuật nâng cao",
        lessons: [
          { id: "l6", title: "REST API với Spring MVC", duration: "45:20", isLocked: true },
          { id: "l7", title: "Security & JWT Authentication", duration: "52:00", isLocked: true },
          { id: "l8", title: "Deploy lên Cloud", duration: "38:15", isLocked: true },
        ],
      },
    ],
    reviews: [
      { id: "r1", author: "Học viên ẩn danh", rating: 5, date: "1 tuần trước", content: "Nội dung rất thực tế, giảng viên nhiệt tình!" },
      { id: "r2", author: "Học viên ẩn danh", rating: 4, date: "3 tuần trước", content: "Khóa học hay, nhưng phần bài tập hơi khó một chút." },
    ],
  },
  {
    id: "2",
    slug: "uiux-design-mobile-app",
    title: "UI/UX Design cho Mobile App",
    shortDescription: "Học thiết kế UI/UX chuyên nghiệp cho ứng dụng di động từ Figma đến prototype.",
    description: "Khóa học toàn diện về thiết kế UI/UX cho mobile app. Bạn sẽ học từ nguyên tắc cơ bản đến kỹ thuật thiết kế nâng cao.",
    category: "Design",
    categoryLabel: "DESIGN",
    instructor: "Sarah Chen",
    rating: 4.9,
    reviewCount: 980,
    studentCount: 5200,
    price: 1500000,
    duration: "18 giờ",
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=300&fit=crop",
    gradient: "from-blue-900 via-indigo-800 to-purple-900",
    isNew: true,
    target: "Designer muốn chuyển sang mobile, developer muốn học UI/UX.",
    requirements: ["Có máy tính với Figma", "Không cần kinh nghiệm thiết kế trước"],
    chapters: [
      {
        id: "c1", part: "PHẦN 1", title: "Chương 1: Nguyên tắc UI/UX", lessons: [
          { id: "l1", title: "Tư duy thiết kế lấy người dùng làm trung tâm", duration: "20:00" },
          { id: "l2", title: "Color Theory & Typography", duration: "35:00", isLocked: true },
        ]
      },
    ],
    reviews: [
      { id: "r1", author: "Học viên ẩn danh", rating: 5, date: "2 tuần trước", content: "Giảng viên dạy rất chi tiết và dễ hiểu!" },
    ],
  },
  {
    id: "3",
    slug: "mastering-large-language-models",
    title: "Mastering Large Language Models",
    shortDescription: "Hiểu sâu về LLM, fine-tuning, RAG và xây dựng ứng dụng AI thực tế.",
    description: "Khóa học chuyên sâu về Large Language Models dành cho kỹ sư AI và data scientist.",
    category: "AI & Data Science",
    categoryLabel: "AI & DATA SCIENCE",
    instructor: "Michael Smith",
    rating: 4.8,
    reviewCount: 2100,
    studentCount: 12000,
    price: 2500000,
    duration: "36 giờ",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    gradient: "from-violet-900 via-purple-900 to-slate-900",
    isNew: false,
    target: "Data scientist, ML engineer, developer muốn ứng dụng AI vào sản phẩm.",
    requirements: ["Python cơ bản", "Kiến thức về machine learning", "GPU hoặc Google Colab"],
    chapters: [
      {
        id: "c1", part: "PHẦN 1", title: "Chương 1: Transformer Architecture", lessons: [
          { id: "l1", title: "Attention Mechanism từ đầu", duration: "40:00" },
        ]
      },
    ],
    reviews: [
      { id: "r1", author: "Học viên ẩn danh", rating: 5, date: "1 tháng trước", content: "Khóa học tốt nhất về LLM tôi từng học!" },
    ],
  },
  {
    id: "4",
    slug: "phat-trien-web-react-nextjs",
    title: "Phát triển Web với React & Next.js",
    shortDescription: "Xây dựng ứng dụng web hiện đại với React 19, Next.js 15 và Tailwind CSS.",
    description: "Học lập trình web fullstack với React và Next.js từ cơ bản đến nâng cao.",
    category: "Web Development",
    categoryLabel: "WEB DEVELOPMENT",
    instructor: "David Miller",
    rating: 4.9,
    reviewCount: 1560,
    studentCount: 9800,
    price: 2000000,
    duration: "30 giờ",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop",
    gradient: "from-slate-900 via-gray-900 to-zinc-900",
    isNew: false,
    target: "Lập trình viên frontend muốn nâng cấp lên fullstack.",
    requirements: ["HTML/CSS cơ bản", "JavaScript ES6+"],
    chapters: [
      {
        id: "c1", part: "PHẦN 1", title: "Chương 1: React Fundamentals", lessons: [
          { id: "l1", title: "JSX và Components", duration: "25:00" },
        ]
      },
    ],
    reviews: [
      { id: "r1", author: "Học viên ẩn danh", rating: 5, date: "2 tuần trước", content: "Rất thực chiến, nhiều project hay!" },
    ],
  },
  {
    id: "5",
    slug: "postgresql-database",
    title: "Hệ quản trị Cơ sở dữ liệu PostgreSQL",
    shortDescription: "Nắm vững PostgreSQL từ cơ bản đến tối ưu hiệu năng cho hệ thống lớn.",
    description: "Khóa học PostgreSQL toàn diện dành cho backend developer và DBA.",
    category: "Backend",
    categoryLabel: "BACKEND",
    instructor: "Lê Văn Thành",
    rating: 4.7,
    reviewCount: 540,
    studentCount: 3100,
    price: 1100000,
    duration: "20 giờ",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    gradient: "from-blue-950 via-blue-900 to-indigo-900",
    isNew: false,
    target: "Backend developer, DBA, sinh viên CNTT.",
    requirements: ["Biết SQL cơ bản", "Đã từng làm việc với database"],
    chapters: [
      {
        id: "c1", part: "PHẦN 1", title: "Chương 1: PostgreSQL Cơ bản", lessons: [
          { id: "l1", title: "Cài đặt và cấu hình", duration: "15:00" },
        ]
      },
    ],
    reviews: [
      { id: "r1", author: "Học viên ẩn danh", rating: 4, date: "3 tuần trước", content: "Nội dung rất đầy đủ về PostgreSQL." },
    ],
  },
  {
    id: "6",
    slug: "devops-docker-kubernetes",
    title: "DevOps với Docker & Kubernetes",
    shortDescription: "Container hóa ứng dụng và orchestration với Docker Compose và Kubernetes.",
    description: "Học DevOps thực chiến với Docker và Kubernetes để deploy ứng dụng production.",
    category: "DevOps",
    categoryLabel: "DEVOPS",
    instructor: "Trần Minh Hoàng",
    rating: 4.9,
    reviewCount: 780,
    studentCount: 4200,
    price: 2800000,
    duration: "28 giờ",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=300&fit=crop",
    gradient: "from-cyan-900 via-teal-900 to-emerald-900",
    isNew: true,
    target: "Developer muốn học DevOps, SysAdmin, Cloud engineer.",
    requirements: ["Linux cơ bản", "Biết một ngôn ngữ lập trình"],
    chapters: [
      {
        id: "c1", part: "PHẦN 1", title: "Chương 1: Docker Fundamentals", lessons: [
          { id: "l1", title: "Container vs VM", duration: "20:00" },
        ]
      },
    ],
    reviews: [
      { id: "r1", author: "Học viên ẩn danh", rating: 5, date: "1 tuần trước", content: "Thực hành ngay từ bài đầu tiên!" },
    ],
  },
  {
    id: "7",
    slug: "backend-golang",
    title: "Phát triển Backend với Golang",
    shortDescription: "Xây dựng microservices hiệu năng cao với Go, gRPC và message queue.",
    description: "Golang là ngôn ngữ được thiết kế cho hệ thống hiệu năng cao. Khóa học này giúp bạn thành thạo Go.",
    category: "Backend",
    categoryLabel: "BACKEND",
    instructor: "Nguyễn Vũ Long",
    rating: 4.8,
    reviewCount: 420,
    studentCount: 2800,
    price: 1850000,
    duration: "22 giờ",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f70d504d0?w=400&h=300&fit=crop",
    gradient: "from-sky-900 via-blue-900 to-indigo-950",
    isNew: false,
    target: "Backend developer muốn học Go, system engineer.",
    requirements: ["Biết lập trình cơ bản", "Hiểu về HTTP/REST"],
    chapters: [
      {
        id: "c1", part: "PHẦN 1", title: "Chương 1: Go Basics", lessons: [
          { id: "l1", title: "Go syntax và kiểu dữ liệu", duration: "30:00" },
        ]
      },
    ],
    reviews: [
      { id: "r1", author: "Học viên ẩn danh", rating: 5, date: "2 tháng trước", content: "Go rất thú vị, khóa học giải thích rõ ràng!" },
    ],
  },
  {
    id: "8",
    slug: "an-toan-thong-tin-ethical-hacking",
    title: "An toàn thông tin & Ethical Hacking",
    shortDescription: "Học pentesting, phân tích malware và bảo mật hệ thống từ góc nhìn hacker.",
    description: "Khóa học bảo mật toàn diện, học cách tấn công để bảo vệ hệ thống tốt hơn.",
    category: "Cybersecurity",
    categoryLabel: "CYBERSECURITY",
    instructor: "Phạm Anh Khoa",
    rating: 4.9,
    reviewCount: 320,
    studentCount: 1500,
    price: 3200000,
    duration: "40 giờ",
    thumbnail: "https://images.unsplash.com/photo-1605745341812-721e64eab012?w=400&h=300&fit=crop",
    gradient: "from-yellow-900 via-amber-900 to-orange-950",
    isNew: true,
    target: "Security engineer, developer muốn học về bảo mật, sinh viên CNTT.",
    requirements: ["Linux cơ bản", "Networking cơ bản", "Một ngôn ngữ scripting"],
    chapters: [
      {
        id: "c1", part: "PHẦN 1", title: "Chương 1: Reconnaissance", lessons: [
          { id: "l1", title: "OSINT và thông tin mục tiêu", duration: "35:00" },
        ]
      },
    ],
    reviews: [
      { id: "r1", author: "Học viên ẩn danh", rating: 5, date: "1 tuần trước", content: "Lab thực hành rất chất lượng!" },
    ],
  },
  {
    id: "9",
    slug: "microservices-spring-boot",
    title: "Xây dựng Microservices với Spring Boot",
    shortDescription: "Thiết kế và triển khai kiến trúc microservices với Spring Cloud ecosystem.",
    description: "Học cách xây dựng hệ thống microservices scalable với Spring Boot và Spring Cloud.",
    category: "Backend",
    categoryLabel: "BACKEND",
    instructor: "Vũ Công Thành",
    rating: 4.7,
    reviewCount: 890,
    studentCount: 6300,
    price: 2100000,
    duration: "32 giờ",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f70d504d0?w=400&h=300&fit=crop",
    gradient: "from-green-900 via-emerald-900 to-teal-950",
    isNew: false,
    target: "Java developer, backend engineer.",
    requirements: ["Spring Boot cơ bản", "Hiểu về REST API", "Docker cơ bản"],
    chapters: [
      {
        id: "c1", part: "PHẦN 1", title: "Chương 1: Microservices Architecture", lessons: [
          { id: "l1", title: "Monolith vs Microservices", duration: "22:00" },
        ]
      },
    ],
    reviews: [
      { id: "r1", author: "Học viên ẩn danh", rating: 4, date: "2 tuần trước", content: "Kiến trúc được giải thích rất rõ ràng." },
    ],
  },
  {
    id: "10",
    slug: "flutter-mobile-app",
    title: "Lập trình Mobile Flutter từ zero",
    shortDescription: "Xây dựng ứng dụng iOS & Android với Flutter và Dart từ cơ bản đến publish.",
    description: "Học Flutter để phát triển ứng dụng mobile đa nền tảng với một codebase duy nhất.",
    category: "Web Development",
    categoryLabel: "MOBILE APP",
    instructor: "Bùi Tiến Dũng",
    rating: 4.8,
    reviewCount: 1200,
    studentCount: 7200,
    price: 1450000,
    duration: "26 giờ",
    thumbnail: "https://images.unsplash.com/photo-1605745341812-721e64eab012?w=400&h=300&fit=crop",
    gradient: "from-blue-900 via-cyan-900 to-teal-900",
    isNew: false,
    target: "Mobile developer, web developer muốn sang mobile.",
    requirements: ["Lập trình OOP cơ bản", "Máy Mac hoặc Windows"],
    chapters: [
      {
        id: "c1", part: "PHẦN 1", title: "Chương 1: Dart Language", lessons: [
          { id: "l1", title: "Dart cơ bản cho Flutter", duration: "28:00" },
        ]
      },
    ],
    reviews: [
      { id: "r1", author: "Học viên ẩn danh", rating: 5, date: "3 tuần trước", content: "Flutter rất dễ học với khóa này!" },
    ],
  },
  {
    id: "11",
    slug: "cau-truc-du-lieu-giai-thuat",
    title: "Cấu trúc dữ liệu & Giải thuật",
    shortDescription: "Nền tảng CS vững chắc: DSA từ cơ bản đến nâng cao cho coding interview.",
    description: "Khóa học DSA toàn diện giúp bạn ace coding interview tại các công ty công nghệ.",
    category: "Computer Science",
    categoryLabel: "COMPUTER SCIENCE",
    instructor: "GS. Đặng Thái Sơn",
    rating: 4.9,
    reviewCount: 3200,
    studentCount: 15000,
    price: 0,
    isFree: true,
    duration: "45 giờ",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    gradient: "from-rose-900 via-pink-900 to-purple-950",
    isNew: false,
    target: "Mọi lập trình viên muốn cải thiện tư duy thuật toán.",
    requirements: ["Biết một ngôn ngữ lập trình bất kỳ"],
    chapters: [
      {
        id: "c1", part: "PHẦN 1", title: "Chương 1: Arrays & Strings", lessons: [
          { id: "l1", title: "Sliding Window Pattern", duration: "30:00" },
        ]
      },
    ],
    reviews: [
      { id: "r1", author: "Học viên ẩn danh", rating: 5, date: "1 tháng trước", content: "Miễn phí mà chất lượng vượt trội!" },
    ],
  },
  {
    id: "12",
    slug: "cloud-computing-aws",
    title: "Cloud Computing với AWS Cloud",
    shortDescription: "Từ EC2 đến Lambda, học AWS từ cơ bản đến kiến trúc cloud-native.",
    description: "Khóa học AWS toàn diện từ cơ bản đến nâng cao, chuẩn bị cho chứng chỉ AWS SAA.",
    category: "DevOps",
    categoryLabel: "CLOUD",
    instructor: "Lâm Nhật Minh",
    rating: 4.6,
    reviewCount: 460,
    studentCount: 2100,
    price: 2400000,
    duration: "35 giờ",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    gradient: "from-orange-900 via-amber-900 to-yellow-950",
    isNew: false,
    target: "Developer, sysadmin muốn lên cloud.",
    requirements: ["Linux cơ bản", "Networking cơ bản", "Thẻ tín dụng cho AWS Free Tier"],
    chapters: [
      {
        id: "c1", part: "PHẦN 1", title: "Chương 1: AWS Overview", lessons: [
          { id: "l1", title: "Cloud Computing là gì?", duration: "18:00" },
        ]
      },
    ],
    reviews: [
      { id: "r1", author: "Học viên ẩn danh", rating: 4, date: "1 tháng trước", content: "Lab thực hành đa dạng, học được nhiều thứ!" },
    ],
  },
];

export const CATEGORIES: Category[] = [
  "Tất cả",
  "AI & Data Science",
  "Web Development",
  "Backend",
  "DevOps",
  "Cybersecurity",
  "Computer Science",
  "Design",
];

export const formatPrice = (price: number, isFree?: boolean) => {
  if (isFree || price === 0) return "Miễn phí";
  return price.toLocaleString("vi-VN") + "đ";
};