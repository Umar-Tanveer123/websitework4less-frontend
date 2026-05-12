import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MouseEvent, useRef } from 'react';
import { ExternalLinkIcon } from './Icons';

interface PortfolioGridItemProps {
  title: string;
  category: string;
  imageUrl: string;
  url: string;
  className?: string;
}

export default function PortfolioGridItem({
  title,
  category,
  imageUrl,
  url,
  className = '',
}: PortfolioGridItemProps) {
  const itemRef = useRef<HTMLAnchorElement>(null);
  
  // Motion values for tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (!itemRef.current) return;
    const rect = itemRef.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={itemRef}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      className={`group relative perspective-1000 overflow-hidden rounded-3xl block cursor-pointer bg-surface-alt ${className}`}
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="aspect-[4/3] w-full overflow-hidden"
      >
        <motion.img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      <motion.div
        style={{
          background: useTransform(
            [mouseXSpring, mouseYSpring],
            ([x, y]) => `radial-gradient(600px circle at ${Number(x) * 100 + 50}% ${Number(y) * 100 + 50}%, rgba(255,255,255,0.15), transparent 40%)`
          ),
          transform: "translateZ(80px)"
        }}
        className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      <div 
        style={{ transform: "translateZ(100px)" }}
        className="absolute inset-x-4 bottom-4 z-20 p-6 rounded-2xl bg-surface/40 backdrop-blur-xl border border-white/10 shadow-2xl opacity-0 translate-y-4 transition-all duration-500 ease-[var(--ease-out-premium)] group-hover:opacity-100 group-hover:translate-y-0"
      >
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-accent">
              {category}
            </span>
            <h3 className="text-xl font-bold text-text-primary">{title}</h3>
          </div>
          <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
            <ExternalLinkIcon className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-30 rounded-3xl border border-white/5 transition-colors duration-500 group-hover:border-accent/30 pointer-events-none" />
    </motion.a>
  );
}
