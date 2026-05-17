import { useEffect, useRef } from "react";
import gsap from "gsap";

interface HeroSectionProps {
  ready?: boolean;
}

const HeroSection = ({ ready = false }: HeroSectionProps) => {
  const wordsRef = useRef<HTMLElement[]>([]);

  useEffect(() => {
    if (!ready) return;
    const words = wordsRef.current.filter(Boolean);
    gsap.fromTo(
      words,
      { y: "100%" },
      {
        y: "0%",
        duration: 1.1,
        ease: "power4.out",
        stagger: 0.08,
        delay: 0.1,
      }
    );
  }, [ready]);

  const addWord = (el: HTMLSpanElement | null) => {
    if (el && !wordsRef.current.includes(el)) wordsRef.current.push(el);
  };

  return (
    <section id="hero" className="hero">
      <div className="container">
        <div className="hero-grid">
          <div>
            <div className="hero-meta">
              <span className="eyebrow">Portfolio · 2026 · Kuala Lumpur</span>
            </div>

            <h1 className="hero-title">
              <span className="line">
                <span className="word" ref={addWord}>Crafting</span>{" "}
                <span className="word" ref={addWord}>the</span>
              </span>
              <span className="line">
                <span className="word" ref={addWord}>
                  <em>future</em>
                </span>{" "}
                <span className="word" ref={addWord}>of</span>
              </span>
              <span className="line">
                <span className="word" ref={addWord}>tech.</span>
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
              <div className="hero-stat-val">01</div>
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

      <div className="hero-corner">
        <div>[ DEV_ID: AFIQ_001 ]</div>
        <div className="hero-corner-row">
          CORE · NEURAL_ENGINE <span className="dot" />
        </div>
        <div>[ STATUS: ACTIVE ]</div>
      </div>

      <div className="scroll-cue">
        <div>scroll</div>
        <div className="scroll-cue-line" />
      </div>
    </section>
  );
};

export default HeroSection;

