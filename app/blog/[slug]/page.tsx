import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogCtaSection from "../../components/BlogCtaSection";
import BlogDrCard from "../../components/BlogDrCard";
import BlogToc from "../../components/BlogToc";
import { blogPosts, getBlogPost } from "../posts";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
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
      type: "article",
      images: [
        {
          url: `https://dr-checker.com${post.featuredImage}`,
          alt: post.featuredImageAlt
        }
      ]
    }
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `https://dr-checker.com${post.featuredImage}`,
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
              <img src="/assets/awais-younas.jpg" alt="" width="96" height="96" decoding="async" />
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
            {post.sections.map((section) => (
              <section id={headingId(section.heading)} key={section.heading}>
                <h2>{section.heading}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </section>
            ))}
          </div>

        </article>

        <aside className="blog-post-sidebar" aria-label="Domain Rating checker">
          <BlogDrCard />
        </aside>
      </div>

      <div className="blog-post-after">
        <section className="blog-author" aria-label="Article author">
          <img
            className="blog-author__photo"
            src="/assets/awais-younas.jpg"
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
