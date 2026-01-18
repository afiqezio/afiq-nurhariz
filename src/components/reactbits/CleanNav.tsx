import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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
          ? 'glass py-3'
          : 'bg-transparent py-6',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            navigate('/');
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display text-2xl font-bold tracking-tighter flex items-center gap-2"
        >
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-ai flex items-center justify-center text-white text-base">AN</span>
          AFIQ<span className="text-primary-400">NURHARIZ</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 items-center">
          {items.map((item, index) => {
            const isActive = active === item.href;
            
            return (
              <a
                key={index}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(item);
                }}
                className="text-sm font-medium text-slate-300 hover:text-white transition-colors relative group"
              >
                {item.label}
                <span className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-primary-400 transition-all",
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                )}></span>
              </a>
            );
          })}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2 rounded-full bg-white text-slate-950 text-sm font-bold hover:bg-primary-400 hover:text-white transition-all shadow-lg shadow-primary-500/10"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass border-t border-slate-800 p-6 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-lg font-medium text-slate-300"
              onClick={(e) => {
                e.preventDefault();
                handleClick(item);
                setIsMobileMenuOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="w-full py-3 rounded-xl bg-primary-500 text-white font-bold text-center"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('contact');
              element?.scrollIntoView({ behavior: 'smooth' });
              setIsMobileMenuOpen(false);
            }}
          >
            Hire Me
          </a>
        </div>
      )}
    </nav>
  );
};

export default CleanNav;

