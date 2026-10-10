import { useEffect, type ReactNode } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { Links, Meta, Scripts, useLocation, useOutlet } from "react-router";
import { initSmoothScroll } from "@/lib/smoothScroll";
// Lenis base styles first so the site stylesheet can override them
import "lenis/dist/lenis.css";
import "./index.css";

export const meta = () => [{ title: "Afiq Nurhariz" }];

// Static document shell, pre-rendered once per route at build time
export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/assets/afiqnhzlogo.png" />
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap"
        />
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

// Page transitions: the outgoing page exits before the next one enters
export default function App() {
  const location = useLocation();
  const outlet = useOutlet();
  const toCaseStudy = location.pathname.startsWith("/work/");

  useEffect(() => initSmoothScroll(), []);

  return (
    <LazyMotion features={domAnimation}>
      <AnimatePresence mode="wait">
        <m.div
          key={location.pathname}
          initial={{ opacity: 0, y: toCaseStudy ? 24 : -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: toCaseStudy ? -24 : 24 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="min-h-screen"
        >
          {outlet}
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}
