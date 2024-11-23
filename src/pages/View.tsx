import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
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
              {/* Overview Section */}
              <Card className="glass p-6">
                <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
                <p className="text-muted-foreground mb-4">
                  This project aims to solve real-world problems by implementing innovative solutions using modern technologies. The main focus was on creating a user-friendly interface while maintaining robust backend functionality.
                </p>
                <div className="flex gap-4 mt-6">
                  <Button variant="outline" className="glass">
                    <Github className="mr-2 h-4 w-4" /> View Source
                  </Button>
                  <Button variant="outline" className="glass">
                    <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                  </Button>
                </div>
              </Card>

              {/* Key Features */}
              <Card className="glass p-6">
                <h2 className="text-2xl font-semibold mb-4">Key Features</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Feature 1: Description of the first key feature</li>
                  <li>Feature 2: Description of the second key feature</li>
                  <li>Feature 3: Description of the third key feature</li>
                </ul>
              </Card>

              {/* Technical Details */}
              <Card className="glass p-6">
                <h2 className="text-2xl font-semibold mb-4">Technical Details</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Frontend</h3>
                    <p className="text-muted-foreground">
                      Details about the frontend implementation, frameworks, and libraries used.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Backend</h3>
                    <p className="text-muted-foreground">
                      Information about the backend architecture, APIs, and database design.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Deployment</h3>
                    <p className="text-muted-foreground">
                      Details about hosting, deployment process, and infrastructure.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Challenges and Solutions */}
              <Card className="glass p-6">
                <h2 className="text-2xl font-semibold mb-4">Challenges & Solutions</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Challenge 1</h3>
                    <p className="text-muted-foreground">
                      Description of a significant challenge faced during development and how it was overcome.
                    </p>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium mb-2">Challenge 2</h3>
                    <p className="text-muted-foreground">
                      Another challenge and its solution, highlighting problem-solving approaches.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Future Improvements */}
              <Card className="glass p-6">
                <h2 className="text-2xl font-semibold mb-4">Future Improvements</h2>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  <li>Planned feature or improvement 1</li>
                  <li>Planned feature or improvement 2</li>
                  <li>Planned feature or improvement 3</li>
                </ul>
              </Card>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default View;