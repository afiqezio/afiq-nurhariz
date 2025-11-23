import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlassSurfaceProps {
  children: ReactNode;
  className?: string;
  blur?: 'sm' | 'md' | 'lg';
  opacity?: number;
}

const GlassSurface = ({
  children,
  className = '',
  blur = 'md',
  opacity = 0.8,
}: GlassSurfaceProps) => {
  const blurMap = {
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
  };

  return (
    <div
      className={cn(
        'bg-white/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg',
        blurMap[blur],
        className
      )}
      style={{
        backgroundColor: `rgba(255, 255, 255, ${opacity})`,
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }}
    >
      {children}
    </div>
  );
};

export default GlassSurface;

