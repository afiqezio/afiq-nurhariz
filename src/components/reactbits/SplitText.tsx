import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  gradient?: boolean;
  gradientColors?: string[];
}

const SplitText = ({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  stagger = 0.05,
  gradient = false,
  gradientColors = ['#3b82f6', '#8b5cf6', '#ec4899'],
}: SplitTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  // Split text into words, then into characters
  const words = children.split(' ');
  const chars = children.split('');

  return (
    <div
      ref={containerRef}
      className={cn('inline-block', className)}
      style={{
        display: 'inline-block',
      }}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          className="inline-block"
          style={{
            marginRight: wordIndex < words.length - 1 ? '0.25em' : '0',
          }}
        >
          {word.split('').map((char, charIndex) => {
            const globalIndex = words
              .slice(0, wordIndex)
              .join(' ').length + charIndex + wordIndex;
            
            const charStyle: React.CSSProperties = {
              opacity: isVisible ? 1 : 0,
              transform: isVisible
                ? 'translateY(0)'
                : 'translateY(100%)',
              transition: `opacity ${duration}s ease-out ${delay + globalIndex * stagger}s, transform ${duration}s ease-out ${delay + globalIndex * stagger}s`,
              display: char === ' ' ? 'inline' : 'inline-block',
            };

            if (gradient) {
              charStyle.background = `linear-gradient(90deg, ${gradientColors.join(', ')})`;
              charStyle.backgroundSize = '200% 200%';
              charStyle.WebkitBackgroundClip = 'text';
              charStyle.WebkitTextFillColor = 'transparent';
              charStyle.backgroundClip = 'text';
              charStyle.animation = `gradientShift 4s ease infinite`;
            }

            return (
              <span
                key={`${wordIndex}-${charIndex}`}
                className="inline-block"
                style={charStyle}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            );
          })}
        </span>
      ))}
    </div>
  );
};

export default SplitText;

