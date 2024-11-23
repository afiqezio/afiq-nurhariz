import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

interface ProjectDetailsProps {
  overview: string;
  features: string[];
  challenges: Array<{
    title: string;
    description: string;
  }>;
  improvements: string[];
}

const ProjectDetails = ({ overview, features, challenges, improvements }: ProjectDetailsProps) => {
  return (
    <div className="space-y-6 animate-slideUp" style={{ animationDelay: "200ms" }}>
      <Card className="glass p-6">
        <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Project Overview
        </h2>
        <p className="text-muted-foreground mb-4">{overview}</p>
        {/* <div className="flex gap-4 mt-6">
          <Button variant="outline" className="glass transition-all duration-300 hover:scale-105">
            <Github className="mr-2 h-4 w-4" /> View Source
          </Button>
        </div> */}
      </Card>

      <Card className="glass p-6">
        <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Key Features
        </h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          {features.map((feature, index) => (
            <li key={index} className="transition-all duration-300 hover:translate-x-2">
              {feature}
            </li>
          ))}
        </ul>
      </Card>

      <Card className="glass p-6">
        <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Challenges & Solutions
        </h2>
        <div className="space-y-4">
          {challenges.map((challenge, index) => (
            <div key={index} className="transition-all duration-300 hover:translate-x-2">
              <h3 className="text-lg font-medium mb-2">{challenge.title}</h3>
              <p className="text-muted-foreground">{challenge.description}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="glass p-6">
        <h2 className="text-2xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/60">
          Future Improvements
        </h2>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground">
          {improvements.map((improvement, index) => (
            <li key={index} className="transition-all duration-300 hover:translate-x-2">
              {improvement}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
};

export default ProjectDetails;