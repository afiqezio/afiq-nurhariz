import { useState, useCallback, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import ThreeScene from "@/components/ThreeScene";
import Marquee from "@/components/Marquee";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import ProjectsSection from "@/sections/ProjectsSection";
import InterstitialSection from "@/sections/InterstitialSection";
import SkillsSection from "@/sections/SkillsSection";
import ContactSection from "@/sections/ContactSection";

gsap.registerPlugin(ScrollTrigger);

const splitForReveal = (root: HTMLElement) => {
  if (root.dataset.splitDone === "1") return;
  const wrapTextNode = (textNode: Node): DocumentFragment => {
    const text = textNode.textContent ?? "";
    const frag = document.createDocumentFragment();
    if (!text.trim()) {
      frag.appendChild(document.createTextNode(text));
      return frag;
    }
    const tokens = text.split(/(\s+)/);
    tokens.forEach((tok) => {
      if (!tok) return;
      if (/^\s+$/.test(tok)) {
        frag.appendChild(document.createTextNode(tok));
        return;
      }
      const mask = document.createElement("span");
      mask.className = "split-mask";
      const w = document.createElement("span");
      w.className = "w";
      w.textContent = tok;
      mask.appendChild(w);
      frag.appendChild(mask);
    });
    return frag;
  };

  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const frag = wrapTextNode(child);
        node.insertBefore(frag, child);
        node.removeChild(child);
      } else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName !== "BR") {
        walk(child);
      }
    });
  };

  walk(root);
  root.dataset.splitDone = "1";
};

const Index = () => {
  const [ready, setReady] = useState(false);

  const handleLoaderDone = useCallback(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const targets = document.querySelectorAll<HTMLElement>(
      ".section-title, .contact-headline, .about-heading"
    );
    const triggers: ScrollTrigger[] = [];

    targets.forEach((el) => {
      splitForReveal(el);
      const words = el.querySelectorAll<HTMLElement>(".w");
      gsap.set(words, { yPercent: 110 });
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(words, {
            yPercent: 0,
            duration: 1.1,
            ease: "expo.out",
            stagger: 0.04,
          });
        },
      });
      triggers.push(st);
    });

    const revealEls = document.querySelectorAll<HTMLElement>(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    revealEls.forEach((el) => obs.observe(el));

    return () => {
      triggers.forEach((t) => t.kill());
      obs.disconnect();
    };
  }, [ready]);

  return (
    <>
      <CustomCursor />
      <Loader onDone={handleLoaderDone} />

      {/* Three.js canvas (fixed, behind everything) */}
      <canvas id="scene-canvas" />
      <ThreeScene />

      {/* Grain + vignette overlays */}
      <div className="bg-grain" />
      <div className="bg-vignette" />

      <Nav />

      <main id="top" style={{ position: "relative", zIndex: 3 }}>
        <HeroSection ready={ready} />
        <Marquee />
        <AboutSection />
        <ProjectsSection />
        <InterstitialSection />
        <SkillsSection />
        <ContactSection />
      </main>

      <Footer />
    </>
  );
};

export default Index;
