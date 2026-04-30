import { ReactNode, ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

interface ButtonBaseProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children?: ReactNode;
  className?: string;
}

interface ButtonAsButtonProps
  extends ButtonBaseProps,
    ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button';
  to?: never;
}

interface ButtonAsLinkProps extends ButtonBaseProps {
  as: 'link';
  to: string;
  onClick?: () => void;
}

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const baseClasses =
    'group inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-500 ease-[var(--ease-out-premium)] cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 active:scale-[0.98]';

  const variantClasses: Record<string, string> = {
    primary:
      'bg-accent text-white hover:bg-accent-hover shadow-md hover:shadow-lg hover:shadow-accent/25 hover:-translate-y-0.5 hover:scale-[1.02]',
    secondary:
      'bg-primary text-white hover:bg-primary-light shadow-md hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5 hover:scale-[1.02]',
    outline:
      'border-2 border-accent text-accent hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5 hover:scale-[1.02]',
    ghost:
      'text-text-secondary hover:text-accent hover:bg-surface-muted hover:scale-[1.02]',
  };

  const sizeClasses: Record<string, string> = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
  };

  const allClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  if (props.as === 'link') {
    const { as: _, to, onClick, ...rest } = props;
    return (
      <Link to={to} className={allClasses} onClick={onClick} {...(rest as Record<string, unknown>)}>
        {children}
      </Link>
    );
  }

  const { as: _, ...buttonProps } = props as ButtonAsButtonProps;
  return (
    <button className={allClasses} {...buttonProps}>
      {children}
    </button>
  );
}
