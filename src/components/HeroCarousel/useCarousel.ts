import { useState, useEffect, useRef, useCallback } from 'react';

interface UseCarouselProps {
  slidesCount: number;
  intervalMs?: number;
}

export const useCarousel = ({ slidesCount, intervalMs = 2000 }: UseCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Check prefers-reduced-motion
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slidesCount);
  }, [slidesCount]);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slidesCount) % slidesCount);
  }, [slidesCount]);

  // Autoplay effect
  useEffect(() => {
    if (reducedMotion || isHovered) return;

    const timer = setInterval(() => {
      goToNext();
    }, intervalMs);

    return () => clearInterval(timer);
  }, [goToNext, intervalMs, isHovered, reducedMotion]);

  // Swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    // Minimum swipe distance of 50px
    if (diff > 50) {
      goToNext();
    } else if (diff < -50) {
      goToPrev();
    }
    touchStartX.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNext, goToPrev]);

  return {
    currentIndex,
    goToNext,
    goToPrev,
    goToSlide,
    setIsHovered,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchEnd: handleTouchEnd,
    },
    reducedMotion
  };
};
