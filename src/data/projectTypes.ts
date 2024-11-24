export interface ProjectDetails {
  overview: string;
  features: string[];
  challenges: Array<{
    title: string;
    description: string;
  }>;
  improvements: string[];
  images: Array<{
    url: string;
    alt: string;
    caption: string;
  }>;
  documentUrl?: string;
}

export interface ProjectData {
  [key: string]: ProjectDetails;
}