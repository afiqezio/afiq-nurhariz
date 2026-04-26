# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (localhost:8080)
npm run build      # TypeScript check + Vite production build → dist/
npm run build:dev  # Vite build in development mode
npm run lint       # ESLint across the project
npm run preview    # Preview production build locally
npm run deploy     # Build + push to GitHub Pages (harizafiq.com)
```

No test framework is configured — there are no tests in this codebase.

## Stack

React 18 + TypeScript 5 + Vite 5 (SWC). Tailwind CSS 3 with shadcn/ui components (Radix UI primitives). Routing via React Router 6. Animations via Framer Motion + GSAP. 3D background via Three.js (`LiquidEther.tsx`). Path alias `@/` resolves to `src/`.

## Architecture

**Entry**: `src/main.tsx` → `src/App.tsx` (router + providers) → lazy-loaded pages.

**Routes**: `/` → `pages/Index.tsx`, `/view` → `pages/View.tsx`.

**Data flow**: Static content lives in `src/constants/data.tsx` (hero info, projects array, skills, contact links) and `src/data/projects/` (individual project detail files). `src/types/index.ts` holds the shared interfaces (`Project`, `NavItem`, `ContactLink`).

**Pages**:
- `Index.tsx` — assembles the full portfolio with the `LiquidEther` WebGL background. Detects low-end devices (mobile UA, device memory < 4 GB, slow connection) and passes degraded settings to `LiquidEther` to reduce GPU load.
- `View.tsx` — project detail view, reads from `src/data/projects/`.

**Components split**:
- `src/components/ui/` — shadcn/ui generated components (don't hand-edit; regenerate via `npx shadcn@latest add <component>`).
- `src/components/reactbits/` — components from `@appletosolutions/reactbits` package (creative/animated primitives).
- `src/components/` root — project-specific components (`ProjectCard`, `SkillCard`, `ProfileCard`, `LiquidEther`, etc.).
- `src/sections/` — full-page sections composed into `Index.tsx` (`HeroSection`, `AboutSection`, `ProjectsSection`, `SkillsSection`, `ContactSection`).

**Theming**: `tailwind.config.ts` defines custom font families (`Inter`/`Space Grotesk`), accent color tokens (`ai`, `web`, `mobile`), and 10+ keyframe animations. Extended theme and CSS variable mappings are in `src/lib/theme.ts`. The `cn()` helper in `src/lib/utils.ts` (`clsx` + `tailwind-merge`) is the standard way to compose class names.

**Build chunking**: `vite.config.ts` manually splits vendor chunks — React/Router, Three.js, and Radix UI each land in separate chunks. `@appletosolutions/reactbits` is excluded from Vite's dep optimization.

## TypeScript

`strict` is off; `noImplicitAny`, `strictNullChecks`, and `noUnusedLocals` are all disabled. Type coverage is intentionally loose.

## Deployment

`npm run deploy` runs `gh-pages -d dist --cname harizafiq.com`. The custom domain is set via the CNAME flag — do not add a CNAME file manually.
