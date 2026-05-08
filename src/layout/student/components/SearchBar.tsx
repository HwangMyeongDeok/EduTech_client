import { Search, Command } from "lucide-react";

export function SearchBar() {
  return (
    <div className="relative max-w-md w-full hidden sm:block group">
      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#0B56D5] transition-colors" />
      <input 
        type="text" 
        placeholder="Tìm khóa học, kỹ năng..." 
        className="w-full pl-11 pr-12 py-2.5 bg-slate-100/50 hover:bg-slate-100 focus:bg-white border border-transparent focus:border-[#0B56D5]/20 rounded-2xl text-sm transition-all outline-none text-slate-700 ring-0 focus:ring-4 focus:ring-[#0B56D5]/5"
      />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 px-1.5 py-1 bg-white border border-slate-200 rounded-md text-[10px] font-bold text-slate-400">
        <Command className="w-2.5 h-2.5" /> K
      </div>
    </div>
  );
}