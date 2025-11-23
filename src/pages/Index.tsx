import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, ExternalLink, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Index = () => {
  const projectsRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-scale');
          entry.target.classList.remove('opacity-0');
        }
      });
    }, observerOptions);

    // Observe project cards
    if (projectsRef.current) {
      const cards = projectsRef.current.querySelectorAll('.project-card');
      cards.forEach((card) => observer.observe(card));
    }

    // Observe skill cards
    if (skillsRef.current) {
      const skillCards = skillsRef.current.querySelectorAll('.skill-card');
      skillCards.forEach((card) => observer.observe(card));
    }

    return () => {
      observer.disconnect();
    };
  }, []);
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
    {
      title: "Customer Churn Prediction and Analysis Project",
      description: "Analyzing customer behavior to identify reasons for churn and predicting potential attrition using machine learning models",
      tech: ["Python", "Pandas", "XGBoost", "Logistic Regressions", "Decision Tree"],
      link: "#",
    },
    {
      title: "Database Management and Optimization Projects",
      description: "Development and optimization of database scripts and SQL queries for large-scale data systems",
      tech: ["MySQL", "SQL", "Database Migration", "Performance Tuning"],
      link: "#",
    }
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[100vh] flex items-center justify-center px-4 relative overflow-hidden pt-20">
        {/* Animated background elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-glow" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-pink-500/5 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />
        </div>
        
        <div className="text-center space-y-8 animate-fadeIn relative z-10 max-w-4xl mx-auto">
          <div className="relative inline-block floating-element">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 animate-pulse-glow" />
            <div className="absolute inset-0 bg-purple-500/10 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 animate-float-slow" />
            <Avatar className="h-36 w-36 md:h-40 md:w-40 border-4 border-primary/30 shadow-2xl transition-all duration-500 hover:scale-110 hover:border-primary/50 relative z-10">
              <AvatarImage
                src="assets/afiqnhz.jpg"
                alt="Profile"
                className="object-cover"
              />
              <AvatarFallback className="text-2xl font-bold">ANHZ</AvatarFallback>
            </Avatar>
          </div>
          <div className="space-y-6 animate-slideInBottom" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              Hi, I'm <br />
              <span className="gradient-text">Afiq Nurhariz</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground font-medium">
              Software Developer | Mobile Developer | AI Engineer
            </p>
            <p className="text-base md:text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Crafting innovative solutions with cutting-edge technology and creative problem-solving
            </p>
          </div>
          <div className="flex flex-wrap gap-4 justify-center animate-fadeInScale" style={{ animationDelay: '0.4s' }}>
            <Button 
              variant="outline" 
              size="lg"
              className="glass-card px-8 py-6 text-base font-semibold transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:bg-primary/10 group"
              onClick={() => window.open('https://drive.google.com/uc?export=download&id=1i6d_Tmi5mSNWLJsGsaX4_IiE0p9Mg44o', '_blank')}
            >
              <FileText className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" /> Resume
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="glass-card px-8 py-6 text-base font-semibold transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:bg-primary/10 group"
              onClick={() => window.open('https://github.com/afiqezio', '_blank')}
            >
              <Github className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" /> GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding" id="about">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center gradient-text animate-fadeIn">
            About Me
          </h2>
          <div className="glass-card p-10 md:p-12 card-hover animate-fadeInScale">
            <div className="space-y-6 text-muted-foreground">
              <p className="text-lg md:text-xl leading-relaxed">
                I am a creative professional with experience working with tech startups and universities. As a graduate student in <span className="text-foreground font-semibold">Artificial Intelligence</span> at Universiti Teknologi Mara, Shah Alam, I enjoy working on new ideas and exciting projects.
              </p>
              <p className="text-lg md:text-xl leading-relaxed">
                I am strongly interested in <span className="text-foreground font-semibold">data and AI</span>, creating smart algorithms, building data pipelines, and working with large datasets to find insights. I also have experience in <span className="text-foreground font-semibold">web and mobile development</span>, creating user-friendly applications. My studies in Web Development and AI have given me solid skills, and I am always ready to learn and improve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="section-padding flex justify-center" id="projects">
        <div className="max-w-7xl w-full" ref={projectsRef}>
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center gradient-text animate-fadeIn">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="project-card glass-card p-8 w-full card-hover group opacity-0"
                style={{ 
                  animationDelay: `${index * 150}ms`
                }}
              >
                <div className="space-y-4">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed min-h-[60px]">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium border border-primary/20 hover:bg-primary/20 transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full glass transition-all duration-500 hover:scale-105 hover:bg-primary/10 hover:border-primary/30 group/btn"
                    onClick={() => handleViewProject(project)}
                  >
                    <ExternalLink className="mr-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform duration-300" /> 
                    View Project
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding" id="skills">
        <div className="max-w-5xl mx-auto" ref={skillsRef}>
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center gradient-text animate-fadeIn">
            Skills & Technologies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="skill-card glass-card p-6 rounded-xl text-center font-semibold transform transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:bg-primary/10 hover:border-primary/30 group cursor-default opacity-0"
                style={{ 
                  animationDelay: `${index * 80}ms`
                }}
              >
                <span className="group-hover:text-primary transition-colors duration-300">
                  {skill}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding mb-8" id="contact">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center gradient-text animate-fadeIn">
            Get In Touch
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Let's connect and discuss opportunities
          </p>
          <div className="glass-card p-10 md:p-12 animate-fadeInScale">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Button 
                variant="outline" 
                size="lg"
                className="glass-card px-8 py-6 text-base font-semibold transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:bg-primary/10 group flex-1 min-w-[140px]"
                onClick={() => window.open('mailto:afiqnurhariz@gmail.com', '_blank')}
              >
                <Mail className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" /> 
                Email
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="glass-card px-8 py-6 text-base font-semibold transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:bg-primary/10 group flex-1 min-w-[140px]"
                onClick={() => window.open('https://www.linkedin.com/in/afiqnurhariz/', '_blank')}
              >
                <Linkedin className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" /> 
                LinkedIn
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="glass-card px-8 py-6 text-base font-semibold transition-all duration-500 hover:scale-110 hover:shadow-2xl hover:bg-primary/10 group flex-1 min-w-[140px]"
                onClick={() => window.open('https://github.com/afiqezio', '_blank')}
              >
                <Github className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" /> 
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
