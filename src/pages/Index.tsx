import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ExternalLink, FileText } from "lucide-react";

const Index = () => {
  const projects = [
    {
      title: "Mamak Breakfast Food Calories Estimation Based on Image Classification",
      description: "Using modern smartphone technology, one photo can simplify the time-consuming task of manually calculating food calories.",
      tech: ["Python", "YoloV8", "CNN"],
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

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="section-padding min-h-screen flex items-center justify-center">
        <div className="text-center animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hi, I'm <span className="text-primary">Afiq Nurhariz</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Software Developer | Mobile Developer | AI Engineer
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              variant="outline" 
              className="glass transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-opacity-90"
              onClick={() => window.open('https://drive.google.com/uc?export=download&id=1i6d_Tmi5mSNWLJsGsaX4_IiE0p9Mg44o', '_blank')}
            >
              <FileText className="mr-2 h-4 w-4" /> Resume
            </Button>
            <Button 
              variant="outline" 
              className="glass transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-opacity-90"
              onClick={() => window.open('https://github.com/afiqezio', '_blank')}
            >
              <Github className="mr-2 h-4 w-4" /> GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding" id="about">
        <div className="max-w-3xl mx-auto glass p-8 rounded-lg animate-slideUp">
          <h2 className="text-3xl font-bold mb-6">About Me</h2>
          <p className="text-lg text-muted-foreground mb-4">
            I am a creative professional with experience working with tech startups and universities. As a graduate student in Artificial Intelligence at Universiti Teknologi Mara, Shah Alam, I enjoy working on new ideas and exciting projects.
          </p>
          <p className="text-lg text-muted-foreground">
            I am strongly interested in data and AI, creating smart algorithms, building data pipelines, and working with large datasets to find insights. I also have experience in web and mobile development, creating user-friendly applications. My studies in Web Development and AI have given me solid skills, and I am always ready to learn and improve.
          </p>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding" id="projects">
        <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="glass p-6 animate-slideUp"
              style={{
                animationDelay: `${index * 200}ms`,
              }}
            >
              <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-full glass"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <Button
                variant="outline"
                className="w-full glass transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-opacity-90"
              >
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
            <Button 
              variant="outline" 
              className="glass transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-opacity-90"
              onClick={() => window.open('mailto:afiqnurhariz@gmail.com', '_blank')}
            >
              <Mail className="mr-2 h-4 w-4" /> Email
            </Button>
            <Button 
              variant="outline" 
              className="glass transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-opacity-90"
              onClick={() => window.open('https://www.linkedin.com/in/afiqnurhariz/', '_blank')}
            >
              <Linkedin className="mr-2 h-4 w-4" /> LinkedIn
            </Button>
            <Button 
              variant="outline" 
              className="glass transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-opacity-90"
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