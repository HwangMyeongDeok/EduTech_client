import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom"; // ĐÃ THÊM: useLocation
import { InstructorSidebar } from "./InstructorSidebar";
import { InstructorHeader } from "./InstructorHeader";

export default function InstructorLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // 1. Lấy đường dẫn URL hiện tại
  const location = useLocation();


  const isLessonDetail = location.pathname.match(/\/instructor\/courses\/[^/]+\/lessons\/[^/]+/);

  return (
    <div className="flex h-screen bg-slate-50/50 overflow-hidden font-sans">
      <InstructorSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <InstructorHeader onOpenMobileMenu={() => setIsMobileOpen(true)} />
        
        {/* 3. Bỏ padding (p-4 md:p-8) nếu là trang Lesson */}
        <main className={`flex-1 overflow-y-auto relative ${isLessonDetail ? '' : 'p-4 md:p-8'}`}>
          
          {/* 4. Bỏ luôn giới hạn chiều rộng (max-w) để nó bung 100% */}
          <div className={isLessonDetail ? "w-full h-full" : "max-w-[1600px] mx-auto w-full h-full"}>
            <Outlet />
          </div>
          
        </main>
      </div>
    </div>
  );
}