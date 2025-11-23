import { TiltedCard, GlassSurface, ReactBitsText } from "@/components/reactbits";

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

  const getSkillColor = (skillName: string) => {
    const colors = {
      'Python': 'from-blue-500 to-cyan-500',
      'JavaScript': 'from-yellow-500 to-orange-500',
      'C#': 'from-purple-500 to-pink-500',
      'PHP': 'from-indigo-500 to-purple-500',
      'Dart': 'from-blue-500 to-indigo-500',
      'React': 'from-cyan-500 to-blue-500',
      'Flutter': 'from-blue-500 to-cyan-500',
      'Laravel': 'from-red-500 to-pink-500',
      'MySQL': 'from-orange-500 to-red-500',
      'MSSQL': 'from-red-500 to-pink-500',
      'SQL': 'from-gray-500 to-slate-500',
      '.NET': 'from-purple-500 to-indigo-500',
    };
    return colors[skillName as keyof typeof colors] || 'from-slate-500 to-gray-500';
  };

  return (
    <TiltedCard intensity={10} className="h-full group">
      <GlassSurface className="p-8 text-center cursor-default h-full flex flex-col items-center justify-center relative overflow-hidden">
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getSkillColor(skill)} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

        {/* Icon */}
        <div className="text-4xl md:text-5xl mb-4 opacity-80 group-hover:scale-110 transition-transform duration-300">
          {getSkillIcon(skill)}
        </div>

        {/* Skill Name */}
        <p className="text-lg md:text-xl font-bold text-slate-200 group-hover:text-slate-100 transition-colors duration-300">
          {skill}
        </p>

        {/* Hover effect ring */}
        <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all duration-300"></div>
      </GlassSurface>
    </TiltedCard>
  );
};

export default SkillCard;

