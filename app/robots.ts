import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: "https://dr-checker.com/sitemap.xml",
    host: "https://dr-checker.com"
  };
}
