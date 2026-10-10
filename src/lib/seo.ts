import type { MetaDescriptor } from "react-router";

export const SITE_URL = "https://harizafiq.com";
export const SITE_NAME = "Afiq Nurhariz";
export const DEFAULT_IMAGE = "/assets/afiq-sitting.png";

const absoluteUrl = (path: string) => SITE_URL + encodeURI(path);

// Trim to the ~160 characters search engines show, without cutting a word
export const toMetaDescription = (text: string, max = 160) => {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,.;:]$/, "") + "…";
};

interface PageMeta {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "profile" | "article";
}

// Title, description, canonical and social-card tags for one page.
// Site-wide tags (charset, author, robots, structured data) live in root.tsx.
export const pageMeta = ({
  title,
  description,
  path,
  image = DEFAULT_IMAGE,
  imageAlt = `Portrait of ${SITE_NAME}`,
  type = "profile",
}: PageMeta): MetaDescriptor[] => {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  return [
    { title },
    { name: "description", content: description },
    { tagName: "link", rel: "canonical", href: url },
    { property: "og:type", content: type },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:image:alt", content: imageAlt },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: imageAlt },
  ];
};
