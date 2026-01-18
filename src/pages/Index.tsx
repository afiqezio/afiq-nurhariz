import { useNavigate } from "react-router-dom";
import { lazy, Suspense, useMemo } from "react";
import { CleanNav } from "@/components/reactbits";
import LiquidEther from '@/components/LiquidEther';
import Footer from '@/components/Footer';
import { navItems } from "@/constants/data";
import { Project } from "@/types";
import HeroSection from "@/sections/HeroSection";

// Lazy load sections for better performance
const AboutSection = lazy(() => import("@/sections/AboutSection"));
const ProjectsSection = lazy(() => import("@/sections/ProjectsSection"));
const SkillsSection = lazy(() => import("@/sections/SkillsSection"));
const ContactSection = lazy(() => import("@/sections/ContactSection"));

// Loading fallback component
const SectionLoader = () => (
  <div className="py-20 px-4 md:px-8 lg:px-16 flex justify-center">
    <div className="animate-pulse text-muted-foreground">Loading...</div>
  </div>
);

const Index = () => {
  const navigate = useNavigate();

  const handleViewProject = (project: Project) => {
    navigate('/view', { state: project });
  };

  // Detect device capabilities for performance optimization
  const isLowEndDevice = useMemo(() => {
    if (typeof window === 'undefined') return false;
    // Check for mobile devices or low-end indicators
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowMemory = (navigator as any).deviceMemory && (navigator as any).deviceMemory < 4;
    const isSlowConnection = (navigator as any).connection?.effectiveType && 
      ['slow-2g', '2g', '3g'].includes((navigator as any).connection.effectiveType);
    return isMobile || isLowMemory || isSlowConnection;
  }, []);

  // Optimize LiquidEther settings based on device
  const liquidEtherProps = useMemo(() => {
    if (isLowEndDevice) {
      // Reduced settings for low-end devices
      return {
        resolution: 0.25, // Lower resolution
        iterationsViscous: 16, // Fewer iterations
        iterationsPoisson: 16,
        mouseForce: 15,
        cursorSize: 80,
      };
    }
    // Standard settings for capable devices
    return {
      resolution: 0.4, // Slightly reduced from 0.5
      iterationsViscous: 24, // Reduced from 32
      iterationsPoisson: 24, // Reduced from 32
      mouseForce: 20,
      cursorSize: 100,
    };
  }, [isLowEndDevice]);

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10 h-full min-h-screen">
        <LiquidEther
          className="w-full h-full"
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={liquidEtherProps.mouseForce}
          cursorSize={liquidEtherProps.cursorSize}
          isViscous={false}
          viscous={30}
          iterationsViscous={liquidEtherProps.iterationsViscous}
          iterationsPoisson={liquidEtherProps.iterationsPoisson}
          resolution={liquidEtherProps.resolution}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>
      
      {/* Navigation */}
      <CleanNav items={navItems} />

      {/* Main Content */}
      <main className="relative z-10">
        <HeroSection />
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ProjectsSection onViewProject={handleViewProject} />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ContactSection />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
