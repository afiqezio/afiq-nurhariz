import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Menu, X } from "lucide-react";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: "about", label: "About" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "glass-card shadow-2xl py-3"
          : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="text-2xl font-bold gradient-text hover:scale-110 transition-transform duration-300"
          >
            ANHZ
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
              </button>
            ))}
            <div className="flex items-center gap-3 ml-4">
              <Button
                variant="ghost"
                size="icon"
                className="glass-card hover:scale-110 transition-all duration-300"
                onClick={() => window.open("https://github.com/afiqezio", "_blank")}
              >
                <Github className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="glass-card hover:scale-110 transition-all duration-300"
                onClick={() => window.open("https://www.linkedin.com/in/afiqnurhariz/", "_blank")}
              >
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="glass-card hover:scale-110 transition-all duration-300"
                onClick={() => window.open("mailto:afiqnurhariz@gmail.com", "_blank")}
              >
                <Mail className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden glass-card p-2 rounded-lg hover:scale-110 transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 glass-card p-6 rounded-2xl animate-fadeInScale">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-base font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 py-2"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex items-center gap-3 pt-4 border-t border-border">
                <Button
                  variant="ghost"
                  size="icon"
                  className="glass-card hover:scale-110 transition-all duration-300"
                  onClick={() => window.open("https://github.com/afiqezio", "_blank")}
                >
                  <Github className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="glass-card hover:scale-110 transition-all duration-300"
                  onClick={() => window.open("https://www.linkedin.com/in/afiqnurhariz/", "_blank")}
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="glass-card hover:scale-110 transition-all duration-300"
                  onClick={() => window.open("mailto:afiqnurhariz@gmail.com", "_blank")}
                >
                  <Mail className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;

