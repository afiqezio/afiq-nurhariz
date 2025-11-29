import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { ThemeColors } from '@/lib/theme';

interface AnimatedBeamProps {
  className?: string;
  duration?: number;
  color?: string;
  width?: number;
  height?: number;
}

const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className = '',
  duration = 3,
  color = ThemeColors.accent.purple,
  width = 200,
  height = 2
}) => {
  const beamRef = useRef<HTMLDivElement>(null);
  const animationIdRef = useRef<string>(`beamMove-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const beam = beamRef.current;
    if (!beam) return;

    // Add entrance animation
    beam.style.opacity = '0';
    beam.style.transform = 'scaleX(0)';

    const timer = setTimeout(() => {
      beam.style.transition = 'all 1s ease-out';
      beam.style.opacity = '1';
      beam.style.transform = 'scaleX(1)';
    }, 100);

    // Create keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ${animationIdRef.current} {
        0% {
          transform: translateX(-100%);
        }
        100% {
          transform: translateX(${width + 30}px);
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      clearTimeout(timer);
      document.head.removeChild(style);
    };
  }, [width]);

  return (
    <div className={cn('flex justify-center items-center py-8', className)}>
      <div
        ref={beamRef}
        className="relative overflow-hidden rounded-full"
        style={{
          width: `${width}px`,
          height: `${height}px`,
          background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
          boxShadow: `0 0 20px ${color}40`,
        }}
      >
        {/* Animated light effect */}
        <div
          className="absolute top-0 left-0 h-full rounded-full"
          style={{
            width: '30px',
            background: `linear-gradient(90deg, transparent, ${color}80, transparent)`,
            animation: `${animationIdRef.current} ${duration}s linear infinite`,
            boxShadow: `0 0 30px ${color}60`,
          }}
        />

        {/* Glow effect */}
        <div
          className="absolute inset-0 rounded-full blur-sm"
          style={{
            background: `linear-gradient(90deg, transparent, ${color}30, transparent)`,
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedBeam;
