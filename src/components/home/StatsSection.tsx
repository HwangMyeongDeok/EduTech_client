import { StatCard } from "./StatCard";

export function StatsSection() {
  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="container px-4 mx-auto lg:px-24 xl:px-44">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-slate-100">
          <StatCard value={12000} suffix="+" label="Học viên tin dùng" delay={0} />
          <StatCard value={98} suffix="%" label="Tỷ lệ hài lòng" delay={100} />
          <StatCard value={500} suffix="+" label="Khóa học chất lượng" delay={200} />
          <StatCard value={24} suffix="/7" label="Hỗ trợ AI mọi lúc" delay={300} />
        </div>
      </div>
    </section>
  );
}