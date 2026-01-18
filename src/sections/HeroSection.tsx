import { heroData } from "@/constants/data";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background Layer - Optional, can be replaced with gradient */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="absolute inset-0 hero-video-overlay"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-xs font-semibold text-primary-400 mb-8 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-primary-500"></span>
          Available for new opportunities
        </div>
        
        <h1 className="font-display text-5xl md:text-8xl font-black tracking-tight mb-6 leading-tight">
          Crafting the <br />
          <span className="gradient-text">Future of Tech</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-400 mb-10 leading-relaxed font-light">
          I'm <span className="text-white font-medium">{heroData.name}</span>, a <span className="text-white font-medium">Full-Stack Engineer</span> and <span className="text-white font-medium">AI Developer</span> specializing in building intelligent, high-performance applications that bridge the gap between human intuition and machine intelligence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#projects" 
            className="px-8 py-4 rounded-full bg-primary-600 hover:bg-primary-500 text-white font-bold transition-all shadow-xl shadow-primary-500/25 flex items-center gap-2 group"
          >
            Explore My Work
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a 
            href="#about" 
            className="px-8 py-4 rounded-full glass hover:bg-slate-800 text-white font-bold transition-all"
          >
            Learn About Me
          </a>
        </div>

        {/* Floating tech badges */}
        <div className="mt-20 flex flex-wrap justify-center gap-6 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          <span className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm">Full-Stack</span>
          <span className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm">Mobile Developer</span>
          <span className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg text-sm">AI Engineer</span>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;

