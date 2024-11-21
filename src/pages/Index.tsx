import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const Index = () => {
  const projects = [
    {
      title: "Project 1",
      description: "A brief description of project 1 and its key features.",
      tech: ["React", "TypeScript", "Tailwind"],
      link: "#",
    },
    {
      title: "Project 2",
      description: "A brief description of project 2 and its key features.",
      tech: ["Next.js", "Node.js", "MongoDB"],
      link: "#",
    },
    {
      title: "Project 3",
      description: "A brief description of project 3 and its key features.",
      tech: ["React Native", "Firebase", "Redux"],
      link: "#",
    },
  ];

  const skills = [
    "JavaScript", "TypeScript", "React", "Node.js",
    "Python", "SQL", "AWS", "Docker"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-screen flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hi, I'm <span className="text-primary">Afiq Nurhariz</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Full Stack Developer | Problem Solver | Tech Enthusiast
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="outline" className="glass">
              <Mail className="mr-2 h-4 w-4" /> Contact Me
            </Button>
            <Button variant="outline" className="glass">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding" id="about">
        <div className="max-w-3xl mx-auto glass p-8 rounded-lg animate-slideUp">
          <h2 className="text-3xl font-bold mb-6">About Me</h2>
          <p className="text-lg text-muted-foreground">
            I'm a passionate developer with X years of experience building web applications.
            I love turning complex problems into simple, beautiful, and intuitive solutions.
            When I'm not coding, you can find me exploring new technologies or contributing to open-source projects.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding" id="projects">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} className="glass p-6 animate-slideUp" style={{
              animationDelay: `${index * 200}ms`
            }}>
              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-full glass">
                    {tech}
                  </span>
                ))}
              </div>
              <Button variant="outline" className="w-full glass">
                <ExternalLink className="mr-2 h-4 w-4" /> View Project
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding" id="skills">
        <h2 className="text-3xl font-bold mb-12 text-center">Skills</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="glass p-4 rounded-lg text-center animate-slideUp"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding" id="contact">
        <div className="max-w-3xl mx-auto glass p-8 rounded-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">Get In Touch</h2>
          <div className="flex justify-center gap-6">
            <Button variant="outline" className="glass">
              <Mail className="mr-2 h-4 w-4" /> Email
            </Button>
            <Button variant="outline" className="glass">
              <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
            </Button>
            <Button variant="outline" className="glass">
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;