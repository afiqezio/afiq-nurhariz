export interface ProjectImage {
  url: string;
  alt: string;
  caption: string;
}

export interface Challenge {
  title: string;
  description: string;
}

export interface CaseStudy {
  problem: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
}

export interface ProjectDetails {
  images: ProjectImage[];
  overview: string;
  features: string[];
  challenges: Challenge[];
  improvements: string[];
  documentUrl?: string;
  duration?: string;
  caseStudy?: CaseStudy;
}

export interface ProjectData {
  title: string;
  description: string;
  tech: string[];
}