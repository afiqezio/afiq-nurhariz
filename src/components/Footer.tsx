const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      borderTop: '1px solid var(--line)',
      padding: `28px clamp(24px, 5vw, 80px)`,
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      flexWrap: 'wrap', gap: 12,
    }}>
      <span style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 11, color: 'var(--subtle)', letterSpacing: '0.06em',
      }}>
        © {year} Afiq Nurhariz. All rights reserved.
      </span>

      <div style={{ display: 'flex', gap: 24 }}>
        {['About', 'Projects', 'Contact'].map(label => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            onClick={e => {
              e.preventDefault();
              document.getElementById(label.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="footer-link"
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11, color: 'var(--subtle)',
              textDecoration: 'none', letterSpacing: '0.06em',
              transition: 'color 0.2s',
            }}
          >
            {label}
          </a>
        ))}
      </div>

      <style>{`.footer-link:hover { color: var(--cyan) !important; }`}</style>
    </footer>
  );
};

export default Footer;
