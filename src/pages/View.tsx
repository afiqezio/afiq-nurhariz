import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ImageModal from "@/components/ImageModal";
import ProjectHeader from "@/components/ProjectHeader";
import { projectData, ProjectData } from "@/data/projectData";
import { CleanNav } from "@/components/reactbits";
import Squares from '@/components/Squares';
import { navItems } from "@/constants/data";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { FileDown, Image as ImageIcon, Code, Zap, Target, TrendingUp, Lightbulb } from "lucide-react";
import { DarkVeilClasses, ThemeColors, getGradientText } from "@/lib/theme";

const View = () => {
  const location = useLocation();
  const project = location.state as ProjectData;
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen relative">
        <div className="absolute inset-0 -z-10 h-full min-h-screen">
          <Squares 
          speed={0.2} 
          squareSize={45}
          direction='diagonal' // up, down, left, right, diagonal
          borderColor='#362a4c'
          hoverFillColor='#222'
          />
        </div>
        <CleanNav items={navItems} />
        <div className="min-h-screen section-padding relative z-10 flex items-center justify-center">
          <Card className="glass-card p-8">
            <p className="text-muted-foreground">Project not found.</p>
          </Card>
        </div>
      </div>
    );
  }

  const currentProjectData = projectData[project.title];

  if (!currentProjectData) {
    return (
      <div className="min-h-screen relative">
        <div className="absolute inset-0 -z-10 h-full min-h-screen">
          <Squares 
          speed={0.2} 
          squareSize={45}
          direction='diagonal' // up, down, left, right, diagonal
          borderColor='#362a4c'
          hoverFillColor='#222'
          />
        </div>
        <CleanNav items={navItems} />
        <div className="min-h-screen section-padding relative z-10 flex items-center justify-center">
          <Card className="glass-card p-8">
            <p className="text-muted-foreground">Project details not found.</p>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div className="absolute inset-0 -z-10 h-full min-h-screen">    
        <Squares 
        speed={0.2} 
        squareSize={45}
        direction='diagonal' // up, down, left, right, diagonal
        borderColor='#362a4c'
        hoverFillColor='#222'
        />
      </div>
      
      {/* Navigation */}
      <CleanNav items={navItems} />

      {/* Main Content */}
      <main className="relative z-10">
        <section className="py-24 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto space-y-8">
            <ProjectHeader
              title={project.title}
              description={project.description}
              tech={project.tech}
              duration={currentProjectData.duration}
            />

            {/* Image Showcase */}
            <Card className={DarkVeilClasses.glassCard + " p-8 " + DarkVeilClasses.slideUp}>
              <h2 className="text-2xl font-semibold mb-6" style={getGradientText('text')}>
                Project Showcase
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProjectData.images.map((image, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer ${DarkVeilClasses.hoverScale} ${DarkVeilClasses.glassCard} p-2 rounded-lg`}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </AspectRatio>
                    <p className="text-sm text-muted-foreground text-center mt-2">
                      {image.caption}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Project Details Grid */}
            <div className={DarkVeilClasses.slideUp} style={{ animationDelay: "200ms" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className={`${DarkVeilClasses.glassCard} p-6 ${DarkVeilClasses.hoverScale}`}>
                  <h2 className="text-2xl font-semibold mb-4" style={getGradientText('text')}>
                    Project Overview
                  </h2>
                  <p className="text-muted-foreground">{currentProjectData.overview}</p>
                </Card>

                <Card className={`${DarkVeilClasses.glassCard} p-6 ${DarkVeilClasses.hoverScale}`}>
                  <h2 className="text-2xl font-semibold mb-4" style={getGradientText('text')}>
                    Key Features
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {currentProjectData.features.map((feature, index) => (
                      <li key={index} className="transition-all duration-300 hover:translate-x-2">
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>

                <Card className={`${DarkVeilClasses.glassCard} p-6 ${DarkVeilClasses.hoverScale}`}>
                  <h2 className="text-2xl font-semibold mb-4" style={getGradientText('text')}>
                    Challenges & Solutions
                  </h2>
                  <div className="space-y-4">
                    {currentProjectData.challenges.map((challenge, index) => (
                      <div key={index} className="transition-all duration-300 hover:translate-x-2">
                        <h3 className="text-lg font-medium mb-2">{challenge.title}</h3>
                        <p className="text-muted-foreground">{challenge.description}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className={`${DarkVeilClasses.glassCard} p-6 ${DarkVeilClasses.hoverScale}`}>
                  <h2 className="text-2xl font-semibold mb-4" style={getGradientText('text')}>
                    Future Improvements
                  </h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {currentProjectData.improvements.map((improvement, index) => (
                      <li key={index} className="transition-all duration-300 hover:translate-x-2">
                        {improvement}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </div>

            {/* Documentation Button */}
            {currentProjectData.documentUrl && (
              <Card className={`${DarkVeilClasses.glassCard} p-6 ${DarkVeilClasses.slideUp} flex justify-center`} style={{ animationDelay: "400ms" }}>
                <Button
                  variant="outline"
                  className={`${DarkVeilClasses.glass} ${DarkVeilClasses.hoverScale}`}
                  onClick={() => window.open(currentProjectData.documentUrl, '_blank')}
                >
                  <FileDown className="mr-2 h-4 w-4" />
                  View Documentation
                </Button>
              </Card>
            )}
          </div>
        </section>
      </main>

      <ImageModal
        isOpen={selectedImageIndex !== null}
        onClose={() => setSelectedImageIndex(null)}
        images={currentProjectData.images}
        currentIndex={selectedImageIndex ?? 0}
      />
    </div>
  );
};

export default View;