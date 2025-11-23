import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassSurfaceProps {
  children: ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  opacity?: number;
}

const GlassSurface = ({
  children,
  className = '',
  blur = 'xl',
  opacity = 0.1,
}: GlassSurfaceProps) => {
  const blurMap = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
    '2xl': 'backdrop-blur-2xl',
  };

  return (
    <div
      className={cn(
        'bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl',
        blurMap[blur],
        className
      )}
      style={{
        backgroundColor: `rgba(15, 23, 42, ${opacity})`,
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37), inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      }}
    >
      {children}
    </div>
  );
};

export default GlassSurface;

