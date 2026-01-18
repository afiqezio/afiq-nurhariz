import { projects } from "@/constants/data";
import { Project } from "@/types";

interface ProjectsSectionProps {
  onViewProject: (project: Project) => void;
}

const ProjectsSection = ({ onViewProject }: ProjectsSectionProps) => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div>
            <h2 className="font-display text-4xl font-bold mb-4">Featured <span className="text-accent-mobile">Projects</span></h2>
            <p className="text-slate-400 max-w-lg">Selected works that showcase my ability to build across web, mobile, and AI architectures.</p>
          </div>
          {/* <a href="#" className="hidden md:block px-6 py-3 rounded-full border border-slate-700 hover:border-slate-500 text-sm font-semibold transition-all">
            View All Projects
          </a> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="group relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden hover:shadow-2xl hover:shadow-primary-500/10 transition-all duration-500">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={project.imageUrl} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <div className="flex gap-2 mb-4 flex-wrap">
                  {project.tech.slice(0, 3).map(tag => (
                    <span key={tag} className="px-3 py-1 bg-slate-800/80 backdrop-blur rounded-full text-[10px] font-bold tracking-wider uppercase text-slate-300">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-primary-400 transition-colors">{project.title}</h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                  {project.description}
                </p>
                <button 
                  onClick={() => onViewProject(project)}
                  className="flex items-center gap-2 text-white font-bold text-sm"
                >
                  View Case Study
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              
              <div className="absolute top-6 right-6 p-2 rounded-full bg-slate-950/80 backdrop-blur border border-slate-800 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;

