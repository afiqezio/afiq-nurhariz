import React from 'react';
import { cn } from '@/lib/utils';

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
  glowColor = '#8b5cf6', // Default purple
  glowIntensity = 'medium',
  animation = true
}) => {
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
          animation: animation ? 'borderGlow 3s ease-in-out infinite' : 'none'
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      <style jsx>{`
        @keyframes borderGlow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </div>
  );
};

export default GlowBorder;
