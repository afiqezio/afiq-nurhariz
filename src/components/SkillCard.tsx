import { TiltedCard, GlassSurface, ReactBitsText } from "@/components/reactbits";
import { getTechColor, ThemeColors } from "@/lib/theme";

interface SkillCardProps {
  skill: string;
}

const SkillCard = ({ skill }: SkillCardProps) => {
  const getSkillIcon = (skillName: string) => {
    const icons = {
      'Python': '🐍',
      'JavaScript': '🟨',
      'C#': '💜',
      'PHP': '🐘',
      'Dart': '🎯',
      'React': '⚛️',
      'Flutter': '📱',
      'Laravel': '🎨',
      'MySQL': '🗄️',
      'MSSQL': '💾',
      'SQL': '📊',
      '.NET': '🔷',
    };
    return icons[skillName as keyof typeof icons] || '💻';
  };


  return (
    <TiltedCard intensity={10} className="h-full group">
      <GlassSurface className="p-8 text-center cursor-default h-full flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500" style={{
          background: `linear-gradient(135deg, ${getTechColor(skill)})`
        }}></div>

        {/* Icon */}
        <div className="text-4xl md:text-5xl mb-4 opacity-80 group-hover:scale-110 transition-transform duration-300">
          {getSkillIcon(skill)}
        </div>

        {/* Skill Name */}
        <p className="text-lg md:text-xl font-bold text-slate-200 group-hover:text-slate-100 transition-colors duration-300">
          {skill}
        </p>

        {/* Hover effect ring */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent transition-all duration-300 group-hover:border-opacity-20" style={{
          borderImage: `linear-gradient(135deg, ${ThemeColors.accent.blue}, ${ThemeColors.accent.purple}) 1`
        }}></div>
      </GlassSurface>
    </TiltedCard>
  );
};

export default SkillCard;

