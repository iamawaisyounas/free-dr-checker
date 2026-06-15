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

const featuredPost = blogPosts[0];
const secondaryPosts = blogPosts.slice(1);
const categories = Array.from(new Set(blogPosts.map((post) => post.category)));
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
    datePublished: post.date,
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
          <div className="blog-topic-row" aria-label="Blog categories">
            {categories.map((category) => (
              <a href={`#${category.toLowerCase().replaceAll(" ", "-")}`} key={category}>{category}</a>
            ))}
          </div>
        </section>

        <section className="featured-post" aria-label="Featured post">
          <div>
            <p className="blog-card__meta">{featuredPost.category} · {featuredPost.readTime}</p>
            <h2><Link href={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link></h2>
            <p>{featuredPost.excerpt}</p>
            <Link className="blog-read-link" href={`/blog/${featuredPost.slug}`}>Read article</Link>
          </div>
        </section>

        <section className="blog-grid" aria-label="Latest blog posts">
          {secondaryPosts.map((post) => (
            <article className="blog-card" id={post.category.toLowerCase().replaceAll(" ", "-")} key={post.slug}>
              <p className="blog-card__meta">{post.category} · {post.readTime}</p>
              <h2><Link href={`/blog/${post.slug}`}>{post.title}</Link></h2>
              <p>{post.excerpt}</p>
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
