import { InputHTMLAttributes, TextareaHTMLAttributes, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, className = '', ...props }: InputProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-text-primary"
      >
        {label}
      </label>
      <input
        id={id}
        className={`w-full rounded-lg border px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent ${
          error ? 'border-red-400' : 'border-border'
        } bg-surface`}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export function Textarea({ label, error, id, className = '', ...props }: TextareaProps) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="mb-2 block text-sm font-medium text-text-primary"
      >
        {label}
      </label>
      <textarea
        id={id}
        className={`w-full rounded-lg border px-4 py-3 text-sm text-text-primary placeholder:text-text-muted transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent resize-none ${
          error ? 'border-red-400' : 'border-border'
        } bg-surface`}
        {...props}
      />
      {error && (
        <p className="mt-1.5 text-xs text-red-500">{error}</p>
      )}
    </div>
  );
}

interface SelectProps {
  label: string;
  error?: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
  className?: string;
}

export function Select({
  label,
  error,
  id,
  name,
  value,
  onChange,
  options,
  placeholder = 'Select an option',
  className = '',
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      <label htmlFor={id} className="mb-2 block text-sm font-medium text-text-primary">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          id={id}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full rounded-lg border px-4 py-3 text-left text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent bg-surface flex items-center justify-between ${
            error ? 'border-red-400' : 'border-border'
          } ${isOpen ? 'ring-2 ring-accent/50 border-accent' : ''}`}
        >
          <span className={value ? 'text-text-primary' : 'text-text-muted'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            className={`h-4 w-4 text-text-muted transition-colors duration-300 ${isOpen ? 'text-accent' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-surface shadow-2xl backdrop-blur-xl"
            >
              <div className="max-h-60 overflow-y-auto p-1.5 custom-scrollbar">
                {options.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange({ target: { name, value: option.value } });
                      setIsOpen(false);
                    }}
                    className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-200 flex items-center justify-between group ${
                      value === option.value
                        ? 'bg-accent text-white shadow-lg shadow-accent/25'
                        : 'text-text-primary hover:bg-accent/10 hover:text-accent'
                    }`}
                  >
                    <span>{option.label}</span>
                    {value === option.value && (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </motion.svg>
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {error && <p className="mt-1.5 text-xs text-red-500">{error}</p>}
    </div>
  );
}
