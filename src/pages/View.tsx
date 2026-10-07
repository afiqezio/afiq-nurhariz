import { lazy, Suspense, useState, useEffect, useRef, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ImageModal from "@/components/ImageModal";
import ProjectFilm from "@/components/ProjectFilm";
import CustomCursor from "@/components/CustomCursor";
import Footer from "@/components/Footer";
import { projectData } from "@/data/projectData";
import { projectList, toProjectState } from "@/data/projectList";
import { Project } from "@/types";
import { scrollToY } from "@/lib/smoothScroll";

gsap.registerPlugin(ScrollTrigger);

const ThreeScene = lazy(() => import("@/components/ThreeScene"));

const projectOrder = [
  "Mamak Food Calories Estimation Based on Image Classification",
  "Mobile Time Attendance With Locations",
  "Hair Saloon Booking Mobile Application",
  "Customer Churn Prediction and Analysis Project",
  "Database Management and Optimization Projects",
  "Wedding Invitation Platform",
  "Hermes Agent: Telegram-Driven AI Software Factory",
] as const;

const projectMeta: Record<string, { year: string; type: string; role: string; idShort: string }> = {
  "Mamak Food Calories Estimation Based on Image Classification": { year: "2024", type: "AI · Computer Vision", role: "Solo · Research & Engineering", idShort: "mamak" },
  "Mobile Time Attendance With Locations": { year: "2023", type: "Mobile · Enterprise", role: "Mobile · Backend integration", idShort: "tams" },
  "Hair Saloon Booking Mobile Application": { year: "2023", type: "Mobile · Bookings", role: "Mobile · Backend · UX", idShort: "saloon" },
  "Customer Churn Prediction and Analysis Project": { year: "2023", type: "Data Science · ML", role: "Solo · Research", idShort: "churn" },
  "Database Management and Optimization Projects": { year: "2023", type: "Data Engineering", role: "Data Engineer · DBA", idShort: "db" },
  "Wedding Invitation Platform": { year: "2024", type: "Web · Product", role: "Solo · Product & Engineering", idShort: "wedding" },
  "Hermes Agent: Telegram-Driven AI Software Factory": { year: "2026", type: "AI · Agent Infrastructure", role: "Solo · Architecture & Operations", idShort: "hermes" },
};

const SECTION_IDS = ["overview", "problem", "approach", "gallery", "solution", "results"] as const;

const splitForReveal = (root: HTMLElement) => {
  if (root.dataset.splitDone === "1") return;
  const wrapTextNode = (textNode: Node): DocumentFragment => {
    const text = textNode.textContent ?? "";
    const frag = document.createDocumentFragment();
    if (!text.trim()) {
      frag.appendChild(document.createTextNode(text));
      return frag;
    }
    const tokens = text.split(/(\s+)/);
    tokens.forEach((tok) => {
      if (!tok) return;
      if (/^\s+$/.test(tok)) {
        frag.appendChild(document.createTextNode(tok));
        return;
      }
      const mask = document.createElement("span");
      mask.className = "split-mask";
      const w = document.createElement("span");
      w.className = "w";
      w.textContent = tok;
      mask.appendChild(w);
      frag.appendChild(mask);
    });
    return frag;
  };

  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = wrapTextNode(child);
        node.insertBefore(frag, child);
        node.removeChild(child);
      } else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName !== "BR") {
        walk(child);
      }
    });
  };

  walk(root);
  root.dataset.splitDone = "1";
};

