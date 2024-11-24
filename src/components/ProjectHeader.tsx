import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Clock } from "lucide-react";

interface ProjectHeaderProps {
  title: string;
  description: string;
  tech: string[];
  duration?: string;
}

const ProjectHeader = ({ title, description, tech, duration }: ProjectHeaderProps) => {
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
  <Card className="glass-card p-6 animate-slideUp">
    <h1 className="text-3xl font-bold mb-4 gradient-text">{title}</h1>
    <p className="text-muted-foreground mb-6">{description}</p>
    {duration && (
      <div className="flex items-center gap-2 mb-4 text-muted-foreground">
        <Clock className="h-4 w-4" />
        <span>{duration}</span>
      </div>
    )}
    <div className="flex flex-wrap gap-2">
      {tech.map((item, index) => (
        <Badge
          key={index}
          variant="outline"
          className="glass transition-all duration-300 hover:scale-105"
        >
          {item}
        </Badge>
      ))}
    </div>
  </Card>

    </div>
  );
};

export default ProjectHeader;