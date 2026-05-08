import { motion } from "framer-motion";
import { Star, PlayCircle, BookMarked } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export function RecommendedCourseCard({ course }: any) {
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={() => navigate(`/student/course-detail/${course.id}`)}
    >
      <Card className="rounded-3xl p-3 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(11,86,213,0.1)] transition-all cursor-pointer group flex flex-col h-full">
        
        {/* Thumbnail Area */}
        <div className={`w-full h-40 md:h-44 ${course.bg} rounded-2xl relative overflow-hidden flex items-center justify-center mb-4`}>
          <div className="absolute top-3 left-3 bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg flex items-center gap-1">
             {course.category}
          </div>
          
          <span className="text-5xl md:text-6xl drop-shadow-xl group-hover:scale-110 transition-transform duration-500">
            {course.icon}
          </span>

          {/* Overlay Play Button on Hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
            <PlayCircle className="w-12 h-12 text-white/90" />
          </div>
        </div>

        {/* Content Area */}
        <CardContent className="p-2 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 text-amber-500 mb-2">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-xs font-bold text-slate-700">{course.rating}</span>
            </div>
            
            <h3 className="text-base font-bold text-slate-800 leading-snug mb-4 group-hover:text-[#0B56D5] transition-colors line-clamp-2">
              {course.title}
            </h3>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-sm font-black text-[#0B56D5]">{course.price}</span>
            
            <button 
              onClick={(e) => {
                e.stopPropagation(); // Không nhảy trang khi bấm bookmark
                console.log("Bookmarked:", course.id);
              }} 
              className="w-9 h-9 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-[#0B56D5] transition-colors active:scale-90"
            >
              <BookMarked className="w-4 h-4" />
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}