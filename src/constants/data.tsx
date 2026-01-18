import { Project, NavItem, ContactLink } from '@/types';
import { User, Briefcase, Code, MessageCircle, Github, Linkedin, Mail, FileText } from 'lucide-react';

export const projects: Project[] = [
  {
    id: 'mamak-food',
    title: "Mamak Food Calories Estimation Based on Image Classification",
    description: "One photo can simplify the time-consuming task of manually calculating food calories.",
    tech: ["Python", "YoloV5", "CNN"],
    link: "#",
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1200&auto=format',
  },
  {
    id: 'mobile-attendance',
    title: "Mobile Time Attendance With Locations",
    description: "Mobile app project integrated with TAMS for remote employee attendance tracking",
    tech: ["Flutter", ".NET", "MSSQL"],
    link: "#",
    imageUrl: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=1200&auto=format',
  },
  {
    id: 'hair-saloon',
    title: "Hair Saloon Booking Mobile Application",
    description: "Simple mobile app project for hair saloon booking",
    tech: ["Flutter", "PHP", "MySQL"],
    link: "#",
    imageUrl: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=1200&auto=format',
  },
  {
    id: 'churn-prediction',
    title: "Customer Churn Prediction and Analysis Project",
    description: "Analyzing customer behavior to identify reasons for churn and predicting potential attrition using machine learning models",
    tech: ["Python", "Pandas", "XGBoost", "Logistic Regressions", "Decision Tree"],
    link: "#",
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format',
  },
  {
    id: 'database-optimization',
    title: "Database Management and Optimization Projects",
    description: "Development and optimization of database scripts and SQL queries for large-scale data systems",
    tech: ["MySQL", "SQL", "Database Migration", "Performance Tuning"],
    link: "#",
    imageUrl: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=1200&auto=format',
  }
];

export const skills: string[] = [
  "Python", "JavaScript", "C#", "PHP", "Dart",
  "React", "Flutter", ".NET", "Laravel", "MySQL", "MSSQL", "SQL", 
  "Airflow", "Go", "Docker", "MongoDB", "PostgreSQL", "Redis",
  "YoloV5", "CNN", "Pandas", "Logistic Regressions", "Decision Tree"
];

export const navItems: NavItem[] = [
  {
    label: "About",
    href: "#about",
    icon: <User className="w-4 h-4" />,
  },
  {
    label: "Projects",
    href: "#projects",
    icon: <Briefcase className="w-4 h-4" />,
  },
  {
    label: "Skills",
    href: "#skills",
    icon: <Code className="w-4 h-4" />,
  },
  {
    label: "Contact",
    href: "#contact",
    icon: <MessageCircle className="w-4 h-4" />,
  },
];

export const contactLinks: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:afiqnurhariz@gmail.com",
    icon: <Mail className="w-5 h-5" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/afiqnurhariz/",
    icon: <Linkedin className="w-5 h-5" />,
  },
  {
    label: "GitHub",
    href: "https://github.com/afiqezio",
    icon: <Github className="w-5 h-5" />,
  },
];

export const heroData = {
  name: "Afiq Nurhariz",
  greeting: "Hi, I'm",
  roles: ["Software Developer", "Mobile Developer", "AI Engineer"],
  description: "Crafting innovative solutions with cutting-edge technology and creative problem-solving",
  resumeUrl: "https://drive.google.com/uc?export=download&id=1i6d_Tmi5mSNWLJsGsaX4_IiE0p9Mg44o",
  profileImage: "assets/afiq-sitting.png",
};

export const aboutContent = {
  paragraphs: [
    "I am a creative professional with experience working with tech startups and universities. As a graduate student in Artificial Intelligence at Universiti Teknologi Mara, Shah Alam, I enjoy working on new ideas and exciting projects.",
    "I am strongly interested in data and AI, creating smart algorithms, building data pipelines, and working with large datasets to find insights. I also have experience in web and mobile development, creating user-friendly applications. My studies in Web Development and AI have given me solid skills, and I am always ready to learn and improve."
  ],
  highlights: ["Artificial Intelligence", "data and AI", "web and mobile development"]
};

