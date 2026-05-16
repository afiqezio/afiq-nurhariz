import { motion } from "framer-motion";
import { contactLinks } from "@/constants/data";

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 bg-slate-950 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-primary-900/12 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12 sm:mb-16"
        >
          <p className="eyebrow text-primary-400 mb-4">Get in touch</p>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-[1.05]">
            Let&apos;s build{" "}
            <span className="gradient-text">something great.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-10">
            Have a project in mind or want to chat about AI and web development?
            I&apos;m always open to new opportunities.
          </p>

          {/* Primary CTA */}
          <motion.a
            href="mailto:afiqnurhariz@gmail.com"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-primary-600 to-accent-ai text-white font-semibold text-base shadow-xl shadow-primary-500/20 hover:shadow-primary-500/30 transition-all group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Say Hello
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
        </motion.div>

        {/* Divider */}
        <div className="gradient-divider mb-12" />

        {/* Contact method cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="grid sm:grid-cols-3 gap-4"
        >
          {contactLinks.map((link, idx) => {
            const subtitles: Record<string, string> = {
              Email: "afiqnurhariz@gmail.com",
              LinkedIn: "linkedin.com/in/afiqnurhariz",
              GitHub: "github.com/afiqezio",
            };

            return (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
                className="group flex flex-col items-center p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:bg-slate-900/90 card-highlight"
              >
                <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 group-hover:border-primary-500/30 group-hover:bg-primary-500/10 flex items-center justify-center text-2xl mb-4 transition-all duration-300">
                  {link.icon}
                </div>
                <h4 className="font-bold text-white text-sm mb-1.5">{link.label}</h4>
                <p className="text-slate-500 group-hover:text-slate-400 transition-colors text-xs text-center break-all leading-relaxed">
                  {subtitles[link.label] ?? ""}
                </p>
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
