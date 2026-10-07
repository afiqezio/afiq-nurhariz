# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

Personal portfolio site for Afiq Nurhariz, served at harizafiq.com from GitHub Pages. React 18 + TypeScript + Vite, animated with GSAP ScrollTrigger, Lenis, Framer Motion and three.js. It is a static site: no backend, no database, no API.

Rules that only matter for part of the codebase live in `.claude/rules/` and load when matching files are touched:

- `animation.md`: scroll, GSAP, Framer Motion and three.js code
- `styling.md`: CSS and component markup
- `project-data.md`: case-study content and assets

## Commands

```bash
npm run dev        # Vite dev server on port 8080
npm run build      # tsc -b && vite build (the type-check is part of the build)
npm run lint       # eslint .
npm run preview    # serve the production build
npm run deploy     # gh-pages -d dist --cname harizafiq.com
```

- `deploy` publishes whatever is already in `dist/` and does not build. Use the `/deploy` skill, which builds and checks first.
- There is no test runner and no test files.
- To type-check without rewriting the tracked `*.tsbuildinfo` files: `npx tsc -p tsconfig.app.json --noEmit`.
- TypeScript is non-strict (`strict`, `strictNullChecks` and `noImplicitAny` are all off), and ESLint has `no-unused-vars` disabled.
- `package-lock.json` and `yarn.lock` are both committed and have been updated together on dependency changes.
- `@` resolves to `src/`.

## Architecture

### Routes and navigation

`src/App.tsx` defines two lazy routes inside an `AnimatePresence` page transition: `/` (`pages/Index.tsx`, the one-page portfolio) and `/view` (`pages/View.tsx`, a case study).

`/view` has no URL parameter. A project card calls `navigate("/view", { state: toProjectState(item) })` and `View` reads `location.state`, so opening or refreshing `/view` directly renders the "No project here" fallback.

### Scroll and animation

- `src/lib/smoothScroll.ts` creates one Lenis instance, started in `App`. It runs on GSAP's ticker and feeds `ScrollTrigger.update`, so Lenis and ScrollTrigger advance in the same frame. It also refreshes ScrollTrigger when fonts load or the page height changes.
- `pages/Index.tsx` owns the homepage's entrance and parallax animation in a single effect that waits for the `Loader` to finish. It finds its targets by class name, so the section components are mostly static markup.
- Headings are revealed word by word: `splitForReveal` rewrites the heading's DOM into `.split-mask > .w` spans.
- `sections/ProjectsSection.tsx` is a pinned horizontal stage. A scrubbed ScrollTrigger computes per-card targets and a `requestAnimationFrame` lerp loop writes the transforms, sleeping once the cards settle.

### three.js

- `components/ThreeScene.tsx` renders nothing. It draws the shader background into the `<canvas id="scene-canvas">` that each page places itself, and is lazy loaded because three.js is the heaviest dependency.
- `components/SkillOrbit.tsx` is a separate WebGL globe that imports three through the named re-exports in `src/lib/orbitThree.ts`, which keeps its lazy chunk tree-shaken.

### Styling

The live UI is styled with hand-written semantic classes in `src/index.css`, driven by CSS custom properties defined at the top of that file. Tailwind and the shadcn bridge tokens are configured but barely used; the main consumer is `ImageModal`, through `components/ui/dialog` and `aspect-ratio`.

### Project data

- `src/data/projectList.ts` holds the homepage cards and `toProjectState`, which builds the router state for `/view`.
- `src/data/projectData.ts` maps the same ids to case-study content. Each project is one file in `src/data/projects/`, typed by `ProjectDetails` in `src/data/projectTypes.ts`.
- Each case study opens with a summary film (`components/ProjectFilm.tsx`) loaded from `public/assets/videos/NN.mp4`, numbered by project order.

### Unused code from the previous design

These are not imported by either live page:

- `components/ProfileCard`, `ProjectCard`, `SkillCard`, `SkillsCanvas`, `Squares`, and everything in `components/reactbits/`
- `lib/theme.ts` (the "Dark Veil" palette), `constants/data.tsx`, `App.css`
- the toast, sonner and tooltip files in `components/ui/`, and the `@tanstack/react-query` and `next-themes` dependencies

The tech-stack tables in `README.md` are also out of date: they list libraries that are not installed and old versions. Trust `package.json`.

## Working rules

- Solve problems with the stack already installed: GSAP and ScrollTrigger, Lenis, Framer Motion, three.js and the Radix dialog. Do not add a dependency without asking first.
- Change only what the task needs. Do not restyle or refactor neighbouring sections along the way.
- Leave the unused files listed above alone unless the task is to clean them up, and do not build new work on them.
- The working tree may hold unrelated staged or unstaged work. Commit only the files that belong to the task (`git commit -- <paths>`), and never reset, stash or discard changes you did not make.
- The site's claims belong to the owner. Do not invent or reword facts about experience, results, metrics, dates or skill levels; ask when a value is missing.
- Commit messages use conventional prefixes (`feat:`, `fix:`, `perf:`, `chore:`, `docs:`) and carry no AI attribution or `Co-Authored-By` lines.

## Verification

There are no tests, so a change is verified by the checks below. Report which ones ran, and say plainly when one could not be run.

1. `npx tsc -p tsconfig.app.json --noEmit` passes.
2. `npm run lint` shows no new problems in the files you touched.
3. For anything visual, run `npm run dev` and look at the affected page in a browser, at desktop width and below 900px, where the scripts switch to their mobile behaviour.
4. For animation changes, also check with reduced motion emulated.
5. Read the final `git diff` and confirm it contains only the requested change.
