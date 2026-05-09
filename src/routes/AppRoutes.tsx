import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import MarketLayout from "../layout/market/MarketLayout";
import Home from "../pages/market/HomePage";
import CoursesPage from "@/pages/market/CoursesPage";
import CourseDetailPage from "@/pages/market/CourseDetailPage";
import MacoContent from "@/pages/market/InstructorPage";
import { ProtectedRoute } from "./ProtectedRoute";
import StudentLayout from "@/layout/student/StudentLayout";
import StudentDashboard from "@/pages/student/Dashboard";
import MyCourses from "@/pages/student/MyCourses";
import Achievements from "@/pages/student/Achievements";
import CoursePlayer from "@/pages/student/CoursePlayer";
import Explore from "@/pages/student/Explore";
import CourseDetail from "@/pages/student/CourseDetail";
import Settings from "@/pages/student/Settings";
import InstructorLayout from "@/layout/instructor/InstructorLayout";
import InstructorDashboard from "@/pages/instructor/Dashoard";
import InstructorCourses from "@/pages/instructor/InstructorCourses";
import InstructorCourseDetail from "@/pages/instructor/InstructorCourseDetail";
import InstructorLessonDetail from "@/pages/instructor/InstructorLessonDetail";

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
        {/* <Route element={<ProtectedRoute allowedRoles={["student"]} />}> */}
        <Route path="/student" element={<StudentLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="achievements" element={<Achievements />} />
          <Route path="settings" element={<Settings />} />
          <Route path="course/:courseId" element={<CoursePlayer />} />
          <Route path="explore" element={<Explore />} />
          <Route path="course-detail/:id" element={<CourseDetail />} />
        </Route>
        {/* </Route> */}

        {/* 4. ADMIN ROUTES */}
        {/* <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="my-courses" element={<div>My Courses Page</div>} />
          </Route>
        </Route> */}

        {/* 3. INSTRUCTOR ROUTES */}
        {/* <Route element={<ProtectedRoute allowedRoles={["instructor"]} />}> */}
        <Route path="/instructor" element={<InstructorLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<InstructorDashboard />} />
          <Route path="courses" element={<InstructorCourses />} />
          <Route path="courses/:id" element={<InstructorCourseDetail />} />
          <Route path="courses/:id/lessons/:lessonId" element={<InstructorLessonDetail />} />
        </Route>
        {/* </Route> */}

        {/* Trang báo lỗi 403 / 404 */}
        <Route path="/unauthorized" element={<div>Bạn không có quyền truy cập trang này!</div>} />
        <Route path="*" element={<div>404 Không tìm thấy trang</div>} />
      </Routes>
    </BrowserRouter>
  );
}