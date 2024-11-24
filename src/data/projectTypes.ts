export interface ProjectDetails {
  overview: string;
  features: string[];
  challenges: Array<{
    title: string;
    description: string;
  }>;
  improvementss: string[];
  images: Array<{
    url: string;
    alt: string;
    caption: string;
  }>;
  documentUrl?: string;  // Added this line with optional property
}

export interface ProjectData {
  [key: string]: ProjectDetails;
}