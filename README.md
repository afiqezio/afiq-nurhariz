# afiq-nurhariz — Portfolio

Personal portfolio website deployed at [harizafiq.com](https://harizafiq.com).

---

## Tech Stack

### Core

| Tool | Version | Purpose |
|------|---------|---------|
| [React](https://react.dev) | 18.3 | UI framework |
| [TypeScript](https://typescriptlang.org) | 5.5 | Type safety |
| [Vite](https://vitejs.dev) | 5.4 | Build tool & dev server |
| [React Router DOM](https://reactrouter.com) | 6.28 | Client-side routing |

### Styling

| Tool | Version | Purpose |
|------|---------|---------|
| [Tailwind CSS](https://tailwindcss.com) | 3.4 | Utility-first CSS framework |
| [tailwindcss-animate](https://github.com/jamiebuilds/tailwindcss-animate) | 1.0 | Animation utilities for Tailwind |
| [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) | 0.5 | Prose typography styles |
| [PostCSS](https://postcss.org) | 8.4 | CSS processing pipeline |
| [Autoprefixer](https://github.com/postcss/autoprefixer) | 10.4 | Vendor prefix injection |

### UI Components

| Tool | Purpose |
|------|---------|
| [shadcn/ui](https://ui.shadcn.com) | 48 pre-built accessible components |
| [Radix UI](https://www.radix-ui.com) | Headless primitives behind shadcn/ui (27 packages) |
| [ReactBits](https://reactbits.dev) | 13 custom animated components |
| [Lucide React](https://lucide.dev) | Icon library |
| [cmdk](https://cmdk.paco.me) | Command palette component |

### Animation & Motion

| Tool | Version | Purpose |
|------|---------|---------|
| [Framer Motion](https://www.framer.com/motion/) | 12.23 | Declarative React animations |
| [GSAP](https://gsap.com) | 3.13 | High-performance timeline animations |

### 3D Graphics

| Tool | Version | Purpose |
|------|---------|---------|
| [Three.js](https://threejs.org) | 0.150 | 3D WebGL rendering |
| [OGL](https://github.com/oframe/ogl) | 1.0 | Lightweight WebGL library |

### Forms & Validation

| Tool | Version | Purpose |
|------|---------|---------|
| [React Hook Form](https://react-hook-form.com) | 7.53 | Performant form state management |
| [Zod](https://zod.dev) | 3.23 | Schema-based form validation |
| [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | 3.9 | Zod adapter for React Hook Form |

### Data & State

| Tool | Version | Purpose |
|------|---------|---------|
| [TanStack React Query](https://tanstack.com/query) | 5.56 | Server state & data fetching |
| [Recharts](https://recharts.org) | 2.12 | Composable chart components |

### UI Extras

| Tool | Version | Purpose |
|------|---------|---------|
| [Embla Carousel](https://www.embla-carousel.com) | 8.6 | Touch-friendly carousel |
| [Sonner](https://sonner.emilkowal.ski) | 1.5 | Toast notifications |
| [Vaul](https://vaul.emilkowal.ski) | 0.9 | Drawer component |
| [next-themes](https://github.com/pacocoursey/next-themes) | 0.3 | Theme switching |
| [date-fns](https://date-fns.org) | 3.6 | Date utility functions |
| [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/nicolo-ribaudo/tailwind-merge) | — | Conditional className merging |
| [class-variance-authority](https://cva.style) | 0.7 | Component variant management |

---

## CSS Architecture

### Global Styles (`src/index.css`)

Custom properties are split into two layers:

**Design tokens** (raw values):

```css
--bg, --bg-2          /* Background surfaces */
--fg, --fg-dim, --fg-mute  /* Foreground text hierarchy */
--line                /* Border/divider color */
--accent, --accent-2, --accent-glow, --accent-hsl  /* Brand accent */
--sans, --mono, --serif  /* Font stacks */
--r-pill, --r-md, --r-lg  /* Border radii */
--nav-height: 68px    /* Fixed nav offset */
```

**Tailwind/shadcn bridge tokens** (HSL-based):

```css
--background, --foreground
--card, --popover
--primary, --secondary, --muted, --accent
--destructive
--border, --input, --ring
--radius
```

### Typography

Fonts loaded via Google Fonts:

| Variable | Font | Weights |
|----------|------|---------|
| `--sans` | Geist | 300–700 |
| `--mono` | Geist Mono | 400–500 |
| `--serif` | Instrument Serif | Regular + Italic |

Tailwind config also registers **Inter** (sans fallback) and **Space Grotesk** (display).

### Color Palette

| Role | Value | Usage |
|------|-------|-------|
| Primary / Web | `#0ea5e9` (sky-500) | Web dev accent |
| AI | `#8b5cf6` (violet-500) | AI/ML accent |
| Mobile | `#10b981` (emerald-500) | Mobile dev accent |

Colors use `oklch()` for perceptually uniform interpolation.

### Custom Tailwind Animations

Defined in `tailwind.config.ts` and available as `animate-*` utilities:

| Class | Effect |
|-------|--------|
| `animate-fadeIn` | Opacity 0 → 1 |
| `animate-slideUp` | Translate Y up + fade in |
| `animate-slideInBottom` | Slide from bottom |
| `animate-fadeInScale` | Scale 0.95 + fade in |
| `animate-float` | Vertical float loop |
| `animate-floatSlow` | Slow vertical float loop |
| `animate-glow` | Box-shadow pulse |
| `animate-pulseGlow` | Opacity pulse |
| `animate-gradientShift` | Background-position shift |
| `animate-accordion-down/up` | Accordion expand/collapse |

### Notable CSS Patterns

- **Glassmorphism nav** — `backdrop-filter: blur` with semi-transparent background
- **Noise grain overlay** — `.bg-grain` applies a pseudo-element SVG noise texture
- **Vignette** — `.bg-vignette` with radial-gradient overlay
- **Custom cursor** — 10px circle element that scales on hover
- **Marquee** — CSS `@keyframes` scroll with JS-controlled play state
- **Horizontal scroll projects** — sticky viewport with `overflow-x: auto` + scroll snap
- **Project detail pages** — `pp-*` prefixed classes for layout (header, hero, gallery, sidebar, TOC)

---

## Tooling

### Build & Dev

| Tool | Purpose |
|------|---------|
| `@vitejs/plugin-react-swc` | SWC-based React transform (faster than Babel) |
| Vite manual chunks | Splits `react-vendor`, `three-vendor`, `ui-vendor` for better caching |
| `esnext` target | Modern output, no legacy polyfills |
| Port 8080 | Dev server default port |

### Linting

| Tool | Config |
|------|--------|
| ESLint 9 | Flat config (`eslint.config.js`) |
| `typescript-eslint` | TypeScript-aware rules |
| `eslint-plugin-react-hooks` | Hooks rules enforcement |
| `eslint-plugin-react-refresh` | HMR safety checks |

### Deployment

| Tool | Purpose |
|------|---------|
| `gh-pages` | Publishes `dist/` to GitHub Pages |
| Custom domain | `harizafiq.com` via CNAME |

### Path Alias

`@` resolves to `./src` in both Vite and TypeScript configs.

---

## Project Structure

```
src/
├── components/
│   ├── reactbits/     # Custom animated UI components (13 files)
│   └── ui/            # shadcn/ui component library (48 files)
├── sections/          # Page sections (Hero, About, Projects, Skills, Contact)
├── pages/             # Route-level pages (Index, View)
├── data/              # Project data & types
├── hooks/             # Custom React hooks
├── lib/               # Utilities (cn, theme)
├── types/             # Shared TypeScript types
├── constants/         # Static data
├── App.tsx
├── main.tsx
└── index.css          # Global styles & CSS custom properties
```

---

## Scripts

```bash
npm run dev        # Start dev server on port 8080
npm run build      # Type-check + production build
npm run build:dev  # Development mode build
npm run lint       # Run ESLint
npm run preview    # Preview production build locally
npm run deploy     # Build + publish to GitHub Pages
```
- shadcn-ui
- Tailwind CSS
