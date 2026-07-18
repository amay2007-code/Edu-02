import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useCarousel } from './useCarousel';
import { carouselSlides } from './carouselData';
import { HeroSlide } from './HeroSlide';
import { CarouselControls } from './CarouselControls';
import { PaginationDots } from './PaginationDots';

export const HeroCarousel: React.FC = () => {
  const {
    currentIndex,
    goToNext,
    goToPrev,
    goToSlide,
    setIsHovered,
    touchHandlers,
    reducedMotion
  } = useCarousel({ slidesCount: carouselSlides.length, intervalMs: 2000 });

  // Counter stats state
  const [studentsCount, setStudentsCount] = useState(0);
  const [facultyCount, setFacultyCount] = useState(0);
  const [uptimeCount, setUptimeCount] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setStudentsCount(25000);
      setFacultyCount(4500);
      setUptimeCount(100);
      return;
    }

    const duration = 2000;
    const intervalTime = 30;
    const steps = duration / intervalTime;
    
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setStudentsCount(Math.min(Math.floor((25000 / steps) * step), 25000));
      setFacultyCount(Math.min(Math.floor((4500 / steps) * step), 4500));
      setUptimeCount(Number(Math.min((100 / steps) * step, 100).toFixed(0)));
      
      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [reducedMotion]);

  return (
    <section 
      aria-label="Campus Hero Showcase"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      {...touchHandlers}
      className="relative w-full h-[65vh] md:h-[75vh] xl:h-[90vh] overflow-hidden bg-slate-950 flex items-center justify-center select-none"
    >
      {/* Background Slides Container */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        {carouselSlides.map((slide, idx) => (
          <HeroSlide
            key={slide.id}
            image={slide.image}
            alt={slide.alt}
            isActive={idx === currentIndex}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>

      {/* FIXED CONTENT OVERLAY - CENTERED SAAS LAYOUT */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 h-full flex items-center justify-center text-center">
        <div className="flex flex-col items-center gap-6 max-w-3xl">
          
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/10 backdrop-blur-md text-blue-300 border border-white/10">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-spin-slow" />
            <span>Smart College ERP Experience Redesign</span>
          </span>

          <h1 className="text-3xl sm:text-5xl lg:text-[64px] font-black tracking-tight text-white leading-[1.08] font-sans">
            A Smarter Digital Campus Experience for the{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-sky-300 bg-clip-text text-transparent font-black">
              University of Edinburgh
            </span>
          </h1>

          <p className="text-base sm:text-lg lg:text-xl text-slate-300 leading-relaxed font-medium max-w-2xl">
            One unified platform for academics, attendance, fee management, student services, examinations, and administration.
          </p>

          {/* Buttons with ripples and hover scaling */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2 justify-center w-full sm:w-auto">
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-indigo-500/20 active:scale-[0.98] hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 pointer-events-auto"
            >
              <span>Book Live Demo</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a 
              href="#features" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white border border-white/20 font-bold rounded-2xl shadow-sm active:scale-[0.98] hover:scale-[1.02] hover:-translate-y-0.5 transition-all duration-300 pointer-events-auto"
            >
              <span>Explore ERP</span>
            </a>
          </div>

          {/* Stats row inside overlay with counter animations */}
          <div className="border-t border-white/10 pt-6 mt-6 grid grid-cols-3 gap-6 sm:gap-12 w-full max-w-lg">
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white leading-none">
                {studentsCount >= 25000 ? '25,000+' : `${studentsCount.toLocaleString()}`}
              </p>
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-2 leading-none">Students</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white leading-none">
                {facultyCount >= 4500 ? '4,500+' : `${facultyCount.toLocaleString()}`}
              </p>
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-2 leading-none">Faculty & Staff</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-black text-white leading-none">{uptimeCount}%</p>
              <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest mt-2 leading-none">Digital Campus</p>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Arrows */}
      <CarouselControls onPrev={goToPrev} onNext={goToNext} />

      {/* Pagination Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20">
        <PaginationDots
          slidesCount={carouselSlides.length}
          currentIndex={currentIndex}
          onDotClick={goToSlide}
        />
      </div>
    </section>
  );
};
