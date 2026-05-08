"use client";

import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { StudentSidebar } from "./StudentSidebar";
import { StudentHeader } from "./StudentHeader";

export default function StudentLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false); // Cho Desktop
  const [isMobileOpen, setIsMobileOpen] = useState(false); // Cho Mobile

  const location = useLocation();
  const isCoursePlayer = 
    location.pathname.includes("/course/") && 
    !location.pathname.includes("course-detail");
  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Sidebar nhận cả 2 trạng thái */}
      <StudentSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}
      />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Header nhận hàm để mở Mobile Menu */}
        <StudentHeader onOpenMobileMenu={() => setIsMobileOpen(true)} />

        <main
          className={
            isCoursePlayer
              ? "flex-1 overflow-hidden"
              : "flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth"
          }
        >
          <div className={isCoursePlayer ? "h-full" : "w-full pb-20"}>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
