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
      setIsScrolled(window.scrollY > 40);

      const sections = items
        .filter(item => item.href?.startsWith('#'))
        .map(item => item.href?.substring(1))
        .filter(Boolean) as string[];

      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (!element) return false;
        const rect = element.getBoundingClientRect();
        return rect.top <= 120 && rect.bottom >= 120;
      });

      setActive(currentSection ? `#${currentSection}` : null);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
    if (item.onClick) item.onClick();
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'glass border-b border-white/5 py-3'
          : 'bg-transparent py-5',
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-display font-bold tracking-tighter flex items-center gap-2"
        >
          <span className="hidden sm:flex items-center gap-0.5 text-xl">
            <span className="text-slate-100">AFIQ</span>
            <span className="text-primary-400">NURHARIZ</span>
          </span>
          <span className="sm:hidden w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-accent-ai flex items-center justify-center text-white text-xs font-black">AN</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
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
                className={cn(
                  "text-sm font-medium transition-colors relative group",
                  isActive ? "text-white" : "text-slate-400 hover:text-slate-200"
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px bg-primary-400 transition-all duration-300",
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </a>
            );
          })}

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-5 py-2 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 text-white text-sm font-semibold hover:from-primary-500 hover:to-primary-400 transition-all shadow-md shadow-primary-500/20 hover:shadow-primary-500/30"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-slate-300 hover:text-white p-2 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass border-t border-white/5 p-5 flex flex-col gap-1 animate-in fade-in slide-in-from-top-2 duration-200">
          {items.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-base font-medium min-h-[48px] flex items-center px-3 rounded-xl transition-colors",
                active === item.href
                  ? "text-white bg-white/5"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
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
            className="mt-2 py-3 rounded-xl bg-gradient-to-r from-primary-600 to-primary-500 text-white font-semibold text-center text-sm min-h-[48px] flex items-center justify-center"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
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
