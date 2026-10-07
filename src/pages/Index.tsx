import { lazy, Suspense, useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToY } from "@/lib/smoothScroll";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import Marquee from "@/components/Marquee";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import ProjectsSection from "@/sections/ProjectsSection";
import InterstitialSection from "@/sections/InterstitialSection";
import SkillsSection from "@/sections/SkillsSection";
import ContactSection from "@/sections/ContactSection";

gsap.registerPlugin(ScrollTrigger);

// three.js is the heaviest dependency — load it after the page shell paints
const ThreeScene = lazy(() => import("@/components/ThreeScene"));

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
  const scrollTo = (useLocation().state as { scrollTo?: string } | null)?.scrollTo;

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
      gsap.set(words, { yPercent: 160 });
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

    // Skills — the orbit fades up
    const skillOrbit = document.querySelector(".orbit");
    if (skillOrbit) addFadeUp(skillOrbit);

    // Contact — eyebrow slides in, blurb + CTA fade up, channel rows stagger in
    const contactEyebrow = document.querySelector(".contact-eyebrow");
    if (contactEyebrow) addSlideX(contactEyebrow, -14);

    const contactBlurb = document.querySelector(".contact-blurb");
    if (contactBlurb) addFadeUp(contactBlurb);

    const contactCta = document.querySelector(".contact-cta");
    if (contactCta) addFadeUp(contactCta, 0.1);

    addFadeUpGroup(Array.from(document.querySelectorAll(".channel")), 0.1);

    // --- Parallax: multi-layer depth, scrubbed against the smoothed scroll ---
    const parallax = gsap.context(() => {
      // Decorative only — skipped entirely for reduced motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const isDesktop = window.innerWidth > 900;

      // Hero — title drifts up slowly, sub faster, stats fastest
      const heroScrub = { trigger: ".hero", start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero-title", { yPercent: -16, ease: "none", scrollTrigger: heroScrub });
      gsap.to(".hero-sub", { yPercent: -30, ease: "none", scrollTrigger: heroScrub });
      gsap.to(".hero-stats", { yPercent: -45, ease: "none", scrollTrigger: heroScrub });
      gsap.to(".hero-meta", { yPercent: -22, opacity: 0, ease: "none", scrollTrigger: heroScrub });
      gsap.to(".scroll-cue", {
        opacity: 0, y: 20, ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "30% top", scrub: true },
      });

      // About — the portrait rises slowly inside its frame (it is oversized
      // 116% with -8% margin, so ±5% never reveals empty space)
      gsap.fromTo(".about-image-frame img", { yPercent: 5 }, {
        yPercent: -5, ease: "none",
        scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: true },
      });
      // ...and the frame drifts as a unit, composing into layered depth
      if (isDesktop) {
        gsap.fromTo(".about-image-frame", { y: 50 }, {
          y: -40, ease: "none",
          scrollTrigger: { trigger: ".about", start: "top bottom", end: "bottom top", scrub: 1 },
        });
      }

      // Generic hook — positive = upward over the element's scroll lifetime
      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
        const amt = parseFloat(el.dataset.parallax ?? "") || 40;
        gsap.fromTo(el, { y: amt }, {
          y: -amt, ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      // The three.js background drifts very slowly for deep parallax
      gsap.to("#scene-canvas", {
        yPercent: 6, ease: "none",
        scrollTrigger: { trigger: document.body, start: "top top", end: "bottom bottom", scrub: 1 },
      });

      // Footer rises gently into place
      gsap.fromTo(".footer-row", { y: 28 }, {
        y: 0, ease: "none",
        scrollTrigger: { trigger: ".footer", start: "top bottom", end: "bottom bottom", scrub: 1 },
      });

      // Marquees lean with scroll velocity, then settle — a subtle momentum cue
      if (isDesktop) {
        const setters = gsap.utils
          .toArray<HTMLElement>(".marquee")
          .map((wrap) => gsap.quickTo(wrap, "skewX", { duration: 0.6, ease: "power3" }));
        const settle = gsap.delayedCall(0.15, () => setters.forEach((set) => set(0))).pause();
        ScrollTrigger.create({
          trigger: document.body, start: "top top", end: "bottom bottom",
          onUpdate: (self) => {
            const skew = gsap.utils.clamp(-4, 4, self.getVelocity() / 600);
            setters.forEach((set) => set(skew));
            settle.restart(true);
          },
        });
      }
    });

    // Splitting the headings changes their height, which moves everything
    // below them — re-measure so the projects pin starts exactly at its top.
    ScrollTrigger.refresh();

    // Arriving from a case-study link that targets a section ("All work")
    const target = scrollTo ? document.getElementById(scrollTo) : null;
    if (target) scrollToY(target.getBoundingClientRect().top + window.scrollY - 24, { immediate: true });

    return () => {
      parallax.revert();
      triggers.forEach((t) => t.kill());
      obs.disconnect();
    };
  }, [ready, scrollTo]);

  return (
    <>
      <CustomCursor />
      <Loader onDone={handleLoaderDone} />

      {/* Three.js canvas (fixed, behind everything) */}
      <canvas id="scene-canvas" />
      <Suspense fallback={null}>
        <ThreeScene />
      </Suspense>

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
