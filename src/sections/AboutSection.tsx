import { motion } from 'framer-motion';
import { heroData, aboutContent } from '@/constants/data';

const AboutSection = () => (
  <section
    id="about"
    style={{
      borderTop: '1px solid var(--line)',
      padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
    }}
  >
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center', maxWidth: 1200, margin: '0 auto' }} className="about-grid">

      {/* Left: Photo */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{ position: 'relative', aspectRatio: '4/5' }}>
          {/* Photo frame */}
          <div style={{
            position: 'absolute', inset: 0,
            border: '1px solid var(--line)',
            borderRadius: 8, overflow: 'hidden',
            background: 'var(--bg2)',
          }}>
            <img
              src={heroData.profileImage}
              alt={heroData.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>
          {/* Accent badge */}
          <div style={{
            position: 'absolute', bottom: -16, right: -16,
            width: 64, height: 64, borderRadius: 8,
            background: 'var(--cyan)',
            display: 'grid', placeItems: 'center',
            fontWeight: 700, color: 'var(--bg)',
            fontSize: 13, lineHeight: 1.1, textAlign: 'center',
          }}>
            <div>AI</div>
            <div style={{ fontSize: 9, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.04em' }}>GRAD</div>
          </div>
        </div>
      </motion.div>

      {/* Right: Content */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      >
        <div className="section-label">About</div>

        <h2 style={{
          fontSize: 'clamp(28px, 3.5vw, 48px)',
          fontWeight: 700, letterSpacing: '-0.025em',
          lineHeight: 1.15, marginBottom: 24,
          color: 'var(--text)',
        }}>
          Building Bridges Between<br />
          <em style={{ fontStyle: 'normal', color: 'var(--cyan)' }}>Human Intent &amp; Machine Logic</em>
        </h2>

        <p style={{ color: 'var(--muted)', fontSize: 15, lineHeight: 1.8, marginBottom: 20 }}>
          {aboutContent.paragraphs[0]}
        </p>

        <blockquote style={{
          borderLeft: '2px solid var(--cyan)',
          paddingLeft: 20,
          color: 'var(--subtle)',
          fontStyle: 'italic',
          fontSize: 14,
          lineHeight: 1.7,
          marginBottom: 40,
        }}>
          &ldquo;{aboutContent.paragraphs[1]}&rdquo;
        </blockquote>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[
            { num: '1+', label: 'Years Exp.' },
            { num: '9+', label: 'Projects Done' },
            { num: '∞',  label: 'Learning Journey' },
          ].map(stat => (
            <div
              key={stat.label}
              style={{
                padding: 20, borderRadius: 8,
                border: '1px solid rgba(34,211,238,0.12)',
                background: 'rgba(34,211,238,0.05)',
                backdropFilter: 'blur(12px)',
                transition: 'box-shadow 0.25s, border-color 0.25s',
              }}
              className="stat-card"
            >
              <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.03em', color: 'var(--text)', lineHeight: 1 }}>
                {stat.num.slice(0, -1)}<span style={{ color: 'var(--cyan)' }}>{stat.num.slice(-1)}</span>
              </div>
              <div style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'var(--subtle)', marginTop: 4,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}
            className="about-btn-primary"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'var(--cyan)', color: 'var(--bg)',
              fontWeight: 600, fontSize: 14, letterSpacing: '0.03em',
              padding: '13px 28px', borderRadius: 4, textDecoration: 'none',
              transition: 'opacity 0.2s, transform 0.2s',
            }}
          >
            Get in Touch
          </a>
          <a
            href={heroData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="about-btn-ghost"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              border: '1px solid var(--line)', color: 'var(--text)',
              fontWeight: 500, fontSize: 14,
              padding: '13px 28px', borderRadius: 4, textDecoration: 'none',
              transition: 'border-color 0.2s, background 0.2s',
            }}
          >
            View Resume →
          </a>
        </div>
      </motion.div>
    </div>

    <style>{`
      .about-grid { @media (max-width: 900px) { grid-template-columns: 1fr; gap: 48px; } }
      .about-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
      .about-btn-ghost:hover { border-color: var(--cyan) !important; background: var(--cyan-dim) !important; }
      .stat-card:hover { border-color: rgba(34,211,238,0.28) !important; box-shadow: 0 4px 20px rgba(34,211,238,0.10); }
      @media (max-width: 900px) {
        .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
      }
    `}</style>
  </section>
);

export default AboutSection;
