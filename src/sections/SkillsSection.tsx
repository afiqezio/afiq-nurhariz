import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { skills } from "@/constants/data";

const categorizeSkill = (skill: string): string => {
  const frontend = ["React", "JavaScript"];
  const backend = ["Python", "C#", "PHP", "Go", ".NET", "Laravel", "Node.js"];
  const mobile = ["Flutter", "Dart"];
  const ai = ["YoloV5", "CNN", "Pandas", "Logistic Regressions", "Decision Tree"];
  const database = ["MySQL", "MSSQL", "SQL", "MongoDB", "PostgreSQL", "Redis"];
  const devops = ["Docker", "Airflow"];
  if (frontend.includes(skill)) return "Frontend";
  if (backend.includes(skill)) return "Backend";
  if (mobile.includes(skill)) return "Mobile";
  if (ai.includes(skill)) return "AI/ML";
  if (database.includes(skill)) return "Database";
  if (devops.includes(skill)) return "DevOps";
  return "Other";
};

const SKILL_LEVELS: Record<string, number> = {
  Python: 80, JavaScript: 90, "C#": 60, PHP: 75, Dart: 80, React: 75,
  Flutter: 85, ".NET": 65, Laravel: 75, MySQL: 95, MSSQL: 90, SQL: 95,
  Airflow: 75, Go: 75, Docker: 80, MongoDB: 85, PostgreSQL: 90, Redis: 75,
  YoloV5: 75, CNN: 75, Pandas: 80, "Logistic Regressions": 75, "Decision Tree": 75,
};

const SKILL_ICON_URLS: Record<string, string> = {
  Python: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/python.svg",
  JavaScript: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/javascript.svg",
  "C#": "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/csharp.svg",
  PHP: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/php.svg",
  Dart: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/dart.svg",
  React: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg",
  Flutter: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/flutter.svg",
  Laravel: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/laravel.svg",
  MySQL: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mysql.svg",
  MSSQL: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoftsqlserver.svg",
  SQL: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/sqlite.svg",
  ".NET": "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/dotnet.svg",
  Airflow: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/apacheairflow.svg",
  Go: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/go.svg",
  Docker: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/docker.svg",
  MongoDB: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mongodb.svg",
  PostgreSQL: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/postgresql.svg",
  Redis: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/redis.svg",
  Pandas: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/pandas.svg",
  YoloV5: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/pytorch.svg",
  CNN: "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tensorflow.svg",
  "Logistic Regressions": "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/scikitlearn.svg",
  "Decision Tree": "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/scikitlearn.svg",
};

interface SkillCardProps {
  skill: string;
  level: number;
  category: string;
  index: number;
  reducedMotion?: boolean;
}

const SkillCard = memo(function SkillCard({ skill, level, category, index, reducedMotion }: SkillCardProps) {
  const [iconSvg, setIconSvg] = useState<string>("");
  const iconUrl = SKILL_ICON_URLS[skill] ?? "";

  useEffect(() => {
    if (!iconUrl) return;
    fetch(iconUrl)
      .then((res) => res.text())
      .then((svg) => {
        const modifiedSvg = svg
          .replace(/<svg/, '<svg class="w-full h-full"')
          .replace(/fill="[^"]*"/g, 'fill="currentColor"');
        setIconSvg(modifiedSvg);
      })
      .catch(() => setIconSvg(""));
  }, [iconUrl]);

  const delay = reducedMotion ? 0 : Math.min(index * 0.04, 0.36);
  const transition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const, delay };

  const progressBar = reducedMotion ? (
    <div
      className="h-full rounded-full"
      style={{
        width: `${level}%`,
        background: "linear-gradient(90deg, #0ea5e9, #8b5cf6)",
      }}
    />
  ) : (
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${level}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
      className="h-full rounded-full"
      style={{ background: "linear-gradient(90deg, #0ea5e9, #8b5cf6)" }}
    />
  );

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
      className="glass p-5 sm:p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition-all duration-300 group card-highlight hover:shadow-lg hover:shadow-primary-500/5"
    >
      {/* Icon */}
      <div className="w-9 h-9 sm:w-11 sm:h-11 mb-4 text-slate-400 group-hover:text-slate-200 transition-colors duration-200 flex items-center justify-center">
        {iconSvg ? (
          <div
            className="w-full h-full"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(65%) sepia(9%) saturate(386%) hue-rotate(182deg) brightness(100%) contrast(87%)",
            }}
            dangerouslySetInnerHTML={{ __html: iconSvg }}
          />
        ) : (
          <span className="text-2xl" aria-hidden>💻</span>
        )}
      </div>

      {/* Name */}
      <h3 className="font-bold text-sm sm:text-base mb-3 text-slate-100">{skill}</h3>

      {/* Category + level */}
      <div className="flex justify-between items-center mb-2">
        <span className="text-[11px] text-slate-500 font-medium">{category}</span>
        <span className="text-[11px] font-bold text-primary-400">{level}%</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
        {progressBar}
      </div>
    </motion.div>
  );
});

const CATEGORIES = ["All", "Frontend", "Backend", "Mobile", "AI/ML", "Database", "DevOps"];
const INITIAL_VISIBLE = 8;

const SkillsSection = () => {
  const reducedMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredSkills = useMemo(
    () => (activeCategory === "All" ? skills : skills.filter((s) => categorizeSkill(s) === activeCategory)),
    [activeCategory]
  );

  const visibleSkills = useMemo(
    () => (showAll ? filteredSkills : filteredSkills.slice(0, INITIAL_VISIBLE)),
    [showAll, filteredSkills]
  );

  const hasMoreSkills = filteredSkills.length > INITIAL_VISIBLE;

  useEffect(() => {
    setShowAll(false);
  }, [activeCategory]);

  const handleCategory = useCallback((cat: string) => setActiveCategory(cat), []);

  return (
    <section id="skills" className="py-20 sm:py-28 px-4 sm:px-6 bg-slate-950/60 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="eyebrow text-accent-ai mb-3">Tech stack</p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-[1.1]">
            Mastered <span className="text-accent-ai">Ecosystems</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            A comprehensive view of the technologies I use to bring ideas to life across platforms.
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 sm:mb-12">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => handleCategory(cat)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className={`px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 min-h-[40px] whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-accent-ai text-white shadow-lg shadow-accent-ai/25"
                  : "bg-slate-900 text-slate-400 hover:bg-slate-800 hover:text-slate-200 border border-slate-800 hover:border-slate-700"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Skill cards */}
        <div
          key={`${activeCategory}-${showAll}`}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 mb-8"
        >
          {visibleSkills.map((skill, idx) => (
            <SkillCard
              key={skill}
              skill={skill}
              level={SKILL_LEVELS[skill] ?? 75}
              category={categorizeSkill(skill)}
              index={idx}
              reducedMotion={!!reducedMotion}
            />
          ))}
        </div>

        {/* Show more / less */}
        {hasMoreSkills && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <motion.button
              onClick={() => setShowAll((v) => !v)}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-semibold text-sm transition-all border border-slate-800 hover:border-slate-700 flex items-center gap-2 min-h-[44px]"
            >
              {showAll ? (
                <>
                  Show Less
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  Show {filteredSkills.length - INITIAL_VISIBLE} more
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </>
              )}
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
