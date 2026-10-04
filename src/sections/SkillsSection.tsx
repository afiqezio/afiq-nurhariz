import SkillOrbit, { Skill } from "@/components/SkillOrbit";

const SKILLS_DATA: Skill[] = [
  { name: "JavaScript", category: "Frontend", level: 0.9 },
  { name: "TypeScript", category: "Frontend", level: 0.78 },
  { name: "React", category: "Frontend", level: 0.75 },
  { name: "HTML / CSS", category: "Frontend", level: 0.9 },
  { name: "Tailwind CSS", category: "Frontend", level: 0.8 },
  { name: "Framer Motion", category: "Frontend", level: 0.7 },
  { name: "GSAP", category: "Frontend", level: 0.72 },
  { name: "Three.js", category: "Frontend", level: 0.65 },
  { name: "Python", category: "Backend", level: 0.8 },
  { name: "Node.js", category: "Backend", level: 0.8 },
  { name: "PHP", category: "Backend", level: 0.75 },
  { name: "Laravel", category: "Backend", level: 0.75 },
  { name: "Go", category: "Backend", level: 0.75 },
  { name: "C#", category: "Backend", level: 0.6 },
  { name: ".NET", category: "Backend", level: 0.65 },
  { name: "Firebase", category: "Backend", level: 0.72 },
  { name: "Flutter", category: "Mobile", level: 0.85 },
  { name: "Dart", category: "Mobile", level: 0.8 },
  { name: "Claude", category: "AI/ML", level: 0.85 },
  { name: "MCP", category: "AI/ML", level: 0.8 },
  { name: "RAG", category: "AI/ML", level: 0.8 },
  { name: "Embedding Vectors", category: "AI/ML", level: 0.78 },
  { name: "Pandas", category: "AI/ML", level: 0.8 },
  { name: "XGBoost", category: "AI/ML", level: 0.78 },
  { name: "scikit-learn", category: "AI/ML", level: 0.78 },
  { name: "YoloV5", category: "AI/ML", level: 0.75 },
  { name: "CNN", category: "AI/ML", level: 0.75 },
  { name: "Logistic Regression", category: "AI/ML", level: 0.76 },
  { name: "Decision Tree", category: "AI/ML", level: 0.76 },
  { name: "MySQL", category: "Database", level: 0.95 },
  { name: "SQL", category: "Database", level: 0.92 },
  { name: "MSSQL", category: "Database", level: 0.9 },
  { name: "PostgreSQL", category: "Database", level: 0.9 },
  { name: "MongoDB", category: "Database", level: 0.85 },
  { name: "Redis", category: "Database", level: 0.75 },
  { name: "Git", category: "DevOps", level: 0.85 },
  { name: "Docker", category: "DevOps", level: 0.8 },
  { name: "Airflow", category: "DevOps", level: 0.75 },
];

const SkillsSection = () => {
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
            Every tool I&apos;ve shipped with, mapped as one orbit. Pick a domain to bring
            it forward — drag to explore, tap a node for detail.
          </p>
        </div>

        <SkillOrbit skills={SKILLS_DATA} />
      </div>
    </section>
  );
};

export default SkillsSection;
