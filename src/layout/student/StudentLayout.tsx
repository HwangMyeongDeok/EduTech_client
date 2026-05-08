"use client";

import { Outlet } from "react-router-dom";
import { StudentSidebar } from "./StudentSidebar";
import { StudentHeader } from "./StudentHeader";

export default function StudentLayout() {
  return (
    <div className="flex h-screen bg-[#F8FAFC] overflow-hidden">
      <aside className="hidden lg:block w-72 border-r bg-white">
        <StudentSidebar />
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <StudentHeader />

        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 scroll-smooth">
          <div className="w-full pb-20"> 
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}