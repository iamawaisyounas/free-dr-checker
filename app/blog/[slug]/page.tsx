import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import BlogCtaSection from "../../components/BlogCtaSection";
import BlogDrCard from "../../components/BlogDrCard";
import BlogToc from "../../components/BlogToc";
import { getBlogPostBySlug, getBlogSlugs } from "../../../lib/sanity/blog";
import { urlFor } from "../../../lib/sanity/image";
import { getRelatedPosts } from "../posts";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

function headingId(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function formatPostDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(`${value}T00:00:00Z`));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  const metaDescription = post.seoDescription || post.excerpt;

  return {
    title: `${post.title} | DR Checker Blog`,
    description: metaDescription,
    alternates: { canonical: `https://dr-checker.com/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | DR Checker Blog`,
      description: metaDescription,
      url: `https://dr-checker.com/blog/${post.slug}`,
      siteName: "Dr Checker",
      type: "article",
      images: [
        {
          url: absoluteImageUrl(post.featuredImage),
          alt: post.featuredImageAlt
        }
      ]
    }
  };
}

function absoluteImageUrl(image: string) {
  return image.startsWith("http") ? image : `https://dr-checker.com${image}`;
}

const toolLinks = [
  {
    href: "/",
    label: "Free Domain Rating Checker",
    description: "Check a website's DR before comparing competitors, outreach targets, or backlink opportunities."
  },
  {
    href: "/domain-authority-checker",
    label: "Domain Authority Checker",
    description: "Compare another authority-style score when you want a second link graph perspective."
  },
  {
    href: "/domain-age-checker",
    label: "Domain Age Checker",
    description: "Review domain history context before outreach, acquisition, or competitor research."
  }
];

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteImageUrl(post.featuredImage),
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
      description: post.author.bio
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
      <section className="blog-post-hero" aria-labelledby="blog-post-title">
        <div className="blog-post-hero__inner">
          <div className="blog-post-hero__content">
            <p className="blog-card__meta">{post.category}</p>
            <h1 id="blog-post-title">{post.title}</h1>
            <div className="blog-post__byline" aria-label="Article author, publish date, and read time">
              <img src={post.author.photo || "/assets/awais-younas.jpg"} alt="" width="96" height="96" decoding="async" />
              <div>
                <p>{post.author.name}</p>
                <div className="blog-post__meta-line">
                  <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
          <figure className="blog-post-hero__image">
            <img
              src={post.featuredImage}
              alt={post.featuredImageAlt}
              width="1200"
              height="628"
              fetchPriority="high"
              decoding="async"
            />
          </figure>
        </div>
      </section>

      <div className="blog-post-layout">
        <aside className="blog-toc" aria-labelledby="blog-toc-title">
          <p id="blog-toc-title">Contents</p>
          <BlogToc items={post.sections.map((section) => ({
            id: headingId(section.heading),
            heading: section.heading
          }))} />
        </aside>

        <article className="blog-post">
          <p className="lead">{post.intro}</p>

          <div className="blog-post__body">
            {post.body?.length ? (
              <PortableText
                value={post.body}
                components={{
                  block: {
                    h2: ({ children }) => <h2 id={headingId(String(children))}>{children}</h2>
                  },
                  types: {
                    image: ({ value }) => {
                      const alt = typeof value?.alt === "string" ? value.alt : "";
                      return (
                        <img
                          src={urlFor(value).width(1200).auto("format").url()}
                          alt={alt}
                          loading="lazy"
                          decoding="async"
                        />
                      );
                    }
                  }
                }}
              />
            ) : (
              post.sections.map((section) => (
                <section id={headingId(section.heading)} key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))
            )}
          </div>

          <section className="blog-post__table" aria-labelledby="domain-rating-review-checklist">
            <h2 id="domain-rating-review-checklist">Domain Rating review checklist</h2>
            <p>Use this table to turn the article into a practical decision instead of relying on one authority score.</p>
            <div className="responsive-table">
              <table>
                <thead>
                  <tr>
                    <th>Review area</th>
                    <th>What to check</th>
                    <th>Why it matters</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Domain Rating</td>
                    <td>Compare the domain with similar sites in the same niche.</td>
                    <td>Keeps the benchmark relevant instead of chasing a generic DR target.</td>
                  </tr>
                  <tr>
                    <td>Relevance</td>
                    <td>Check topic fit, audience fit, and whether the page would help a real reader.</td>
                    <td>Relevant links and partnerships are usually more useful than unrelated authority.</td>
                  </tr>
                  <tr>
                    <td>Quality</td>
                    <td>Review content depth, editorial standards, outbound links, and trust signals.</td>
                    <td>Manual review helps avoid weak placements that look good only in a spreadsheet.</td>
                  </tr>
                  <tr>
                    <td>Next action</td>
                    <td>Record the score, add notes, and decide whether to research, pitch, track, or skip.</td>
                    <td>A clear next step makes DR useful for SEO execution and reporting.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="blog-post__internal-links" aria-labelledby="useful-dr-checker-tools">
            <h2 id="useful-dr-checker-tools">Useful DR Checker tools</h2>
            <div className="blog-post__tool-links">
              {toolLinks.map((tool) => (
                <Link key={tool.href} href={tool.href}>
                  <strong>{tool.label}</strong>
                  <span>{tool.description}</span>
                </Link>
              ))}
            </div>
          </section>

          {relatedPosts.length ? (
            <section className="related-posts" aria-labelledby="related-domain-rating-guides">
              <h2 id="related-domain-rating-guides">Related Domain Rating guides</h2>
              <div>
                {relatedPosts.slice(0, 4).map((relatedPost) => (
                  <Link key={relatedPost.slug} href={`/blog/${relatedPost.slug}`}>
                    <span>{relatedPost.category}</span>
                    <strong>{relatedPost.title}</strong>
                  </Link>
                ))}
              </div>
            </section>
          ) : null}

          <section className="blog-post__faqs" aria-labelledby="domain-rating-faqs">
            <h2 id="domain-rating-faqs">Frequently asked questions</h2>
            <div className="faq-list">
              {post.faqs.map((faq) => (
                <details key={faq.question}>
                  <summary>{faq.question}</summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>

        </article>

        <aside className="blog-post-sidebar" aria-label="Domain Rating checker">
          <BlogDrCard />
        </aside>
      </div>

      <div className="blog-post-after">
        <section className="blog-author" aria-label="Article author">
          <img
            className="blog-author__photo"
            src={post.author.photo || "/assets/awais-younas.jpg"}
            alt="Awais Younas"
            width="96"
            height="96"
            loading="lazy"
            decoding="async"
          />
          <p className="blog-author__name">{post.author.name}</p>
          <a className="blog-author__linkedin" href="https://www.linkedin.com/in/awais-younas/" target="_blank" rel="noreferrer" aria-label={`${post.author.name} on LinkedIn`}>
            <span>in</span>
          </a>
          <p className="blog-author__bio">{post.author.bio}</p>
        </section>
      </div>
      <div className="blog-post-cta-wrap">
        <BlogCtaSection />
      </div>
    </main>
  );
}
