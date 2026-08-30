import { defineArrayMember, defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Lower shows first. The first project is the signature one on the homepage.",
      type: "number",
      initialValue: 0,
    }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({
      name: "paragraphs",
      title: "Description paragraphs",
      type: "array",
      of: [defineArrayMember({ type: "text", rows: 4 })],
    }),
    defineField({
      name: "images",
      title: "Gallery images",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({
      name: "sceneImages",
      title: "Scene / parallax images",
      description: "Photos used in the cinematic pinned scene and the auto-scroll strip.",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "stat",
          fields: [
            defineField({ name: "value", title: "Value", type: "number", validation: (r) => r.required() }),
            defineField({ name: "suffix", title: "Suffix", type: "string", description: 'e.g. "+", "kg+", "×"' }),
            defineField({ name: "label", title: "Label", type: "string", validation: (r) => r.required() }),
          ],
          preview: {
            select: { value: "value", suffix: "suffix", label: "label" },
            prepare: ({ value, suffix, label }) => ({
              title: `${value ?? ""}${suffix ?? ""}`,
              subtitle: label,
            }),
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "tagline", media: "sceneImages.0" },
  },
});
