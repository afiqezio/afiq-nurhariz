import { heroData, aboutContent } from "@/constants/data";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6 bg-slate-950 relative overflow-hidden">
      {/* Decorative background grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        {/* CREATIVE IMAGE PLACEHOLDER */}
        <div className="relative group perspective-1000">
          {/* Animated Glow Aura */}
          <div className="absolute -inset-10 bg-gradient-to-tr from-primary-500/20 via-accent-ai/20 to-accent-mobile/20 rounded-full blur-[80px] group-hover:opacity-100 transition-opacity opacity-40 animate-pulse"></div>
          
          <div className="relative aspect-[4/5] rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden shadow-2xl transition-all duration-700 group-hover:rotate-1 group-hover:scale-[1.02]">
            
            {/* HUD Corner Accents */}
            <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary-500 z-20"></div>
            <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary-500 z-20"></div>
            <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary-500 z-20"></div>
            <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary-500 z-20"></div>

            {/* AI Scanning Line */}
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-400 to-transparent shadow-[0_0_15px_rgba(14,165,233,0.8)] z-30 animate-scan pointer-events-none"></div>

            {/* Image Wrapper with Filter */}
            <div className="relative w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700">
              <img 
                src={heroData.profileImage} 
                alt="Afiq Nurhariz" 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>

            {/* Technical Metadata Overlays */}
            <div className="absolute top-8 left-8 z-20 pointer-events-none hidden lg:block">
              <div className="text-[10px] font-mono text-primary-400 opacity-60 flex flex-col gap-1">
                <span>[ DEV_ID: AFIQ_001 ]</span>
                <span>[ CORE: NEURAL_ENGINE ]</span>
                <span>[ STATUS: ACTIVE ]</span>
              </div>
            </div>

            <div className="absolute bottom-20 right-8 z-20 pointer-events-none hidden lg:block text-right">
              <div className="text-[10px] font-mono text-accent-ai opacity-60 flex flex-col gap-1">
                <span>COORD: 3.1390° N</span>
                <span>LATENCY: 14ms</span>
                <span className="animate-pulse">● SYNCING</span>
              </div>
            </div>

            {/* Bottom ID Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-8 glass border-t border-slate-800/50 z-20">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold tracking-tight">{heroData.name}</h3>
                  <p className="text-primary-400 text-[10px] font-bold uppercase tracking-[0.2em]">Full-Stack & AI Engineer</p>
                </div>
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-slate-950 bg-slate-800 flex items-center justify-center text-xs">Js</div>
                  <div className="w-8 h-8 rounded-full border-2 border-slate-950 bg-primary-600 flex items-center justify-center text-xs">AI</div>
                  <div className="w-8 h-8 rounded-full border-2 border-slate-950 bg-accent-ai flex items-center justify-center text-xs">Py</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div>
          <h2 className="font-display text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Building Bridges Between <br />
            <span className="gradient-text">Human Intent & Machine Logic</span>
          </h2>
          <p className="text-slate-400 text-lg mb-6 leading-relaxed">
            {aboutContent.paragraphs[0]}
          </p>
          <p className="text-slate-400 text-lg mb-8 leading-relaxed italic border-l-2 border-primary-500/30 pl-6">
            "{aboutContent.paragraphs[1]}"
          </p>

          <div className="grid grid-cols-2 gap-8 mb-10">
            <div className="group">
              <div className="text-3xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">1+</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Years Exp.</div>
            </div>
            <div className="group">
              <div className="text-3xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">8+</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Projects Done</div>
            </div>
            {/* <div className="group">
              <div className="text-3xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">1</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold">AI Models Built</div>
            </div> */}
            <div className="group">
              <div className="text-3xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">∞</div>
              <div className="text-sm text-slate-500 uppercase tracking-widest font-semibold">Learning Journey</div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <a href="#contact" className="px-8 py-3 rounded-full bg-primary-600 hover:bg-primary-500 text-white font-bold transition-all shadow-lg shadow-primary-500/20">
              Get in Touch
            </a>
            <a href={heroData.resumeUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 font-bold flex items-center gap-2 hover:text-white transition-colors group">
              View full resume
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

