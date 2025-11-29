import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ThemeColors } from '@/lib/theme';

interface GlowBorderProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
  glowIntensity?: 'low' | 'medium' | 'high';
  animation?: boolean;
}

const GlowBorder: React.FC<GlowBorderProps> = ({
  children,
  className = '',
  glowColor = ThemeColors.accent.purple,
  glowIntensity = 'medium',
  animation = true
}) => {
  const animationIdRef = useRef<string>(`borderGlow-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (!animation) return;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes ${animationIdRef.current} {
        0%, 100% {
          opacity: 0.3;
        }
        50% {
          opacity: 0.8;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [animation]);

  const intensityClasses = {
    low: 'shadow-lg',
    medium: 'shadow-xl',
    high: 'shadow-2xl'
  };

  const glowBoxShadow = {
    low: `0 0 20px ${glowColor}20, 0 0 40px ${glowColor}10`,
    medium: `0 0 30px ${glowColor}30, 0 0 60px ${glowColor}20, 0 0 90px ${glowColor}10`,
    high: `0 0 40px ${glowColor}40, 0 0 80px ${glowColor}30, 0 0 120px ${glowColor}20`
  };

  return (
    <div
      className={cn(
        'relative rounded-lg overflow-hidden',
        intensityClasses[glowIntensity],
        animation && 'transition-all duration-500 hover:scale-105',
        className
      )}
      style={{
        boxShadow: glowBoxShadow[glowIntensity],
      }}
    >
      {/* Animated border glow */}
      <div
        className={cn(
          'absolute inset-0 rounded-lg',
          animation && 'animate-pulse'
        )}
        style={{
          background: `linear-gradient(45deg, ${glowColor}20, transparent, ${glowColor}20)`,
          animation: animation ? `${animationIdRef.current} 3s ease-in-out infinite` : 'none'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default GlowBorder;
