import { TiltedCard, GlassSurface } from "@/components/reactbits";
import { getTechColor, ThemeColors } from "@/lib/theme";
import { useState, useEffect } from "react";

interface SkillCardProps {
  skill: string;
}

const SkillCard = ({ skill }: SkillCardProps) => {
  const [iconSvg, setIconSvg] = useState<string>("");

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
    };
    
    return icons[skillName] || "";
  };

  useEffect(() => {
    const url = getSkillIconUrl(skill);
    if (url) {
      fetch(url)
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
  }, [skill]);

  return (
    <TiltedCard intensity={10} className="h-full group">
      <GlassSurface className="p-8 text-center cursor-default h-full flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background gradient */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" 
          style={{
            background: `linear-gradient(135deg, ${getTechColor(skill)})`
          }}
        />

        {/* Icon with CSS filter as backup */}
        <div 
          className="w-12 h-12 md:w-16 md:h-16 mb-4 opacity-80 group-hover:scale-110 transition-transform duration-300"
          style={{ 
            filter: 'brightness(0) saturate(100%) invert(24%) sepia(97%) saturate(6447%) hue-rotate(251deg) brightness(101%) contrast(108%)'
          }}
        >
          {iconSvg ? (
            <div dangerouslySetInnerHTML={{ __html: iconSvg }} />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl md:text-3xl">
              💻
            </div>
          )}
        </div>

        {/* Skill Name */}
        <p className="text-lg md:text-xl font-bold text-slate-200 group-hover:text-slate-100 transition-colors duration-300">
          {skill}
        </p>

        {/* Hover effect ring */}
        <div 
          className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 group-hover:border-opacity-20" 
          style={{
            borderImage: `linear-gradient(135deg, ${ThemeColors.accent.blue}, ${ThemeColors.accent.purple}) 1`
          }}
        />
      </GlassSurface>
    </TiltedCard>
  );
};

export default SkillCard;