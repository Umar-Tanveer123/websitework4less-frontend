import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

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
