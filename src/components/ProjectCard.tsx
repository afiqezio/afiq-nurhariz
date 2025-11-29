import { ExternalLink } from "lucide-react";
import { TiltedCard, GlassSurface, ReactBitsText, ReactBitsButton } from "@/components/reactbits";
import { Project } from "@/types";
import { ThemeColors, getTechBadgeClasses } from "@/lib/theme";

interface ProjectCardProps {
  project: Project;
  onViewProject: (project: Project) => void;
}

const ProjectCard = ({ project, onViewProject }: ProjectCardProps) => {

  return (
    <TiltedCard intensity={12} className="h-full group">
      <GlassSurface className="p-8 h-full flex flex-col relative overflow-hidden">
        {/* Hover gradient overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
          background: `linear-gradient(135deg, ${ThemeColors.accent.blue}08, ${ThemeColors.accent.purple}08, ${ThemeColors.accent.pink}08)`
        }}></div>

        <div className="relative space-y-6 flex-1">
          {/* Project Icon/Emoji based on tech */}
          <div className="flex items-start justify-between">
            {/* <div className="text-3xl opacity-60">
              {project.tech.includes('AI') || project.tech.includes('CNN') ? '🤖' :
               project.tech.includes('Flutter') ? '📱' :
               project.tech.includes('React') ? '⚛️' :
               project.tech.includes('Python') ? '🐍' :
               project.tech.includes('Database') ? '🗄️' : '💻'}
            </div>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{
              background: `linear-gradient(135deg, ${ThemeColors.accent.blue}, ${ThemeColors.accent.purple})`
            }}></div> */}
          </div>

          <div className="space-y-4">
            <h3 className="text-xl md:text-2xl font-bold text-slate-100 transition-all duration-300 relative">
              <span className="group-hover:opacity-0 transition-opacity duration-300">{project.title}</span>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-clip-text text-transparent" style={{
                backgroundImage: `linear-gradient(90deg, ${ThemeColors.accent.blueLight}, ${ThemeColors.accent.purpleLight})`,
              }}>
                {project.title}
              </span>
            </h3>

            <p className="text-slate-300 leading-relaxed text-base md:text-lg">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {project.tech.map((tech) => (
              <span
                key={tech}
                className={`text-xs px-3 py-2 rounded-xl font-medium border transition-all duration-300 ${getTechBadgeClasses(tech)}`}
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
          <span className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" style={{
            background: `linear-gradient(90deg, ${ThemeColors.accent.blue}1a, ${ThemeColors.accent.purple}1a, ${ThemeColors.accent.pink}1a)`
          }}></span>
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

