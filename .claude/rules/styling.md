---
paths:
  - "src/index.css"
  - "src/**/*.tsx"
---

# Styling

- Style new UI with semantic classes in `src/index.css`, placed under the comment banner for that section. Do not introduce Tailwind utility strings or CSS modules for it.
- Homepage classes are named after their section (`hero-*`, `about-*`, `projects-*`, `contact-*`). Case-study page classes are prefixed `pp-`.
- Use the custom properties at the top of `index.css` instead of hard-coded values:
  - colour: `--bg`, `--bg-2`, `--fg`, `--fg-dim`, `--fg-mute`, `--line`, `--accent`, `--accent-2`, `--accent-glow`
  - type: `--sans`, `--mono`, `--serif`
  - radius: `--r-pill`, `--r-md`, `--r-lg`
- Write any new colour in `oklch()`, matching the existing tokens.
- Do not style with `lib/theme.ts` or anything in `components/reactbits/`. They belong to the previous design.
- Fixed layers stack as: scene canvas (z 1), grain and vignette (z 2), page content (z 3), nav (z 50), loader (z 100). Keep new layers inside that order.
- Reuse the existing breakpoints (540, 640, 700, 768, 900 and 1000px) before adding a new one. The scripts switch to mobile behaviour at 900px, so layout that depends on them should switch there too.
- Do not add green status dots, "Available" pills or pulsing "live" indicators. They were removed from the nav and footer on purpose as generic AI-template design.
