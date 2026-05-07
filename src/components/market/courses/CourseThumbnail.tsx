import React from "react";

const thumbnailMap: Record<string, React.ReactNode> = {
  python: (
    <div className="w-full h-full bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 flex items-center justify-center">
      <span className="text-5xl">🐍</span>
    </div>
  ),
  uiux: (
    <div className="w-full h-full bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 flex items-center justify-center">
      <span className="text-4xl font-bold text-white tracking-widest">UI UX</span>
    </div>
  ),
  llm: (
    <div className="w-full h-full bg-gradient-to-br from-violet-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-center">
        <div className="text-xs text-purple-300 font-mono mb-1">LARGE</div>
        <div className="text-xs text-purple-300 font-mono">LANGUAGE MODEL</div>
      </div>
    </div>
  ),
  nextjs: (
    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-gray-900 to-zinc-900 flex items-center justify-center">
      <span className="text-white font-bold text-2xl">Next.js</span>
    </div>
  ),
  postgresql: (
    <div className="w-full h-full bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900 flex items-center justify-center">
      <span className="text-4xl">🐘</span>
    </div>
  ),
  docker: (
    <div className="w-full h-full bg-gradient-to-br from-cyan-900 via-teal-900 to-emerald-900 flex items-center justify-center">
      <span className="text-4xl">🐳</span>
    </div>
  ),
  golang: (
    <div className="w-full h-full bg-gradient-to-br from-sky-900 via-blue-900 to-indigo-950 flex items-center justify-center">
      <span className="text-white font-bold text-3xl">Go</span>
    </div>
  ),
  hacking: (
    <div className="w-full h-full bg-gradient-to-br from-yellow-900 via-amber-900 to-orange-950 flex items-center justify-center">
      <span className="text-3xl font-bold text-yellow-400">Ethical Hacking</span>
    </div>
  ),
  spring: (
    <div className="w-full h-full bg-gradient-to-br from-green-900 via-emerald-900 to-teal-950 flex items-center justify-center">
      <span className="text-4xl">🍃</span>
    </div>
  ),
  flutter: (
    <div className="w-full h-full bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 flex items-center justify-center">
      <span className="text-4xl">📱</span>
    </div>
  ),
  dsa: (
    <div className="w-full h-full bg-gradient-to-br from-rose-900 via-pink-900 to-purple-950 flex items-center justify-center">
      <div className="text-center">
        <div className="text-white font-bold text-lg">Structure &</div>
        <div className="text-white font-bold text-lg">Algorithms</div>
      </div>
    </div>
  ),
  aws: (
    <div className="w-full h-full bg-gradient-to-br from-orange-900 via-amber-900 to-yellow-950 flex items-center justify-center">
      <span className="text-3xl font-bold text-orange-300">AWS ☁️</span>
    </div>
  ),
};

interface CourseThumbnailProps {
  thumbnail: string;
  className?: string;
}

export const CourseThumbnail: React.FC<CourseThumbnailProps> = ({ thumbnail, className = "" }) => {
  return (
    <div className={`overflow-hidden rounded-xl ${className}`}>
      {thumbnailMap[thumbnail] ?? (
        <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
          <span className="text-white text-2xl">📚</span>
        </div>
      )}
    </div>
  );
};