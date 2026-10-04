import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projectData = [
  {
    id: "mamak",
    num: "01",
    title: "Mamak Food Calories Estimation Based on Image Classification",
    desc: "One photo can simplify the time-consuming task of manually calculating food calories.",
    tech: ["Python", "YoloV5", "CNN"],
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format",
  },
  {
    id: "tams",
    num: "02",
    title: "Mobile Time Attendance With Locations",
    desc: "Mobile app integrated with TAMS for remote employee attendance tracking.",
    tech: ["Flutter", ".NET", "MSSQL"],
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200&auto=format",
  },
  {
    id: "saloon",
    num: "03",
    title: "Hair Saloon Booking Mobile Application",
    desc: "A clean mobile booking flow for a hair saloon with admin management.",
    tech: ["Flutter", "PHP", "MySQL"],
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format",
  },
  {
    id: "churn",
    num: "04",
    title: "Customer Churn Prediction and Analysis Project",
    desc: "Predicting customer attrition with logistic regression, decision trees, and XGBoost.",
    tech: ["Python", "Pandas", "XGBoost"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format",
  },
  {
    id: "db",
    num: "05",
    title: "Database Management and Optimization Projects",
    desc: "Development and tuning of SQL scripts and migrations for large-scale data systems.",
    tech: ["MySQL", "SQL", "Tuning"],
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200&auto=format",
  },
  {
    id: "wedding",
    num: "06",
    title: "Wedding Invitation Platform",
    desc: "A platform for crafting and managing animated digital wedding invitations.",
    tech: ["React", "Tailwind", "Firebase"],
    image: "https://images.pexels.com/photos/18535623/pexels-photo-18535623.jpeg?auto=compress&w=1200",
  },
];

const ArrowSvg = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const ProjectsSection = () => {
  const navigate = useNavigate();
  const pinRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    const counter = counterRef.current;
    const progress = progressRef.current;
    if (!pin || !stage || !track) return;

    const cards = Array.from(track.querySelectorAll<HTMLElement>(".project-card"));
    const cardImages = cards.map(c => c.querySelector<HTMLElement>(".project-card-image"));

    const getMaxTranslate = () => {
      const stageW = stage.getBoundingClientRect().width;
      const isMobile = window.innerWidth <= 900;
      const intro = introRef.current;
      const introW = isMobile || !intro ? 0 : intro.getBoundingClientRect().width;
      const padRight = parseFloat(getComputedStyle(track).paddingRight) || 0;
      const desiredMargin = isMobile ? 20 : 32;
      const base = Math.max(0, track.scrollWidth - padRight - (stageW - introW) + desiredMargin);
      // Extra distance so the last card's CENTER reaches viewport center, not
      // just its right edge. Equals (stageW/2 - cardWidth/2 - margin) on
      // desktop (~468px @ 1440px stage).
      const cardW = cards[0]?.offsetWidth ?? 0;
      const extra = isMobile ? 0 : Math.max(0, stageW / 2 - cardW / 2 - desiredMargin);
      return base + extra;
    };

    // Layout cache — measured on refresh/resize so the scrub callback and the
    // frame loop never read layout (no forced reflow while scrolling).
    let maxTranslate = 0;
    let viewportW = window.innerWidth;
    let tx = 0;
    let cardCenters: number[] = [];
    const measure = () => {
      viewportW = window.innerWidth;
      maxTranslate = getMaxTranslate();
      // Card centre at translate 0 = the track's untranslated left edge + the
      // card's layout offset inside the track (unaffected by card transforms).
      const trackLeft = track.getBoundingClientRect().left - tx;
      cardCenters = cards.map((c) => {
        const left = c.offsetParent === track ? c.offsetLeft : c.offsetLeft - track.offsetLeft;
        return trackLeft + left + c.offsetWidth / 2;
      });
    };

    // Per-card animated state for the rAF lerp loop
    type CardState = {
      tScale: number; tRotY: number; tTransY: number; tTransZ: number; tBlur: number; tBright: number;
      scale: number; rotY: number; transY: number; transZ: number; blur: number; bright: number;
      centered: boolean;
      transformStr: string; opacityStr: string; filterStr: string;
    };
    const states: CardState[] = cards.map(() => ({
      tScale: 1, tRotY: 0, tTransY: 0, tTransZ: 0, tBlur: 0, tBright: 1,
      scale: 1, rotY: 0, transY: 0, transZ: 0, blur: 0, bright: 1,
      centered: false,
      transformStr: "", opacityStr: "", filterStr: "",
    }));

    // rAF lerp loop — eases each card toward its target so motion stays
    // silky regardless of scroll cadence. Cards stay fully opaque & clickable
    // throughout; the depth/blur effect provides the cinematic feel.
    // The loop sleeps once every card has settled and is woken by scroll.
    let rafId = 0;
    let lastTime = 0;
    const tick = (now: number) => {
      // Frame-rate independent easing (0.14 per frame at 60Hz)
      const dt = lastTime ? Math.min(now - lastTime, 100) : 16.67;
      lastTime = now;
      const k = 1 - Math.pow(1 - 0.14, dt / 16.67);
      let moving = false;

      cards.forEach((card, i) => {
        const s = states[i];
        const settled =
          Math.abs(s.tScale - s.scale) < 0.0005 &&
          Math.abs(s.tRotY - s.rotY) < 0.01 &&
          Math.abs(s.tTransY - s.transY) < 0.02 &&
          Math.abs(s.tTransZ - s.transZ) < 0.1 &&
          Math.abs(s.tBlur - s.blur) < 0.01 &&
          Math.abs(s.tBright - s.bright) < 0.001;

        if (settled) {
          s.scale = s.tScale; s.rotY = s.tRotY; s.transY = s.tTransY;
          s.transZ = s.tTransZ; s.blur = s.tBlur; s.bright = s.tBright;
        } else {
          moving = true;
          s.scale  += (s.tScale  - s.scale)  * k;
          s.rotY   += (s.tRotY   - s.rotY)   * k;
          s.transY += (s.tTransY - s.transY) * k;
          s.transZ += (s.tTransZ - s.transZ) * k;
          s.blur   += (s.tBlur   - s.blur)   * k;
          s.bright += (s.tBright - s.bright) * k;
        }

        // Only touch the DOM when the rounded value actually changed
        const transformStr = `translate3d(0, ${s.transY.toFixed(2)}px, ${s.transZ.toFixed(2)}px) rotateY(${s.rotY.toFixed(2)}deg) scale(${s.scale.toFixed(3)})`;
        if (transformStr !== s.transformStr) {
          s.transformStr = transformStr;
          card.style.transform = transformStr;
        }
        const opacityStr = s.bright.toFixed(3);
        if (opacityStr !== s.opacityStr) {
          s.opacityStr = opacityStr;
          card.style.opacity = opacityStr;
        }
        const ci = cardImages[i];
        const filterStr = s.blur < 0.05 ? "none" : `blur(${s.blur.toFixed(1)}px)`;
        if (ci && filterStr !== s.filterStr) {
          s.filterStr = filterStr;
          ci.style.filter = filterStr;
        }
      });

      if (moving) {
        rafId = requestAnimationFrame(tick);
      } else {
        rafId = 0;
        lastTime = 0;
      }
    };
    const wake = () => {
      if (!rafId) rafId = requestAnimationFrame(tick);
    };

    let activeIdx = -1;
    const computeTargets = (p: number) => {
      tx = -p * maxTranslate;
      track.style.transform = `translate3d(${tx.toFixed(2)}px, 0, 0)`;

      // Focal point = viewport center. No bias — first card naturally sits
      // here at p=0 because the intro column pushes the track rightward.
      const focal = viewportW / 2;
      let bestIdx = 0;
      let bestDist = Infinity;
      states.forEach((s, i) => {
        const d = cardCenters[i] + tx - focal;
        const ad = Math.abs(d);
        if (ad < bestDist) { bestDist = ad; bestIdx = i; }
        const dn = Math.min(1, ad / (viewportW * 0.55));
        s.tScale = 1 - dn * 0.10;
        s.tRotY = (d / (viewportW / 2)) * -5;
        s.tTransY = dn * 12;
        s.tTransZ = -dn * 200;
        s.tBlur = dn * 3.2;
        s.tBright = 1 - dn * 0.22;
      });

      states.forEach((s, i) => {
        const wasCentered = s.centered;
        s.centered = i === bestIdx && bestDist < viewportW * 0.18;
        if (s.centered !== wasCentered) cards[i].classList.toggle("is-centered", s.centered);
      });

      if (progress) progress.style.setProperty("--proj-progress", p.toFixed(4));
      if (counter && bestIdx !== activeIdx) {
        activeIdx = bestIdx;
        counter.textContent = `${String(bestIdx + 1).padStart(2, "0")} / ${String(projectData.length).padStart(2, "0")}`;
      }
      wake();
    };

    measure();

    const st = ScrollTrigger.create({
      trigger: pin,
      start: "top top",
      end: () => "+=" + Math.max(getMaxTranslate() * 1.15, window.innerHeight * 0.5),
      pin: stage,
      scrub: 2.0,
      invalidateOnRefresh: true,
      onRefresh: (self) => {
        measure();
        computeTargets(self.progress);
      },
      onUpdate: (self) => { computeTargets(self.progress); },
    });

    // Prime targets at current scroll
    computeTargets(st.progress);

    // Debounced — a refresh re-measures every trigger on the page
    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);
    };
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);

    // Subtle image parallax on hover (composes with scroll-driven card transform)
    cards.forEach((card) => {
      const img = card.querySelector<HTMLImageElement>(".project-card-image img");
      if (!img) return;
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
        img.style.transform = `scale(1.14) translate(${x}px, ${y}px)`;
      };
      const onLeave = () => { img.style.transform = ""; };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(resizeTimer);
      st.kill();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  const handleCardClick = (project: typeof projectData[0]) => {
    navigate("/view", {
      state: {
        id: project.id,
        title: project.title,
        description: project.desc,
        tech: project.tech,
        imageUrl: project.image,
        link: "#",
      },
    });
  };

  return (
    <section id="projects" className="projects">
      <div className="projects-pin" ref={pinRef}>
        <div className="projects-stage" ref={stageRef}>
          <aside className="projects-intro" ref={introRef}>
            <div className="projects-intro-num reveal">— 02 / Selected work</div>
            <h2 className="section-title projects-title">
              Featured<br />
              <em>projects</em>
            </h2>
            <p className="projects-intro-blurb reveal">
              Selected works across web, mobile, and AI architectures. Scroll to traverse —
              each card is a case study.
            </p>
            <div className="projects-progress" ref={progressRef}>
              <div className="projects-progress-bar" />
              <div className="projects-progress-meta">
                <span ref={counterRef}>01 / 06</span>
                <span>Scroll to traverse</span>
              </div>
            </div>
          </aside>

          <div className="projects-track" ref={trackRef}>
            {projectData.map((project) => (
              <div
                key={project.id}
                className="project-card"
                onClick={() => handleCardClick(project)}
              >
                <div className="project-card-image">
                  <img src={project.image} alt={project.title} loading="lazy" decoding="async" />
                </div>
                <span className="project-card-num">{project.num}</span>
                <div className="project-card-arrow">
                  <ArrowSvg />
                </div>
                <div className="project-card-foot">
                  <div className="project-card-tech">
                    {project.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                  <div className="project-card-title">{project.title}</div>
                  <div className="project-card-desc">{project.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
