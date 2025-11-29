import React from 'react';
import { cn } from '@/lib/utils';
import { ThemeColors } from '@/lib/theme';

interface GradientButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent';
  size?: 'sm' | 'md' | 'lg';
}

const GradientButton: React.FC<GradientButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) => {
  const baseClasses = 'relative inline-flex items-center justify-center font-semibold transition-all duration-300 rounded-lg overflow-hidden group';

  const variantClasses = {
    primary: 'text-white shadow-lg hover:shadow-xl transform hover:scale-105',
    secondary: 'text-white shadow-lg hover:shadow-xl transform hover:scale-105',
    accent: 'text-white shadow-lg hover:shadow-xl transform hover:scale-105'
  };

  const variantStyles = {
    primary: {
      background: ThemeColors.gradients.primary,
      boxShadow: `0 10px 30px ${ThemeColors.accent.purple}40`,
    },
    secondary: {
      background: ThemeColors.gradients.secondary,
      boxShadow: `0 10px 30px ${ThemeColors.accent.blue}40`,
    },
    accent: {
      background: ThemeColors.gradients.accent,
      boxShadow: `0 10px 30px ${ThemeColors.accent.cyan}40`,
    }
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      style={variantStyles[variant]}
      {...props}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
};

export default GradientButton;
