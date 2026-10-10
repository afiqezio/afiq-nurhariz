import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Cinematic settle
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// Inertial wheel scrolling, driven by GSAP's ticker so Lenis and ScrollTrigger
// update in the same frame. Touch devices keep their native scrolling.
export const initSmoothScroll = () => {
  if (lenis || prefersReducedMotion()) return () => {};

  const instance = new Lenis({
    autoRaf: false,
    // Lerp only — a `duration` here would take precedence and restart a full
    // timed ease on every wheel tick, which makes the page feel heavy.
    lerp: 0.14, // per-frame easing toward target — higher = snappier
    smoothWheel: true,
    wheelMultiplier: 1.1,
    touchMultiplier: 1.4,
  });
  lenis = instance;

  instance.on("scroll", ScrollTrigger.update);
  let pageHeight = document.documentElement.scrollHeight;
  // Pin spacers change the page height — keep Lenis' scroll limit in step
  const onRefresh = () => {
    instance.resize();
    pageHeight = document.documentElement.scrollHeight;
  };
  ScrollTrigger.addEventListener("refresh", onRefresh);
  const raf = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // Web fonts change text metrics, which shifts every trigger position
  document.fonts?.ready.then(() => ScrollTrigger.refresh());

  // Any later change in page height (late content, wrapping) would leave the
  // pinned section starting at a stale offset, so re-measure when it happens.
  // Safe refresh — it waits for scrolling to stop, because a hard refresh
  // resets the scroll position and cuts a touch scroll short. On mobile the
  // height changes mid-scroll whenever the URL bar collapses (100dvh hero).
  let refreshTimer = 0;
  const pageObserver = new ResizeObserver(() => {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => {
      if (document.documentElement.scrollHeight === pageHeight) return;
      ScrollTrigger.refresh(true);
    }, 200);
  });
  pageObserver.observe(document.body);

  return () => {
    pageObserver.disconnect();
    window.clearTimeout(refreshTimer);
    ScrollTrigger.removeEventListener("refresh", onRefresh);
    gsap.ticker.remove(raf);
    gsap.ticker.lagSmoothing(500, 33);
    instance.destroy();
    if (lenis === instance) lenis = null;
  };
};

export const scrollToY = (
  y: number,
  { immediate = false, duration = 1.2, easing = easeOutCubic } = {},
) => {
  if (lenis) {
    lenis.scrollTo(y, { immediate, duration, easing, force: true });
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
