interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  light?: boolean;
}

export default function SectionHeading({
  label,
  title,
  description,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`mb-16 max-w-2xl ${alignClass}`}>
      {label && (
        <span
          className={`mb-3 inline-block rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${
            light
              ? 'bg-white/10 text-accent-light'
              : 'bg-accent/10 text-accent'
          }`}
        >
          {label}
        </span>
      )}
      <h2
        className={`text-3xl font-bold sm:text-4xl lg:text-[2.75rem] leading-tight ${
          light ? 'text-white' : 'text-text-primary'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? 'text-white/70' : 'text-text-secondary'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
