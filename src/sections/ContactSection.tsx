import { motion } from "framer-motion";
import { contactLinks } from "@/constants/data";

const ContactSection = () => {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-primary-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            Let&apos;s build <br />
            <span className="text-primary-400">something great.</span>
          </h2>
          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to chat about AI and the future of web development? Drop me a line!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-slate-800"
        >
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {contactLinks.map((link, idx) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="group flex flex-col items-center sm:items-start p-4 sm:p-6 rounded-xl bg-slate-900/50 border border-slate-800 hover:border-primary-500/50 transition-all duration-300 hover:bg-slate-900/80"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center text-2xl sm:text-3xl mb-4 group-hover:scale-110 group-hover:bg-primary-500/10 transition-all duration-300">
                  {link.icon}
                </div>
                <h4 className="font-bold text-white text-base sm:text-lg mb-2 text-center sm:text-left">
                  {link.label}
                </h4>
                <p className="text-slate-400 hover:text-primary-400 transition-colors text-sm sm:text-base text-center sm:text-left break-words">
                  {link.label === "Email"
                    ? "afiqnurhariz@gmail.com"
                    : link.label === "LinkedIn"
                      ? "linkedin.com/in/afiqnurhariz"
                      : "github.com/afiqezio"}
                </p>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
