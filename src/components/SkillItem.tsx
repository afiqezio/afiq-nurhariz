import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Code2, Database, FileCode2, Blocks, Binary, Smartphone } from "lucide-react";

type SkillIconMap = {
  [key: string]: JSX.Element;
};

const skillIcons: SkillIconMap = {
  "Python": <FileCode2 className="h-6 w-6" />,
  "JavaScript": <Code2 className="h-6 w-6" />,
  "C#": <Code2 className="h-6 w-6" />,
  "PHP": <Code2 className="h-6 w-6" />,
  "Dart": <Code2 className="h-6 w-6" />,
  "React": <Blocks className="h-6 w-6" />,
  "Flutter": <Smartphone className="h-6 w-6" />,
  ".NET": <Binary className="h-6 w-6" />,
  "Laravel": <Code2 className="h-6 w-6" />,
  "MySQL": <Database className="h-6 w-6" />,
  "MSSQL": <Database className="h-6 w-6" />,
  "SQL": <Database className="h-6 w-6" />,
};

interface SkillItemProps {
  skill: string;
}

const SkillItem = ({ skill }: SkillItemProps) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <div className="glass p-4 rounded-lg text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-primary/5">
          {skill}
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-auto p-4 flex items-center gap-2">
        {skillIcons[skill] || <Code2 className="h-6 w-6" />}
        <span>{skill}</span>
      </HoverCardContent>
    </HoverCard>
  );
};

export default SkillItem;