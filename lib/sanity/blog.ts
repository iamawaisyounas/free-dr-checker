import type { BlogPost, BlogSection } from "../../app/blog/posts";
import type { PortableTextBlock } from "@portabletext/types";
import { blogPosts, getBlogPost } from "../../app/blog/posts";
import { client, sanityIsConfigured } from "./client";
import { urlFor } from "./image";
import { allSlugsQuery, postBySlugQuery, postsListQuery } from "./queries";

let sanityReadUnavailable = false;

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
    asset?: {
      url?: string;
      mimeType?: string;
      extension?: string;
    };
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

const latestReviewPostOverrides: Record<string, {
  intro: string;
  featuredImage: string;
  featuredImageAlt: string;
}> = {
  "best-free-domain-rating-checkers": {
    intro: "I reviewed 10 free Domain Rating checkers to find which ones are actually useful for quick SEO checks, outreach screening, and competitor research. Start with DR Checker for fast bulk Ahrefs DR checks, then use Ahrefs, Semrush, or Moz when you need a second authority signal.",
    featuredImage: "/blog-images/best-free-domain-rating-checkers.svg",
    featuredImageAlt: "Best free Domain Rating checker tools reviewed for SEO research in 2026"
  }
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

  const asset = post.featuredImage.asset;

  if (asset?.url && (asset.mimeType === "image/svg+xml" || asset.extension === "svg")) {
    return asset.url;
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

  const postOverride = latestReviewPostOverrides[post.slug];
  const staticPost = getBlogPost(post.slug);
  const sections = sectionsFromBody(post);
  const publishedAt = staticPost?.date || post.publishedAt || new Date().toISOString();
  const readingTime = post.readingTime || estimateReadTimeFromBody(post);
  const sanityFaqs = post.faqs?.filter((faq) => faq.question && faq.answer).map((faq) => ({
    question: faq.question as string,
    answer: faq.answer as string
  })) || [];

  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || staticPost?.excerpt || "",
    seoDescription: staticPost?.seoDescription || post.seoDescription,
    category: post.category?.title || staticPost?.category || "SEO",
    date: publishedAt.split("T")[0],
    readTime: `${readingTime} min read`,
    intro: postOverride?.intro || post.intro || post.excerpt || staticPost?.intro || "",
    takeaways: staticPost?.takeaways || [],
    supportBlock: staticPost?.supportBlock,
    featuredImage: postOverride?.featuredImage || imageUrl(post, post.slug),
    featuredImageAlt: postOverride?.featuredImageAlt || post.featuredImage?.alt || `${post.title} featured image`,
    author: {
      name: post.author?.name || staticPost?.author.name || "Awais Younas",
      bio: post.author?.bio || staticPost?.author.bio || "",
      photo: post.author?.photo ? urlFor(post.author.photo).width(96).height(96).fit("crop").auto("format").url() : staticPost?.author.photo,
      role: post.author?.role,
      linkedinUrl: post.author?.linkedinUrl
    },
    sections: sections.length ? sections : staticPost?.sections || [],
    body: post.body,
    faqs: sanityFaqs.length ? sanityFaqs : staticPost?.faqs || [],
    related: post.relatedPosts?.map((relatedPost) => relatedPost.slug).filter((slug): slug is string => Boolean(slug)) || staticPost?.related || []
  };
}

function isSanityAuthError(error: unknown) {
  const maybeError = error as {
    statusCode?: number;
    response?: {
      statusCode?: number;
      body?: {
        errorCode?: string;
      };
    };
  };

  return maybeError.statusCode === 401
    || maybeError.response?.statusCode === 401
    || maybeError.response?.body?.errorCode === "SIO-401-ANF";
}

async function fetchSanity<T>(query: string, params?: Record<string, string>) {
  if (!sanityIsConfigured() || sanityReadUnavailable) {
    return null;
  }

  try {
    return params ? await client.fetch<T>(query, params) : await client.fetch<T>(query);
  } catch (error) {
    if (isSanityAuthError(error)) {
      sanityReadUnavailable = true;
      return null;
    }

    console.warn("Sanity read failed, using static blog content.", error instanceof Error ? error.message : error);
    return null;
  }
}

export async function getBlogPosts() {
  const posts = await fetchSanity<SanityPost[]>(postsListQuery);

  const normalized = posts?.map(normalizeSanityPost).filter((post): post is BlogPost => Boolean(post)) || [];
  return normalized.length ? normalized : blogPosts;
}

export async function getBlogPostBySlug(slug: string) {
  const post = await fetchSanity<SanityPost | null>(postBySlugQuery, { slug });

  return post ? normalizeSanityPost(post) : getBlogPost(slug) || null;
}

export async function getBlogSlugs() {
  const slugs = await fetchSanity<Array<{ slug?: string }>>(allSlugsQuery);

  const sanitySlugs = slugs?.map((item) => item.slug).filter((slug): slug is string => Boolean(slug)) || [];
  return sanitySlugs.length ? sanitySlugs : blogPosts.map((post) => post.slug);
}
