import { createReadStream, existsSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "next-sanity";
import { blogAuthor, blogPosts } from "../app/blog/posts";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false
});

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

async function uploadFeaturedImage(post: (typeof blogPosts)[number]) {
  const imagePath = join(process.cwd(), "public", post.featuredImage.replace(/^\//, ""));

  if (!existsSync(imagePath)) {
    return null;
  }

  return client.assets.upload("image", createReadStream(imagePath), {
    filename: imagePath.split("/").pop(),
    title: post.featuredImageAlt
  });
}

async function main() {
  const authorId = slugId("author", blogAuthor.name);

  await client.createOrReplace({
    _id: authorId,
    _type: "author",
    name: blogAuthor.name,
    slug: { _type: "slug", current: blogAuthor.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") },
    bio: blogAuthor.bio,
    role: "Co-founder",
    linkedinUrl: "https://www.linkedin.com/in/awais-younas/"
  });

  const categories = Array.from(new Set(blogPosts.map((post) => post.category)));

  await Promise.all(categories.map((category) => client.createOrReplace({
    _id: slugId("category", category),
    _type: "category",
    title: category,
    slug: { _type: "slug", current: category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") }
  })));

  for (const post of blogPosts) {
    const asset = await uploadFeaturedImage(post);

    await client.createOrReplace({
      _id: slugId("post", post.slug),
      _type: "post",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      excerpt: post.excerpt,
      intro: post.intro,
      featuredImage: asset ? {
        _type: "image",
        asset: { _type: "reference", _ref: asset._id },
        alt: post.featuredImageAlt
      } : undefined,
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

    console.log(`Migrated ${post.slug}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
