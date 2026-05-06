import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 6000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  const getCardIndex = (offset: number) => {
    return (currentIndex + offset + testimonials.length) % testimonials.length;
  };

  const cardOffset = windowWidth < 640 ? 0 : windowWidth < 1024 ? 260 : 380;
  const visibleIndices = windowWidth < 640 ? [0] : [-1, 0, 1];

  return (
    <div className="relative w-full py-12 px-4">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] bg-accent/10 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="relative h-[480px] md:h-[520px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            {visibleIndices.map((offset) => {
              const index = getCardIndex(offset);
              const testimonial = testimonials[index];
              const isActive = offset === 0;

              return (
                <motion.div
                  key={`${index}-${offset}`}
                  custom={direction}
                  initial={{ 
                    opacity: 0, 
                    scale: 0.8, 
                    x: offset * cardOffset,
                    filter: 'blur(10px)'
                  }}
                  animate={{ 
                    opacity: isActive ? 1 : 0.3, 
                    scale: isActive ? 1 : 0.8, 
                    x: offset * cardOffset,
                    zIndex: isActive ? 10 : 0,
                    filter: isActive ? 'blur(0px)' : 'blur(6px)',
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.7,
                    x: (offset - direction) * cardOffset,
                    filter: 'blur(10px)'
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 260, 
                    damping: 25,
                  }}
                  className="absolute w-full max-w-[320px] md:max-w-[420px] lg:max-w-[460px] h-full"
                >
                  <div className={`h-full w-full rounded-[2.5rem] p-8 md:p-10 flex flex-col relative overflow-hidden border transition-all duration-700 ${
                    isActive 
                      ? 'bg-white/10 backdrop-blur-2xl border-white/20 shadow-[0_20px_50px_rgba(59,130,246,0.15)]' 
                      : 'bg-white/5 backdrop-blur-md border-white/10'
                  }`}>
                    {/* Card Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-accent/5 pointer-events-none" />
                    
                    {/* Icon */}
                    <div className="mb-6 flex justify-between items-start">
                      <div className="p-3 rounded-2xl bg-accent/20 border border-accent/20">
                        <Quote className="w-6 h-6 text-accent-light" />
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400/90 text-yellow-400/90" />
                        ))}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-hidden">
                      <p className={`text-lg md:text-xl leading-relaxed font-medium mb-6 italic ${
                        isActive ? 'text-white' : 'text-white/40'
                      }`}>
                        "{testimonial.quote}"
                      </p>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto pt-6 border-t border-white/10">
                      <h4 className={`text-xl font-bold mb-1 ${isActive ? 'text-white' : 'text-white/60'}`}>
                        {testimonial.author}
                      </h4>
                      <p className={`text-xs font-bold uppercase tracking-[0.2em] ${isActive ? 'text-accent-light' : 'text-accent/40'}`}>
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Controls */}
        <div className="flex justify-center items-center gap-8 mt-12">
          <button
            onClick={prevTestimonial}
            className="p-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all hover:scale-110 active:scale-95"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === currentIndex ? 'w-8 bg-accent' : 'w-2 bg-white/20'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          <button
            onClick={nextTestimonial}
            className="p-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white transition-all hover:scale-110 active:scale-95"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}
