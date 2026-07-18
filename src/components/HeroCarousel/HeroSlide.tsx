import React from 'react';
import { motion } from 'framer-motion';

interface HeroSlideProps {
  image: string;
  alt: string;
  isActive: boolean;
  reducedMotion: boolean;
}

export const HeroSlide: React.FC<HeroSlideProps> = ({
  image,
  alt,
  isActive,
  reducedMotion,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      style={{ zIndex: isActive ? 1 : 0 }}
    >
      {/* Dark gradient overlay so white text remains perfectly readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-slate-950/60 to-black/75 z-10" />

      {/* Slight zoom (Ken Burns effect) */}
      <motion.img
        src={image}
        alt={alt}
        initial={{ scale: 1.03 }}
        animate={isActive ? { scale: reducedMotion ? 1.03 : 1.08 } : { scale: 1.03 }}
        transition={{ duration: 2.2, ease: 'easeInOut' }}
        className="w-full h-full object-cover object-center transform-gpu"
        // Preload the first image, lazy-load the rest
        loading={image === '/hero1.jpg' ? 'eager' : 'lazy'}
      />
    </motion.div>
  );
};
