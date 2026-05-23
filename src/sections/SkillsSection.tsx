import { useState, useEffect, useRef } from "react";
import StackOverview from "@/components/StackOverview";

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

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const listRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === "All"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === activeCategory);

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
            A variety of technologies I use to bring ideas to life across platforms.
            Hover a category to focus · click a row to highlight.
          </p>
        </div>

        <div className="skills-grid">
          <StackOverview
            skills={SKILLS_DATA}
            activeCategory={activeCategory}
            onSelectCategory={(cat) => setActiveCategory(cat)}
          />

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
              {filtered.map((skill) => (
                <div
                  key={skill.name}
                  className="skill-row"
                  style={{ "--lvl": skill.level } as React.CSSProperties}
                  data-name={skill.name}
                  data-cat={skill.category}
                >
                  <span className="skill-row-name">{skill.name}</span>
                  <span className="skill-row-cat">{skill.category}</span>
                  <span className="skill-row-bar" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
