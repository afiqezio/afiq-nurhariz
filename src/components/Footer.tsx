import { contactLinks } from "@/constants/data";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative px-4 sm:px-6 py-10 sm:py-12">
      {/* Gradient top border */}
      <div className="absolute top-0 left-0 right-0 gradient-divider" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-display font-bold tracking-tighter text-base">
            <span className="text-slate-300">AFIQ</span>
            <span className="text-primary-400">NURHARIZ</span>
          </span>
          <p className="text-slate-500 text-xs">
            &copy; {currentYear} &mdash; Built with React, Tailwind &amp; TypeScript.
          </p>
        </div>

        {/* Social links */}
        <div className="flex gap-5 flex-wrap justify-center">
          {contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-slate-300 transition-colors text-sm font-medium min-h-[44px] flex items-center"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
