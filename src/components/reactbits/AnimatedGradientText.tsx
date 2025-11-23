import { ReactNode } from 'react';

interface AnimatedGradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  speed?: number;
}

const AnimatedGradientText = ({
  children,
  className = '',
  colors = ['#3b82f6', '#8b5cf6', '#ec4899'],
  speed = 4,
}: AnimatedGradientTextProps) => {
  const gradientStyle = {
    background: `linear-gradient(90deg, ${colors.join(', ')})`,
    backgroundSize: '200% 200%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    animation: `gradientShift ${speed}s ease infinite`,
  } as React.CSSProperties;

  return (
    <span className={className} style={gradientStyle}>
      {children}
    </span>
  );
};

export default AnimatedGradientText;

