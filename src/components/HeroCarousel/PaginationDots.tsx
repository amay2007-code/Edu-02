import React from 'react';
import { motion } from 'framer-motion';

interface PaginationDotsProps {
  slidesCount: number;
  currentIndex: number;
  onDotClick: (index: number) => void;
}

export const PaginationDots: React.FC<PaginationDotsProps> = ({
  slidesCount,
  currentIndex,
  onDotClick,
}) => {
  return (
    <div 
      className="flex items-center gap-2.5 z-20"
      role="tablist"
      aria-label="Carousel pagination dots"
    >
      {Array.from({ length: slidesCount }).map((_, idx) => {
        const isActive = idx === currentIndex;
        return (
          <button
            key={idx}
            role="tab"
            aria-selected={isActive}
            aria-label={`Navigate to slide ${idx + 1}`}
            onClick={() => onDotClick(idx)}
            className="relative h-2 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 group cursor-pointer"
          >
            <motion.div
              animate={{
                width: isActive ? 24 : 8,
                backgroundColor: isActive ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.4)',
              }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="h-full rounded-full group-hover:bg-white/80 transition-colors"
            />
          </button>
        );
      })}
    </div>
  );
};
