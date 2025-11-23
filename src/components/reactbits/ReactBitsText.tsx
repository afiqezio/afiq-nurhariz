import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ReactBitsTextProps {
  children: ReactNode;
  variant?: 'gradient' | 'glow' | 'shimmer' | 'default';
  className?: string;
  colors?: string[];
  speed?: number;
}

const ReactBitsText = ({
  children,
  variant = 'default',
  className = '',
  colors = ['#3b82f6', '#8b5cf6', '#ec4899'],
  speed = 4,
}: ReactBitsTextProps) => {
  if (variant === 'gradient') {
    const gradientStyle = {
      background: `linear-gradient(90deg, ${colors.join(', ')})`,
      backgroundSize: '200% 200%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: `gradientShift ${speed}s ease infinite`,
    } as React.CSSProperties;

    return (
      <span className={className} style={gradientStyle}>
        {children}
      </span>
    );
  }

  if (variant === 'glow') {
    return (
      <span
        className={cn(
          'text-transparent bg-clip-text bg-gradient-to-r',
          className
        )}
        style={{
          backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
          filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))',
        }}
      >
        {children}
      </span>
    );
  }

  if (variant === 'shimmer') {
    return (
      <span
        className={cn(
          'relative inline-block',
          'bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900',
          'bg-clip-text text-transparent',
          'bg-[length:200%_100%]',
          className
        )}
        style={{
          animation: `shimmer ${speed}s linear infinite`,
        }}
      >
        {children}
      </span>
    );
  }

  return (
    <span className={cn('inline-block', className)}>
      {children}
    </span>
  );
};

export default ReactBitsText;

