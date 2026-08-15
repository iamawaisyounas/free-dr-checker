export const siteUrl = "https://dr-checker.com";

export const publisherSchema = {
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: "DR Checker",
  url: siteUrl,
  logo: `${siteUrl}/icon-512.png`,
  sameAs: ["https://socialbu.com"]
};

export type FaqItem = {
  question: string;
  answer: string;
};

export function absoluteUrl(path: string) {
  return path.startsWith("http") ? path : `${siteUrl}${path}`;
}

export function faqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

export function softwareApplicationSchema(input: {
  name: string;
  description: string;
  url: string;
  features?: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${input.url}#software`,
    name: input.name,
    description: input.description,
    url: input.url,
    applicationCategory: "SEO Tool",
    operatingSystem: "Web",
    browserRequirements: "Requires a modern web browser.",
    isAccessibleForFree: true,
    featureList: input.features,
    publisher: publisherSchema,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD"
    }
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
}
