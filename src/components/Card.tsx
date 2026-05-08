import { ReactNode, MouseEvent, useRef, useState } from 'react';

interface CardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
  children?: ReactNode;
}

export default function Card({
  icon,
  title,
  description,
  className = '',
  children,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`group relative overflow-hidden rounded-2xl border border-border bg-surface p-8 transition-all duration-500 ease-[var(--ease-out-premium)] hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/10 ${className}`}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, color-mix(in srgb, var(--color-accent), transparent 92%), transparent 40%)`,
        }}
      />
      
      {/* Premium Border Reveal */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-500 group-hover:border-accent/20 group-hover:scale-[1.02] pointer-events-none" />
      
      <div className="relative z-10">
        {icon && (
          <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/5 text-accent transition-all duration-500 ease-[var(--ease-out-premium)] group-hover:bg-accent group-hover:text-white group-hover:scale-110 group-hover:rotate-3">
            {icon}
          </div>
        )}
        <h3 className="mb-3 text-xl font-bold text-text-primary">{title}</h3>
        <p className="text-text-secondary leading-relaxed">{description}</p>
        {children}
      </div>
    </div>
  );
}
