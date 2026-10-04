import Lenis from "lenis";
import "lenis/dist/lenis.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

// Inertial wheel scrolling, driven by GSAP's ticker so Lenis and ScrollTrigger
// update in the same frame. Touch devices keep their native scrolling.
export const initSmoothScroll = () => {
  if (lenis || prefersReducedMotion()) return () => {};

  const instance = new Lenis({ lerp: 0.1, autoRaf: false });
  lenis = instance;

  instance.on("scroll", ScrollTrigger.update);
  const raf = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // Web fonts change text metrics, which shifts every trigger position
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  // Any later change in page height (late content, wrapping) would leave the
  // pinned section starting at a stale offset, so re-measure when it happens.
  let pageHeight = document.documentElement.scrollHeight;
  let refreshTimer = 0;
  const pageObserver = new ResizeObserver(() => {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => {
      const height = document.documentElement.scrollHeight;
      if (height === pageHeight) return;
      ScrollTrigger.refresh();
      pageHeight = document.documentElement.scrollHeight;
    }, 200);
  });
  pageObserver.observe(document.body);

  return () => {
    pageObserver.disconnect();
    window.clearTimeout(refreshTimer);
    gsap.ticker.remove(raf);
    gsap.ticker.lagSmoothing(500, 33);
    instance.destroy();
    if (lenis === instance) lenis = null;
  };
};

export const scrollToY = (y: number, { immediate = false } = {}) => {
  if (lenis) {
    lenis.scrollTo(y, { immediate, duration: 0.9, easing: easeInOutCubic, force: true });
    return;
  }
  window.scrollTo({ top: y, behavior: immediate || prefersReducedMotion() ? "auto" : "smooth" });
};

// Freeze page scrolling while an overlay (e.g. the image modal) is open
export const setScrollLocked = (locked: boolean) => {
  if (!lenis) return;
  if (locked) lenis.stop();
  else lenis.start();
};
