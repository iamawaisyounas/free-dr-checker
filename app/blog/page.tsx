import type { Metadata } from "next";
import Link from "next/link";
import BlogCtaSection from "../components/BlogCtaSection";
import BlogSearch from "../components/BlogSearch";
import { getBlogPosts } from "../../lib/sanity/blog";
import { absoluteUrl, breadcrumbSchema, faqSchema as buildFaqSchema, softwareApplicationSchema } from "../../lib/schema";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "DR Checker Blog | Get Better at SEO and Marketing",
  description:
    "Actionable SEO guides, link building strategies, and marketing tips to help you rank higher, grow organic traffic, and make better SEO decisions with confidence.",
  alternates: { canonical: "https://dr-checker.com/blog" },
  openGraph: {
    title: "DR Checker Blog | Get Better at SEO and Marketing",
    description: "Actionable SEO guides, link building strategies, and marketing tips to help you rank higher, grow organic traffic, and make better SEO decisions with confidence.",
    url: "https://dr-checker.com/blog",
    siteName: "Dr Checker",
    type: "website"
  }
};

const blogFaqs = [
  {
    question: "What topics does the Dr Checker blog cover?",
    answer: "The blog covers Domain Rating, backlink quality, competitor research, outreach workflows, technical SEO, and practical ways to use the free DR checker."
  },
  {
    question: "Are the blog posts connected to the free checker?",
    answer: "Yes. Each article links back to the free Domain Rating checker and related FAQ or blog resources so readers can move from learning to checking domains quickly."
  },
  {
    question: "How should I use these SEO guides?",
    answer: "Use them as quick decision guides before deeper backlink analysis, outreach planning, or SEO reporting."
  }
];

const faqSchema = buildFaqSchema(blogFaqs);

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date));
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();
  const [featuredPost] = blogPosts;
  const featuredHref = `/blog/${featuredPost.slug}`;
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Dr Checker Blog",
    url: "https://dr-checker.com/blog",
    blogPost: blogPosts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: absoluteUrl(post.featuredImage),
      datePublished: post.date,
      dateModified: post.date,
      author: {
        "@type": "Person",
        name: post.author.name
      },
      url: absoluteUrl(`/blog/${post.slug}`)
    }))
  };
  const schemas = [
    blogSchema,
    faqSchema,
    softwareApplicationSchema({
      name: "DR Checker",
      description: "Free SEO tools and guides for Domain Rating, backlink research, domain age checks, and search snippet previews.",
      url: absoluteUrl("/"),
      features: [
        "Domain Rating checker",
        "Bulk DR checker",
        "Domain Authority checker",
        "Domain Age checker",
        "Google SERP simulator"
      ]
    }),
    breadcrumbSchema([
      { name: "Domain Rating Checker", url: absoluteUrl("/") },
      { name: "Blog", url: absoluteUrl("/blog") }
    ])
  ];

  return (
    <main className="blog-page">
      {schemas.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <section className="blog-home-hero" aria-labelledby="blog-home-title">
        <div className="blog-home-hero__inner">
          <div className="blog-home-hero__content">
            <p className="blog-card__meta">{featuredPost.category}</p>
            <h1 id="blog-home-title">
              <Link className="blog-home-hero__title-link" href={featuredHref}>
                {featuredPost.title}
              </Link>
            </h1>
            <p className="blog-home-hero__excerpt">{featuredPost.excerpt}</p>
            <div className="blog-post__byline" aria-label="Featured article author, last reviewed date, and read time">
              <img src={featuredPost.author.photo || "/assets/awais-younas.jpg"} alt="" width="96" height="96" decoding="async" />
              <div>
                <p>{featuredPost.author.name}</p>
                <p className="blog-post__role">{featuredPost.author.role || "Co-founder of DR Checker"}</p>
                <div className="blog-post__meta-line">
                  <time dateTime={featuredPost.date}>Last reviewed {formatPostDate(featuredPost.date)}</time>
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
            </div>
          </div>
          <Link className="blog-post-hero__image blog-home-hero__image-link" href={featuredHref} aria-label={`Read ${featuredPost.title}`}>
            <img
              src={featuredPost.featuredImage}
              alt={featuredPost.featuredImageAlt}
              width="1200"
              height="628"
              fetchPriority="high"
              decoding="async"
            />
          </Link>
        </div>
      </section>
      <div className="blog-page__inner">
        <BlogSearch posts={blogPosts} />
        <BlogCtaSection />
      </div>
    </main>
  );
}
