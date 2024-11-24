import { Card } from "@/components/ui/card";

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
      <Card className="glass-card p-6">
        <h2 className="text-2xl font-semibold mb-4 gradient-text">
          Project Overview
        </h2>
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