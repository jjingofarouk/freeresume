import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const INPUT_CLASS_NAME = "w-full px-4 py-3 text-sm bg-[var(--theme-black)] border border-[var(--theme-gray)] rounded-lg focus:ring-2 focus:ring-[var(--theme-gold)] focus:border-[var(--theme-gold)] transition-all duration-300 outline-none placeholder-[var(--theme-gray)]";

export const FeaturedSkillInput = ({
  skill,
  rating,
  setSkillRating,
  placeholder,
  className = "",
  circleColor = "#946B2D",
}) => {
  return (
    <motion.div 
      className={`flex items-center gap-3 p-2 bg-[var(--theme-dark-blue)] rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 ${className}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <input
        type="text"
        value={skill}
        placeholder={placeholder}
        onChange={(e) => setSkillRating(e.target.value, rating)}
        className={`${INPUT_CLASS_NAME} text-[var(--theme-gray)]`}
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
  circleColor = "#946B2D",
}) => {
  const numCircles = 5;
  const [hoverRating, setHoverRating] = useState(null);

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
                  : "#222F5B",
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