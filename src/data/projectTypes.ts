export interface ProjectImage {
  url: string;
  alt: string;
  caption: string;
}

export interface Challenge {
  title: string;
  description: string;
}

export interface ProjectDetails {
  images: ProjectImage[];
  overview: string;
  features: string[];
  challenges: Challenge[];
  improvements: string[];
  documentUrl?: string;
  duration?: string;
}

export interface ProjectData {
  title: string;
  description: string;
  tech: string[];
}