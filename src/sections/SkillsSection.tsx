import { useState, useEffect, useRef } from "react";
import SkillsCanvas from "@/components/SkillsCanvas";

const CATEGORIES = ["All", "Frontend", "Backend", "Mobile", "AI/ML", "Database", "DevOps"];

const SKILLS_DATA = [
  { name: "Python", category: "Backend", level: 0.8 },
  { name: "JavaScript", category: "Frontend", level: 0.9 },
  { name: "React", category: "Frontend", level: 0.75 },
  { name: "TypeScript", category: "Frontend", level: 0.78 },
  { name: "Flutter", category: "Mobile", level: 0.85 },
  { name: "Dart", category: "Mobile", level: 0.8 },
  { name: "C#", category: "Backend", level: 0.6 },
  { name: ".NET", category: "Backend", level: 0.65 },
  { name: "PHP", category: "Backend", level: 0.75 },
  { name: "Laravel", category: "Backend", level: 0.75 },
  { name: "Go", category: "Backend", level: 0.75 },
  { name: "Node.js", category: "Backend", level: 0.8 },
  { name: "MySQL", category: "Database", level: 0.95 },
  { name: "MSSQL", category: "Database", level: 0.9 },
  { name: "PostgreSQL", category: "Database", level: 0.9 },
  { name: "MongoDB", category: "Database", level: 0.85 },
  { name: "Redis", category: "Database", level: 0.75 },
  { name: "Airflow", category: "DevOps", level: 0.75 },
  { name: "Docker", category: "DevOps", level: 0.8 },
  { name: "YoloV5", category: "AI/ML", level: 0.75 },
  { name: "CNN", category: "AI/ML", level: 0.75 },
  { name: "Pandas", category: "AI/ML", level: 0.8 },
  { name: "XGBoost", category: "AI/ML", level: 0.78 },
  { name: "scikit-learn", category: "AI/ML", level: 0.78 },
];

const SkillsHelperIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === "All"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === activeCategory);

  useEffect(() => {
    const handler = (e: Event) => {
      const name = (e as CustomEvent).detail?.name as string | null;
      setHoveredSkill(name);
    };
    document.addEventListener("skill-hover", handler);
    return () => document.removeEventListener("skill-hover", handler);
  }, []);

  useEffect(() => {
    const rows = listRef.current?.querySelectorAll<HTMLElement>(".skill-row");
    if (!rows) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("in-view");
        });
      },
      { rootMargin: "0px 0px -10% 0px" }
    );
    rows.forEach((r) => obs.observe(r));
    return () => obs.disconnect();
  }, [filtered]);

  useEffect(() => {
    const reveals = document.querySelectorAll("#skills .reveal");
    const observers: IntersectionObserver[] = [];
    reveals.forEach((el) => {
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) el.classList.add("in");
        },
        { rootMargin: "0px 0px -12% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleRowHover = (name: string | null) => {
    if (window.__highlightSkill) window.__highlightSkill(name);
  };

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-head">
          <div>
            <div className="section-num reveal" style={{ marginBottom: 14 }}>
              — 03 / Tech stack
            </div>
            <h2 className="section-title">
              Mastered <em>ecosystems</em>
            </h2>
          </div>
          <p className="section-blurb reveal">
            A constellation of technologies I use to bring ideas to life across platforms.
            Drag to rotate · hover to inspect.
          </p>
        </div>

        <div className="skills-grid">
          <div>
            <SkillsCanvas skills={SKILLS_DATA} />
            <p className="skills-helper">
              <SkillsHelperIcon />
              Drag the constellation · click a node to highlight
            </p>
          </div>

          <div className="skills-panel">
            <div className="skills-cats">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`skills-cat${activeCategory === cat ? " active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat === "AI/ML" ? "AI / ML" : cat}
                </button>
              ))}
            </div>

            <div className="skills-list" ref={listRef} id="skills-list">
              {filtered.map((skill) => {
                const isActive = hoveredSkill === skill.name;
                return (
                  <div
                    key={skill.name}
                    className={`skill-row${isActive ? " active" : ""}`}
                    style={{ "--lvl": skill.level } as React.CSSProperties}
                    data-name={skill.name}
                    data-cat={skill.category}
                    onMouseEnter={() => handleRowHover(skill.name)}
                    onMouseLeave={() => handleRowHover(null)}
                  >
                    <span className="skill-row-name">{skill.name}</span>
                    <span className="skill-row-cat">{skill.category}</span>
                    <span className="skill-row-bar" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
