import { lazy, Suspense, useEffect } from "react";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { initSmoothScroll } from "@/lib/smoothScroll";

// Lazy load pages for code splitting
const Index = lazy(() => import("./pages/Index"));
const View = lazy(() => import("./pages/View"));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <Loader2 className="h-8 w-8 animate-spin text-white" />
  </div>
);

// Animated routes: wrap Routes so page transitions run (exit then enter)
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <m.div
        key={location.pathname}
        initial={{ opacity: 0, y: location.pathname === "/view" ? 24 : -24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: location.pathname === "/view" ? -24 : 24 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="min-h-screen"
      >
        <Routes location={location}>
          <Route path="/" element={<Index />} />
          <Route path="/view" element={<View />} />
        </Routes>
      </m.div>
    </AnimatePresence>
  );
};

const App = () => {
  useEffect(() => initSmoothScroll(), []);

  return (
    <LazyMotion features={domAnimation}>
      <BrowserRouter basename="/">
        <Suspense fallback={<PageLoader />}>
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </LazyMotion>
  );
};

export default App;
