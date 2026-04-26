import { motion } from 'framer-motion';
import { heroData } from '@/constants/data';
import ThreeBackground from '@/components/ThreeBackground';

const EASE = [0.22, 1, 0.36, 1] as const;
const fadeItem = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: EASE, delay },
});

const HeroSection = () => (
  <section
    id="hero"
    style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      paddingTop: 64,
      padding: '64px clamp(24px, 5vw, 80px) clamp(80px, 10vw, 140px)',
    }}
  >
    <ThreeBackground />

    {/* Left-aligned hero content */}
    <div style={{ position: 'relative', zIndex: 2, maxWidth: 720 }}>
      {/* Badge */}
      <motion.div {...fadeItem(0)} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 36 }}>
        <span
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11, letterSpacing: '0.1em',
            color: 'var(--cyan)',
            border: '1px solid rgba(34,211,238,0.25)',
            padding: '6px 14px', borderRadius: 100,
            background: 'rgba(34,211,238,0.07)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <span className="badge-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--cyan)', flexShrink: 0 }} />
          Available for new opportunities
        </span>
      </motion.div>

      {/* Title */}
      <motion.h1
        {...fadeItem(0.1)}
        style={{
          fontSize: 'clamp(42px, 6vw, 88px)',
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: '-0.03em',
          marginBottom: 24,
          color: 'var(--text)',
        }}
      >
        Crafting the<br />
        <em style={{ fontStyle: 'normal', color: 'var(--cyan)' }}>Future of Tech</em>
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        {...fadeItem(0.2)}
        style={{
          fontSize: 'clamp(16px, 1.6vw, 18px)',
          color: 'var(--muted)',
          fontWeight: 400,
          maxWidth: 480,
          lineHeight: 1.7,
          marginBottom: 48,
        }}
      >
        I'm <strong style={{ color: 'var(--text)', fontWeight: 500 }}>{heroData.name}</strong>,{' '}
        a <strong style={{ color: 'var(--text)', fontWeight: 500 }}>Full-Stack Engineer</strong> and{' '}
        <strong style={{ color: 'var(--text)', fontWeight: 500 }}>AI Developer</strong> specialising in
        intelligent, high-performance applications.
      </motion.p>

      {/* CTAs */}
      <motion.div {...fadeItem(0.25)} style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 64 }}>
        <a
          href="#projects"
          onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="hero-btn-primary"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--cyan)', color: 'var(--bg)',
            fontWeight: 600, fontSize: 14, letterSpacing: '0.03em',
            padding: '13px 28px', borderRadius: 4, textDecoration: 'none',
            transition: 'opacity 0.2s, transform 0.2s',
          }}
        >
          Explore My Work
          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
        <a
          href="#about"
          onClick={e => { e.preventDefault(); document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); }}
          className="hero-btn-ghost"
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            border: '1px solid var(--line)', color: 'var(--text)',
            fontWeight: 500, fontSize: 14,
            padding: '13px 28px', borderRadius: 4, textDecoration: 'none',
            transition: 'border-color 0.2s, background 0.2s',
          }}
        >
          Learn About Me
        </a>
      </motion.div>

      {/* Role tags */}
      <motion.div {...fadeItem(0.35)} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        {heroData.roles.map(role => (
          <span
            key={role}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11, letterSpacing: '0.06em',
              color: 'var(--subtle)',
              border: '1px solid var(--line)',
              padding: '5px 12px', borderRadius: 3,
              background: 'var(--bg2)',
            }}
          >
            {role}
          </span>
        ))}
      </motion.div>
    </div>

    {/* Scroll indicator */}
    <div
      style={{
        position: 'absolute', bottom: 36, right: 'clamp(24px, 5vw, 80px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 10, letterSpacing: '0.12em',
        color: 'var(--subtle)', textTransform: 'uppercase',
      }}
    >
      <span>Scroll</span>
      <div
        className="scroll-line"
        style={{
          width: 1, height: 48,
          background: 'linear-gradient(to bottom, var(--cyan), transparent)',
        }}
      />
    </div>

    <style>{`
      .hero-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
      .hero-btn-ghost:hover { border-color: var(--cyan) !important; background: var(--cyan-dim) !important; }
    `}</style>
  </section>
);

export default HeroSection;
