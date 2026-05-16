import { motion } from "framer-motion";
import { heroData, aboutContent } from "@/constants/data";
import ProfileCard from "@/components/ProfileCard";

const stats = [
  { value: "1+", label: "Years Exp." },
  { value: "9+", label: "Projects" },
  { value: "∞", label: "Learning" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 bg-slate-950 relative overflow-hidden">
      {/* Background dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-60 pointer-events-none" />
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[400px] bg-primary-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
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

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <p className="eyebrow text-primary-400 mb-4">About me</p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-[1.1]">
              Building Bridges Between{" "}
              <br className="hidden lg:block" />
              <span className="gradient-text">Human Intent &amp; Machine Logic</span>
            </h2>

            <p className="text-slate-400 text-base sm:text-lg mb-5 leading-relaxed">
              {aboutContent.paragraphs[0]}
            </p>

            {/* Quote block */}
            <blockquote className="mb-8 pl-5 border-l-2 border-primary-500/40">
              <p className="text-slate-300 text-base sm:text-lg leading-relaxed italic font-light">
                &ldquo;{aboutContent.paragraphs[1]}&rdquo;
              </p>
            </blockquote>

            {/* Stats — 3-column grid */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-8 pb-8 border-b border-slate-800">
              {stats.map(({ value, label }) => (
                <motion.div
                  key={label}
                  whileHover={{ y: -2 }}
                  className="group text-center sm:text-left"
                >
                  <div className="text-2xl sm:text-3xl font-bold text-white mb-1 group-hover:text-primary-400 transition-colors duration-200">
                    {value}
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-500 uppercase tracking-widest font-semibold">
                    {label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-5">
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="px-7 py-3 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-500 hover:to-primary-400 text-white font-semibold transition-all shadow-lg shadow-primary-500/20 text-center text-sm"
              >
                Get in Touch
              </motion.a>
              <motion.a
                href={heroData.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 3 }}
                whileTap={{ scale: 0.97 }}
                className="text-slate-400 font-semibold flex items-center justify-center sm:justify-start gap-2 hover:text-white transition-colors group text-sm"
              >
                View full résumé
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
