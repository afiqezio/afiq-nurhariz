import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ReactBitsButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'default' | 'outline' | 'ghost' | 'gradient';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ReactBitsButton = ({
  children,
  variant = 'default',
  size = 'md',
  className = '',
  ...props
}: ReactBitsButtonProps) => {
  const baseStyles = 'relative inline-flex items-center justify-center font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variants = {
    default: 'bg-slate-800 text-white hover:bg-slate-700 shadow-lg hover:shadow-xl focus:ring-slate-500 backdrop-blur-sm',
    outline: 'border-2 border-white/20 bg-white/5 backdrop-blur-xl text-slate-200 hover:border-white/30 hover:bg-white/10 shadow-lg hover:shadow-xl focus:ring-slate-400',
    ghost: 'bg-transparent text-slate-300 hover:bg-white/10 backdrop-blur-sm focus:ring-slate-400',
    gradient: 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:shadow-2xl hover:scale-105 focus:ring-purple-400 relative overflow-hidden',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-xl',
  };

  return (
    <button
      className={cn(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {variant === 'gradient' && (
        <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default ReactBitsButton;

