import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { testimonials } from '../data/testimonials';

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextTestimonial = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextTestimonial, 8000);
    return () => clearInterval(timer);
  }, [nextTestimonial]);

  // We show 3 cards in the stack
  const visibleCards = [0, 1, 2].map(offset => (currentIndex + offset) % testimonials.length);

  return (
    <div className="relative w-full py-20 px-4">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[400px] bg-accent/5 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Ambient Background Aura */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-accent/5 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse-slow" />

        <div className="relative h-[600px] w-full flex flex-col items-center">
          <div className="relative w-full flex justify-center">
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleCards.reverse().map((index, i) => {
                const testimonial = testimonials[index];
                const stackIndex = 2 - i; // 0 is front, 1 is middle, 2 is back
                const isActive = stackIndex === 0;

                // Subtle alternating rotation for a "piled" look
                const rotation = stackIndex === 0 ? 0 : stackIndex === 1 ? -1.2 : 1.2;
                const yOffset = stackIndex * 22;

                return (
                  <motion.div
                    key={testimonial.author}
                    initial={{ 
                      opacity: 0, 
                      scale: 0.9, 
                      y: 60,
                      rotate: 0
                    }}
                    animate={{ 
                      opacity: 1 - stackIndex * 0.15, 
                      scale: 1 - stackIndex * 0.04, 
                      y: [yOffset, yOffset - 4, yOffset],
                      zIndex: 10 - stackIndex,
                      rotate: [rotation, rotation + 0.3, rotation],
                      filter: `blur(${stackIndex * 0.6}px)`,
                    }}
                    transition={{ 
                      y: {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      rotate: {
                        duration: 7,
                        repeat: Infinity,
                        ease: "easeInOut"
                      },
                      type: "spring", 
                      stiffness: 220, 
                      damping: 20,
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 1.02,
                      y: -400, // Peeling away upwards
                      rotate: direction > 0 ? -15 : 15,
                      transition: { 
                        duration: 0.8, 
                        ease: [0.34, 1.56, 0.64, 1] 
                      }
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 220, 
                      damping: 20,
                    }}
                    className="absolute w-full max-w-[320px] md:max-w-[560px] top-0 h-[500px] md:h-[550px]"
                  >
                    <div className={`h-full w-full rounded-[3rem] p-12 md:p-16 flex flex-col relative overflow-hidden border transition-all duration-700 ${
                      isActive 
                        ? 'bg-surface border-border shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] scale-[1.02]' 
                        : 'bg-surface-alt border-border/40 shadow-xl'
                    }`}>
                      {/* Subtitle / Category */}
                      <div className="mb-12 flex justify-between items-center relative">
                        <div className="flex items-center gap-4">
                          <div className="h-[1px] w-8 bg-accent/40" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent">
                            Success Story
                          </span>
                        </div>
                        <div className="flex gap-1.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-accent text-accent" />
                          ))}
                        </div>
                      </div>

                      {/* Quote Content */}
                      <div className="flex-1 overflow-y-auto custom-scrollbar pr-4 mb-10">
                        <p className="text-xl md:text-2xl leading-relaxed font-light text-text-primary tracking-tight italic">
                          "{testimonial.quote}"
                        </p>
                      </div>

                      <div className="mt-auto pt-8 border-t border-border/30 flex items-center gap-5">
                        <div className="h-16 w-16 rounded-full bg-surface-muted flex items-center justify-center text-accent font-medium text-2xl border border-border/50 shadow-sm transition-transform duration-500 hover:scale-105">
                          {testimonial.author[0]}
                        </div>
                        <div className="flex flex-col">
                          <h4 className="text-xl font-semibold text-text-primary tracking-tight">
                            {testimonial.author}
                          </h4>
                          <p className="text-sm text-text-muted mt-0.5">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex justify-center items-center gap-14 mt-[500px] md:mt-[580px]">
            <button
              onClick={prevTestimonial}
              className="group relative p-5 rounded-full border border-border bg-surface-alt hover:bg-accent text-text-primary hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-7 h-7" />
              <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            
            <div className="flex gap-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > currentIndex ? 1 : -1);
                    setCurrentIndex(i);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-500 ${
                    i === currentIndex ? 'w-12 bg-accent shadow-[0_0_15px_rgba(59,130,246,0.5)]' : 'w-2.5 bg-text-muted/20 hover:bg-text-muted/40'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextTestimonial}
              className="group relative p-5 rounded-full border border-border bg-surface-alt hover:bg-accent text-text-primary hover:text-white transition-all duration-300 hover:scale-110 active:scale-95 shadow-2xl"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-7 h-7" />
              <div className="absolute inset-0 rounded-full bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
