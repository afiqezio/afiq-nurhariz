export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link: string;
  image?: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

export interface ContactLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

// Re-export theme for convenience (deprecated - use @/lib/theme instead)
export { ThemeColors } from '@/lib/theme';
