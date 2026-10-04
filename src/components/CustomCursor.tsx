import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    // Hidden on touch devices — don't run a frame loop for it
    if (!cursor || window.matchMedia("(pointer: coarse)").matches) return;

    const pos = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };
    let rafId = 0;

    // Runs only while the dot is catching up with the pointer
    const loop = () => {
      current.x += (pos.x - current.x) * 0.18;
      current.y += (pos.y - current.y) * 0.18;
      const settled = Math.abs(pos.x - current.x) < 0.1 && Math.abs(pos.y - current.y) < 0.1;
      if (settled) {
        current.x = pos.x;
        current.y = pos.y;
      }
      cursor.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0) translate(-50%, -50%)`;
      rafId = settled ? 0 : requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (!rafId) rafId = requestAnimationFrame(loop);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const interactive = target.closest("a, button, [data-cursor-hover], input, textarea, select, label");
      cursor.classList.toggle("hover", !!interactive);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return <div className="cursor" ref={cursorRef} />;
};

export default CustomCursor;
