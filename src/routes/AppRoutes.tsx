import { BrowserRouter, Routes, Route } from "react-router-dom"
import MainLayout from "../components/layout/MainLayout";
import Home from "../pages/Home";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          {/* <Route path="/courses" element={<Courses />} /> */}
        </Route>

        {/* Các trang KHÔNG cần Header/Footer thì để ngoài đây */}
        {/* <Route path="/login" element={<Login />} /> */}

      </Routes>
    </BrowserRouter>
  );
}