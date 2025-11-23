import React, { useEffect, useRef } from 'react';

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
  colors = ['#ffd700', '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57']
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sparklesRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

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
        animation: sparkle ${2 + Math.random() * 3}s ease-in-out infinite;
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
      sparkles.forEach((sparkle) => {
        if (sparkle.parentNode) {
          sparkle.parentNode.removeChild(sparkle);
        }
      });
    };
  }, [sparklesCount, colors]);

  return (
    <>
      <style jsx>{`
        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0) rotate(0deg);
          }
          50% {
            opacity: 1;
            transform: scale(1) rotate(180deg);
          }
        }

        .sparkle-container {
          position: relative;
          display: inline-block;
        }
      `}</style>
      <div ref={containerRef} className={`sparkle-container ${className}`}>
        {children}
      </div>
    </>
  );
};

export default SparklesText;
