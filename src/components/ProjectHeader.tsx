import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

interface ProjectHeaderProps {
  title: string;
  description: string;
  tech: string[];
}

const ProjectHeader = ({ title, description, tech }: ProjectHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="animate-fadeIn">
      <Button
        variant="outline"
        className="glass mb-8 transition-all duration-300 hover:scale-105"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" /> Back
      </Button>

      <Card className="glass-card p-8">
        <h1 className="text-4xl font-bold mb-6 gradient-text">
          {title}
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tech.map((tech, index) => (
            <span
              key={index}
              className="text-sm px-3 py-1 rounded-full glass transition-all duration-300 hover:scale-105"
            >
              {tech}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProjectHeader;