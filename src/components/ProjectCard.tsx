import { ExternalLink } from "lucide-react";
import { TiltedCard, GlassSurface, ReactBitsText, ReactBitsButton } from "@/components/reactbits";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onViewProject: (project: Project) => void;
}

const ProjectCard = ({ project, onViewProject }: ProjectCardProps) => {
  const getTechColor = (tech: string) => {
    const colors = {
      'Python': 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30',
      'Flutter': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30 hover:bg-cyan-500/30',
      'React': 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30',
      'JavaScript': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30 hover:bg-yellow-500/30',
      'C#': 'bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30',
      'PHP': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/30',
      'MySQL': 'bg-orange-500/20 text-orange-300 border-orange-500/30 hover:bg-orange-500/30',
      'MSSQL': 'bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30',
      'SQL': 'bg-slate-500/20 text-slate-300 border-slate-500/30 hover:bg-slate-500/30',
      'YoloV5': 'bg-green-500/20 text-green-300 border-green-500/30 hover:bg-green-500/30',
      'CNN': 'bg-teal-500/20 text-teal-300 border-teal-500/30 hover:bg-teal-500/30',
      'Pandas': 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30',
      'XGBoost': 'bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30',
      'Logistic Regressions': 'bg-pink-500/20 text-pink-300 border-pink-500/30 hover:bg-pink-500/30',
      'Decision Tree': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30',
      'Dart': 'bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30',
      '.NET': 'bg-purple-500/20 text-purple-300 border-purple-500/30 hover:bg-purple-500/30',
      'Laravel': 'bg-red-500/20 text-red-300 border-red-500/30 hover:bg-red-500/30',
      'Database Migration': 'bg-slate-500/20 text-slate-300 border-slate-500/30 hover:bg-slate-500/30',
      'Performance Tuning': 'bg-amber-500/20 text-amber-300 border-amber-500/30 hover:bg-amber-500/30',
    };
    return colors[tech as keyof typeof colors] || 'bg-slate-500/20 text-slate-300 border-slate-500/30 hover:bg-slate-500/30';
  };

  return (
    <TiltedCard intensity={12} className="h-full group">
      <GlassSurface className="p-8 h-full flex flex-col relative overflow-hidden">
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="relative space-y-6 flex-1">
          {/* Project Icon/Emoji based on tech */}
          <div className="flex items-start justify-between">
            <div className="text-3xl opacity-60">
              {project.tech.includes('AI') || project.tech.includes('CNN') ? '🤖' :
               project.tech.includes('Flutter') ? '📱' :
               project.tech.includes('React') ? '⚛️' :
               project.tech.includes('Python') ? '🐍' :
               project.tech.includes('Database') ? '🗄️' : '💻'}
            </div>
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-slate-100 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
              {project.title}
            </h3>

            <p className="text-slate-300 leading-relaxed text-base md:text-lg">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className={`text-xs px-3 py-2 rounded-xl font-medium border transition-all duration-300 ${getTechColor(tech)}`}
                aria-label={`Technology: ${tech}`}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <ReactBitsButton
          variant="outline"
          size="md"
          className="w-full group/btn mt-8 relative overflow-hidden backdrop-blur-sm bg-white/5 border-white/20 hover:bg-white/10 hover:border-white/30"
          onClick={() => onViewProject(project)}
          aria-label={`View details for ${project.title}`}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></span>
          <span className="relative z-10 flex items-center justify-center">
            <ExternalLink
              className="mr-3 h-4 w-4 group-hover/btn:rotate-12 transition-transform duration-300"
              aria-hidden="true"
            />
            Explore Project
          </span>
        </ReactBitsButton>
      </GlassSurface>
    </TiltedCard>
  );
};

export default ProjectCard;

