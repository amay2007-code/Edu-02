export interface CarouselSlideData {
  id: number;
  image: string;
  alt: string;
}

export const carouselSlides: CarouselSlideData[] = [
  { id: 1, image: '/hero1.jpg', alt: 'University of Edinburgh Historic Street and Telephony' },
  { id: 2, image: '/hero2.jpg', alt: 'University of Edinburgh New College Assembly Hall' },
  { id: 3, image: '/hero3.jpg', alt: 'University of Edinburgh Gothic Towers Close-up' },
  { id: 4, image: '/hero4.jpg', alt: 'University of Edinburgh Rainy Courtyard and Spire' },
  { id: 5, image: '/hero5.jpg', alt: 'University of Edinburgh Old College Quadrangle' },
];
