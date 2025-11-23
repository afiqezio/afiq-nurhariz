import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface PillNavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

interface PillNavProps {
  items: PillNavItem[];
  className?: string;
  activeItem?: string;
}

const PillNav = ({ items, className = '', activeItem }: PillNavProps) => {
  const [active, setActive] = useState<string | null>(activeItem || null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = items
        .filter(item => item.href?.startsWith('#'))
        .map(item => item.href?.substring(1))
        .filter(Boolean) as string[];

      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActive(`#${currentSection}`);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const handleClick = (item: PillNavItem) => {
    if (item.href) {
      setActive(item.href);
      if (item.href.startsWith('#')) {
        const element = document.getElementById(item.href.substring(1));
        element?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.open(item.href, '_blank');
      }
    }
    if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <nav
      className={cn(
        'fixed top-8 left-1/2 -translate-x-1/2 z-50',
        'flex items-center gap-2 px-4 py-2',
        'bg-white/80 backdrop-blur-xl border border-white/20 rounded-full',
        'shadow-2xl',
        className
      )}
      style={{
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
      }}
    >
      {items.map((item, index) => {
        const isActive = active === item.href || (!active && index === 0);
        
        return (
          <button
            key={index}
            onClick={() => handleClick(item)}
            className={cn(
              'relative px-4 py-2 rounded-full',
              'text-sm font-medium transition-all duration-300',
              'flex items-center gap-2',
              isActive
                ? 'text-white bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 shadow-lg'
                : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/50'
            )}
          >
            {item.icon && <span className="w-4 h-4">{item.icon}</span>}
            <span>{item.label}</span>
            {isActive && (
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-0 blur-xl animate-pulse" />
            )}
          </button>
        );
      })}
    </nav>
  );
};

export default PillNav;

