import { contactLinks } from "@/constants/data";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-6 border-t border-slate-800 text-center text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p>© {currentYear} Afiq Nurhariz. Built with React, Tailwind & TypeScript.</p>
        <div className="flex gap-6">
          {contactLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary-400 transition-colors"
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

