import { useState, useEffect } from 'react';
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === 'undefined') return true;
    return (localStorage.getItem('theme') ?? 'dark') === 'dark';
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sectionIds = items
        .filter(i => i.href?.startsWith('#'))
        .map(i => i.href!.slice(1));

      const current = sectionIds.find(id => {
        const el = document.getElementById(id);
        if (!el) return false;
        const { top, bottom } = el.getBoundingClientRect();
        return top <= 120 && bottom >= 120;
      });
      setActiveSection(current ? `#${current}` : null);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);

  const scrollTo = (href: string) => {
    const id = href.slice(1);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const navBaseStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0, left: 0, right: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 clamp(24px, 5vw, 80px)',
    height: 64,
    transition: 'background 0.4s, border-color 0.4s, backdrop-filter 0.4s, box-shadow 0.4s',
    borderBottom: isScrolled
      ? '1px solid var(--cyan-dim)'
      : '1px solid transparent',
    background: isScrolled
      ? isDark ? 'rgba(13,15,20,0.55)' : 'rgba(245,247,250,0.88)'
      : 'transparent',
    backdropFilter: isScrolled ? 'blur(28px) saturate(180%)' : 'none',
  };

  return (
    <>
      <nav style={navBaseStyle} className={className}>
        {/* Logo */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: 'var(--text)' }}
        >
          <span style={{
            width: 28, height: 28, borderRadius: 6,
            background: 'var(--cyan)',
            display: 'grid', placeItems: 'center',
            fontSize: 11, fontWeight: 700, color: 'var(--bg)',
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: 0, flexShrink: 0,
          }}>AN</span>
          <span style={{ fontWeight: 700, fontSize: 15, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Afiq Nurhariz
          </span>
        </a>

        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }} className="hidden md:flex">
          {items.map(item => (
            <a
              key={item.label}
              href={item.href}
              onClick={e => {
                e.preventDefault();
                if (item.href?.startsWith('#')) scrollTo(item.href);
                if (item.onClick) item.onClick();
              }}
              style={{
                fontSize: 13,
                fontWeight: 500,
                color: activeSection === item.href ? 'var(--text)' : 'var(--muted)',
                textDecoration: 'none',
                letterSpacing: '0.04em',
                transition: 'color 0.2s',
                position: 'relative',
                paddingBottom: 2,
              }}
              className="nav-link-item"
            >
              {item.label}
              <span style={{
                position: 'absolute', bottom: -3, left: 0,
                height: 1, background: 'var(--cyan)',
                width: activeSection === item.href ? '100%' : '0',
                transition: 'width 0.25s',
              }} />
            </a>
          ))}

          {/* Theme toggle */}
          <button
            onClick={() => setIsDark(d => !d)}
            aria-label="Toggle theme"
            style={{
              width: 36, height: 36, borderRadius: 4,
              border: '1px solid var(--line)',
              background: 'transparent',
              color: 'var(--muted)',
              cursor: 'pointer',
              display: 'grid', placeItems: 'center',
              transition: 'border-color 0.2s, color 0.2s, background 0.2s',
            }}
            className="theme-btn"
          >
            {isDark
              ? <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
              : <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            }
          </button>

          {/* Hire Me */}
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); scrollTo('#contact'); }}
            style={{
              fontSize: 12, fontWeight: 600, letterSpacing: '0.06em',
              padding: '8px 20px', borderRadius: 4,
              border: '1px solid var(--cyan)', color: 'var(--cyan)',
              background: 'transparent', textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s',
            }}
            className="hire-btn"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden"
          style={{ background: 'none', border: 'none', color: 'var(--text)', cursor: 'pointer', padding: 8 }}
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Toggle menu"
        >
          {mobileOpen
            ? <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"/></svg>
            : <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          }
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            position: 'fixed', top: 64, left: 0, right: 0,
            background: 'var(--bg2)',
            borderBottom: '1px solid var(--line)',
            padding: '20px clamp(24px, 5vw, 80px)',
            display: 'flex', flexDirection: 'column', gap: 20,
            zIndex: 99,
          }}
        >
          {items.map(item => (
            <a
              key={item.label}
              href={item.href}
              onClick={e => {
                e.preventDefault();
                if (item.href?.startsWith('#')) scrollTo(item.href);
                setMobileOpen(false);
              }}
              style={{
                fontSize: 15, fontWeight: 500,
                color: 'var(--text)', textDecoration: 'none',
              }}
            >
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={e => {
              e.preventDefault();
              scrollTo('#contact');
              setMobileOpen(false);
            }}
            style={{
              display: 'inline-block',
              fontSize: 13, fontWeight: 600, letterSpacing: '0.06em',
              padding: '10px 24px', borderRadius: 4,
              border: '1px solid var(--cyan)', color: 'var(--cyan)',
              background: 'transparent', textDecoration: 'none',
              textAlign: 'center',
            }}
          >
            Hire Me
          </a>
        </div>
      )}

      <style>{`
        .nav-link-item:hover { color: var(--text) !important; }
        .nav-link-item:hover span { width: 100% !important; }
        .theme-btn:hover { border-color: var(--cyan) !important; color: var(--cyan) !important; background: var(--cyan-dim) !important; }
        .hire-btn:hover { background: var(--cyan) !important; color: var(--bg) !important; }
      `}</style>
    </>
  );
};

export default CleanNav;
