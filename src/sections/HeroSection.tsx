import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";

// Pages are pre-rendered in Node, where useLayoutEffect warns and does nothing
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

interface HeroSectionProps {
  ready?: boolean;
}

const HeroSection = ({ ready = false }: HeroSectionProps) => {
  const wordsRef = useRef<HTMLElement[]>([]);
  const heroRef = useRef<HTMLElement>(null);

  useIsomorphicLayoutEffect(() => {
    gsap.set(wordsRef.current.filter(Boolean), { y: "100%" });
  }, []);

  useEffect(() => {
    if (!ready) return;
    const words = wordsRef.current.filter(Boolean);
    gsap.to(words, {
      y: "0%",
      duration: 1.1,
      ease: "power4.out",
      stagger: 0.08,
      delay: 0.1,
    });
  }, [ready]);

  // Pointer-following depth on the hero layers. Uses the standalone `translate`
  // property so it composes with GSAP's `transform`-based scroll parallax.
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const layers = [
      { el: hero.querySelector<HTMLElement>(".hero-title"), depth: 12 },
      { el: hero.querySelector<HTMLElement>(".hero-sub"), depth: 7 },
      { el: hero.querySelector<HTMLElement>(".hero-stats"), depth: 20 },
    ].filter((l): l is { el: HTMLElement; depth: number } => !!l.el);
    layers.forEach(({ el }) => { el.style.transition = "translate 0.18s linear"; });

    let tx = 0, ty = 0, cx = 0, cy = 0;
    let rafId = 0;
    // Runs only while the layers are still easing toward the pointer
    const tick = () => {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      const settled = Math.abs(tx - cx) < 0.0005 && Math.abs(ty - cy) < 0.0005;
      if (settled) { cx = tx; cy = ty; }
      layers.forEach(({ el, depth }) => {
        el.style.translate = `${(-cx * depth).toFixed(2)}px ${(-cy * depth).toFixed(2)}px`;
      });
      rafId = settled ? 0 : requestAnimationFrame(tick);
    };
    const wake = () => { if (!rafId) rafId = requestAnimationFrame(tick); };

    const onMove = (e: MouseEvent) => {
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5;
      ty = (e.clientY - r.top) / r.height - 0.5;
      wake();
    };
    const onLeave = () => { tx = 0; ty = 0; wake(); };
    hero.addEventListener("mousemove", onMove, { passive: true });
    hero.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId);
      hero.removeEventListener("mousemove", onMove);
      hero.removeEventListener("mouseleave", onLeave);
      layers.forEach(({ el }) => { el.style.translate = ""; el.style.transition = ""; });
    };
  }, []);

  const addWord = (el: HTMLSpanElement | null) => {
    if (el && !wordsRef.current.includes(el)) wordsRef.current.push(el);
  };

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-meta">
              <span className="eyebrow">Portfolio · 2026 · Shah Alam</span>
            </div>

            <h1 className="hero-title">
              <span className="line">
                <span className="word-mask"><span className="word" ref={addWord}>Crafting</span></span>{" "}
                <span className="word-mask"><span className="word" ref={addWord}>the</span></span>
              </span>
              <span className="line">
                <span className="word-mask"><span className="word" ref={addWord}><em>future</em></span></span>{" "}
                <span className="word-mask"><span className="word" ref={addWord}>of</span></span>
              </span>
              <span className="line">
                <span className="word-mask"><span className="word" ref={addWord}>tech.</span></span>
              </span>
            </h1>

            <p className="hero-sub">
              I&apos;m <strong>Afiq Nurhariz</strong> — a{" "}
              <strong>Full-Stack &amp; AI engineer</strong> building intelligent,
              high-performance applications across web, mobile and machine learning systems.
            </p>
          </div>

          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-val">02</div>
              <div className="hero-stat-label">Years Exp.</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">09</div>
              <div className="hero-stat-label">Projects</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">∞</div>
              <div className="hero-stat-label">Learning</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-val">MYT</div>
              <div className="hero-stat-label">UTC + 08</div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-cue">
        <div>scroll</div>
        <div className="scroll-cue-line" />
      </div>
    </section>
  );
};

export default HeroSection;

