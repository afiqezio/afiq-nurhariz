import { useRef } from "react";
import { ReactBitsText } from "@/components/reactbits";
import SkillCard from "@/components/SkillCard";
import { skills } from "@/constants/data";

const SkillsSection = () => {
  const skillsRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      className="py-20 px-4 md:px-8 lg:px-16 relative" 
      id="skills"
      aria-labelledby="skills-heading"
      ref={skillsRef}
    >
      <div className="max-w-5xl mx-auto relative z-10">
        <h2 
          id="skills-heading"
          className="text-4xl md:text-5xl font-bold mb-16 text-center"
        >
          <ReactBitsText 
            variant="gradient"
            className="text-4xl md:text-5xl font-bold"
            colors={['#3b82f6', '#8b5cf6', '#ec4899']}
            speed={5}
          >
            Skills & Technologies
          </ReactBitsText>
        </h2>
        
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6"
          role="list"
          aria-label="List of skills and technologies"
        >
          {skills.map((skill) => (
            <div key={skill} role="listitem">
              <SkillCard skill={skill} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;

