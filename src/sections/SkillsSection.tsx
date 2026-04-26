import { motion } from 'framer-motion';

const SKILL_GROUPS = [
  {
    group: 'Languages',
    items: [
      { name: 'Python',     highlight: true  },
      { name: 'JavaScript', highlight: true  },
      { name: 'Dart',       highlight: true  },
      { name: 'PHP',        highlight: false },
      { name: 'C#',         highlight: false },
      { name: 'Go',         highlight: false },
    ],
  },
  {
    group: 'Frameworks',
    items: [
      { name: 'React',   highlight: true  },
      { name: 'Flutter', highlight: true  },
      { name: '.NET',    highlight: true  },
      { name: 'Laravel', highlight: false },
    ],
  },
  {
    group: 'AI / ML',
    items: [
      { name: 'YoloV5',               highlight: true  },
      { name: 'CNN',                   highlight: true  },
      { name: 'Pandas',                highlight: true  },
      { name: 'Logistic Regressions',  highlight: false },
      { name: 'Decision Tree',         highlight: false },
    ],
  },
  {
    group: 'Data & Tools',
    items: [
      { name: 'MySQL',      highlight: true  },
      { name: 'MSSQL',      highlight: true  },
      { name: 'Docker',     highlight: true  },
      { name: 'PostgreSQL', highlight: false },
      { name: 'MongoDB',    highlight: false },
      { name: 'Airflow',    highlight: false },
    ],
  },
];

const SkillsSection = () => (
  <section
    id="skills"
    style={{
      borderTop: '1px solid var(--line)',
      padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
    }}
  >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-label">Capabilities</div>
      <h2 style={{
        fontSize: 'clamp(28px, 3.5vw, 48px)',
        fontWeight: 700, letterSpacing: '-0.025em',
        lineHeight: 1.1, marginBottom: 48,
        color: 'var(--text)',
      }}>
        Tech <em style={{ fontStyle: 'normal', color: 'var(--cyan)' }}>Stack</em>
      </h2>
    </motion.div>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }} className="skills-grid">
      {SKILL_GROUPS.map((group, gi) => (
        <motion.div
          key={group.group}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: gi * 0.08 }}
          style={{
            padding: 24, borderRadius: 8,
            border: '1px solid rgba(34,211,238,0.10)',
            background: 'rgba(34,211,238,0.04)',
            backdropFilter: 'blur(12px)',
            transition: 'border-color 0.25s, box-shadow 0.25s',
          }}
          className="skill-group-card"
        >
          <div style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 10, letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'var(--cyan)', marginBottom: 16,
          }}>
            {group.group}
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {group.items.map(item => (
              <li
                key={item.name}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  fontSize: 14,
                  color: item.highlight ? 'var(--text)' : 'var(--muted)',
                }}
              >
                <span style={{
                  flexShrink: 0, width: 4, height: 4, borderRadius: '50%',
                  background: item.highlight ? 'var(--cyan)' : 'var(--line)',
                }} />
                {item.name}
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>

    <style>{`
      .skill-group-card:hover { border-color: rgba(34,211,238,0.22) !important; box-shadow: 0 4px 20px rgba(34,211,238,0.08); }
      @media (max-width: 900px) { .skills-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      @media (max-width: 600px) { .skills-grid { grid-template-columns: repeat(2, 1fr) !important; } }
    `}</style>
  </section>
);

export default SkillsSection;
