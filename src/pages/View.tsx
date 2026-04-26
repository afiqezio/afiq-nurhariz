import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageModal from "@/components/ImageModal";
import { projectData, ProjectData } from "@/data/projectData";
import { Project } from "@/types";
import { CleanNav } from "@/components/reactbits";
import { navItems } from "@/constants/data";
import CustomCursor from "@/components/CustomCursor";

/* ── shared card style ── */
const glassCard: React.CSSProperties = {
  background: 'var(--bg2)',
  border: '1px solid rgba(34,211,238,0.12)',
  borderRadius: 8,
  backdropFilter: 'blur(12px)',
  padding: '28px 32px',
};

/* ── section label ── */
const SectionLabel = ({ n, text, color }: { n: string; text: string; color?: string }) => (
  <p style={{
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 11, letterSpacing: '0.16em',
    color: color ?? 'var(--cyan)',
    textTransform: 'uppercase',
    marginBottom: 16,
  }}>
    {n}. {text}
  </p>
);

const View = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state as Project & ProjectData;
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* ── not-found states ── */
  if (!project) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
        <CleanNav items={navItems} />
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
          <div style={{ ...glassCard }}>
            <p style={{ color: 'var(--muted)' }}>Project not found.</p>
          </div>
        </div>
      </div>
    );
  }

  const currentProjectData = projectData[project.title];

  if (!currentProjectData) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>
        <CleanNav items={navItems} />
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
          <div style={{ ...glassCard }}>
            <p style={{ color: 'var(--muted)' }}>Project details not found.</p>
          </div>
        </div>
      </div>
    );
  }

  const projectImage = project.imageUrl || currentProjectData.images[0]?.url || '';
  const caseStudy = currentProjectData.caseStudy;

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', paddingBottom: 96 }}>
      <CustomCursor />

      {/* ── Sticky header ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--frosted-bg)',
        borderBottom: '1px solid var(--line)',
        backdropFilter: 'blur(20px) saturate(180%)',
        padding: '0 clamp(24px,5vw,80px)',
        height: 60,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <button
          onClick={() => navigate(-1)}
          className="view-back-btn"
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            color: 'var(--muted)', background: 'none', border: 'none',
            cursor: 'pointer', fontSize: 13, fontWeight: 500,
            transition: 'color 0.2s',
          }}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back
        </button>
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 11, letterSpacing: '0.14em',
          color: 'var(--cyan)', textTransform: 'uppercase',
        }}>
          Project // {project.id}
        </span>
      </div>

      {/* ── Hero banner ── */}
      <div style={{ position: 'relative', width: '100%', height: '60vh', overflow: 'hidden' }}>
        <img
          src={projectImage}
          alt={project.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.55)' }}
          loading="eager"
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, var(--bg) 0%, transparent 50%, transparent 80%, var(--bg) 100%)',
        }} />
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: 'clamp(24px,4vw,64px) clamp(24px,5vw,80px)',
        }}>
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
              {project.tech.slice(0, 3).map(tag => (
                <span key={tag} style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 10, letterSpacing: '0.08em',
                  color: 'var(--cyan)',
                  border: '1px solid rgba(34,211,238,0.35)',
                  padding: '4px 10px', borderRadius: 3,
                  background: 'var(--cyan-dim)',
                  backdropFilter: 'blur(8px)',
                }}>
                  {tag}
                </span>
              ))}
            </div>
            <h1 style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(28px,4.5vw,64px)',
              fontWeight: 700, letterSpacing: '-0.03em',
              lineHeight: 1.1, marginBottom: 12,
              color: 'var(--text)',
            }}>
              {project.title}
            </h1>
            <p style={{
              fontSize: 'clamp(14px,1.4vw,18px)',
              color: 'var(--muted)', maxWidth: 600,
              lineHeight: 1.7, fontWeight: 400,
            }}>
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '64px clamp(24px,5vw,80px) 0',
        display: 'grid',
        gridTemplateColumns: '1fr 340px',
        gap: 48,
      }} className="view-content-grid">

        {/* ── Left column ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>

          {/* Problem */}
          {caseStudy && (
            <section>
              <SectionLabel n="01" text="The Problem" />
              <p style={{ fontSize: 18, color: 'var(--muted)', lineHeight: 1.8, fontWeight: 400 }}>
                {caseStudy.problem}
              </p>
            </section>
          )}

          {/* Gallery */}
          <section>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 11, letterSpacing: '0.16em',
              color: 'var(--subtle)', textTransform: 'uppercase', marginBottom: 20,
            }}>
              Project Gallery
            </p>
            {currentProjectData.images.length >= 2 && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
                {currentProjectData.images.slice(0, 2).map((img, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    style={{
                      borderRadius: 8, overflow: 'hidden',
                      border: '1px solid var(--line)',
                      background: 'var(--bg2)',
                      aspectRatio: '16/9', cursor: 'pointer',
                      position: 'relative',
                    }}
                    className="gallery-tile"
                  >
                    <img src={img.url} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, transition: 'opacity 0.2s' }} className="gallery-img" />
                    <div className="gallery-overlay" style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(13,15,20,0.8), transparent)',
                      opacity: 0, transition: 'opacity 0.2s',
                      display: 'flex', alignItems: 'flex-end', padding: 12,
                    }}>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'var(--text)' }}>{img.caption}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            {currentProjectData.images.length > 2 && (
              <div
                onClick={() => setSelectedImageIndex(2)}
                style={{
                  borderRadius: 8, overflow: 'hidden',
                  border: '1px solid var(--line)',
                  background: 'var(--bg2)',
                  aspectRatio: '21/9', cursor: 'pointer',
                  position: 'relative', marginBottom: 12,
                }}
                className="gallery-tile"
              >
                <img src={currentProjectData.images[2].url} alt={currentProjectData.images[2].alt} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} className="gallery-img" />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: 16,
                  background: 'linear-gradient(to top, rgba(13,15,20,0.85), transparent)',
                }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'var(--muted)' }}>{currentProjectData.images[2].caption}</span>
                </div>
              </div>
            )}
            {currentProjectData.images.length > 3 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
                {currentProjectData.images.slice(3).map((img, idx) => (
                  <div
                    key={idx + 3}
                    onClick={() => setSelectedImageIndex(idx + 3)}
                    style={{
                      borderRadius: 8, overflow: 'hidden',
                      border: '1px solid var(--line)',
                      background: 'var(--bg2)',
                      aspectRatio: '16/9', cursor: 'pointer',
                      position: 'relative',
                    }}
                    className="gallery-tile"
                  >
                    <img src={img.url} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} className="gallery-img" />
                    <div className="gallery-overlay" style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(13,15,20,0.8), transparent)',
                      opacity: 0, transition: 'opacity 0.2s',
                      display: 'flex', alignItems: 'flex-end', padding: 12,
                    }}>
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'var(--text)' }}>{img.caption}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          {/* Challenge */}
          {caseStudy && (
            <section>
              <SectionLabel n="02" text="The Challenge" />
              <p style={{ fontSize: 18, color: 'var(--muted)', lineHeight: 1.8, fontWeight: 400 }}>
                {caseStudy.challenge}
              </p>
            </section>
          )}

          {/* Solution */}
          {caseStudy && (
            <section style={{
              ...glassCard,
              position: 'relative', overflow: 'hidden',
            }}>
              <div style={{
                position: 'absolute', top: -24, right: -24,
                width: 120, height: 120,
                background: 'var(--cyan-dim)',
                borderRadius: '50%',
                filter: 'blur(32px)',
              }} />
              <SectionLabel n="03" text="The Solution" />
              <p style={{ fontSize: 16, color: 'var(--muted)', lineHeight: 1.8 }}>
                {caseStudy.solution}
              </p>
            </section>
          )}

          {/* Overview + features + challenges (when no caseStudy) */}
          {!caseStudy && (
            <>
              <section>
                <SectionLabel n="01" text="Project Overview" />
                <p style={{ fontSize: 18, color: 'var(--muted)', lineHeight: 1.8, fontWeight: 400 }}>
                  {currentProjectData.overview}
                </p>
              </section>
              {currentProjectData.features.length > 0 && (
                <section>
                  <SectionLabel n="02" text="Key Features" />
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {currentProjectData.features.map((f, i) => (
                      <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 16, color: 'var(--muted)', lineHeight: 1.7 }}>
                        <span style={{ color: 'var(--cyan)', marginTop: 4, flexShrink: 0 }}>—</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {currentProjectData.challenges.length > 0 && (
                <section>
                  <SectionLabel n="03" text="Challenges & Solutions" />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                    {currentProjectData.challenges.map((c, i) => (
                      <div key={i}>
                        <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 6 }}>{c.title}</p>
                        <p style={{ fontSize: 15, color: 'var(--muted)', lineHeight: 1.7 }}>{c.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>

        {/* ── Right sidebar ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

          {/* Tech stack */}
          <div style={glassCard}>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 10, letterSpacing: '0.14em',
              textTransform: 'uppercase', color: 'var(--subtle)', marginBottom: 16,
            }}>
              Stack Architecture
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {(caseStudy?.techStack ?? project.tech).map(tech => (
                <span key={tech} style={{
                  padding: '5px 10px',
                  background: 'var(--bg3)',
                  border: '1px solid var(--line)',
                  borderRadius: 4,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: 11, color: 'var(--text)',
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Results */}
          {caseStudy && caseStudy.results.length > 0 && (
            <div style={glassCard}>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'var(--subtle)', marginBottom: 20,
              }}>
                Impact &amp; Results
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16 }}>
                {caseStudy.results.map((r, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12 }}>
                    <span style={{
                      flexShrink: 0,
                      width: 22, height: 22, borderRadius: '50%',
                      background: 'var(--cyan-dim)',
                      border: '1px solid rgba(34,211,238,0.25)',
                      display: 'grid', placeItems: 'center',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 10, color: 'var(--cyan)', fontWeight: 700,
                    }}>
                      {i + 1}
                    </span>
                    <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{r}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Features sidebar (no caseStudy) */}
          {!caseStudy && currentProjectData.features.length > 0 && (
            <div style={glassCard}>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'var(--subtle)', marginBottom: 20,
              }}>
                Key Features
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {currentProjectData.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', gap: 12 }}>
                    <span style={{
                      flexShrink: 0,
                      width: 22, height: 22, borderRadius: '50%',
                      background: 'var(--cyan-dim)',
                      border: '1px solid rgba(34,211,238,0.25)',
                      display: 'grid', placeItems: 'center',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: 10, color: 'var(--cyan)', fontWeight: 700,
                    }}>
                      {i + 1}
                    </span>
                    <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{f}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Duration */}
          {currentProjectData.duration && (
            <div style={glassCard}>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10, letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'var(--subtle)', marginBottom: 10,
              }}>
                Project Duration
              </p>
              <p style={{ fontSize: 16, fontWeight: 600, color: 'var(--text)' }}>
                {currentProjectData.duration}
              </p>
            </div>
          )}

          {/* CTA */}
          <div style={{
            padding: '28px 32px', borderRadius: 8,
            background: 'var(--cyan)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
          }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--bg)', marginBottom: 8 }}>
              Ready to start?
            </h3>
            <p style={{ fontSize: 13, color: 'rgba(13,15,20,0.7)', marginBottom: 20, lineHeight: 1.5 }}>
              Discuss how I can bring similar innovation to your project.
            </p>
            <a
              href="mailto:afiqnurhariz@gmail.com"
              style={{
                display: 'block', width: '100%',
                padding: '10px 0', borderRadius: 4,
                background: 'var(--bg)', color: 'var(--cyan)',
                fontWeight: 700, fontSize: 14,
                fontFamily: 'JetBrains Mono, monospace',
                letterSpacing: '0.04em',
                textDecoration: 'none', textAlign: 'center',
                transition: 'opacity 0.2s',
              }}
              className="cta-contact-btn"
            >
              Contact Afiq
            </a>
          </div>

          {/* Docs */}
          {currentProjectData.documentUrl && (
            <div style={glassCard}>
              <button
                onClick={() => window.open(currentProjectData.documentUrl, '_blank')}
                style={{
                  width: '100%', padding: '11px 0', borderRadius: 4,
                  border: '1px solid var(--line)',
                  background: 'var(--bg2)', color: 'var(--text)',
                  fontWeight: 600, fontSize: 14, cursor: 'pointer',
                  transition: 'border-color 0.2s, background 0.2s',
                  fontFamily: 'Space Grotesk, sans-serif',
                }}
                className="view-doc-btn"
              >
                View Project
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Image modal */}
      <ImageModal
        isOpen={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
        images={currentProjectData.images}
        currentIndex={selectedImageIndex ?? 0}
      />

      <style>{`
        .view-back-btn:hover { color: var(--text) !important; }
        .gallery-tile:hover .gallery-img { opacity: 1 !important; }
        .gallery-tile:hover .gallery-overlay { opacity: 1 !important; }
        .cta-contact-btn:hover { opacity: 0.85; }
        .view-doc-btn:hover { border-color: var(--cyan) !important; background: var(--cyan-dim) !important; }
        @media (max-width: 900px) {
          .view-content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default View;
