import { useEffect, useRef } from 'react';

interface AnimatedBeamProps {
  className?: string;
  color?: string;
  count?: number;
  speed?: number;
}

const AnimatedBeam = ({
  className = '',
  color = '#8b5cf6',
  count = 3,
  speed = 1,
}: AnimatedBeamProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01 * speed;
      
      const beams = Array.from({ length: count }, (_, i) => {
        const angle = (time * 0.5 + (i * Math.PI * 2) / count) % (Math.PI * 2);
        const x = 50 + Math.cos(angle) * 30;
        const y = 50 + Math.sin(angle) * 30;
        const opacity = 0.3 + Math.sin(time + i) * 0.2;
        
        return `radial-gradient(circle at ${x}% ${y}%, ${color}${Math.round(opacity * 255).toString(16)} 0%, transparent 50%)`;
      }).join(', ');

      container.style.background = beams;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [color, count, speed]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
    />
  );
};

export default AnimatedBeam;

