---
paths:
  - "src/root.tsx"
  - "src/pages/**"
  - "src/sections/**"
  - "src/components/**"
  - "src/lib/smoothScroll.ts"
  - "src/lib/orbitThree.ts"
---

# Scroll, animation and WebGL

## Scrolling

- Scroll programmatically with `scrollToY` and freeze scrolling for overlays with `setScrollLocked`, both from `src/lib/smoothScroll.ts`. Do not call `window.scrollTo` or create a second Lenis instance.
- Drive scroll-linked motion with GSAP ScrollTrigger. Do not add scroll listeners that read layout.
- Measure layout in refresh and resize callbacks, cache the numbers, and do arithmetic only inside scroll, scrub and frame callbacks. `sections/ProjectsSection.tsx` is the reference.
- When a change alters page height after mount (split text, late content, a new pinned section), call `ScrollTrigger.refresh()`. The Projects pin starts at the wrong offset otherwise.

## Entrance animations

- Homepage entrances are wired in `pages/Index.tsx` by class name. When you rename or add an animated element in a section, update the selector there. Do not start a second entrance system inside the section component.
- An element passed to `splitForReveal` must have static text, because React cannot update text that has been rewritten into word spans. To reset one, re-key its parent, as `View` does with `<main key={project.title}>`.

## Every animation

- Kill every ScrollTrigger, tween, observer and listener in the effect cleanup. Collect triggers in an array, or wrap the work in `gsap.context()` and call `revert()`.
- Provide a `prefers-reduced-motion` path: skip decorative motion and land in the final state.
- Animate `transform` and `opacity`. Write per-frame CSS variables on the element that uses them, not on `:root`, which restyles the whole document.
- Framer Motion is loaded through `LazyMotion` with `domAnimation`, so use `m.*` components, not `motion.*`.

## three.js

- `SkillOrbit` must import three through `src/lib/orbitThree.ts`. Add any new symbol to that file; a runtime `import * as THREE` in `SkillOrbit` defeats tree-shaking (the type-only import is fine).
- `ThreeScene` draws into `<canvas id="scene-canvas">`, which the page has to render itself.
- Dispose geometries, materials and the renderer in cleanup, and keep the pixel ratio capped through `maxDpr`.
