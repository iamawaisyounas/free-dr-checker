import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost, getRelatedPosts } from "../posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} - Dr Checker Blog`,
    description: post.excerpt,
    alternates: { canonical: `https://dr-checker.com/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://dr-checker.com/blog/${post.slug}`,
      siteName: "Dr Checker",
      type: "article"
    }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "Dr Checker"
    },
    publisher: {
      "@type": "Organization",
      name: "Dr Checker",
      url: "https://dr-checker.com"
    },
    mainEntityOfPage: `https://dr-checker.com/blog/${post.slug}`
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <main className="blog-post-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <article className="blog-post">
        <Link className="blog-back-link" href="/blog">Back to blog</Link>
        <p className="blog-card__meta">{post.category} · {post.readTime}</p>
        <h1>{post.title}</h1>
        <p className="lead">{post.intro}</p>

        <div className="blog-post__cta">
          <Link href="/">Check a domain rating</Link>
          <Link href="/faq#what-is-domain-rating">Read DR FAQs</Link>
        </div>

        <div className="blog-post__body">
          {post.sections.map((section) => (
            <section key={section.heading}>
              <h2>{section.heading}</h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>

        <section className="blog-post__faqs" aria-labelledby="post-faq-title">
          <h2 id="post-faq-title">FAQs</h2>
          <div className="faq-list">
            {post.faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="related-posts" aria-labelledby="related-posts-title">
          <h2 id="related-posts-title">Related reading</h2>
          <div>
            {relatedPosts.map((relatedPost) => (
              <Link href={`/blog/${relatedPost.slug}`} key={relatedPost.slug}>
                {relatedPost.title}
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
