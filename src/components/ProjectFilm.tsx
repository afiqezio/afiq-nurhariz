import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AllWorkLink from "@/components/AllWorkLink";

gsap.registerPlugin(ScrollTrigger);

interface ProjectFilmProps {
  src: string;
}

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Chromeless summary film — plays with sound; click the film to toggle it
const ProjectFilm = ({ src }: ProjectFilmProps) => {
  const filmRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const ambientRef = useRef<HTMLVideoElement>(null);
  const heard = useRef(false);
  const [reduceMotion] = useState(prefersReducedMotion);
  const [muted, setMuted] = useState(true);
  const [idle, setIdle] = useState(false);
  const [missing, setMissing] = useState(false);

  const play = () => {
    videoRef.current?.play().catch(() => {});
  };

  useEffect(() => {
    const film = filmRef.current;
    const v = videoRef.current;
    const amb = ambientRef.current;
    if (!film || !v) return;

    const controller = new AbortController();
    const { signal } = controller;
    const reduce = prefersReducedMotion();
    v.volume = 0.25;

    // Film fades up once frames are actually on screen
    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      gsap.to(v, { opacity: 1, duration: 1.8, ease: "power2.out" });
      if (amb) gsap.to(amb, { opacity: 0.55, duration: 1.8, ease: "power2.out" });
    };
    v.addEventListener("playing", reveal, { signal });
    v.addEventListener("loadeddata", () => { if (reduce) reveal(); }, { signal });
    if (v.readyState >= 3 && (reduce || !v.paused)) reveal();

    v.addEventListener("error", () => setMissing(true), { signal });
    if (v.error) setMissing(true);

    // The blurred backdrop is a second copy of the film, kept in step with it
    const syncAmbient = () => {
      if (!amb) return;
      if (Math.abs(amb.currentTime - v.currentTime) > 0.25) amb.currentTime = v.currentTime;
      if (v.paused !== amb.paused) {
        if (v.paused) amb.pause();
        else amb.play().catch(() => {});
      }
    };
    ["play", "pause", "seeked", "timeupdate"].forEach((e) => v.addEventListener(e, syncAmbient, { signal }));

    // Nav, hint and cue fade out while the film plays untouched
    let idleTimer = 0;
    const wakeUi = () => {
      setIdle(false);
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(() => setIdle(true), 2000);
    };
    ["pointermove", "pointerdown", "keydown"].forEach((e) => film.addEventListener(e, wakeUi, { signal }));
    wakeUi();

    v.addEventListener("volumechange", () => setMuted(v.muted), { signal });

    // Sound is on by default and the film is heard once from the top. Browsers
    // refuse audible autoplay until the visitor has clicked somewhere on the
    // site (e.g. after a refresh), so fall back to the muted loop.
    if (reduce) {
      v.pause();
      amb?.pause();
    } else {
      v.muted = false;
      v.loop = false;
      heard.current = true;
      v.play().catch((err: DOMException) => {
        if (err.name !== "NotAllowedError") return;
        v.muted = true;
        v.loop = true;
        heard.current = false;
        v.play().catch(() => {});
      });
    }

    // After one listen with sound, fall back to the silent loop
    v.addEventListener("ended", () => {
      v.loop = true;
      v.muted = true;
      v.play().catch(() => {});
    }, { signal });

    // Pause when scrolled out of view, resume when back
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (!reduce) v.play().catch(() => {});
      } else if (!v.paused) v.pause();
    }, { threshold: 0.15 });
    observer.observe(film);

    return () => {
      controller.abort();
      observer.disconnect();
      window.clearTimeout(idleTimer);
      gsap.killTweensOf(amb ? [v, amb] : v);
    };
  }, []);

  useEffect(() => {
    const film = filmRef.current;
    if (!film) return;

    const ctx = gsap.context(() => {
      // Cinematic opening — letterbox bars retract
      gsap.fromTo(film, { "--bar": "12vh" }, { "--bar": "0vh", duration: 1.6, ease: "expo.inOut", delay: 0.2 });

      if (prefersReducedMotion()) return;

      // Film sinks slower than the page and dims; the intro slides over it
      gsap.fromTo(".pp-film-frame, .pp-film-ambient", { yPercent: 0, scale: 1 }, {
        yPercent: 42, scale: 1.14, ease: "none",
        scrollTrigger: { trigger: film, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".pp-film-dim", {
        opacity: 1, ease: "none",
        scrollTrigger: { trigger: film, start: "top top", end: "bottom top", scrub: true },
      });
      // Nav, hint and cue fade through --ui (an inline opacity would
      // override the idle fade)
      gsap.fromTo(film, { "--ui": 1 }, {
        "--ui": 0, ease: "none",
        scrollTrigger: { trigger: film, start: "top top", end: "25% top", scrub: true },
      });
      gsap.to(".pp-film-cue", {
        y: 20, ease: "none",
        scrollTrigger: { trigger: film, start: "top top", end: "15% top", scrub: true },
      });
    }, film);

    return () => ctx.revert();
  }, []);

  const toggleSound = () => {
    const v = videoRef.current;
    if (!v) return;
    // First unmute restarts the film so it is heard from the top
    if (v.muted && !heard.current) {
      heard.current = true;
      v.currentTime = 0;
      v.loop = false;
    }
    v.muted = !v.muted;
    if (v.paused) play();
  };

  const stateClass = [
    muted && "is-muted",
    idle && "is-idle",
    missing && "is-missing",
  ].filter(Boolean).join(" ");

  return (
    <section className={`pp-film ${stateClass}`} aria-label="Project summary film" ref={filmRef}>
      <video
        className="pp-film-ambient"
        src={src}
        muted
        autoPlay={!reduceMotion}
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
        tabIndex={-1}
        ref={ambientRef}
      />
      <div className="pp-film-frame">
        <video
          className="pp-film-video"
          src={src}
          muted
          autoPlay={!reduceMotion}
          loop
          playsInline
          preload="auto"
          aria-label="Project summary video"
          onClick={toggleSound}
          ref={videoRef}
        />
      </div>
      <div className="pp-film-dim" aria-hidden="true" />
      <div className="pp-film-shade" aria-hidden="true" />
      <div className="pp-film-bars" aria-hidden="true" />
      <nav className="pp-film-nav">
        <div className="nav-links">
          <AllWorkLink />
        </div>
      </nav>
      <div className="pp-film-cue" aria-hidden="true"><span>Scroll</span><i /></div>
      <div className="pp-film-hint" aria-hidden="true"><i /><span>{muted ? "Click for sound" : "Click to mute"}</span></div>
    </section>
  );
};

export default ProjectFilm;
