import { motion } from 'framer-motion';

const CONTACT_LINKS = [
  {
    label: 'afiqnurhariz@gmail.com',
    href:  'mailto:afiqnurhariz@gmail.com',
    icon: (
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="m2 7 10 7 10-7"/>
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href:  'https://www.linkedin.com/in/afiqnurhariz/',
    icon: (
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
        <rect x="2" y="9" width="4" height="12"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    label: 'GitHub',
    href:  'https://github.com/afiqezio',
    icon: (
      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
      </svg>
    ),
  },
];

const ContactSection = () => (
  <section
    id="contact"
    style={{
      borderTop: '1px solid var(--line)',
      padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
      textAlign: 'center',
    }}
  >
    <motion.span
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{
        display: 'block',
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 11, letterSpacing: '0.12em',
        color: 'var(--cyan)', textTransform: 'uppercase', marginBottom: 24,
      }}
    >
      Let&apos;s work together
    </motion.span>

    <motion.h2
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{
        fontSize: 'clamp(36px, 5vw, 72px)',
        fontWeight: 700, letterSpacing: '-0.03em',
        lineHeight: 1.05, marginBottom: 20,
        color: 'var(--text)',
      }}
    >
      Have an idea?<br />Let&apos;s build it.
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.15 }}
      style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 48 }}
    >
      Open to freelance, full-time, and collaborative opportunities.
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
    >
      {CONTACT_LINKS.map(link => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="contact-link"
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            fontSize: 13, fontFamily: 'JetBrains Mono, monospace', letterSpacing: '0.06em',
            color: 'var(--muted)',
            border: '1px solid rgba(34,211,238,0.14)',
            padding: '12px 24px', borderRadius: 4, textDecoration: 'none',
            background: 'rgba(34,211,238,0.05)',
            backdropFilter: 'blur(12px)',
            transition: 'color 0.2s, border-color 0.2s, background 0.2s, box-shadow 0.2s',
          }}
        >
          {link.icon}
          {link.label}
        </a>
      ))}
    </motion.div>

    <style>{`
      .contact-link:hover {
        color: var(--cyan) !important;
        border-color: rgba(34,211,238,0.4) !important;
        background: rgba(34,211,238,0.10) !important;
        box-shadow: 0 6px 24px rgba(34,211,238,0.14) !important;
      }
    `}</style>
  </section>
);

export default ContactSection;
