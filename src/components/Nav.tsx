import { MouseEvent, useEffect, useState } from "react";
import { scrollToY } from "@/lib/smoothScroll";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Stack", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = ["about", "projects", "skills", "contact"];

const Nav = () => {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const getActiveLink = (href: string) => {
    const id = href.replace("#", "");
    return active === id ? "active" : "";
  };

  const handleAnchorClick = (e: MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const id = href.slice(1);
    const target = id === "top" ? document.body : document.getElementById(id);
    if (!target) return;
    const y = id === "top" ? 0 : target.getBoundingClientRect().top + window.scrollY - 24;
    scrollToY(y);
    if (history.replaceState) history.replaceState(null, "", href);
  };

  return (
    <nav className="nav">
      <a href="#top" className="nav-logo" onClick={(e) => handleAnchorClick(e, "#top")}>
        <img src="/assets/logo-no-bg.png" alt="" className="nav-logo-icon" />
        <span>afiq/nurhariz</span>
      </a>

      <div className="nav-links">
        {navLinks.map(({ label, href }) => (
          <a
            key={label}
            href={href}
            className={`nav-link ${getActiveLink(href)}`}
            onClick={(e) => handleAnchorClick(e, href)}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Nav;
