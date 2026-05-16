import { motion } from "framer-motion";
import { projects } from "@/constants/data";
import { Project } from "@/types";

interface ProjectsSectionProps {
  onViewProject: (project: Project) => void;
}

const cardTransition = {
  type: "spring" as const,
  stiffness: 280,
  damping: 22,
};

const ProjectsSection = ({ onViewProject }: ProjectsSectionProps) => {
  return (
    <section id="projects" className="py-20 sm:py-28 px-4 sm:px-6 relative">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-0 right-0 gradient-divider" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 sm:mb-16"
        >
          <p className="eyebrow text-accent-mobile mb-3">Selected work</p>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.1]">
              Featured <span className="text-accent-mobile">Projects</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-md leading-relaxed">
              Selected works that showcase my ability to build across web, mobile, and AI architectures.
            </p>
          </div>
        </motion.div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover="hover"
              className="group relative bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden cursor-pointer transition-colors duration-300"
              onClick={() => onViewProject(project)}
            >
              {/* Project image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <motion.img
                  variants={{ hover: { scale: 1.06 } }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient overlay — darker on hover */}
                <motion.div
                  variants={{ hover: { opacity: 1 } }}
                  initial={{ opacity: 0.7 }}
                  className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent"
                />
                {/* Project index number */}
                <div className="absolute top-4 left-4 font-mono text-xs font-bold text-slate-500 tracking-widest">
                  {String(idx + 1).padStart(2, "0")}
                </div>
              </div>

              {/* Card content */}
              <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-end">
                <motion.div
                  variants={{ hover: { y: 0, opacity: 1 } }}
                  initial={{ y: 6, opacity: 0.95 }}
                  transition={cardTransition}
                >
                  {/* Tech tags */}
                  <div className="flex gap-1.5 mb-3 flex-wrap">
                    {project.tech.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 bg-slate-800/90 backdrop-blur rounded-md text-[10px] font-bold tracking-wider uppercase text-slate-400 border border-slate-700/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold mb-1 text-white group-hover:text-primary-300 transition-colors duration-200 leading-tight">
                    {project.title}
                  </h3>

                  {/* Description + CTA — revealed on hover */}
                  <motion.div
                    variants={{
                      hover: { height: "auto", opacity: 1, marginTop: 10 },
                      initial: { height: 0, opacity: 0, marginTop: 0 },
                    }}
                    initial="initial"
                    className="overflow-hidden"
                  >
                    <p className="text-slate-400 text-xs sm:text-sm mb-4 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-1.5 text-primary-400 font-bold text-[11px] uppercase tracking-widest">
                      View Case Study
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              {/* Arrow badge — top right on hover */}
              <motion.div
                variants={{
                  hover: { opacity: 1, scale: 1, rotate: 0 },
                  initial: { opacity: 0, scale: 0.6, rotate: -45 },
                }}
                className="absolute top-4 right-4 p-2 rounded-full bg-primary-500 text-white shadow-lg shadow-primary-500/30"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 gradient-divider" />
    </section>
  );
};

export default ProjectsSection;
