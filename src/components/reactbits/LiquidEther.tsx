import { useEffect, useRef } from 'react';

interface LiquidEtherProps {
  className?: string;
  speed?: number;
  intensity?: number;
}

const LiquidEther = ({ 
  className = '', 
  speed = 1,
  intensity = 1 
}: LiquidEtherProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const animate = () => {
      time += 0.01 * speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create liquid ether effect with flowing gradients
      const gradient1 = ctx.createLinearGradient(
        0,
        canvas.height * 0.5 + Math.sin(time) * 100,
        canvas.width,
        canvas.height * 0.5 + Math.cos(time * 0.7) * 100
      );
      
      gradient1.addColorStop(0, `hsla(${(time * 10) % 360}, 70%, 60%, ${0.2 * intensity})`);
      gradient1.addColorStop(0.5, `hsla(${(time * 10 + 60) % 360}, 70%, 65%, ${0.15 * intensity})`);
      gradient1.addColorStop(1, `hsla(${(time * 10 + 120) % 360}, 70%, 70%, ${0.1 * intensity})`);

      ctx.fillStyle = gradient1;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add flowing waves
      for (let i = 0; i < 3; i++) {
        const waveGradient = ctx.createRadialGradient(
          canvas.width * (0.3 + Math.sin(time + i) * 0.2),
          canvas.height * (0.3 + Math.cos(time * 0.8 + i) * 0.2),
          0,
          canvas.width * (0.3 + Math.sin(time + i) * 0.2),
          canvas.height * (0.3 + Math.cos(time * 0.8 + i) * 0.2),
          canvas.width * 0.5
        );
        
        waveGradient.addColorStop(0, `hsla(${(time * 15 + i * 60) % 360}, 70%, 65%, ${0.15 * intensity})`);
        waveGradient.addColorStop(1, `hsla(${(time * 15 + i * 60) % 360}, 70%, 65%, 0)`);
        
        ctx.fillStyle = waveGradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [speed, intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{
        zIndex: 0,
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default LiquidEther;

