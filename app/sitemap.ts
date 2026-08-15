import type { MetadataRoute } from "next";
import { getBlogPosts } from "../lib/sanity/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const blogPosts = await getBlogPosts();
  const uniqueBlogPosts = Array.from(new Map(blogPosts.map((post) => [post.slug, post])).values());

  return [
    { url: "https://dr-checker.com", lastModified, priority: 1 },
    { url: "https://dr-checker.com/bulk-dr-checker", lastModified, priority: 0.95 },
    { url: "https://dr-checker.com/domain-authority-checker", lastModified, priority: 0.9 },
    { url: "https://dr-checker.com/domain-age-checker", lastModified, priority: 0.9 },
    { url: "https://dr-checker.com/google-serp-simulator", lastModified, priority: 0.9 },
    { url: "https://dr-checker.com/about", lastModified, priority: 0.8 },
    { url: "https://dr-checker.com/blog", lastModified, priority: 0.7 },
    ...uniqueBlogPosts.map((post) => ({
      url: `https://dr-checker.com/blog/${post.slug}`,
      lastModified,
      priority: 0.6
    })),
    { url: "https://dr-checker.com/faq", lastModified, priority: 0.8 },
    { url: "https://dr-checker.com/contact", lastModified, priority: 0.6 },
    { url: "https://dr-checker.com/privacy-policy", lastModified, priority: 0.3 },
    { url: "https://dr-checker.com/terms", lastModified, priority: 0.3 }
  ];
}
