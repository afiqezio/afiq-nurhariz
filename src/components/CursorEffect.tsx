import React, { useEffect, useState } from 'react';

const CursorEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bubbles, setBubbles] = useState<{ id: number; x: number; y: number; size: number }[]>([]);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Create a new bubble occasionally
      if (Math.random() > 0.8) {
        const newBubble = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
          size: Math.random() * 20 + 10,
        };
        
        setBubbles(prev => [...prev, newBubble]);
        
        // Remove bubble after animation
        setTimeout(() => {
          setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
        }, 1000);
      }
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <>
      <div 
        className="fixed w-8 h-8 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: position.x - 16,
          top: position.y - 16,
          transform: 'translate(0, 0)',
        }}
      >
        <div className="w-full h-full bg-primary/30 rounded-full animate-pulse" />
      </div>
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="fixed pointer-events-none z-40 animate-fadeOut"
          style={{
            left: bubble.x - bubble.size / 2,
            top: bubble.y - bubble.size / 2,
            width: bubble.size,
            height: bubble.size,
          }}
        >
          <div className="w-full h-full bg-primary/20 rounded-full" />
        </div>
      ))}
    </>
  );
};

export default CursorEffect;