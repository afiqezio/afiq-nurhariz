import { motion } from "framer-motion";
import { projects } from "@/constants/data";
import { Project } from "@/types";

interface ProjectsSectionProps {
  onViewProject: (project: Project) => void;
}

const cardTransition = {
  type: "spring",
  stiffness: 300,
  damping: 20,
};

const ProjectsSection = ({ onViewProject }: ProjectsSectionProps) => {
  return (
    <section id="projects" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 sm:gap-6 mb-8 sm:mb-12 md:mb-16"
        >
          <div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-3 sm:mb-4">
              Featured <span className="text-accent-mobile">Projects</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-lg">
              Selected works that showcase my ability to build across web, mobile, and AI architectures.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              whileHover="hover"
              className="group relative bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer"
              onClick={() => onViewProject(project)}
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                <motion.img
                  variants={{ hover: { scale: 1.05 } }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <motion.div
                  variants={{ hover: { opacity: 0.9 } }}
                  initial={{ opacity: 0.6 }}
                  className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"
                />
              </div>

              <div className="absolute inset-0 p-4 sm:p-6 md:p-8 flex flex-col justify-end">
                <motion.div
                  variants={{ hover: { y: 0, opacity: 1 } }}
                  initial={{ y: 10, opacity: 0.9 }}
                  transition={cardTransition}
                >
                  <div className="flex gap-1.5 sm:gap-2 mb-3 sm:mb-4 flex-wrap">
                    {project.tech.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 sm:px-3 py-0.5 sm:py-1 bg-slate-800/80 backdrop-blur rounded-md sm:rounded-full text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-slate-300 border border-slate-700/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white group-hover:text-primary-400 transition-colors duration-200">
                    {project.title}
                  </h3>
                  <motion.div
                    variants={{
                      hover: { height: "auto", opacity: 1, marginTop: 8 },
                      initial: { height: 0, opacity: 0, marginTop: 0 },
                    }}
                    initial="initial"
                    className="overflow-hidden"
                  >
                    <p className="text-slate-400 text-xs sm:text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-2 text-primary-400 font-bold text-xs uppercase tracking-widest">
                      View Case Study
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </motion.div>
                </motion.div>
              </div>

              <motion.div
                variants={{
                  hover: { opacity: 1, scale: 1, rotate: 0 },
                  initial: { opacity: 0, scale: 0.5, rotate: -45 },
                }}
                className="absolute top-4 sm:top-6 right-4 sm:right-6 p-1.5 sm:p-2 rounded-full bg-primary-500 text-white shadow-xl"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
