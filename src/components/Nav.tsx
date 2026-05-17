import { MouseEvent, useEffect, useState } from "react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#projects" },
  { label: "Stack", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const sectionIds = ["about", "projects", "skills", "contact"];

const smoothScrollTo = (targetY: number, duration = 900) => {
  const startY = window.scrollY;
  const distance = targetY - startY;
  if (Math.abs(distance) < 2) return;
  const startTime = performance.now();
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const step = (now: number) => {
    const elapsed = now - startTime;
    const t = Math.min(1, elapsed / duration);
    window.scrollTo(0, startY + distance * ease(t));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
};

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
    smoothScrollTo(y);
    if (history.replaceState) history.replaceState(null, "", href);
  };

  return (
    <nav className="nav">
      <a href="#top" className="nav-logo" onClick={(e) => handleAnchorClick(e, "#top")}>
        <span className="nav-logo-dot" />
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

      <a href="mailto:afiqnurhariz@gmail.com" className="nav-cta">
        <span className="nav-cta-dot" />
        Available
      </a>
    </nav>
  );
};

export default Nav;
