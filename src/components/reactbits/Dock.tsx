import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';

interface DockItem {
  icon: ReactNode;
  label?: string;
  onClick?: () => void;
  href?: string;
}

interface DockProps {
  items: DockItem[];
  className?: string;
}

const Dock = ({ items, className = '' }: DockProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        'fixed bottom-8 left-1/2 -translate-x-1/2 z-50',
        'flex items-end gap-2 px-4 py-3',
        'bg-white/80 backdrop-blur-xl border border-white/20 rounded-2xl',
        'shadow-2xl',
        className
      )}
      style={{
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }}
    >
      {items.map((item, index) => {
        const scale = hoveredIndex === index ? 1.5 : 1;
        const translateY = hoveredIndex === index ? -20 : 0;

        return (
          <button
            key={index}
            className="relative flex flex-col items-center justify-center transition-all duration-300 ease-out"
            style={{
              transform: `scale(${scale}) translateY(${translateY}px)`,
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => {
              if (item.href) {
                window.open(item.href, '_blank');
              } else if (item.onClick) {
                item.onClick();
              }
            }}
          >
            <div className="p-3 rounded-xl bg-gradient-to-br from-white/90 to-white/70 shadow-md hover:shadow-lg transition-shadow duration-300">
              {item.icon}
            </div>
            {item.label && hoveredIndex === index && (
              <span className="absolute -bottom-8 text-xs font-medium text-slate-700 whitespace-nowrap bg-white/90 px-2 py-1 rounded shadow-md">
                {item.label}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Dock;

