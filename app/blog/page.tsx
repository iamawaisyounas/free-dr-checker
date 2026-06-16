import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "./posts";

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

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Dr Checker Blog",
  url: "https://dr-checker.com/blog",
  blogPost: blogPosts.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `https://dr-checker.com${post.featuredImage}`,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: post.author.name
    },
    url: `https://dr-checker.com/blog/${post.slug}`
  }))
};

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

export default function BlogPage() {
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
      <div className="blog-page__inner">
        <section className="blog-hero">
          <p className="page-kicker">Blog</p>
          <h1>Domain Rating and SEO Guides</h1>
          <p className="lead">
            Clean, practical articles for checking websites, comparing competitors, and making better link-building decisions.
          </p>
        </section>

        <section className="blog-lead-magnet" aria-labelledby="lead-magnet-title">
          <div>
            <p className="blog-card__meta">Free checklist</p>
            <h2 id="lead-magnet-title">Domain Rating research checklist</h2>
            <p>
              Use this quick checklist before guest posting, outreach, competitor research, or SEO reporting.
              Check DR, compare competitors, review relevance, inspect page quality, and choose the next action.
            </p>
          </div>
          <div className="blog-lead-magnet__actions">
            <Link className="blog-read-link" href="/">Check a domain</Link>
            <Link className="blog-read-link" href="/blog/what-is-domain-rating">Read the DR guide</Link>
          </div>
        </section>

        <section className="blog-grid" aria-label="Latest blog posts">
          {blogPosts.map((post) => (
            <article className="blog-card" id={post.category.toLowerCase().replaceAll(" ", "-")} key={post.slug}>
              <Link className="blog-card__image" href={`/blog/${post.slug}`} aria-label={post.title}>
                <img src={post.featuredImage} alt={post.featuredImageAlt} loading="lazy" />
              </Link>
              <p className="blog-card__meta">{post.category} · {post.readTime}</p>
              <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
              <p>{post.excerpt}</p>
              <p className="blog-card__author">By {post.author.name}</p>
              <Link className="blog-read-link" href={`/blog/${post.slug}`}>Read more</Link>
            </article>
          ))}
        </section>

        <section className="blog-faq-strip" aria-labelledby="blog-faq-title">
          <h2 id="blog-faq-title">Blog FAQs</h2>
          <div className="faq-list">
            {blogFaqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
