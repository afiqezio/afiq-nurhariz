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
      'Python': 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
      'Flutter': 'bg-cyan-50 text-cyan-700 border-cyan-200 hover:bg-cyan-100',
      'React': 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
      'JavaScript': 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100',
      'C#': 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
      'PHP': 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100',
      'MySQL': 'bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100',
      'MSSQL': 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
      'SQL': 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100',
      'YoloV5': 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100',
      'CNN': 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100',
      'Pandas': 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
      'XGBoost': 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
      'Logistic Regressions': 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100',
      'Decision Tree': 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100',
      'Dart': 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100',
      '.NET': 'bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100',
      'Laravel': 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100',
      'Database Migration': 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100',
      'Performance Tuning': 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100',
    };
    return colors[tech as keyof typeof colors] || 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100';
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
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
              {project.title}
            </h3>

            <p className="text-slate-600 leading-relaxed text-base md:text-lg">
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

