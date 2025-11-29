import React, { useEffect, useRef } from 'react';
import { ThemeColors } from '@/lib/theme';

interface SparklesTextProps {
  children: React.ReactNode;
  className?: string;
  sparklesCount?: number;
  colors?: string[];
}

const SparklesText: React.FC<SparklesTextProps> = ({
  children,
  className = '',
  sparklesCount = 20,
  colors = [
    ThemeColors.accent.purple,
    ThemeColors.accent.purpleLight,
    ThemeColors.accent.pink,
    ThemeColors.accent.pinkLight,
    ThemeColors.accent.blue,
    ThemeColors.accent.blueLight,
    ThemeColors.accent.cyan,
  ]
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement[]>([]);
  const animationIdRef = useRef<string>(`sparkle-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    if (!containerRef.current) return;

    // Create keyframes dynamically
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ${animationIdRef.current} {
        0%, 100% {
          opacity: 0;
          transform: scale(0) rotate(0deg);
        }
        50% {
          opacity: 1;
          transform: scale(1) rotate(180deg);
        }
      }
    `;
    document.head.appendChild(style);

    const container = containerRef.current;
    const sparkles: HTMLDivElement[] = [];
    sparklesRef.current = sparkles;

    // Create sparkles
    for (let i = 0; i < sparklesCount; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      sparkle.style.cssText = `
        position: absolute;
        width: 2px;
        height: 2px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: 50%;
        pointer-events: none;
        opacity: 0;
        animation: ${animationIdRef.current} ${2 + Math.random() * 3}s ease-in-out infinite;
        animation-delay: ${Math.random() * 2}s;
      `;

      sparkles.push(sparkle);
      container.appendChild(sparkle);
    }

    // Position sparkles randomly within the text bounds
    const updateSparklePositions = () => {
      if (!container) return;

      const rect = container.getBoundingClientRect();
      sparkles.forEach((sparkle) => {
        const x = Math.random() * rect.width;
        const y = Math.random() * rect.height;
        sparkle.style.left = `${x}px`;
        sparkle.style.top = `${y}px`;
      });
    };

    updateSparklePositions();

    // Update positions on window resize
    const handleResize = () => updateSparklePositions();
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.head.removeChild(style);
      sparkles.forEach((sparkle) => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle);
        }
      });
    };
  }, [sparklesCount, colors]);

  return (
    <div ref={containerRef} className={`sparkle-container ${className}`} style={{ position: 'relative', display: 'inline-block' }}>
      {children}
    </div>
  );
};

export default SparklesText;
