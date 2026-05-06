import React from "react";

interface SectionHeaderProps {
  icon: React.ReactNode;
  title: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ icon, title }) => (
  <div className="flex items-center gap-3 mb-7">
    <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
      {icon}
    </div>
    <h2 className="text-xl font-bold text-foreground">{title}</h2>
  </div>
);