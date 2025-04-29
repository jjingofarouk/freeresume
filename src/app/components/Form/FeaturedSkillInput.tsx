import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INPUT_CLASS_NAME = "w-full px-4 py-3 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 outline-none placeholder-gray-400";

export const FeaturedSkillInput = ({
  skill,
  rating,
  setSkillRating,
  placeholder,
  className = "",
  circleColor = "#3b82f6",
}: {
  skill: string;
  rating: number;
  setSkillRating: (skill: string, rating: number) => void;
  placeholder: string;
  className?: string;
  circleColor?: string;
}) => {
  return (
    <motion.div 
      className={`flex items-center gap-3 p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="text"
        value={skill}
        placeholder={placeholder}
        onChange={(e) => setSkillRating(e.target.value, rating)}
        className={`${INPUT_CLASS_NAME} text-gray-800`}
      />
      <CircleRating
        rating={rating}
        setRating={(newRating) => setSkillRating(skill, newRating)}
        circleColor={circleColor}
      />
    </motion.div>
  );
};

const CircleRating = ({
  rating,
  setRating,
  circleColor = "#3b82f6",
}: {
  rating: number;
  setRating: (rating: number) => void;
  circleColor?: string;
}) => {
  const numCircles = 5;
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  return (
    <div className="flex items-center gap-1.5 p-2">
      {[...Array(numCircles)].map((_, idx) => (
        <motion.div
          key={idx}
          className="cursor-pointer p-0.5"
          onClick={() => setRating(idx + 1)}
          onMouseEnter={() => setHoverRating(idx + 1)}
          onMouseLeave={() => setHoverRating(null)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
        >
          <motion.div
            className="h-5 w-5 rounded-full shadow-sm"
            style={{
              backgroundColor:
                (hoverRating !== null && hoverRating >= idx + 1) ||
                (hoverRating === null && rating >= idx + 1)
                  ? circleColor
                  : "#e5e7eb",
            }}
            animate={{
              scale: (hoverRating !== null && hoverRating >= idx + 1) ||
                     (hoverRating === null && rating >= idx + 1) ? 1.1 : 1,
            }}
            transition={{ duration: 0.2 }}
          />
        </motion.div>
      ))}
    </div>
  );
};