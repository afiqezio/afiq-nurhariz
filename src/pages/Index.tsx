import { useNavigate } from "react-router-dom";
import { LiquidEther, CleanNav } from "@/components/reactbits";
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
      <LiquidEther speed={0.8} intensity={0.6} />
      
      {/* Navigation */}
      <CleanNav items={navItems} />

      {/* Main Content */}
      <main>
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
