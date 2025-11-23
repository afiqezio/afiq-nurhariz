import { useEffect, useRef, useState } from 'react';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface BallpitProps {
  className?: string;
  ballCount?: number;
  colors?: string[];
  speed?: number;
}

const Ballpit = ({ 
  className = '', 
  ballCount = 30,
  colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'],
  speed = 1
}: BallpitProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [balls, setBalls] = useState<Ball[]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize balls
    const initialBalls: Ball[] = Array.from({ length: ballCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2 * speed,
      vy: (Math.random() - 0.5) * 2 * speed,
      radius: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    setBalls(initialBalls);

    let animationId: number;
    let currentBalls = [...initialBalls];

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      currentBalls = currentBalls.map((ball) => {
        // Update position
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Bounce off walls
        if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
          ball.vx *= -1;
          ball.x = Math.max(ball.radius, Math.min(canvas.width - ball.radius, ball.x));
        }
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
          ball.vy *= -1;
          ball.y = Math.max(ball.radius, Math.min(canvas.height - ball.radius, ball.y));
        }

        // Draw ball with glow effect
        const gradient = ctx.createRadialGradient(
          ball.x, ball.y, 0,
          ball.x, ball.y, ball.radius * 2
        );
        gradient.addColorStop(0, ball.color + '80');
        gradient.addColorStop(0.5, ball.color + '40');
        gradient.addColorStop(1, ball.color + '00');

        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw solid center
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = ball.color + 'CC';
        ctx.fill();

        return ball;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [ballCount, colors, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: '100%', height: '100%' }}
    />
  );
};

export default Ballpit;

