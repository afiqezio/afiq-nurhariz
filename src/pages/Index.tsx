import { useNavigate } from "react-router-dom";
import { CleanNav } from "@/components/reactbits";
import DarkVeil from "@/components/DarkVeil";
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
      <DarkVeil />
      
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
