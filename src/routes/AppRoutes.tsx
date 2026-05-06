import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "../layout/MainLayout";
import Home from "../pages/HomePage";
import CoursesPage from "@/pages/CoursesPage";
import Coursedetailpage from "@/pages/CourseDetailPage";
import MacoContent from "@/pages/InstructorPage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:slug" element={<Coursedetailpage />} />
          <Route path="/instructors" element={<MacoContent />} />

        </Route>

        {/* Các trang KHÔNG cần Header/Footer thì để ngoài đây */}
        {/* <Route path="/login" element={<Login />} /> */}

      </Routes>
    </BrowserRouter>
  );
}