import { groq } from "next-sanity";

export const postsListQuery = groq`
  *[
    _type == "post"
    && !(_id in path("drafts.**"))
    && (!defined(publishedAt) || dateTime(publishedAt) <= dateTime(now()))
  ] | order(publishedAt desc) {
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
  *[
    _type == "post"
    && !(_id in path("drafts.**"))
    && slug.current == $slug
    && (!defined(publishedAt) || dateTime(publishedAt) <= dateTime(now()))
  ][0] {
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

export const allSlugsQuery = groq`
  *[
    _type == "post"
    && !(_id in path("drafts.**"))
    && (!defined(publishedAt) || dateTime(publishedAt) <= dateTime(now()))
  ]{"slug": slug.current}
`;
