import { motion } from "framer-motion";
import { PlayCircle, Play } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ActiveCourseCard({ course, onNavigate }: any) {
  return (
    <Card className="h-full rounded-3xl border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none" />
      <CardContent className="p-6 md:p-8 relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="flex items-center gap-2 text-[#0B56D5] font-bold text-sm mb-3">
            <PlayCircle className="w-4 h-4" /> ĐANG HỌC
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 leading-tight mb-2 group-hover:text-[#0B56D5] transition-colors line-clamp-2">
            {course.title}
          </h2>
          <p className="text-slate-500 text-sm font-medium mb-6">
            Bài học hiện tại: <span className="text-slate-700">{course.currentLesson}</span>
          </p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <div className="flex justify-between text-xs md:text-sm font-bold">
              <span className="text-slate-700">{course.progress}% hoàn thành</span>
              <span className="text-slate-400">Còn {course.timeLeft}</span>
            </div>
            <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-[#0B56D5] to-blue-400 rounded-full relative"
              >
                <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" />
              </motion.div>
            </div>
          </div>
          <Button 
            size="lg"
            onClick={onNavigate} 
            className="w-full sm:w-auto bg-[#0B56D5] hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-600/30 gap-2"
          >
            <Play className="w-4 h-4 fill-current" /> Tiếp tục học
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}