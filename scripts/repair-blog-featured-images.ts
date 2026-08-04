import { existsSync, readFileSync } from "node:fs";
import { join, parse } from "node:path";
import { createClient } from "next-sanity";
import sharp from "sharp";
import { blogAuthor, blogPosts } from "../app/blog/posts";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "ti7jekgy";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN || getSanityCliToken();

if (!projectId || !token) {
  console.error("Missing Sanity project ID or write token.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false
});

type ExistingPost = {
  _id: string;
  slug?: string;
};

function slugId(prefix: string, value: string) {
  return `${prefix}.${value.toLowerCase().replace(/[^a-z0-9-]+/g, "-")}`;
}

function portableTextFromPost(post: (typeof blogPosts)[number]) {
  let key = 0;

  return post.sections.flatMap((section) => [
    {
      _type: "block",
      _key: `heading-${key++}`,
      style: "h2",
      markDefs: [],
      children: [{ _type: "span", _key: `span-${key++}`, text: section.heading, marks: [] }]
    },
    ...section.body.map((paragraph) => ({
      _type: "block",
      _key: `paragraph-${key++}`,
      style: "normal",
      markDefs: [],
      children: [{ _type: "span", _key: `span-${key++}`, text: paragraph, marks: [] }]
    }))
  ]);
}

function getSanityCliToken() {
  const configPath = join(process.env.HOME || "", ".config", "sanity", "config.json");

  if (!existsSync(configPath)) {
    return undefined;
  }

  try {
    const config = JSON.parse(readFileSync(configPath, "utf8")) as {
      authToken?: string;
      unclaimedProjects?: Record<string, { token?: string }>;
    };

    return config.authToken || config.unclaimedProjects?.[projectId]?.token;
  } catch {
    return undefined;
  }
}

async function uploadPngFeaturedImage(post: (typeof blogPosts)[number]) {
  const sourcePath = join(process.cwd(), "public", post.featuredImage.replace(/^\//, ""));

  if (!existsSync(sourcePath)) {
    throw new Error(`Missing featured image source: ${sourcePath}`);
  }

  const pngBuffer = await sharp(sourcePath)
    .resize(1200, 628, { fit: "cover" })
    .png()
    .toBuffer();

  return client.assets.upload("image", pngBuffer, {
    filename: `${parse(sourcePath).name}.png`,
    title: post.featuredImageAlt,
    contentType: "image/png"
  });
}

async function main() {
  const authorId = slugId("author", blogAuthor.name);
  const slugs = blogPosts.map((post) => post.slug);
  const existingPosts = await client.fetch<ExistingPost[]>(
    `*[_type == "post" && slug.current in $slugs]{_id, "slug": slug.current}`,
    { slugs }
  );
  const postsBySlug = new Map<string, ExistingPost[]>();

  for (const post of existingPosts) {
    if (!post.slug) {
      continue;
    }

    postsBySlug.set(post.slug, [...(postsBySlug.get(post.slug) || []), post]);
  }

  for (const post of blogPosts) {
    const documents = postsBySlug.get(post.slug) || [];

    if (!documents.length) {
      await client.createIfNotExists({
        _id: slugId("category", post.category),
        _type: "category",
        title: post.category,
        slug: { _type: "slug", current: post.category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") }
      });

      const asset = await uploadPngFeaturedImage(post);

      await client.createIfNotExists({
        _id: slugId("post", post.slug),
        _type: "post",
        title: post.title,
        slug: { _type: "slug", current: post.slug },
        excerpt: post.excerpt,
        intro: post.intro,
        featuredImage: {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
          alt: post.featuredImageAlt
        },
        category: { _type: "reference", _ref: slugId("category", post.category) },
        author: { _type: "reference", _ref: authorId },
        body: portableTextFromPost(post),
        faqs: post.faqs.map((faq, index) => ({
          _key: `faq-${index}`,
          question: faq.question,
          answer: faq.answer
        })),
        relatedPosts: post.related.map((slug) => ({
          _key: slug,
          _type: "reference",
          _ref: slugId("post", slug),
          _weak: true
        })),
        readingTime: Number(post.readTime.replace(/\D+/g, "")) || undefined,
        publishedAt: `${post.date}T00:00:00.000Z`,
        seoTitle: post.title,
        seoDescription: post.excerpt
      });

      console.log(`Created missing ${post.slug}`);
      continue;
    }

    const asset = await uploadPngFeaturedImage(post);
    const featuredImage = {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: post.featuredImageAlt
    };

    await Promise.all(documents.map((document) => (
      client.patch(document._id).set({ featuredImage }).commit()
    )));

    console.log(`Repaired ${post.slug} (${documents.length} document${documents.length === 1 ? "" : "s"})`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
