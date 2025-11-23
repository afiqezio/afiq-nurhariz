import { useEffect, useRef } from 'react';

interface AnimatedGradientProps {
  className?: string;
  colors?: string[];
  speed?: number;
}

const AnimatedGradient = ({ 
  className = '', 
  colors = ['#3b82f6', '#8b5cf6', '#ec4899'],
  speed = 1 
}: AnimatedGradientProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01 * speed;
      const gradient = `
        radial-gradient(
          circle at ${50 + Math.sin(time) * 20}% ${50 + Math.cos(time) * 20}%,
          ${colors[0]}15 0%,
          ${colors[1]}10 40%,
          ${colors[2]}05 80%,
          transparent 100%
        )
      `;
      container.style.background = gradient;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [colors, speed]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        background: `radial-gradient(circle at 50% 50%, ${colors[0]}15 0%, ${colors[1]}10 40%, ${colors[2]}05 80%, transparent 100%)`,
      }}
    />
  );
};

export default AnimatedGradient;

