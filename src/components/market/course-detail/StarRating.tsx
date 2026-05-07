import React from "react";
import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  size?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = "w-4 h-4",
}) => {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`${size} ${
            s <= Math.round(rating)
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-200 text-slate-200"
          }`}
        />
      ))}
    </div>
  );
};