import { useRef } from "react";
import { ReactBitsText } from "@/components/reactbits";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/constants/data";
import { Project } from "@/types";

interface ProjectsSectionProps {
  onViewProject: (project: Project) => void;
}

const ProjectsSection = ({ onViewProject }: ProjectsSectionProps) => {
  const projectsRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      className="py-20 px-4 md:px-8 lg:px-16 flex justify-center relative" 
      id="projects"
      aria-labelledby="projects-heading"
      ref={projectsRef}
    >
      <div className="max-w-7xl w-full relative z-10">
        <h2 
          id="projects-heading"
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <ReactBitsText 
            variant="gradient"
            className="text-4xl md:text-5xl font-bold"
            colors={['#3b82f6', '#8b5cf6', '#ec4899']}
            speed={5}
          >
            Featured Projects
          </ReactBitsText>
        </h2>
        
        <div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          role="list"
          aria-label="List of featured projects"
        >
          {projects.map((project) => (
            <div key={project.id} role="listitem">
              <ProjectCard 
                project={project} 
                onViewProject={onViewProject}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

