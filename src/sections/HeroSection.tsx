import { motion } from "framer-motion";
import { heroData } from "@/constants/data";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6,
      },
    },
  };

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute inset-0 hero-video-overlay" />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-semibold text-primary-400 mb-6 sm:mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500" />
          </span>
          Available for new opportunities
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black tracking-tight mb-4 sm:mb-6 leading-tight px-2"
        >
          Crafting the <br />
          <span className="gradient-text">Future of Tech</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-400 mb-8 sm:mb-10 leading-relaxed font-light px-4"
        >
          I'm <span className="text-white font-medium">{heroData.name}</span>, a{" "}
          <span className="text-white font-medium">Full-Stack Engineer</span> and{" "}
          <span className="text-white font-medium">AI Developer</span> specializing in building intelligent, high-performance applications.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-primary-600 hover:bg-primary-500 text-white font-bold transition-all shadow-xl shadow-primary-500/25 flex items-center justify-center gap-2 group text-sm sm:text-base"
          >
            Explore My Work
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
          <motion.a
            href="#about"
            whileHover={{ scale: 1.05, backgroundColor: "rgba(30, 41, 59, 0.9)" }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-full glass hover:bg-slate-800 text-white font-bold transition-all text-sm sm:text-base"
          >
            Learn About Me
          </motion.a>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-12 sm:mt-16 md:mt-20 flex flex-wrap justify-center gap-3 sm:gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-700 px-4"
        >
          {["Full-Stack", "Mobile Developer", "AI Engineer"].map((role) => (
            <span
              key={role}
              className="text-white/80 bg-white/5 backdrop-blur-sm border border-white/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
            >
              {role}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
