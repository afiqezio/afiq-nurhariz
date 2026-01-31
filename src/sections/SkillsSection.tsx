import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { skills } from "@/constants/data";

// Module-level helpers to avoid re-creating on each render (performance)
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
}

// Memoized card: no layout/exit to avoid buggy AnimatePresence; simple stagger on appear
const SkillCard = memo(function SkillCard({ skill, level, category, index, reducedMotion }: SkillCardProps & { reducedMotion?: boolean }) {
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

  const transition = reducedMotion ? { duration: 0 } : { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const, delay: Math.min(index * 0.04, 0.4) };

  // Progress bar: fill on scroll into view (like example_apps) – initial 0, whileInView to level%, 1.5s easeOut, delay 0.1
  const progressBar = reducedMotion ? (
    <div
      className="h-full bg-gradient-to-r from-primary-600 to-accent-ai rounded-full"
      style={{ width: `${level}%` }}
    />
  ) : (
    <motion.div
      initial={{ width: 0 }}
      whileInView={{ width: `${level}%` }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: "easeOut", delay: 0.1 }}
      className="h-full bg-gradient-to-r from-primary-600 to-accent-ai rounded-full"
    />
  );

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={transition}
      className="glass p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border border-slate-800 hover:border-primary-500/50 transition-colors group"
    >
      <div className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 group-hover:scale-110 transition-transform flex items-center justify-center">
        {iconSvg ? (
          <div
            className="w-full h-full text-slate-300"
            style={{
              filter:
                "brightness(0) saturate(100%) invert(75%) sepia(9%) saturate(386%) hue-rotate(182deg) brightness(93%) contrast(87%)",
            }}
            dangerouslySetInnerHTML={{ __html: iconSvg }}
          />
        ) : (
          <span className="text-2xl sm:text-3xl" aria-hidden>💻</span>
        )}
      </div>
      <h3 className="font-bold text-base sm:text-lg mb-2">{skill}</h3>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-slate-500">{category}</span>
        <span className="text-xs font-bold text-primary-400">{level}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
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
    <section id="skills" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
            Mastered <span className="text-accent-ai">Ecosystems</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto px-2">
            A comprehensive view of the technologies I use to bring ideas to life across platforms.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12">
          {CATEGORIES.map((cat) => (
            <motion.button
              key={cat}
              onClick={() => handleCategory(cat)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 sm:px-5 md:px-6 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all min-h-[44px] whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                  : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Key on category+showAll so list remounts cleanly; no AnimatePresence to avoid layout bugs */}
        <div
          key={`${activeCategory}-${showAll}`}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6 mb-6 sm:mb-8"
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

        {hasMoreSkills && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex justify-center mt-6 sm:mt-8"
          >
            <motion.button
              onClick={() => setShowAll((v) => !v)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm sm:text-base transition-all shadow-lg hover:shadow-xl flex items-center gap-2 border border-slate-700 hover:border-primary-500/50 min-h-[44px]"
            >
              {showAll ? (
                <>
                  Show Less
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </>
              ) : (
                <>
                  Show More ({filteredSkills.length - INITIAL_VISIBLE} more)
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
