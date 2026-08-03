import type { Metadata } from "next";
import Link from "next/link";
import BlogCtaSection from "../components/BlogCtaSection";
import BlogSearch from "../components/BlogSearch";
import { getBlogPosts } from "../../lib/sanity/blog";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blog - Dr Checker",
  description:
    "Read practical guides about Domain Rating, SEO research, backlinks, outreach, and using Dr Checker for smarter website checks.",
  alternates: { canonical: "https://dr-checker.com/blog" },
  openGraph: {
    title: "Dr Checker Blog",
    description: "Practical Domain Rating and SEO guides from Dr Checker.",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: blogFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer
    }
  }))
};

function formatPostDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date));
}

function absoluteImageUrl(image: string) {
  return image.startsWith("http") ? image : `https://dr-checker.com${image}`;
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
      image: absoluteImageUrl(post.featuredImage),
      datePublished: post.date,
      author: {
        "@type": "Person",
        name: post.author.name
      },
      url: `https://dr-checker.com/blog/${post.slug}`
    }))
  };

  return (
    <main className="blog-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
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
            <div className="blog-post__byline" aria-label="Featured article author, publish date, and read time">
              <img src={featuredPost.author.photo || "/assets/awais-younas.jpg"} alt="" width="96" height="96" decoding="async" />
              <div>
                <p>{featuredPost.author.name}</p>
                <div className="blog-post__meta-line">
                  <time dateTime={featuredPost.date}>{formatPostDate(featuredPost.date)}</time>
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
