import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ImageModal from "@/components/ImageModal";
import ProjectHeader from "@/components/ProjectHeader";
import { projectData, ProjectData } from "@/data/projectData";
import Carousel, { CarouselItem } from "@/components/Carousel";
import MagicBento from '@/components/MagicBento';
import { CleanNav } from "@/components/reactbits";
import DarkVeil from "@/components/DarkVeil";
import { navItems } from "@/constants/data";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { FileDown, Image as ImageIcon, Code, Zap, Target, TrendingUp, Lightbulb } from "lucide-react";

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
        <DarkVeil />
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
        <DarkVeil />
        <CleanNav items={navItems} />
        <div className="min-h-screen section-padding relative z-10 flex items-center justify-center">
          <Card className="glass-card p-8">
            <p className="text-muted-foreground">Project details not found.</p>
          </Card>
        </div>
      </div>
    );
  }

  // Create carousel items from images for the image showcase
  const imageCarouselItems: CarouselItem[] = currentProjectData.images.map((image, index) => ({
    id: index + 1,
    title: image.caption,
    description: image.alt,
    icon: <ImageIcon className="h-[16px] w-[16px] text-white" />
  }));

  // Create carousel items for features and challenges
  const featureCarouselItems: CarouselItem[] = [
    ...currentProjectData.features.map((feature, index) => ({
      id: index + 1,
      title: feature,
      description: `Key feature of ${project.title}`,
      icon: <Zap className="h-[16px] w-[16px] text-white" />
    })),
    ...currentProjectData.challenges.map((challenge, index) => ({
      id: currentProjectData.features.length + index + 1,
      title: challenge.title,
      description: challenge.description,
      icon: <Target className="h-[16px] w-[16px] text-white" />
    }))
  ];

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <DarkVeil />
      
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
            <Card className="glass-card p-8 animate-slideUp">
              <h2 className="text-2xl font-semibold mb-6 gradient-text">
                Project Showcase
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProjectData.images.map((image, index) => (
                  <div
                    key={index}
                    className="cursor-pointer transition-all duration-300 hover:scale-105 glass-card p-2 rounded-lg"
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden">
                      <img
                        src={image.url}
                        alt={image.alt}
                        className="w-full h-full object-cover"
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
            <div className="animate-slideUp" style={{ animationDelay: "200ms" }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card p-6 hover:scale-[1.02] transition-all duration-300">
                  <h2 className="text-2xl font-semibold mb-4 gradient-text">
                    Project Overview
                  </h2>
                  <p className="text-muted-foreground">{currentProjectData.overview}</p>
                </Card>

                <Card className="glass-card p-6 hover:scale-[1.02] transition-all duration-300">
                  <h2 className="text-2xl font-semibold mb-4 gradient-text">
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

                <Card className="glass-card p-6 hover:scale-[1.02] transition-all duration-300">
                  <h2 className="text-2xl font-semibold mb-4 gradient-text">
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

                <Card className="glass-card p-6 hover:scale-[1.02] transition-all duration-300">
                  <h2 className="text-2xl font-semibold mb-4 gradient-text">
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
              <Card className="glass-card p-6 animate-slideUp flex justify-center" style={{ animationDelay: "400ms" }}>
                <Button
                  variant="outline"
                  className="glass transition-all duration-300 hover:scale-105"
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