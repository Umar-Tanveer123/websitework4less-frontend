import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Project {
  title: string;
  category: string;
  imageUrl: string;
  url: string;
}

interface ProjectCarouselProps {
  projects: Project[];
}

export default function ProjectCarousel({ projects }: ProjectCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextProject = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, [projects.length]);

  const prevProject = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, [projects.length]);

  useEffect(() => {
    const timer = setInterval(nextProject, 8000);
    return () => clearInterval(timer);
  }, [nextProject]);

  const getPosition = (index: number) => {
    const diff = (index - currentIndex + projects.length) % projects.length;
    
    if (diff === 0) return 'active';
    if (diff === 1 || (diff === -(projects.length - 1))) return 'next';
    if (diff === projects.length - 1 || diff === -1) return 'prev';
    return 'hidden';
  };

  return (
    <div className="relative w-full py-20 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative h-[450px] md:h-[650px] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            {projects.map((project, index) => {
              const pos = getPosition(index);
              if (pos === 'hidden') return null;

              const variants: Variants = {
                active: {
                  x: 0,
                  scale: 1.1,
                  zIndex: 20,
                  opacity: 1,
                  filter: 'blur(0px)',
                  y: [0, -10, 0],
                  transition: {
                    y: {
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    },
                    default: { duration: 0.8 }
                  }
                },
                prev: {
                  x: -300,
                  scale: 0.8,
                  zIndex: 10,
                  opacity: 0.2,
                  filter: 'blur(10px)',
                  y: 0,
                },
                next: {
                  x: 300,
                  scale: 0.8,
                  zIndex: 10,
                  opacity: 0.2,
                  filter: 'blur(10px)',
                  y: 0,
                },
                exit: (custom: number) => ({
                  x: custom > 0 ? -600 : 600,
                  opacity: 0,
                  scale: 0.4,
                  zIndex: 0,
                })
              };

              return (
                <motion.div
                  key={project.title}
                  custom={direction}
                  initial="exit"
                  animate={pos}
                  exit="exit"
                  variants={variants}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 30,
                  }}
                  className="absolute w-full max-w-[320px] md:max-w-[850px] aspect-[16/9] cursor-pointer group"
                  onClick={() => {
                    if (pos === 'next') nextProject();
                    if (pos === 'prev') prevProject();
                  }}
                >
                  <div className="relative h-full w-full rounded-[2.5rem] overflow-hidden border border-white/20 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.4)] transition-all duration-700 group-hover:border-accent/60 group-hover:shadow-[0_0_50px_rgba(59,130,246,0.3)] bg-black">
                    {/* Active Glow */}
                    {pos === 'active' && (
                      <div className="absolute inset-0 bg-accent/20 blur-[80px] -z-10 animate-pulse" />
                    )}
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                      <span className="text-accent-light font-semibold uppercase tracking-widest text-xs mb-3">
                        {project.category}
                      </span>
                      <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 leading-tight">
                        {project.title}
                      </h3>
                      
                      {pos === 'active' && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Link
                            to={project.url}
                            className="inline-flex items-center gap-3 bg-white text-black px-6 py-3 rounded-full font-bold transition-all hover:bg-accent hover:text-white"
                          >
                            View Project
                            <ArrowRight className="w-5 h-5" />
                          </Link>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center items-center gap-3 mt-12">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentIndex ? 'w-10 bg-accent' : 'w-2 bg-text-muted/30 hover:bg-text-muted/50'
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between px-4 md:px-12 pointer-events-none">
          <button
            onClick={prevProject}
            className="p-4 rounded-full bg-surface/80 border border-border text-text-primary backdrop-blur-md shadow-xl transition-all hover:scale-110 active:scale-95 pointer-events-auto hover:bg-accent hover:text-white"
            aria-label="Previous project"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button
            onClick={nextProject}
            className="p-4 rounded-full bg-surface/80 border border-border text-text-primary backdrop-blur-md shadow-xl transition-all hover:scale-110 active:scale-95 pointer-events-auto hover:bg-accent hover:text-white"
            aria-label="Next project"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}
