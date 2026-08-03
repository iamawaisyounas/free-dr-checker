import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" }
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true }
    }),
    defineField({
      name: "bio",
      title: "Bio",
      type: "text",
      rows: 3
    }),
    defineField({
      name: "role",
      title: "Role / Title",
      type: "string"
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url"
    })
  ]
});
