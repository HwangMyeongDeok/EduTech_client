import { NavLink } from "react-router-dom";
import { BookOpen, Trophy, Settings, Compass } from "lucide-react";
import { motion } from "framer-motion";

export function StudentSidebar() {
  const navItems = [
    { name: "Khám phá", icon: <Compass className="w-5 h-5" />, path: "/student/dashboard" },
    { name: "Khóa học của tôi", icon: <BookOpen className="w-5 h-5" />, path: "/student/my-courses" },
    { name: "Thành tích", icon: <Trophy className="w-5 h-5" />, path: "/student/achievements" },
    { name: "Cài đặt", icon: <Settings className="w-5 h-5" />, path: "/student/settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-100 flex-shrink-0 hidden md:flex flex-col relative z-20">
      {/* Logo Area */}
      <div className="h-[72px] flex items-center px-6 border-b border-slate-50">
        <div className="flex items-center gap-2 font-black text-2xl tracking-tight text-[#0B56D5]">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-[#0B56D5] rounded-xl flex items-center justify-center text-white shadow-sm">
            <span className="mb-0.5">M</span>
          </div>
          maco
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-colors z-10 group ${
                isActive ? "text-blue-700" : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div
                    layoutId="active-sidebar-bg"
                    className="absolute inset-0 bg-blue-50/80 rounded-2xl -z-10"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className={`transition-transform duration-300 ${isActive ? "scale-110" : "group-hover:scale-110"}`}>
                  {item.icon}
                </div>
                <span>{item.name}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}