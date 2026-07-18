import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselControlsProps {
  onPrev: () => void;
  onNext: () => void;
}

export const CarouselControls: React.FC<CarouselControlsProps> = ({ onPrev, onNext }) => {
  return (
    <>
      <button
        onClick={onPrev}
        aria-label="Previous slide"
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-white group cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      
      <button
        onClick={onNext}
        aria-label="Next slide"
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-colors shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-white group cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </>
  );
};
