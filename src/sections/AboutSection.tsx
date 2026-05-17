import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const statVals = statsRef.current?.querySelectorAll<HTMLElement>("[data-counter]");
    const triggers: ScrollTrigger[] = [];
    statVals?.forEach((el) => {
      const target = parseInt(el.dataset.counter ?? "0", 10);
      const suffix = el.dataset.suffix ?? "";
      const obj = { v: 0 };
      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(obj, {
            v: target,
            duration: 1.6,
            ease: "expo.out",
            onUpdate: () => {
              el.textContent = Math.round(obj.v) + suffix;
            },
          });
        },
      });
      triggers.push(st);
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-wrap">
            <figure className="about-image-frame">
              <span className="corner tl" />
              <span className="corner tr" />
              <span className="corner bl" />
              <span className="corner br" />
              <img src="/assets/afiq-sitting.png" alt="Afiq Nurhariz" />
            </figure>
            <figcaption className="about-image-caption">
              <span>Afiq Nurhariz</span>
              <span className="dot" />
              <span>Shah Alam</span>
              <span className="dot" />
              <span>2026</span>
            </figcaption>
          </div>

          <div>
            <div className="section-num" style={{ position: "static", marginBottom: 18 }}>
              — 01 / About
            </div>

            <h2 className="about-heading">
              Building bridges between
              <br />
              <em>human intent</em> &amp; machine logic.
            </h2>

            <p className="about-body">
              A creative professional with experience working with tech startups and
              universities. As a graduate student in{" "}
              <strong>Artificial Intelligence</strong> at Universiti Teknologi MARA, Shah
              Alam, I enjoy working on new ideas and exciting projects.
            </p>

            <blockquote className="about-quote">
              &ldquo;Strongly interested in data and AI — creating smart algorithms,
              building data pipelines, and turning large datasets into insights.&rdquo;
            </blockquote>

            <p className="about-body">
              I also build <strong>web and mobile applications</strong>. My studies in Web
              Development and AI have given me solid foundations, and I am always ready to
              learn and improve.
            </p>

            <div className="about-stats" ref={statsRef}>
              <div>
                <div className="about-stat-val">
                  <span data-counter="1" data-suffix="+">
                    0
                  </span>
                </div>
                <div className="about-stat-label">Years building</div>
              </div>
              <div>
                <div className="about-stat-val">
                  <span data-counter="9" data-suffix="+">
                    0
                  </span>
                </div>
                <div className="about-stat-label">Shipped projects</div>
              </div>
              <div>
                <div className="about-stat-val">
                  <em>∞</em>
                </div>
                <div className="about-stat-label">Curiosity</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
