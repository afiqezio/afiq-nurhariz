import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

interface ProjectData {
  title: string;
  description: string;
  tech: string[];
}

const View = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const project = location.state as ProjectData;

  if (!project) {
    return (
      <div className="min-h-screen section-padding">
        <Button
          variant="outline"
          className="glass mb-4"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        <p className="text-muted-foreground">Project not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <section className="section-padding">
        <div className="max-w-4xl mx-auto">
          <Button
            variant="outline"
            className="glass mb-8 animate-fadeIn"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Back
          </Button>

          <Card className="glass p-8 animate-slideUp">
            <h1 className="text-4xl font-bold mb-6">{project.title}</h1>
            <p className="text-lg text-muted-foreground mb-8">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tech.map((tech, index) => (
                <span
                  key={index}
                  className="text-sm px-3 py-1 rounded-full glass"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="space-y-6">
              <Card className="glass p-6">
                <h2 className="text-2xl font-semibold mb-4">Project Details</h2>
                <p className="text-muted-foreground">
                  Detailed information about the project will be added here.
                </p>
              </Card>

              <Card className="glass p-6">
                <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
                <p className="text-muted-foreground">
                  In-depth explanation of the technologies and methodologies used in this project.
                </p>
              </Card>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default View;