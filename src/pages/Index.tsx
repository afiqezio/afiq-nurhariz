import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ExternalLink, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import SkillItem from "@/components/SkillItem";

const Index = () => {
  const projects = [
    {
      title: "Mamak Food Calories Estimation Based on Image Classification",
      description: "One photo can simplify the time-consuming task of manually calculating food calories.",
      tech: ["Python", "YoloV5", "CNN"],
      link: "#",
    },
    {
      title: "Mobile Time Attendance With Locations",
      description: "Mobile app project integrated with TAMS for remote employee attendance tracking",
      tech: ["Flutter", ".NET", "MSSQL"],
      link: "#",
    },
    {
      title: "Hair Saloon Booking Mobile Application",
      description: "Simple mobile app project for hair saloon booking",
      tech: ["Flutter", "PHP", "MySQL"],
      link: "#",
    },
  ];

  const skills = [
    "Python", "JavaScript", "C#", "PHP", "Dart",
    "React", "Flutter", ".NET", "Laravel", "MySQL", "MSSQL", "SQL"
  ];

  const navigate = useNavigate();

  const handleViewProject = (project: any) => {
    navigate('/view', { state: project });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-8 animate-fadeIn">
          <div className="relative inline-block">
            <Avatar className="h-32 w-32 border-2 border-primary/20 transition-transform duration-300 hover:scale-105">
              <AvatarImage
                src="assets/afiqnhz.jpg"
                alt="Profile"
                className="object-cover"
              />
              <AvatarFallback>ANHZ</AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              Hi, I'm <span className="text-primary">Afiq Nurhariz</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Software Developer | Mobile Developer | AI Engineer
            </p>
          </div>
          <div className="flex gap-4 justify-center">
            <Button 
              variant="outline" 
              className="glass transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => window.open('https://drive.google.com/uc?export=download&id=1i6d_Tmi5mSNWLJsGsaX4_IiE0p9Mg44o', '_blank')}
            >
              <FileText className="mr-2 h-4 w-4" /> Resume
            </Button>
            <Button 
              variant="outline" 
              className="glass transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => window.open('https://github.com/afiqezio', '_blank')}
            >
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16" id="about">
        <div className="max-w-3xl mx-auto glass rounded-xl p-8 transform transition-all duration-500 hover:shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-primary/80">About Me</h2>
          <div className="space-y-4 text-muted-foreground">
            <p className="text-lg leading-relaxed">
              I am a creative professional with experience working with tech startups and universities. As a graduate student in Artificial Intelligence at Universiti Teknologi Mara, Shah Alam, I enjoy working on new ideas and exciting projects.
            </p>
            <p className="text-lg leading-relaxed">
              I am strongly interested in data and AI, creating smart algorithms, building data pipelines, and working with large datasets to find insights. I also have experience in web and mobile development, creating user-friendly applications. My studies in Web Development and AI have given me solid skills, and I am always ready to learn and improve.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16" id="projects">
        <h2 className="text-3xl font-bold mb-12 text-center text-primary/80">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="glass p-6 transform transition-all duration-500 hover:shadow-xl hover:-translate-y-1"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full glass transition-all duration-300 hover:scale-105"
                onClick={() => handleViewProject(project)}
              >
                <ExternalLink className="mr-2 h-4 w-4" /> View Project
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16" id="skills">
        <h2 className="text-3xl font-bold mb-12 text-center text-primary/80">Skills</h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill, index) => (
              <SkillItem key={index} skill={skill} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16" id="contact">
        <div className="max-w-3xl mx-auto glass rounded-xl p-8 transform transition-all duration-500 hover:shadow-xl">
          <h2 className="text-3xl font-bold mb-6 text-center text-primary/80">Get In Touch</h2>
          <div className="flex justify-center gap-6">
            <Button 
              variant="outline" 
              className="glass transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => window.open('mailto:afiqnurhariz@gmail.com', '_blank')}
            >
              <Mail className="mr-2 h-4 w-4" /> Email
            </Button>
            <Button 
              variant="outline" 
              className="glass transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => window.open('https://www.linkedin.com/in/afiqnurhariz/', '_blank')}
            >
              <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
            </Button>
            <Button 
              variant="outline" 
              className="glass transition-all duration-300 hover:scale-105 hover:shadow-lg"
              onClick={() => window.open('https://github.com/afiqezio', '_blank')}
            >
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
