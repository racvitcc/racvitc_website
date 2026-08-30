import { defineArrayMember, defineField, defineType } from "sanity";

export const eventType = defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug / ID",
      description:
        "Stable id used in links. Click Generate, or keep the existing one for imported events.",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: { dateFormat: "YYYY-MM-DD" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "time",
      title: "Time",
      description: 'Free text, e.g. "06:00 AM – 08:30 AM" or "Full day".',
      type: "string",
    }),
    defineField({ name: "location", title: "Location", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
    defineField({
      name: "type",
      title: "Upcoming or past?",
      type: "string",
      options: {
        list: [
          { title: "Upcoming", value: "upcoming" },
          { title: "Past", value: "past" },
        ],
        layout: "radio",
      },
      initialValue: "upcoming",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "images",
      title: "Photos",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "date", media: "images.0" },
  },
});
