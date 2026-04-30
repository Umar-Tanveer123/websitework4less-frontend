import type { ReactNode } from 'react';
import { useScrollReveal } from '../hooks/useAnimations';

interface SectionWrapperProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'white' | 'light' | 'dark' | 'primary';
  animate?: boolean;
}

export default function SectionWrapper({
  children,
  className = '',
  id,
  background = 'white',
  animate = true,
}: SectionWrapperProps) {
  const [elementRef, isVisible] = useScrollReveal(0.1);

  const bgClasses: Record<string, string> = {
    white: 'bg-surface',
    light: 'bg-surface-alt',
    dark: 'bg-primary text-text-inverse',
    primary: 'bg-primary-light text-text-inverse',
  };

  return (
    <section
      id={id}
      ref={animate ? elementRef : null}
      className={`py-20 md:py-28 transition-all duration-1000 ease-[var(--ease-out-premium)] ${
        bgClasses[background]
      } ${className} ${
        animate
          ? isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-12'
          : ''
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
