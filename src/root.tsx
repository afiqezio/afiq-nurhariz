import { useEffect, type ReactNode } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { Links, Meta, Scripts, useLocation, useOutlet } from "react-router";
import { initSmoothScroll } from "@/lib/smoothScroll";
import { DEFAULT_IMAGE, SITE_NAME, SITE_URL } from "@/lib/seo";
// Lenis base styles first so the site stylesheet can override them
import "lenis/dist/lenis.css";
import "./index.css";

const personJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: SITE_NAME,
      inLanguage: "en",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      image: SITE_URL + DEFAULT_IMAGE,
      jobTitle: "Full-Stack & AI Engineer",
      description:
        "Full-Stack & AI engineer building intelligent, high-performance web, mobile and machine learning systems.",
      email: "mailto:afiqnurhariz@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Shah Alam",
        addressRegion: "Selangor",
        addressCountry: "MY",
      },
      alumniOf: { "@type": "CollegeOrUniversity", name: "Universiti Teknologi MARA" },
      knowsAbout: [
        "Artificial Intelligence",
        "Machine Learning",
        "Computer Vision",
        "Data Engineering",
        "Full-Stack Web Development",
        "Mobile Application Development",
      ],
      sameAs: ["https://www.linkedin.com/in/afiqnurhariz/", "https://github.com/afiqezio"],
    },
  ],
};

// Static document shell, pre-rendered once per route at build time.
// Per-page title/description/canonical come from each route's `meta` export.
export function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/png" href="/assets/afiqnhzlogo.png" />
        <link rel="apple-touch-icon" href="/assets/afiqnhzlogo.png" />
        <meta name="author" content={SITE_NAME} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:site_name" content={SITE_NAME} />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <Meta />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600;700&family=Geist+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap"
        />
        <Links />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
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
