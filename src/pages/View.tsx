import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ImageModal from "@/components/ImageModal";
import ProjectHeader from "@/components/ProjectHeader";
import ProjectShowcase from "@/components/ProjectShowcase";
import ProjectDetails from "@/components/ProjectDetails";
import { projectData, ProjectData } from "@/data/projectData";

const View = () => {
  const location = useLocation();
  const project = location.state as ProjectData;
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project) {
    return (
      <div className="min-h-screen section-padding">
        <p className="text-muted-foreground">Project not found.</p>
      </div>
    );
  }

  const currentProjectData = projectData[project.title];

  if (!currentProjectData) {
    return (
      <div className="min-h-screen section-padding">
        <p className="text-muted-foreground">Project details not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      <section className="section-padding">
        <div className="max-w-4xl mx-auto space-y-8">
          <ProjectHeader
            title={project.title}
            description={project.description}
            tech={project.tech}
            duration={currentProjectData.duration}
          />

          <ProjectShowcase
            images={currentProjectData.images}
            onImageClick={setSelectedImageIndex}
          />

          <ProjectDetails
            overview={currentProjectData.overview}
            features={currentProjectData.features}
            challenges={currentProjectData.challenges}
            improvements={currentProjectData.improvements}
            documentUrl={currentProjectData.documentUrl}
          />
        </div>
      </section>

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