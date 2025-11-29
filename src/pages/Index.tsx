import { useNavigate } from "react-router-dom";
import { CleanNav } from "@/components/reactbits";
import LiquidEther from '@/components/LiquidEther';
import { navItems } from "@/constants/data";
import { Project } from "@/types";
import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import ProjectsSection from "@/sections/ProjectsSection";
import SkillsSection from "@/sections/SkillsSection";
import ContactSection from "@/sections/ContactSection";

const Index = () => {
  const navigate = useNavigate();

  const handleViewProject = (project: Project) => {
    navigate('/view', { state: project });
  };

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10 h-full min-h-screen">
        <LiquidEther
          className="w-full h-full"
          colors={['#5227FF', '#FF9FFC', '#B19EEF']}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
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
        <AboutSection />
        <ProjectsSection onViewProject={handleViewProject} />
        <SkillsSection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
