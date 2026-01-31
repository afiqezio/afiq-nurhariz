import { motion } from "framer-motion";
import { heroData, aboutContent } from "@/constants/data";
import ProfileCard from "@/components/ProfileCard";

const AboutSection = () => {
  return (
    <section id="about" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <ProfileCard
            imageUrl={heroData.profileImage}
            name={heroData.name}
            title="Full-Stack & AI Engineer"
            alt="Afiq Nurhariz"
            badges={[
              { label: "Js", bgColor: "bg-slate-800" },
              { label: "AI", bgColor: "bg-primary-600" },
              { label: "Py", bgColor: "bg-accent-ai" },
            ]}
            metadata={{
              topLeft: [
                "[ DEV_ID: AFIQ_001 ]",
                "[ CORE: NEURAL_ENGINE ]",
                "[ STATUS: ACTIVE ]",
              ],
              bottomRight: [
                "COORD: 3.1390° N",
                "LATENCY: 14ms",
                "● SYNCING",
              ],
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            Building Bridges Between <br />
            <span className="gradient-text">Human Intent & Machine Logic</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg mb-4 sm:mb-6 leading-relaxed">
            {aboutContent.paragraphs[0]}
          </p>
          <p className="text-slate-400 text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed italic border-l-2 border-primary-500/30 pl-4 sm:pl-6">
            &quot;{aboutContent.paragraphs[1]}&quot;
          </p>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-10">
            <motion.div whileHover={{ scale: 1.05 }} className="group">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">1+</div>
              <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-widest font-semibold">Years Exp.</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="group">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">9+</div>
              <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-widest font-semibold">Projects Done</div>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="group">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors">∞</div>
              <div className="text-xs sm:text-sm text-slate-500 uppercase tracking-widest font-semibold">Learning Journey</div>
            </motion.div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 sm:px-8 py-3 rounded-full bg-primary-600 hover:bg-primary-500 text-white font-bold transition-all shadow-lg shadow-primary-500/20 text-center text-sm sm:text-base"
            >
              Get in Touch
            </motion.a>
            <motion.a
              href={heroData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-slate-400 font-bold flex items-center justify-center gap-2 hover:text-white transition-colors group text-sm sm:text-base"
            >
              View full resume
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
