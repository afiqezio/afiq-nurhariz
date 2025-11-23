import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface GlowBorderProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  borderWidth?: number;
  glowIntensity?: number;
}

const GlowBorder = ({
  children,
  className = '',
  glowColor = '#8b5cf6',
  borderWidth = 1,
  glowIntensity = 0.5,
}: GlowBorderProps) => {
  const opacityHex = Math.round(glowIntensity * 255).toString(16).padStart(2, '0');
  const glowOpacityHex = Math.round(glowIntensity * 100).toString(16).padStart(2, '0');
  
  return (
    <div className={cn('relative rounded-2xl', className)}>
      {/* Glow effect behind */}
      <div
        className="absolute inset-0 rounded-2xl blur-xl pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle, ${glowColor}${glowOpacityHex} 0%, transparent 70%)`,
          opacity: 0.6,
        }}
      />
      {/* Border gradient */}
      <div
        className="rounded-2xl"
        style={{
          padding: `${borderWidth}px`,
          background: `linear-gradient(135deg, ${glowColor}${opacityHex}, ${glowColor}${Math.round(glowIntensity * 150).toString(16).padStart(2, '0')})`,
        }}
      >
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl h-full w-full border border-slate-200">
          {children}
        </div>
      </div>
    </div>
  );
};

export default GlowBorder;

