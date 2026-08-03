import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt / Dek",
      type: "text",
      rows: 3,
      description: "Short summary shown on the blog listing page.",
      validation: (Rule) => Rule.max(200)
    }),
    defineField({
      name: "intro",
      title: "Intro",
      type: "text",
      rows: 4,
      description: "Lead paragraph shown at the top of the article."
    }),
    defineField({
      name: "featuredImage",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
          validation: (Rule) => Rule.required()
        })
      ],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }]
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "reference",
      to: [{ type: "author" }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt text",
              type: "string"
            })
          ]
        })
      ]
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "question", title: "Question", type: "string" }),
            defineField({ name: "answer", title: "Answer", type: "text", rows: 3 })
          ]
        })
      ]
    }),
    defineField({
      name: "relatedPosts",
      title: "Related Posts",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "post" }] })]
    }),
    defineField({
      name: "readingTime",
      title: "Reading time (minutes)",
      type: "number"
    }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: "seoTitle",
      title: "SEO Meta Title",
      type: "string",
      validation: (Rule) => Rule.max(60)
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Meta Description",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(160)
    })
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.title",
      media: "featuredImage"
    }
  }
});
