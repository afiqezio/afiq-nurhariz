import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageModal from "@/components/ImageModal";
import { projectData, ProjectData } from "@/data/projectData";
import { Project } from "@/types";
import { CleanNav } from "@/components/reactbits";
import { navItems } from "@/constants/data";

const View = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state as Project & ProjectData;
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <CleanNav items={navItems} />
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="glass p-8 rounded-3xl border border-slate-800">
            <p className="text-slate-400">Project not found.</p>
          </div>
        </div>
      </div>
    );
  }

  const currentProjectData = projectData[project.title];

  if (!currentProjectData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-50">
        <CleanNav items={navItems} />
        <div className="min-h-screen flex items-center justify-center px-6">
          <div className="glass p-8 rounded-3xl border border-slate-800">
            <p className="text-slate-400">Project details not found.</p>
          </div>
        </div>
      </div>
    );
  }

  // Get project image URL - use imageUrl from project if available, otherwise fallback to first project detail image
  const projectImage = project.imageUrl || currentProjectData.images[0]?.url || '';
  const caseStudy = currentProjectData.caseStudy;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 pb-24">
      {/* Top Header */}
      <div className="sticky top-0 z-50 glass border-b border-white/5 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
            aria-label="Go back to projects"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="font-medium text-sm">Back</span>
          </button>
          <div className="text-[10px] font-mono text-slate-500 tracking-[0.25em] uppercase">
            Case Study &mdash; {project.id}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-[55vh] overflow-hidden">
        <img
          src={projectImage}
          alt={project.title}
          className="w-full h-full object-cover opacity-50"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-slate-950/10" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-2 mb-5 flex-wrap">
              {project.tech.slice(0, 3).map((tag) => (
                <span key={tag} className="px-3 py-1 bg-slate-900/80 text-slate-300 text-[10px] font-bold tracking-widest uppercase rounded-full backdrop-blur-sm border border-slate-700/60">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-black tracking-tight mb-4 text-white leading-[1.02]">
              {project.title}
            </h1>
            <p className="text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed font-light">
              {project.description}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 mt-16 grid grid-cols-1 lg:grid-cols-3 gap-12 pb-24">
        {/* Main Narrative */}
        <div className="lg:col-span-2 space-y-16">
          {/* Problem Section */}
          {caseStudy && (
            <section>
              <p className="eyebrow text-primary-400 mb-3">01 &mdash; The Problem</p>
              <p className="text-xl text-slate-300 leading-relaxed font-light">
                {caseStudy.problem}
              </p>
            </section>
          )}

          {/* Project Gallery */}
          <section className="space-y-6">
            <p className="eyebrow text-slate-500">Project Gallery</p>
            {currentProjectData.images.length > 0 && (
              <>
                {currentProjectData.images.length >= 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentProjectData.images.slice(0, 2).map((image, index) => (
                      <div 
                        key={index}
                        className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 aspect-video group relative cursor-pointer"
                        onClick={() => setSelectedImageIndex(index)}
                      >
                        <img 
                          src={image.url} 
                          alt={image.alt} 
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <span className="text-xs font-mono text-white">{image.caption}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {currentProjectData.images.length > 2 && (
                  <div className="w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 aspect-[21/9] group relative cursor-pointer">
                    <img 
                      src={currentProjectData.images[2].url} 
                      alt={currentProjectData.images[2].alt} 
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                      onClick={() => setSelectedImageIndex(2)}
                    />
                    <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-slate-950 to-transparent">
                      <p className="text-sm text-slate-300">{currentProjectData.images[2].caption}</p>
                    </div>
                  </div>
                )}
                {currentProjectData.images.length > 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {currentProjectData.images.slice(3).map((image, index) => (
                      <div 
                        key={index + 3}
                        className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 aspect-video group relative cursor-pointer"
                        onClick={() => setSelectedImageIndex(index + 3)}
                      >
                        <img 
                          src={image.url} 
                          alt={image.alt} 
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                          <span className="text-xs font-mono text-white">{image.caption}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </section>

          {/* Challenge Section */}
          {caseStudy && (
            <section>
              <p className="eyebrow text-accent-ai mb-3">02 &mdash; The Challenge</p>
              <p className="text-xl text-slate-300 leading-relaxed font-light">
                {caseStudy.challenge}
              </p>
            </section>
          )}

          {/* Solution Section */}
          {caseStudy && (
            <section className="p-8 md:p-10 rounded-2xl bg-slate-900 border border-slate-800 relative overflow-hidden group card-highlight">
              <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-32 w-32 text-accent-mobile" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <p className="eyebrow text-accent-mobile mb-5">03 &mdash; The Solution</p>
              <p className="text-lg text-slate-400 leading-relaxed">
                {caseStudy.solution}
              </p>
            </section>
          )}

          {/* Additional Details */}
          {!caseStudy && (
            <>
              <section>
                <p className="eyebrow text-primary-400 mb-3">Project Overview</p>
                <p className="text-xl text-slate-300 leading-relaxed font-light">
                  {currentProjectData.overview}
                </p>
              </section>

              {currentProjectData.features.length > 0 && (
                <section>
                  <p className="eyebrow text-primary-400 mb-4">Key Features</p>
                  <ul className="space-y-3">
                    {currentProjectData.features.map((feature, index) => (
                      <li key={index} className="text-base text-slate-300 leading-relaxed flex items-start gap-3">
                        <span className="text-primary-400 mt-1.5 text-xs">●</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {currentProjectData.challenges.length > 0 && (
                <section>
                  <p className="eyebrow text-primary-400 mb-4">Challenges &amp; Solutions</p>
                  <div className="space-y-6">
                    {currentProjectData.challenges.map((challenge, index) => (
                      <div key={index}>
                        <h3 className="text-base font-semibold text-slate-200 mb-2">{challenge.title}</h3>
                        <p className="text-base text-slate-400 leading-relaxed">{challenge.description}</p>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </>
          )}
        </div>

        {/* Sidebar Details - matches example (glass, plain span for tech) */}
        <div className="space-y-12">
          {/* Tech Stack */}
          <div className="glass p-7 rounded-2xl border border-slate-800 card-highlight">
            <p className="eyebrow text-slate-500 mb-5">Stack Architecture</p>
            <div className="flex flex-wrap gap-2">
              {(caseStudy?.techStack ?? project.tech).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 bg-slate-800 rounded-lg text-xs font-mono text-slate-300 border border-slate-700"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Key Results */}
          {caseStudy && caseStudy.results.length > 0 && (
            <div className="glass p-7 rounded-2xl border border-slate-800 card-highlight">
              <p className="eyebrow text-slate-500 mb-5">Impact &amp; Results</p>
              <ul className="space-y-6">
                {caseStudy.results.map((result, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-[10px] font-bold">
                      {i + 1}
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {result}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Features (if no case study) */}
          {!caseStudy && currentProjectData.features.length > 0 && (
            <div className="glass p-7 rounded-2xl border border-slate-800 card-highlight">
              <p className="eyebrow text-slate-500 mb-5">Key Features</p>
              <ul className="space-y-4">
                {currentProjectData.features.map((feature, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/20 text-primary-400 flex items-center justify-center text-[10px] font-bold">
                      {i + 1}
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed">
                      {feature}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Duration */}
          {currentProjectData.duration && (
            <div className="glass p-7 rounded-2xl border border-slate-800 card-highlight">
              <p className="eyebrow text-slate-500 mb-3">Project Duration</p>
              <p className="text-base text-slate-300 font-semibold">{currentProjectData.duration}</p>
            </div>
          )}

          {/* Call to Action */}
          <div className="p-7 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-ai flex flex-col items-center text-center relative overflow-hidden">
            <div className="absolute inset-0 dot-pattern opacity-10 pointer-events-none" />
            <h3 className="text-lg font-bold mb-2 relative">Ready to collaborate?</h3>
            <p className="text-primary-100/80 text-sm mb-6 relative leading-relaxed">
              Let&apos;s discuss how I can bring similar innovation to your project.
            </p>
            <a
              href="mailto:afiqnurhariz@gmail.com"
              className="w-full py-3 bg-white text-slate-950 font-bold rounded-xl hover:bg-slate-100 transition-colors flex items-center justify-center text-sm relative"
              aria-label="Contact Afiq via email"
            >
              Contact Afiq
            </a>
          </div>

          {/* Documentation */}
          {currentProjectData.documentUrl && (
            <button
              type="button"
              className="w-full py-3.5 rounded-xl border border-slate-700 bg-slate-900/60 text-slate-300 font-semibold hover:bg-slate-800 hover:border-slate-600 hover:text-white transition-all text-sm"
              onClick={() => window.open(currentProjectData.documentUrl, "_blank")}
            >
              View Project Docs
            </button>
          )}
        </div>
      </div>

      {/* Image Modal */}
      <ImageModal
        isOpen={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
        images={currentProjectData.images}
        currentIndex={selectedImageIndex ?? 0}
      />
    </div>
  );
};

export default View;
