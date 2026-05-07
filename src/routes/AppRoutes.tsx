import { BrowserRouter, Routes, Route } from "react-router-dom"
import MarketLayout from "../layout/market/MarketLayout";
import Home from "../pages/market/HomePage";
import CoursesPage from "@/pages/market/CoursesPage";
import CourseDetailPage from "@/pages/market/CourseDetailPage";
import MacoContent from "@/pages/market/InstructorPage";
import { ProtectedRoute } from "./ProtectedRoute";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MarketLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:slug" element={<CourseDetailPage />} />
          <Route path="/instructors" element={<MacoContent />} />
        </Route>

        {/* 2. STUDENT ROUTES */}
        <Route element={<ProtectedRoute allowedRoles={["student"]} />}>
          <Route path="/student" element={<StudentLayout />}>
            <Route path="dashboard" element={<StudentDashboard />} />
          </Route>
        </Route>

        {/* 4. ADMIN ROUTES */}
        {/* <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="my-courses" element={<div>My Courses Page</div>} />
          </Route>
        </Route> */}

        {/* 3. INSTRUCTOR ROUTES */}
        {/* <Route element={<ProtectedRoute allowedRoles={["instructor"]} />}>
          <Route path="/instructor" element={<StudentLayout />}> */}
        {/* Đổi thành InstructLayout sau */}
        {/* <Route path="dashboard" element={<div>Instructor Dashboard</div>} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="users" element={<div>User Management</div>} />
          </Route>
        </Route> */}

        {/* Trang báo lỗi 403 / 404 */}
        <Route path="/unauthorized" element={<div>Bạn không có quyền truy cập trang này!</div>} />
        <Route path="*" element={<div>404 Không tìm thấy trang</div>} />
      </Routes>
    </BrowserRouter>
  );
}