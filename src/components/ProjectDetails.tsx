import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface ProjectDetailsProps {
  overview: string;
  features: string[];
  challenges: Array<{
    title: string;
    description: string;
  }>;
  improvements: string[];
  documentUrl?: string;
}

const ProjectDetails = ({ overview, features, challenges, improvements, documentUrl }: ProjectDetailsProps) => {
  const { toast } = useToast();

  const handleDownload = () => {
    if (documentUrl) {
      window.open(documentUrl, '_blank');
    } else {
      toast({
        title: "Document Unavailable",
        description: "No documentation is available for this project.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6 animate-slideUp" style={{ animationDelay: "200ms" }}>
      <Card className="glass-card p-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-semibold gradient-text">
            Project Overview
          </h2>
          {documentUrl && (
            <Button
              variant="outline"
              className="glass transition-all duration-300 hover:scale-105"
              onClick={handleDownload}
            >
              <FileDown className="mr-2 h-4 w-4" />
              Documentation
            </Button>
          )}
        </div>
        <p className="text-muted-foreground">{overview}</p>
      </Card>

      <Card className="glass-card p-6">
        <h2 className="text-2xl font-semibold mb-4 gradient-text">
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

      <Card className="glass-card p-6">
        <h2 className="text-2xl font-semibold mb-4 gradient-text">
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

      <Card className="glass-card p-6">
        <h2 className="text-2xl font-semibold mb-4 gradient-text">
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