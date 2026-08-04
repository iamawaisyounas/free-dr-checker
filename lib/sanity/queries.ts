import { groq } from "next-sanity";

export const postsListQuery = groq`
  *[_type == "post"] | order(publishedAt desc) {
    title,
    "slug": slug.current,
    excerpt,
    intro,
    featuredImage{
      ...,
      asset->{_id, url, mimeType, extension}
    },
    readingTime,
    publishedAt,
    "author": author->{name, "slug": slug.current, photo, bio, role, linkedinUrl},
    "category": category->{title, "slug": slug.current}
  }
`;

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    excerpt,
    intro,
    featuredImage{
      ...,
      asset->{_id, url, mimeType, extension}
    },
    body,
    faqs,
    readingTime,
    publishedAt,
    seoTitle,
    seoDescription,
    "author": author->{name, "slug": slug.current, photo, bio, role, linkedinUrl},
    "category": category->{title, "slug": slug.current},
    "relatedPosts": relatedPosts[]->{title, "slug": slug.current, excerpt, featuredImage, readingTime, publishedAt, "category": category->{title}}
  }
`;

export const allSlugsQuery = groq`*[_type == "post"]{"slug": slug.current}`;
