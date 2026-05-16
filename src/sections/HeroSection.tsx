import { motion } from "framer-motion";
import { heroData } from "@/constants/data";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 24, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 90,
        damping: 18,
      },
    },
  };

  const roles = [
    { label: "Full-Stack", className: "text-sky-400 bg-sky-500/10 border-sky-500/25" },
    { label: "Mobile Developer", className: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25" },
    { label: "AI Engineer", className: "text-violet-400 bg-violet-500/10 border-violet-500/25" },
  ];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/95 to-slate-950" />
        <div className="absolute inset-0 dot-pattern" />
        {/* Ambient orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary-600/6 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-accent-ai/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 hero-video-overlay" />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-700/60 text-xs font-semibold text-slate-300 mb-8 backdrop-blur-sm shadow-lg"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          Available for new opportunities
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-black tracking-[-0.03em] mb-6 leading-[1.02]"
        >
          Crafting the{" "}
          <br className="hidden sm:block" />
          <span className="gradient-text">Future of Tech</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl mx-auto text-base sm:text-lg text-slate-400 mb-10 leading-relaxed font-light"
        >
          I&apos;m{" "}
          <span className="text-slate-100 font-medium">{heroData.name}</span>, a{" "}
          <span className="text-slate-100 font-medium">Full-Stack Engineer</span>{" "}
          and{" "}
          <span className="text-slate-100 font-medium">AI Developer</span>{" "}
          building intelligent, high-performance applications.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-primary-600 via-primary-500 to-accent-ai text-white font-semibold transition-all shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 flex items-center justify-center gap-2 group text-sm"
          >
            Explore My Work
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </motion.a>
          <motion.a
            href="#about"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-slate-900/70 border border-slate-700/60 hover:border-slate-600 text-slate-300 hover:text-white font-semibold transition-all text-sm backdrop-blur-sm"
          >
            Learn About Me
          </motion.a>
        </motion.div>

        {/* Role chips */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-wrap justify-center gap-2.5"
        >
          {roles.map(({ label, className }) => (
            <span
              key={label}
              className={`${className} border px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm`}
            >
              {label}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default HeroSection;
