import { motion } from 'framer-motion';
import { projects } from '@/constants/data';
import { Project } from '@/types';

const PROJECT_CATEGORIES: Record<string, string> = {
  'mamak-food':         'AI / ML',
  'mobile-attendance':  'Mobile',
  'hair-saloon':        'Mobile',
  'churn-prediction':   'Data Science',
  'database-optimization': 'Backend',
  'wedding-invitation': 'Frontend',
};

interface ProjectsSectionProps {
  onViewProject: (project: Project) => void;
}

const ProjectsSection = ({ onViewProject }: ProjectsSectionProps) => (
  <section
    id="projects"
    style={{
      borderTop: '1px solid var(--line)',
      padding: 'clamp(80px, 10vw, 140px) clamp(24px, 5vw, 80px)',
    }}
  >
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 16 }}
    >
      <div>
        <div className="section-label">Work</div>
        <h2 style={{
          fontSize: 'clamp(28px, 3.5vw, 48px)',
          fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1,
          color: 'var(--text)',
        }}>
          Featured <em style={{ fontStyle: 'normal', color: 'var(--cyan)' }}>Projects</em>
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: 14, marginTop: 10, maxWidth: 360 }}>
          Selected works across web, mobile, and AI architectures.
        </p>
      </div>
    </motion.div>

    {/* Grid */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.1 }}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: 'var(--line)' }}
      className="projects-grid"
    >
      {projects.map((project, i) => (
        <div
          key={project.id}
          onClick={() => onViewProject(project)}
          className="project-card"
          style={{
            background: 'var(--bg2)',
            padding: '0 0 32px',
            position: 'relative',
            cursor: 'pointer',
            backdropFilter: 'blur(16px)',
            transition: 'background 0.25s, box-shadow 0.3s',
            display: 'flex', flexDirection: 'column',
          }}
        >
          {/* Project image */}
          <div style={{ aspectRatio: '16/9', overflow: 'hidden', flexShrink: 0 }}>
            <img
              src={project.imageUrl}
              alt={project.title}
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(30%) brightness(0.7)',
                transition: 'filter 0.3s, transform 0.4s',
              }}
              className="project-img"
            />
          </div>

          {/* Text content */}
          <div style={{ padding: '24px 32px 0', flex: 1 }}>
            <div style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11, color: 'var(--subtle)', letterSpacing: '0.08em', marginBottom: 16,
            }}>
              {String(i + 1).padStart(2, '0')} — {PROJECT_CATEGORIES[project.id] ?? 'Project'}
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              {project.tech.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 10, letterSpacing: '0.06em',
                    color: 'var(--cyan)',
                    border: '1px solid rgba(34,211,238,0.3)',
                    padding: '3px 8px', borderRadius: 2,
                    background: 'var(--cyan-dim)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div style={{
              fontSize: 17, fontWeight: 600, letterSpacing: '-0.01em',
              lineHeight: 1.4, marginBottom: 10, color: 'var(--text)',
            }}>
              {project.title}
            </div>
            <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
              {project.description}
            </div>
          </div>

          {/* Arrow */}
          <div
            className="project-arrow"
            style={{
              position: 'absolute', top: 32, right: 32,
              width: 32, height: 32, borderRadius: '50%',
              border: '1px solid var(--line)',
              display: 'grid', placeItems: 'center',
              color: 'var(--muted)', fontSize: 14,
              transition: 'border-color 0.2s, color 0.2s, transform 0.2s',
            }}
          >
            ↗
          </div>

          {/* Hover bottom border */}
          <div className="project-card-border" />
        </div>
      ))}
    </motion.div>

    <style>{`
      .projects-grid { @media (max-width: 900px) { grid-template-columns: repeat(2, 1fr) !important; } @media (max-width: 600px) { grid-template-columns: 1fr !important; } }
      .project-card:hover { background: var(--bg3) !important; box-shadow: inset 0 1px 0 rgba(255,255,255,0.07), 0 8px 32px rgba(34,211,238,0.12) !important; }
      .project-card:hover .project-card-border { transform: scaleX(1); }
      .project-card:hover .project-arrow { border-color: var(--cyan) !important; color: var(--cyan) !important; transform: translate(2px, -2px); }
      .project-card:hover .project-img { filter: grayscale(0%) brightness(0.85) !important; transform: scale(1.03); }
      @media (max-width: 900px) { .projects-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      @media (max-width: 600px) { .projects-grid { grid-template-columns: 1fr !important; } }
    `}</style>
  </section>
);

export default ProjectsSection;
