import { Flame, Clock, CheckCircle2, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function StreakCard({ days }: { days: number }) {
  return (
    <Card className="h-full bg-gradient-to-br from-orange-50 to-amber-50 rounded-3xl border-orange-100 shadow-sm flex flex-col justify-center items-center text-center p-6">
      <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-4">
        <Flame className="w-7 h-7 md:w-8 md:h-8 text-orange-500 fill-orange-500" />
      </div>
      <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-1">{days} Ngày</h3>
      <p className="text-slate-500 font-medium text-xs md:text-sm">Chuỗi học liên tiếp</p>
      <Badge className="mt-4 bg-orange-500/10 text-orange-600 hover:bg-orange-500/20 border-none font-bold">
        Top 5% 🔥
      </Badge>
    </Card>
  );
}

export function QuickStatsCard() {
  return (
    <Card className="h-full bg-white rounded-3xl border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-slate-800">Thống kê</h3>
        <TrendingUp className="w-4 h-4 text-slate-400" />
      </div>
      <div className="space-y-5">
        <StatItem icon={<Clock className="w-5 h-5" />} value="48h" label="Thời gian học" color="bg-blue-50 text-blue-600" />
        <StatItem icon={<CheckCircle2 className="w-5 h-5" />} value="24" label="Bài đã xong" color="bg-emerald-50 text-emerald-600" />
      </div>
    </Card>
  );
}

function StatItem({ icon, value, label, color }: any) {
  return (
    <div className="flex items-center gap-4">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
      <div>
        <p className="text-xl font-black text-slate-800 leading-none">{value}</p>
        <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-wider">{label}</p>
      </div>
    </div>
  );
}