import type { BlogPost, BlogSection } from "../../app/blog/posts";
import type { PortableTextBlock } from "@portabletext/types";
import { blogPosts, getBlogPost } from "../../app/blog/posts";
import { client, sanityIsConfigured } from "./client";
import { urlFor } from "./image";
import { allSlugsQuery, postBySlugQuery, postsListQuery } from "./queries";

type PortableBlockChild = {
  text?: string;
};

type PortableBlock = {
  _type?: string;
  style?: string;
  children?: PortableBlockChild[];
};

type SanityPost = {
  title?: string;
  slug?: string;
  excerpt?: string;
  intro?: string;
  featuredImage?: {
    alt?: string;
    [key: string]: unknown;
  };
  body?: PortableTextBlock[];
  faqs?: Array<{
    question?: string;
    answer?: string;
  }>;
  readingTime?: number;
  publishedAt?: string;
  seoTitle?: string;
  seoDescription?: string;
  author?: {
    name?: string;
    photo?: unknown;
    bio?: string;
    role?: string;
    linkedinUrl?: string;
  };
  category?: {
    title?: string;
  };
  relatedPosts?: Array<{
    slug?: string;
  }>;
};

function blockText(block: PortableBlock | PortableTextBlock) {
  const children = "children" in block ? block.children as PortableBlockChild[] | undefined : undefined;
  return children?.map((child) => child.text || "").join("").trim() || "";
}

function estimateReadTimeFromBody(post: SanityPost) {
  const words = [
    post.title,
    post.excerpt,
    post.intro,
    ...(post.body || []).map(blockText),
    ...(post.faqs || []).flatMap((faq) => [faq.question, faq.answer])
  ].join(" ").trim().split(/\s+/).filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 225));
}

function sectionsFromBody(post: SanityPost): BlogSection[] {
  const sections: BlogSection[] = [];

  for (const block of (post.body || []) as PortableBlock[]) {
    if (block._type !== "block") {
      continue;
    }

    const text = blockText(block);
    if (!text) {
      continue;
    }

    if (block.style === "h2") {
      sections.push({ heading: text, body: [] });
      continue;
    }

    if (block.style === "normal") {
      if (!sections.length) {
        sections.push({ heading: "Overview", body: [] });
      }
      sections[sections.length - 1].body.push(text);
    }
  }

  return sections;
}

function imageUrl(post: SanityPost, fallbackSlug: string) {
  if (!post.featuredImage) {
    return `/blog-images/${fallbackSlug}.svg`;
  }

  return urlFor(post.featuredImage)
    .width(1200)
    .height(628)
    .fit("crop")
    .auto("format")
    .url();
}

function normalizeSanityPost(post: SanityPost): BlogPost | null {
  if (!post.slug || !post.title) {
    return null;
  }

  const staticPost = getBlogPost(post.slug);
  const sections = sectionsFromBody(post);
  const publishedAt = post.publishedAt || staticPost?.date || new Date().toISOString();
  const readingTime = post.readingTime || estimateReadTimeFromBody(post);

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || staticPost?.excerpt || "",
    category: post.category?.title || staticPost?.category || "SEO",
    date: publishedAt.split("T")[0],
    readTime: `${readingTime} min read`,
    intro: post.intro || post.excerpt || staticPost?.intro || "",
    featuredImage: imageUrl(post, post.slug),
    featuredImageAlt: post.featuredImage?.alt || `${post.title} featured image`,
    author: {
      name: post.author?.name || staticPost?.author.name || "Awais Younas",
      bio: post.author?.bio || staticPost?.author.bio || "",
      photo: post.author?.photo ? urlFor(post.author.photo).width(96).height(96).fit("crop").auto("format").url() : staticPost?.author.photo,
      role: post.author?.role,
      linkedinUrl: post.author?.linkedinUrl
    },
    sections: sections.length ? sections : staticPost?.sections || [],
    body: post.body,
    faqs: post.faqs?.filter((faq) => faq.question && faq.answer).map((faq) => ({
      question: faq.question as string,
      answer: faq.answer as string
    })) || staticPost?.faqs || [],
    related: post.relatedPosts?.map((relatedPost) => relatedPost.slug).filter((slug): slug is string => Boolean(slug)) || staticPost?.related || []
  };
}

export async function getBlogPosts() {
  if (!sanityIsConfigured()) {
    return blogPosts;
  }

  const posts = await client.fetch<SanityPost[]>(postsListQuery).catch((error) => {
    console.warn("Sanity blog list fetch failed, using static posts.", error);
    return null;
  });

  const normalized = posts?.map(normalizeSanityPost).filter((post): post is BlogPost => Boolean(post)) || [];
  return normalized.length ? normalized : blogPosts;
}

export async function getBlogPostBySlug(slug: string) {
  if (!sanityIsConfigured()) {
    return getBlogPost(slug) || null;
  }

  const post = await client.fetch<SanityPost | null>(postBySlugQuery, { slug }).catch((error) => {
    console.warn("Sanity blog post fetch failed, using static post.", error);
    return null;
  });

  return post ? normalizeSanityPost(post) : getBlogPost(slug) || null;
}

export async function getBlogSlugs() {
  if (!sanityIsConfigured()) {
    return blogPosts.map((post) => post.slug);
  }

  const slugs = await client.fetch<Array<{ slug?: string }>>(allSlugsQuery).catch((error) => {
    console.warn("Sanity slug fetch failed, using static slugs.", error);
    return null;
  });

  const sanitySlugs = slugs?.map((item) => item.slug).filter((slug): slug is string => Boolean(slug)) || [];
  return sanitySlugs.length ? sanitySlugs : blogPosts.map((post) => post.slug);
}
