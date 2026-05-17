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

    // --- Section entrance animations ---

    const addFadeUp = (el: Element, delay = 0) => {
      gsap.set(el, { opacity: 0, y: 30 });
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out", delay });
        },
      });
      triggers.push(st);
    };

    const addFadeUpGroup = (els: Element[], stagger = 0.09) => {
      if (!els.length) return;
      gsap.set(els, { opacity: 0, y: 30 });
      const st = ScrollTrigger.create({
        trigger: els[0],
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(els, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out", stagger });
        },
      });
      triggers.push(st);
    };

    const addSlideX = (el: Element, x = -20, delay = 0) => {
      gsap.set(el, { opacity: 0, x });
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(el, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", delay });
        },
      });
      triggers.push(st);
    };

    // About — image frame scales in, caption + body + quote + stats fade up
    const imageFrame = document.querySelector(".about-image-frame");
    if (imageFrame) {
      gsap.set(imageFrame, { opacity: 0, scale: 0.96 });
      const st = ScrollTrigger.create({
        trigger: imageFrame,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(imageFrame, { opacity: 1, scale: 1, duration: 0.9, ease: "power3.out" });
        },
      });
      triggers.push(st);
    }
    const imageCaption = document.querySelector(".about-image-caption");
    if (imageCaption) addFadeUp(imageCaption, 0.1);

    document.querySelectorAll(".about-body").forEach((el) => addFadeUp(el));

    const aboutQuote = document.querySelector(".about-quote");
    if (aboutQuote) addSlideX(aboutQuote, -24);

    addFadeUpGroup(Array.from(document.querySelectorAll(".about-stats > div")), 0.12);

    // Skills — canvas area fades up, category buttons stagger in, helper line fades
    const skillsCanvasWrap = document.querySelector(".skills-grid > div:first-child");
    if (skillsCanvasWrap) addFadeUp(skillsCanvasWrap);

    addFadeUpGroup(Array.from(document.querySelectorAll(".skills-cat")), 0.05);

    const skillsHelper = document.querySelector(".skills-helper");
    if (skillsHelper) addFadeUp(skillsHelper, 0.15);

    // Contact — eyebrow slides in, blurb + CTA fade up, channel rows stagger in
    const contactEyebrow = document.querySelector(".contact-eyebrow");
    if (contactEyebrow) addSlideX(contactEyebrow, -14);

    const contactBlurb = document.querySelector(".contact-blurb");
    if (contactBlurb) addFadeUp(contactBlurb);

    const contactCta = document.querySelector(".contact-cta");
    if (contactCta) addFadeUp(contactCta, 0.1);

    addFadeUpGroup(Array.from(document.querySelectorAll(".channel")), 0.1);

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
