import { useState, useEffect } from "react";
import { skills } from "@/constants/data";

// Component to display skill icon with SVG
interface SkillIconDisplayProps {
  skill: string;
  iconUrl: string;
  level: number;
  category: string;
  delay: number;
}

const SkillIconDisplay = ({ skill, iconUrl, level, category, delay }: SkillIconDisplayProps) => {
  const [iconSvg, setIconSvg] = useState<string>("");

  useEffect(() => {
    if (iconUrl) {
      fetch(iconUrl)
        .then(res => res.text())
        .then(svg => {
          // Modify SVG to be responsive and properly colored
          const modifiedSvg = svg
            .replace(/<svg/, '<svg class="w-full h-full"')
            .replace(/fill="[^"]*"/g, 'fill="currentColor"');
          setIconSvg(modifiedSvg);
        })
        .catch(() => setIconSvg(""));
    }
  }, [iconUrl]);

  return (
    <div 
      className="glass p-6 rounded-2xl border border-slate-800 hover:border-primary-500/50 transition-all group animate-in fade-in zoom-in duration-500"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform flex items-center justify-center">
        {iconSvg ? (
          <div 
            className="w-full h-full text-slate-300"
            style={{ 
              filter: 'brightness(0) saturate(100%) invert(75%) sepia(9%) saturate(386%) hue-rotate(182deg) brightness(93%) contrast(87%)'
            }}
            dangerouslySetInnerHTML={{ __html: iconSvg }} 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-3xl">
            💻
          </div>
        )}
      </div>
      <h3 className="font-bold text-lg mb-2">{skill}</h3>
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-slate-500">{category}</span>
        <span className="text-xs font-bold text-primary-400">{level}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary-600 to-accent-ai transition-all duration-1000"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );
};

// Categorize skills
const categorizeSkill = (skill: string): string => {
  const frontend = ['React', 'JavaScript'];
  const backend = ['Python', 'C#', 'PHP', 'Go', '.NET', 'Laravel', 'Node.js'];
  const mobile = ['Flutter', 'Dart'];
  const ai = ['YoloV5', 'CNN', 'Pandas', 'Logistic Regressions', 'Decision Tree'];
  const database = ['MySQL', 'MSSQL', 'SQL', 'MongoDB', 'PostgreSQL', 'Redis'];
  const devops = ['Docker', 'Airflow'];

  if (frontend.includes(skill)) return 'Frontend';
  if (backend.includes(skill)) return 'Backend';
  if (mobile.includes(skill)) return 'Mobile';
  if (ai.includes(skill)) return 'AI/ML';
  if (database.includes(skill)) return 'Database';
  if (devops.includes(skill)) return 'DevOps';
  return 'Other';
};

const SkillsSection = () => {
  const categories = ['All', 'Frontend', 'Backend', 'Mobile', 'AI/ML', 'Database', 'DevOps'];
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(s => categorizeSkill(s) === activeCategory);

  // Get skill level (mock data - you can enhance this)
  const getSkillLevel = (skill: string): number => {
    const levels: Record<string, number> = {
      'Python': 80, 'JavaScript': 90, 'C#': 60, 'PHP': 75, 'Dart': 80,
      'React': 75, 'Flutter': 85, '.NET': 65, 'Laravel': 75, 'MySQL': 95,
      'MSSQL': 90, 'SQL': 95, 'Airflow': 75, 'Go': 75, 'Docker': 80,
      'MongoDB': 85, 'PostgreSQL': 90, 'Redis': 75, 'YoloV5': 75, 'CNN': 75,
      'Pandas': 80, 'Logistic Regressions': 75, 'Decision Tree': 75
    };
    return levels[skill] || 75;
  };

  // Get skill icon URL
  const getSkillIconUrl = (skillName: string): string => {
    const icons: Record<string, string> = {
      'Python': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/python.svg",
      'JavaScript': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/javascript.svg",
      'C#': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/csharp.svg",
      'PHP': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/php.svg",
      'Dart': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/dart.svg",
      'React': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/react.svg",
      'Flutter': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/flutter.svg",
      'Laravel': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/laravel.svg",
      'MySQL': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mysql.svg",
      'MSSQL': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/microsoftsqlserver.svg",
      'SQL': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/sqlite.svg",
      '.NET': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/dotnet.svg",
      'Airflow': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/apacheairflow.svg",
      'Go': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/go.svg",
      'Docker': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/docker.svg",
      'MongoDB': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/mongodb.svg",
      'PostgreSQL': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/postgresql.svg",
      'Redis': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/redis.svg",
      'Pandas': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/pandas.svg",
      // ML/AI related - using generic ML icon or data science related icons
      'YoloV5': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/pytorch.svg",
      'CNN': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/tensorflow.svg",
      'Logistic Regressions': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/scikitlearn.svg",
      'Decision Tree': "https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/scikitlearn.svg",
    };
    
    return icons[skillName] || "";
  };

  return (
    <section id="skills" className="py-24 px-6 bg-slate-900/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold mb-4">Mastered <span className="text-accent-ai">Ecosystems</span></h2>
          <p className="text-slate-400 max-w-2xl mx-auto">A comprehensive view of the technologies I use to bring ideas to life across platforms.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat 
                ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/30' 
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredSkills.map((skill, idx) => {
            const level = getSkillLevel(skill);
            const iconUrl = getSkillIconUrl(skill);
            const category = categorizeSkill(skill);
            
            return (
              <SkillIconDisplay
                key={skill}
                skill={skill}
                iconUrl={iconUrl}
                level={level}
                category={category}
                delay={idx * 100}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

