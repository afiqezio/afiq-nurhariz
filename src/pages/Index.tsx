import { useNavigate } from 'react-router-dom';
import { lazy, Suspense, useCallback } from 'react';
import { CleanNav } from '@/components/reactbits';
import CustomCursor from '@/components/CustomCursor';
import Footer from '@/components/Footer';
import { navItems } from '@/constants/data';
import { Project } from '@/types';
import HeroSection from '@/sections/HeroSection';

const AboutSection    = lazy(() => import('@/sections/AboutSection'));
const ProjectsSection = lazy(() => import('@/sections/ProjectsSection'));
const SkillsSection   = lazy(() => import('@/sections/SkillsSection'));
const ContactSection  = lazy(() => import('@/sections/ContactSection'));

const SectionLoader = () => (
  <div style={{ padding: '80px clamp(24px, 5vw, 80px)', color: 'var(--subtle)', fontFamily: 'JetBrains Mono, monospace', fontSize: 11 }}>
    Loading...
  </div>
);

const Index = () => {
  const navigate = useNavigate();

  const handleViewProject = useCallback((project: Project) => {
    navigate('/view', { state: project });
  }, [navigate]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <CustomCursor />
      <CleanNav items={navItems} />

      <main>
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
