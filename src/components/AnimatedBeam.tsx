import React, { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

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
  color = '#8b5cf6',
  width = 200,
  height = 2
}) => {
  const beamRef = useRef<HTMLDivElement>(null);

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

    return () => clearTimeout(timer);
  }, []);

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
            animation: `beamMove ${duration}s linear infinite`,
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

      <style jsx>{`
        @keyframes beamMove {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(${width + 30}px);
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBeam;