const View = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const project = location.state as Project | null;
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>("overview");
  const [headerShown, setHeaderShown] = useState(false);
  const mainRef = useRef<HTMLElement>(null);

  const currentProjectData = project ? projectData[project.title as keyof typeof projectData] : undefined;

  const nextProject = useMemo(() => {
    if (!project) return null;
    const idx = projectOrder.indexOf(project.title as typeof projectOrder[number]);
    const nextIdx = (idx + 1) % projectOrder.length;
    const nextTitle = projectOrder[nextIdx];
    const nextData = projectData[nextTitle as keyof typeof projectData];
    const nextItem = projectList.find((p) => p.title === nextTitle);
    if (!nextData || !nextItem) return null;
    return {
      idx: nextIdx,
      title: nextTitle,
      tech: nextData.caseStudy?.techStack ?? nextItem.tech,
      item: nextItem,
    };
  }, [project]);

  const numLabel = useMemo(() => {
    if (!project) return "—";
    const idx = projectOrder.indexOf(project.title as typeof projectOrder[number]);
    if (idx < 0) return "—";
    return `${String(idx + 1).padStart(2, "0")} / ${String(projectOrder.length).padStart(2, "0")}`;
  }, [project]);

  // Summary films are numbered to match the case-study order
  const filmSrc = useMemo(() => {
    if (!project) return null;
    const idx = projectOrder.indexOf(project.title as typeof projectOrder[number]);
    if (idx < 0) return null;
    return `assets/videos/${String(idx + 1).padStart(2, "0")}.mp4`;
  }, [project]);

  useEffect(() => {
    scrollToY(0, { immediate: true });
    setActiveSection("overview");
  }, [project?.title]);

  // Header stays hidden while the film owns the screen
  useEffect(() => {
    if (!filmSrc) return;
    setHeaderShown(false);
    const st = ScrollTrigger.create({
      trigger: ".pp-film",
      start: "bottom 12%",
      onEnter: () => setHeaderShown(true),
      onLeaveBack: () => setHeaderShown(false),
    });
    return () => st.kill();
  }, [filmSrc]);

  useEffect(() => {
    const heroEl = document.querySelector<HTMLElement>(".pp-hero");
    const nextEl = document.querySelector<HTMLElement>(".pp-next");
    const bar = document.querySelector<HTMLElement>(".pp-progress");
    if (!heroEl || !nextEl || !bar) return;

    // Measure on resize only; the scroll handler just does arithmetic and
    // writes the variable on the bar itself (not :root, which would restyle
    // the whole document every frame).
    let start = 0;
    let total = 0;
    let viewportH = window.innerHeight;
    const handleScroll = () => {
      if (total <= 0) return;
      const p = Math.max(0, Math.min(1, (window.scrollY - start + viewportH * 0.4) / total));
      bar.style.setProperty("--read-progress", p.toFixed(4));
    };
    const measure = () => {
      start = heroEl.offsetTop;
      total = nextEl.offsetTop - start;
      viewportH = window.innerHeight;
      handleScroll();
    };
    measure();
    const pageObserver = new ResizeObserver(measure);
    pageObserver.observe(document.body);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      pageObserver.disconnect();
    };
  }, [project?.title]);

  useEffect(() => {
    if (!currentProjectData) return;

    const observers: IntersectionObserver[] = [];
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-30% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [currentProjectData]);

  useEffect(() => {
    const main = mainRef.current;
    if (!currentProjectData || !main) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // Titles rise word by word
      gsap.utils.toArray<HTMLElement>(".pp-hero-title, .pp-section-title").forEach((el) => {
        splitForReveal(el);
        const words = el.querySelectorAll(".w");
        gsap.set(words, { yPercent: 110 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 88%",
          once: true,
          onEnter: () => {
            gsap.to(words, { yPercent: 0, duration: 1.05, ease: "expo.out", stagger: 0.04 });
          },
        });
      });

      // Intro fades up as it rises over the film
      const heroIn = { trigger: ".pp-hero", start: "top 85%", once: true };
      gsap.from(".pp-hero-meta", { opacity: 0, y: 14, duration: 0.7, ease: "expo.out", scrollTrigger: heroIn });
      gsap.from(".pp-hero-blurb", { opacity: 0, y: 20, duration: 0.9, delay: 0.25, ease: "expo.out", scrollTrigger: heroIn });
      gsap.from(".pp-hero-strip .pp-strip-cell", {
        opacity: 0, y: 16, duration: 0.6, ease: "expo.out", stagger: 0.06, delay: 0.45, scrollTrigger: heroIn,
      });

      if (!reduceMotion) {
        // Layered depth — each layer drifts at its own speed (positive = rises
        // faster than the scroll). Scrubs --py, which .pp-par maps to `translate`,
        // so it never fights the reveal tweens on `transform`.
        const drift = (el: Element, amt: number, trigger: Element = el) => {
          el.classList.add("pp-par");
          gsap.fromTo(el, { "--py": `${amt}px` }, {
            "--py": `${-amt}px`, ease: "none",
            scrollTrigger: { trigger, start: "top bottom", end: "bottom top", scrub: true },
          });
        };
        const layers: [string, number][] = [
          [".pp-hero--after .pp-hero-title", 40],
          [".pp-hero--after .pp-hero-blurb", 70],
          [".pp-pullquote", 36],
          [".pp-next-title", 50],
        ];
        layers.forEach(([selector, amt]) => {
          gsap.utils.toArray<HTMLElement>(selector).forEach((el) => drift(el, amt));
        });

        // Alternating challenge cards move at different speeds
        gsap.utils.toArray<HTMLElement>(".pp-challenges").forEach((grid) => {
          Array.from(grid.children).forEach((el, i) => drift(el, i % 2 ? 46 : 18, grid));
        });
      }

      // Content reveal
      gsap.utils
        .toArray<HTMLElement>(".pp-prose p, .pp-pullquote, .pp-feature, .pp-challenge, .pp-result, .pp-shot, .pp-steps li")
        .forEach((el) => {
          gsap.from(el, {
            y: 24, opacity: 0, duration: 0.8, ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          });
        });
    }, main);

    return () => ctx.revert();
  }, [currentProjectData]);

  const handleTocClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    scrollToY(el.getBoundingClientRect().top + window.scrollY - 80);
  };

  const handleNextProject = () => {
    if (!nextProject) return;
    navigate("/view", { state: toProjectState(nextProject.item) });
  };

  if (!project || !currentProjectData) {
    return (
      <div className="pp-body">
        <CustomCursor />
        <canvas id="scene-canvas" />
        <Suspense fallback={null}>
          <ThreeScene maxDpr={1} />
        </Suspense>
        <div className="bg-grain" />
        <div className="bg-vignette" />
        <header className="pp-header is-shown">
          <button type="button" className="pp-back" onClick={() => navigate(-1)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
            Back to work
          </button>
          <div className="pp-header-mid">Case study</div>
          <div className="pp-progress" aria-hidden="true" />
        </header>
        <main style={{ position: "relative", zIndex: 3 }}>
          <section className="pp-hero">
            <div className="container">
              <div className="pp-hero-meta"><span>Case study not found</span></div>
              <h1 className="pp-hero-title">No project here.</h1>
              <p className="pp-hero-blurb">Head back to the portfolio to pick a different case study.</p>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  const caseStudy = currentProjectData.caseStudy;
  const meta = projectMeta[project.title];
  const techStack = caseStudy?.techStack ?? project.tech;
  const posterCaption = currentProjectData.images[0]?.caption ?? project.title;

  return (
    <div className="pp-body">
      <CustomCursor />
      <canvas id="scene-canvas" />
      <Suspense fallback={null}>
        <ThreeScene maxDpr={1} />
      </Suspense>
      <div className="bg-grain" />
      <div className="bg-vignette" />

      <header className={`pp-header${headerShown || !filmSrc ? " is-shown" : ""}`}>
        <button type="button" className="pp-back" onClick={() => navigate(-1)}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to work
        </button>
        <div className="pp-header-mid">
          Case study <b>· {numLabel} ·</b> {project.title}
        </div>
        <div className="pp-progress" aria-hidden="true" />
      </header>

      {/* Keyed per project: the reveal effects rewrite this DOM (word masks,
          inline styles), so the next case study must start from fresh nodes */}
      <main key={project.title} ref={mainRef} style={{ position: "relative", zIndex: 3 }}>
        {filmSrc && (
          <ProjectFilm
            key={filmSrc}
            src={filmSrc}
            onBack={() => navigate(-1)}
          />
        )}

        <section className={`pp-hero${filmSrc ? " pp-hero--after" : ""}`}>
          <div className="container">
            <div className="pp-hero-meta">
              <span>Case study</span>
              <span className="dot" />
              <span>{meta?.type ?? "Project"}</span>
              <span className="dot" />
              <span>{meta?.year ?? "—"}</span>
            </div>
            <h1 className="pp-hero-title">{project.title}</h1>
            <p className="pp-hero-blurb">{project.description}</p>

            <div className="pp-hero-strip">
              <div className="pp-strip-cell">
                <span className="pp-strip-label">Role</span>
                <span className="pp-strip-val">{meta?.role ?? "Solo · Engineering"}</span>
              </div>
              <div className="pp-strip-cell">
                <span className="pp-strip-label">Duration</span>
                <span className="pp-strip-val">{currentProjectData.duration ?? "—"}</span>
              </div>
              <div className="pp-strip-cell">
                <span className="pp-strip-label">Type</span>
                <span className="pp-strip-val">{meta?.type ?? "Case study"}</span>
              </div>
              <div className="pp-strip-cell">
                <span className="pp-strip-label">Stack</span>
                <span className="pp-strip-chips">
                  {techStack.slice(0, 4).map((t) => <span key={t}>{t}</span>)}
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="pp-main">
          <div className="container">
            <div className="pp-main-grid">
              <aside className="pp-sidebar">
                <div className="pp-sidebar-sticky">
                  <div>
                    <div className="pp-side-block-label">Sections</div>
                    <nav className="pp-toc">
                      {[
                        { id: "overview", label: "Overview" },
                        { id: "problem", label: "The problem" },
                        { id: "approach", label: "Approach" },
                        { id: "gallery", label: "Build gallery" },
                        { id: "solution", label: "Solution" },
                        { id: "results", label: "Results" },
                      ].map((s, i) => (
                        <button
                          key={s.id}
                          type="button"
                          className={`pp-toc-item ${activeSection === s.id ? "active" : ""}`}
                          onClick={() => handleTocClick(s.id)}
                        >
                          <span className="pp-toc-num">{String(i + 1).padStart(2, "0")}</span>
                          {s.label}
                        </button>
                      ))}
                    </nav>
                  </div>

                  <div>
                    <div className="pp-side-block-label">Stack architecture</div>
                    <div className="pp-side-tech">
                      {techStack.map((t) => <span key={t}>{t}</span>)}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {currentProjectData.documentUrl ? (
                      <a className="pp-side-cta" href={currentProjectData.documentUrl} target="_blank" rel="noopener">
                        Read full document
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                      </a>
                    ) : (
                      <a className="pp-side-cta" href="mailto:afiqnurhariz@gmail.com">
                        Discuss this work
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                      </a>
                    )}
                  </div>
                </div>
              </aside>

              <div className="pp-content">
                <section className="pp-section" id="overview">
                  <div className="pp-section-head">
                    <span className="pp-section-num">01</span>
                    <h2 className="pp-section-title">Overview</h2>
                  </div>
                  <div className="pp-prose">
                    <p>{currentProjectData.overview}</p>
                  </div>
                  {caseStudy?.problem && (
                    <blockquote className="pp-pullquote">{caseStudy.problem}</blockquote>
                  )}
                </section>

                <section className="pp-section" id="problem">
                  <div className="pp-section-head">
                    <span className="pp-section-num">02</span>
                    <h2 className="pp-section-title">The <em>problem</em></h2>
                  </div>
                  <div className="pp-prose">
                    {caseStudy?.challenge && <p>{caseStudy.challenge}</p>}
                  </div>
                  {currentProjectData.challenges.length > 0 && (
                    <div className="pp-challenges">
                      {currentProjectData.challenges.map((c, i) => (
                        <article key={i} className="pp-challenge">
                          <div className="pp-challenge-label">Constraint · {String(i + 1).padStart(2, "0")}</div>
                          <h3 className="pp-challenge-title">{c.title}</h3>
                          <p className="pp-challenge-body">{c.description}</p>
                        </article>
                      ))}
                    </div>
                  )}
                </section>

                <section className="pp-section" id="approach">
                  <div className="pp-section-head">
                    <span className="pp-section-num">03</span>
                    <h2 className="pp-section-title">The approach</h2>
                  </div>
                  <div className="pp-prose">
                    <p>The pieces that make this project work — a focused selection of techniques, components and integrations.</p>
                  </div>
                  {currentProjectData.features.length > 0 && (
                    <div className="pp-features">
                      {currentProjectData.features.map((f, i) => (
                        <div key={i} className="pp-feature">
                          <div className="pp-feature-dot" />
                          <div className="pp-feature-text">{f}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                <section className="pp-section" id="gallery">
                  <div className="pp-section-head">
                    <span className="pp-section-num">04</span>
                    <h2 className="pp-section-title">Build <em>gallery</em></h2>
                  </div>
                  <div className="pp-prose">
                    <p>A walkthrough of the major artefacts produced during the build.</p>
                  </div>
                  {currentProjectData.images.length > 0 && (
                    <div className="pp-gallery">
                      {currentProjectData.images.map((img, i) => (
                        <figure
                          key={i}
                          className={`pp-shot${i === 0 ? " feature" : ""}`}
                          onClick={() => setSelectedImageIndex(i)}
                        >
                          <span className="pp-shot-num">{String(i + 1).padStart(2, "0")}</span>
                          <img src={img.url} alt={img.alt} loading="lazy" decoding="async" />
                          <figcaption className="pp-shot-caption">{img.caption}</figcaption>
                        </figure>
                      ))}
                    </div>
                  )}
                </section>

                <section className="pp-section" id="solution">
                  <div className="pp-section-head">
                    <span className="pp-section-num">05</span>
                    <h2 className="pp-section-title">The solution</h2>
                  </div>
                  <div className="pp-prose">
                    {caseStudy?.solution && <p>{caseStudy.solution}</p>}
                  </div>
                  {currentProjectData.features.length > 0 && (
                    <ol className="pp-steps">
                      {currentProjectData.features.map((step, i) => (
                        <li key={i}>
                          <span className="pp-step-num">{String(i + 1).padStart(2, "0")}</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                </section>

                <section className="pp-section" id="results">
                  <div className="pp-section-head">
                    <span className="pp-section-num">06</span>
                    <h2 className="pp-section-title">Results</h2>
                  </div>
                  <div className="pp-prose">
                    <p>The outcomes that mattered — what the project moved, and what stayed measurable after delivery.</p>
                  </div>
                  {caseStudy && caseStudy.results.length > 0 && (
                    <div className="pp-results">
                      {caseStudy.results.map((r, i) => (
                        <div key={i} className="pp-result">
                          <div className="pp-result-num">{String(i + 1).padStart(2, "0")}</div>
                          <div className="pp-result-body">{r}</div>
                          <div className="pp-result-tag">Outcome</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {currentProjectData.improvements.length > 0 && (
                    <div className="pp-prose" style={{ marginTop: 36 }}>
                      <p><strong>Next iterations:</strong> {currentProjectData.improvements.join("; ")}.</p>
                    </div>
                  )}
                </section>
              </div>
            </div>
          </div>
        </section>

        {nextProject && (
          <section className="pp-next">
            <div className="container">
              <div className="pp-next-eyebrow">— Next case study</div>
              <button type="button" className="pp-next-link" onClick={handleNextProject}>
                <div className="pp-next-info">
                  <span className="pp-next-tag">
                    {String(nextProject.idx + 1).padStart(2, "0")} / {String(projectOrder.length).padStart(2, "0")} · {nextProject.tech.slice(0, 3).join(" · ")}
                  </span>
                  <span className="pp-next-title">{nextProject.title}</span>
                </div>
                <div className="pp-next-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </div>
              </button>
            </div>
          </section>
        )}
      </main>

      <Footer />

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
