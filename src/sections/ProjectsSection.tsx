import { useEffect, useRef, useState } from "react";
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
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const pin = pinRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    const bar = progressBarRef.current;
    const counter = counterRef.current;
    if (!pin || !stage || !track) return;

    const cardWidth = 480 + 36;
    const totalWidth = cardWidth * projectData.length;
    const viewW = window.innerWidth;
    const viewH = window.innerHeight;
    const maxTranslate = totalWidth - viewW + viewW * 0.16;

    pin.style.height = `${maxTranslate + viewH}px`;

    const st = ScrollTrigger.create({
      trigger: pin,
      start: "top top",
      end: "bottom bottom",
      pin: stage,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        const tx = -progress * maxTranslate;
        gsap.set(track, { x: tx });

        const idx = Math.round(progress * (projectData.length - 1));
        setActiveIdx(idx);

        if (bar) {
          bar.style.setProperty("--proj-progress", String(progress));
        }
        if (counter) {
          counter.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(projectData.length).padStart(2, "0")}`;
        }
      },
    });

    // Tilt effect
    const cards = track.querySelectorAll<HTMLElement>(".project-card");
    cards.forEach((card) => {
      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
        const y = -((e.clientY - rect.top) / rect.height - 0.5) * 10;
        gsap.to(card, { rotateY: x, rotateX: y, duration: 0.4, ease: "power2.out", transformPerspective: 800 });
      };
      const onLeave = () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: "power3.out" });
      };
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
    });

    return () => {
      st.kill();
      pin.style.height = "";
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
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num reveal" style={{ marginBottom: 14 }}>— 02 / Selected work</div>
            <h2 className="section-title">Featured <em>projects</em></h2>
          </div>
          <p className="section-blurb reveal">
            Selected works across web, mobile, and AI architectures. Scroll to traverse —
            each card is a case study.
          </p>
        </div>
      </div>

      <div className="projects-pin" ref={pinRef}>
        <div className="projects-stage" ref={stageRef}>
          <div className="projects-track" ref={trackRef}>
            {projectData.map((project, i) => (
              <div
                key={project.id}
                className="project-card"
                onClick={() => handleCardClick(project)}
              >
                <div className="project-card-image">
                  <img src={project.image} alt={project.title} loading="lazy" />
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

          <div className="projects-progress" ref={progressBarRef}>
            <div className="projects-progress-bar" />
            <div className="projects-progress-meta">
              <span ref={counterRef}>01 / 06</span>
              <span>Scroll to traverse</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
