import type { Metadata } from "next";
import type { PortableTextBlock } from "@portabletext/types";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText } from "@portabletext/react";
import BlogCtaSection from "../../components/BlogCtaSection";
import BlogDrCard from "../../components/BlogDrCard";
import BlogToc from "../../components/BlogToc";
import { getBlogPostBySlug, getBlogSlugs } from "../../../lib/sanity/blog";
import { urlFor } from "../../../lib/sanity/image";
import { absoluteUrl, breadcrumbSchema, faqSchema as buildFaqSchema, softwareApplicationSchema } from "../../../lib/schema";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

type BlogPostResult = NonNullable<Awaited<ReturnType<typeof getBlogPostBySlug>>>;

type ComparisonTableBlock = {
  _type: "comparisonTable";
  _key: string;
  columns: string[];
  rows: string[][];
};

type PortableBlockChild = {
  text?: string;
};

type PortableBlockLike = PortableTextBlock & {
  _key?: string;
  listItem?: string;
  children?: PortableBlockChild[];
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

function blockText(block: PortableBlockLike) {
  return block.children?.map((child) => child.text || "").join("").trim() || "";
}

function parseKeyValueRow(value: string) {
  const pairs = value.split(";").map((part) => part.trim()).filter(Boolean);

  if (pairs.length < 3) {
    return null;
  }

  const row = new Map<string, string>();

  for (const pair of pairs) {
    const separatorIndex = pair.indexOf(":");

    if (separatorIndex < 1) {
      return null;
    }

    const key = pair.slice(0, separatorIndex).trim();
    const text = pair.slice(separatorIndex + 1).trim();

    if (!key || !text) {
      return null;
    }

    row.set(key, text);
  }

  return row.size >= 3 ? row : null;
}

function transformTableLikeLists(body: PortableTextBlock[]) {
  const transformed: Array<PortableTextBlock | ComparisonTableBlock> = [];
  let index = 0;
  let currentHeading = "";

  while (index < body.length) {
    const block = body[index] as PortableBlockLike;
    const text = blockText(block);

    if (block._type === "block" && typeof block.style === "string" && /^h[2-4]$/.test(block.style)) {
      currentHeading = text;
    }

    const firstRow = block._type === "block" && block.listItem ? parseKeyValueRow(blockText(block)) : null;
    const isConclusionList = /conclusion|frequently asked questions|faqs?/i.test(currentHeading);

    if (!firstRow || isConclusionList) {
      transformed.push(body[index]);
      index += 1;
      continue;
    }

    const columns = Array.from(firstRow.keys());
    const rows: string[][] = [];
    let cursor = index;

    while (cursor < body.length) {
      const rowBlock = body[cursor] as PortableBlockLike;
      const row = rowBlock._type === "block" && rowBlock.listItem ? parseKeyValueRow(blockText(rowBlock)) : null;

      if (!row || columns.some((column) => !row.has(column))) {
        break;
      }

      rows.push(columns.map((column) => row.get(column) || ""));
      cursor += 1;
    }

    if (rows.length >= 2) {
      transformed.push({
        _type: "comparisonTable",
        _key: `comparison-table-${block._key || index}`,
        columns,
        rows
      });
      index = cursor;
      continue;
    }

    transformed.push(body[index]);
    index += 1;
  }

  return transformed;
}

function ComparisonTable({ value }: { value: ComparisonTableBlock }) {
  return (
    <table className="blog-comparison-table">
      <thead>
        <tr>
          {value.columns.map((column) => <th key={column}>{column}</th>)}
        </tr>
      </thead>
      <tbody>
        {value.rows.map((row, rowIndex) => (
          <tr key={`${value._key}-${rowIndex}`}>
            {row.map((cell, cellIndex) => <td key={`${value._key}-${rowIndex}-${cellIndex}`}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function tocItemsForPost(post: BlogPostResult, hasFaqs: boolean) {
  const items: Array<{ id: string; heading: string }> = [];

  if (post.supportBlock) {
    items.push({
      id: headingId(post.supportBlock.heading),
      heading: post.supportBlock.heading
    });
  }

  items.push(...post.sections.map((section) => ({
    id: headingId(section.heading),
    heading: section.heading
  })));

  if (hasFaqs) {
    items.push({
      id: "domain-rating-faqs",
      heading: "Frequently asked questions"
    });
  }

  return items.filter((item, index, allItems) => (
    item.id && allItems.findIndex((candidate) => candidate.id === item.id) === index
  ));
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
      siteName: "DR Checker",
      type: "article",
      images: [
        {
          url: absoluteUrl(post.featuredImage),
          alt: post.featuredImageAlt
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | DR Checker Blog`,
      description: metaDescription,
      images: [absoluteUrl(post.featuredImage)]
    }
  };
}

function renderLinkedText(text: string) {
  const parts: ReactNode[] = [];
  const linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkPattern.exec(text))) {
    const [fullMatch, label, href] = match;
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(<Link key={`${href}-${match.index}`} href={href}>{label}</Link>);
    lastIndex = match.index + fullMatch.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length ? parts : text;
}

function SupportBlock({ block }: { block: BlogPostResult["supportBlock"] }) {
  if (!block) {
    return null;
  }

  if (block.type === "checklist" || block.type === "timeline") {
    return (
      <section className={`blog-post__support blog-post__support--${block.type}`} aria-labelledby={headingId(block.heading)}>
        <h2 id={headingId(block.heading)}>{block.heading}</h2>
        <p>{block.intro}</p>
        <ol>
          {(block.items || []).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      </section>
    );
  }

  if (block.type === "pros-cons") {
    return (
      <section className="blog-post__support blog-post__support--pros-cons" aria-labelledby={headingId(block.heading)}>
        <h2 id={headingId(block.heading)}>{block.heading}</h2>
        <p>{block.intro}</p>
        <div className="blog-post__pros-cons">
          <div>
            <h3>Worth doing</h3>
            <ul>{(block.pros || []).map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div>
            <h3>Avoid</h3>
            <ul>{(block.cons || []).map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`blog-post__support blog-post__support--${block.type}`} aria-labelledby={headingId(block.heading)}>
      <h2 id={headingId(block.heading)}>{block.heading}</h2>
      <p>{block.intro}</p>
      <div className="responsive-table">
        <table>
          <thead>
            <tr>{(block.columns || []).map((column) => <th key={column}>{column}</th>)}</tr>
          </thead>
          <tbody>
            {(block.rows || []).map((row) => (
              <tr key={row.join("-")}>
                {row.map((cell) => <td key={cell}>{cell}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const faqs = post.faqs.filter((faq) => faq.question && faq.answer);
  const tocItems = tocItemsForPost(post, faqs.length > 0);
  const body = post.body?.length ? transformTableLikeLists(post.body) : [];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: absoluteUrl(post.featuredImage),
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Person",
      name: post.author.name,
      description: post.author.bio,
      jobTitle: post.author.role || "Founder of DR Checker",
      sameAs: post.author.linkedinUrl || "https://www.linkedin.com/in/awais-younas/"
    },
    publisher: {
      "@type": "Organization",
      name: "Dr Checker",
      url: "https://dr-checker.com"
    },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`)
  };
  const faqSchema = faqs.length ? buildFaqSchema(faqs) : null;
  const schemas = [
    articleSchema,
    softwareApplicationSchema({
      name: "DR Checker",
      description: "Free SEO tools for checking Domain Rating, bulk DR, domain age, authority-style scores, and search snippets.",
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
      { name: "Blog", url: absoluteUrl("/blog") },
      { name: post.title, url: absoluteUrl(`/blog/${post.slug}`) }
    ])
  ];

  return (
    <main className="blog-post-page">
      {schemas.map((schema) => (
        <script
          key={schema["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {faqSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      ) : null}
      <section className="blog-post-hero" aria-labelledby="blog-post-title">
        <div className="blog-post-hero__inner">
          <div className="blog-post-hero__content">
            <h1 id="blog-post-title">{post.title}</h1>
            <div className="blog-post__byline" aria-label="Article author, last reviewed date, and read time">
              <img src={post.author.photo || "/assets/awais-younas.jpg"} alt="" width="96" height="96" decoding="async" />
              <div>
                <p>{post.author.name}</p>
                <p className="blog-post__role">{post.author.role || "Founder of DR Checker"}</p>
                <div className="blog-post__meta-line">
                  <time dateTime={post.date}>Last reviewed {formatPostDate(post.date)}</time>
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
        {tocItems.length ? (
          <aside className="blog-post-toc-sidebar" aria-labelledby="blog-toc-title">
            <h2 id="blog-toc-title">Table of Contents</h2>
            <BlogToc items={tocItems} />
          </aside>
        ) : (
          <div aria-hidden="true" />
        )}

        <article className="blog-post">
          <p className="lead">{post.intro}</p>

          {post.takeaways.length ? (
            <section className="blog-post__takeaways" aria-labelledby="key-takeaways">
              <h2 id="key-takeaways">Key takeaways</h2>
              <ul>
                {post.takeaways.map((takeaway) => (
                  <li key={takeaway}>{takeaway}</li>
                ))}
              </ul>
            </section>
          ) : null}

          <SupportBlock block={post.supportBlock} />

          <div className="blog-post__body">
            {body.length ? (
              <PortableText
                value={body as PortableTextBlock[]}
                components={{
                  block: {
                    h2: ({ children }) => <h2 id={headingId(String(children))}>{children}</h2>,
                    h3: ({ children }) => <h3 id={headingId(String(children))}>{children}</h3>,
                    h4: ({ children }) => <h4 id={headingId(String(children))}>{children}</h4>
                  },
                  marks: {
                    link: ({ children, value }) => {
                      const href = typeof value?.href === "string" ? value.href : "#";
                      return <Link href={href}>{children}</Link>;
                    }
                  },
                  types: {
                    comparisonTable: ComparisonTable,
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
                    },
                    horizontalRule: () => null,
                    divider: () => null
                  }
                }}
              />
            ) : (
              post.sections.map((section) => (
                <section id={headingId(section.heading)} key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{renderLinkedText(paragraph)}</p>
                  ))}
                </section>
              ))
            )}
          </div>

          {faqs.length ? (
            <section className="blog-post__faqs" aria-labelledby="domain-rating-faqs">
              <h2 id="domain-rating-faqs">Frequently asked questions</h2>
              <div className="faq-list">
                {faqs.map((faq) => (
                  <div className="faq-list__item" key={faq.question}>
                    <h3>Q. {faq.question}</h3>
                    <p>A. {faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

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
