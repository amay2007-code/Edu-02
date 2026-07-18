import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { useCarousel } from './useCarousel';
import { carouselSlides } from './carouselData';
import { HeroSlide } from './HeroSlide';
import { CarouselControls } from './CarouselControls';
import { PaginationDots } from './PaginationDots';

export const HeroCarousel: React.FC<{ onNavigate: (route: string) => void }> = ({ onNavigate }) => {
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
      className="relative z-[1] w-full h-[70vh] md:h-[80vh] xl:h-[95vh] overflow-hidden bg-[#0F3235] flex items-center justify-center select-none"
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
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 h-full flex items-center justify-center text-center pt-20">
        <div className="flex flex-col items-center gap-5 max-w-3xl">
          
          {/* Dominant Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-[76px] font-black tracking-tight text-white leading-none font-sans uppercase">
            University of Edinburgh
          </h1>

          {/* Premium Subtitle */}
          <h2 className="text-[#C9A24B] font-extrabold uppercase tracking-widest text-xs sm:text-sm lg:text-base leading-none">
            Smart Digital Campus
          </h2>

          {/* Description - constrained to 2 lines on large screens */}
          <p className="hidden md:block text-slate-200 leading-relaxed font-medium max-w-[700px] text-center text-[15px] xl:text-base">
            Unifying academics, attendance, finance, student services, examinations and administration into one intelligent digital campus platform designed for the University of Edinburgh.
          </p>
          <p className="block md:hidden text-xs text-slate-200 leading-relaxed font-medium max-w-xs text-center">
            Unifying academics, attendance, finance, student services, examinations and administration into one intelligent digital campus platform designed for the University of Edinburgh.
          </p>

          {/* Buttons: Gold primary / outlined teal secondary */}
          <div className="flex flex-col sm:flex-row gap-4 mt-4 justify-center w-full sm:w-auto">
            <a 
              href="#features" 
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#C9A24B] hover:bg-[#DEC17E] text-[#0F3235] font-bold rounded-2xl shadow-lg shadow-black/10 hover:scale-[1.03] active:scale-95 transition-all duration-300 pointer-events-auto"
            >
              <span>Explore the Platform</span>
              <ArrowRight className="w-4 h-4 text-[#0F3235]" />
            </a>
            <button 
              onClick={() => onNavigate('/login')}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-transparent hover:bg-[#1F5359]/20 text-white border border-[#3A7A80] font-bold rounded-2xl hover:scale-[1.03] active:scale-95 transition-all duration-300 pointer-events-auto cursor-pointer"
            >
              <span>Book Demo</span>
            </button>
          </div>

          {/* Stats row inside overlay with counter animations */}
          <div className="border-t border-white/10 pt-5 mt-6 grid grid-cols-3 gap-6 sm:gap-12 w-full max-w-lg">
            <div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-none">
                {studentsCount >= 25000 ? '25,000+' : `${studentsCount.toLocaleString()}`}
              </p>
              <p className="text-[10px] font-extrabold text-[#DEC17E] uppercase tracking-widest mt-2 leading-none">Students</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-none">
                {facultyCount >= 4500 ? '4,500+' : `${facultyCount.toLocaleString()}`}
              </p>
              <p className="text-[10px] font-extrabold text-[#DEC17E] uppercase tracking-widest mt-2 leading-none">Faculty & Staff</p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl lg:text-3xl font-black text-white leading-none">{uptimeCount}%</p>
              <p className="text-[10px] font-extrabold text-[#DEC17E] uppercase tracking-widest mt-2 leading-none">Digital Campus</p>
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
