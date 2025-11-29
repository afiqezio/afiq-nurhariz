import { ReactNode, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { ThemeColors } from '@/lib/theme';

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
    default: 'text-white shadow-lg hover:shadow-xl focus:ring-slate-500 backdrop-blur-sm',
    outline: 'border-2 backdrop-blur-xl text-slate-200 shadow-lg hover:shadow-xl focus:ring-slate-400',
    ghost: 'bg-transparent text-slate-300 hover:bg-white/10 backdrop-blur-sm focus:ring-slate-400',
    gradient: 'text-white hover:shadow-2xl hover:scale-105 focus:ring-purple-400 relative overflow-hidden',
  };

  const variantStyles = {
    default: {
      backgroundColor: ThemeColors.background.secondary,
      boxShadow: `0 10px 30px ${ThemeColors.accent.purple}20`,
    },
    outline: {
      borderColor: ThemeColors.border.default,
      backgroundColor: ThemeColors.background.card,
      boxShadow: `0 10px 30px ${ThemeColors.accent.purple}20`,
    },
    ghost: {},
    gradient: {
      background: ThemeColors.gradients.primary,
      boxShadow: `0 10px 30px ${ThemeColors.accent.purple}40`,
    }
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
      style={variantStyles[variant]}
      {...props}
    >
      {variant === 'gradient' && (
        <span className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-300 blur-sm -z-10" style={{
          background: ThemeColors.gradients.secondary,
        }} />
      )}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default ReactBitsButton;

