import { MouseEvent, useRef, useState } from 'react';

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
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (itemRef.current) {
      const rect = itemRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <a
      ref={itemRef}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl block cursor-pointer ${className}`}
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-primary/5">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-premium)] group-hover:scale-110"
        />
      </div>
      
      {/* Spotlight Effect overlay on top of image but behind text */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 mix-blend-overlay"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.4), transparent 40%)`,
        }}
      />

      <div className="absolute inset-0 z-20 flex flex-col justify-end bg-gradient-to-t from-primary/90 via-primary/40 to-transparent p-6 opacity-0 translate-y-4 transition-all duration-500 ease-[var(--ease-out-premium)] group-hover:opacity-100 group-hover:translate-y-0">
        <span className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent-light">
          {category}
        </span>
        <h3 className="text-xl font-bold text-white">{title}</h3>
      </div>
      {/* Subtle border overlay */}
      <div className="absolute inset-0 z-30 rounded-2xl border border-white/10 transition-colors duration-500 group-hover:border-accent/50 pointer-events-none" />
    </a>
  );
}
