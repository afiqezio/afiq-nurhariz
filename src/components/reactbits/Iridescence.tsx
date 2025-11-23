import { useEffect, useRef } from 'react';

interface IridescenceProps {
  className?: string;
  speed?: number;
  intensity?: number;
}

const Iridescence = ({ 
  className = '', 
  speed = 1,
  intensity = 1 
}: IridescenceProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let animationId: number;
    let time = 0;

    const animate = () => {
      time += 0.01 * speed;
      
      // Create iridescent effect with shifting colors
      const hue1 = (time * 20) % 360;
      const hue2 = (time * 20 + 60) % 360;
      const hue3 = (time * 20 + 120) % 360;
      
      const gradient = `
        radial-gradient(
          circle at ${50 + Math.sin(time) * 30}% ${50 + Math.cos(time * 0.7) * 30}%,
          hsla(${hue1}, 70%, 60%, ${0.15 * intensity}) 0%,
          hsla(${hue2}, 70%, 65%, ${0.12 * intensity}) 30%,
          hsla(${hue3}, 70%, 70%, ${0.1 * intensity}) 60%,
          transparent 100%
        ),
        radial-gradient(
          circle at ${50 + Math.cos(time * 0.8) * 25}% ${50 + Math.sin(time * 0.6) * 25}%,
          hsla(${(hue1 + 180) % 360}, 70%, 65%, ${0.12 * intensity}) 0%,
          hsla(${(hue2 + 180) % 360}, 70%, 70%, ${0.1 * intensity}) 40%,
          transparent 80%
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
  }, [speed, intensity]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{
        background: `radial-gradient(circle at 50% 50%, hsla(240, 70%, 60%, 0.15) 0%, hsla(300, 70%, 65%, 0.12) 30%, hsla(330, 70%, 70%, 0.1) 60%, transparent 100%)`,
        zIndex: 0,
      }}
    />
  );
};

export default Iridescence;

