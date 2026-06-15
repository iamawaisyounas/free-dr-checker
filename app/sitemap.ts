import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    { url: "https://dr-checker.com", lastModified, priority: 1 },
    { url: "https://dr-checker.com/about", lastModified, priority: 0.8 },
    { url: "https://dr-checker.com/blog", lastModified, priority: 0.7 },
    { url: "https://dr-checker.com/faq", lastModified, priority: 0.8 },
    { url: "https://dr-checker.com/contact", lastModified, priority: 0.6 },
    { url: "https://dr-checker.com/privacy-policy", lastModified, priority: 0.3 },
    { url: "https://dr-checker.com/terms", lastModified, priority: 0.3 }
  ];
}
