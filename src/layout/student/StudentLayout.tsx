import { Outlet, useLocation } from "react-router-dom";
import { StudentHeader } from "./StudentHeader";

export default function StudentLayout() {
  const location = useLocation();
  // Vẫn giữ logic check trang học video để full màn hình
  const isCoursePlayer = 
    location.pathname.includes("/course/") && 
    !location.pathname.includes("course-detail");

  return (
    <div className="flex flex-col min-h-screen bg-[#F8FAFC]">
      {/* Header giờ nằm trên cùng và chiếm full width */}
      <StudentHeader />

      <main
        className={
          isCoursePlayer
            ? "flex-1 overflow-hidden" // Player thì không cuộn, chiếm full
            : "flex-1 w-full max-w-[1600px] mx-auto overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth"
        }
      >
        <div className={isCoursePlayer ? "h-full" : "w-full pb-20"}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}