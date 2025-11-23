import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href?: string;
  onClick?: () => void;
  icon?: React.ReactNode;
}

interface CleanNavProps {
  items: NavItem[];
  className?: string;
}

const CleanNav = ({ items, className = '' }: CleanNavProps) => {
  const [active, setActive] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = items
        .filter(item => item.href?.startsWith('#'))
        .map(item => item.href?.substring(1))
        .filter(Boolean) as string[];

      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 150 && rect.bottom >= 150;
      });

      if (currentSection) {
        setActive(`#${currentSection}`);
      } else {
        setActive(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const handleClick = (item: NavItem) => {
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
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-slate-900/80 backdrop-blur-2xl border-b border-white/10 shadow-2xl'
          : 'bg-transparent',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-2xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
          >
            ANHZ
          </a>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center gap-1">
            {items.map((item, index) => {
              const isActive = active === item.href;
              
              return (
                <button
                  key={index}
                  onClick={() => handleClick(item)}
                  className={cn(
                    'relative px-6 py-3 rounded-lg',
                    'text-sm font-medium transition-all duration-300',
                    'flex items-center gap-2',
                    isActive
                      ? 'text-slate-100'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/10'
                  )}
                >
                  {item.icon && (
                    <span className={cn(
                      'w-4 h-4 transition-colors duration-300',
                      isActive ? 'text-blue-400' : 'text-slate-400'
                    )}>
                      {item.icon}
                    </span>
                  )}
                  <span>{item.label}</span>
                  
                  {/* Active Indicator */}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-0.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg text-slate-400 hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 mt-2 pt-4 pb-4">
            <div className="flex flex-col gap-2">
              {items.map((item, index) => {
                const isActive = active === item.href;
                
                return (
                  <button
                    key={index}
                    onClick={() => {
                      handleClick(item);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      'relative px-4 py-3 rounded-lg text-left',
                      'text-sm font-medium transition-all duration-300',
                      'flex items-center gap-3',
                      isActive
                        ? 'text-slate-100 bg-white/20'
                        : 'text-slate-400 hover:text-slate-100 hover:bg-white/10'
                    )}
                  >
                    {item.icon && (
                      <span className={cn(
                        'w-5 h-5 transition-colors duration-300',
                        isActive ? 'text-blue-400' : 'text-slate-400'
                      )}>
                        {item.icon}
                      </span>
                    )}
                    <span>{item.label}</span>
                    
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 rounded-r-full"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default CleanNav;

