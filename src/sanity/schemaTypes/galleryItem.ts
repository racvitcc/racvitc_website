import { defineArrayMember, defineField, defineType } from "sanity";

export const galleryItemType = defineType({
  name: "galleryItem",
  title: "Gallery item",
  type: "document",
  fields: [
    defineField({
      name: "type",
      title: "Kind",
      type: "string",
      options: {
        list: [
          { title: "Photo", value: "photo" },
          { title: "Video (reel)", value: "video" },
          { title: "Award", value: "award" },
          { title: "Album", value: "album" },
        ],
        layout: "radio",
      },
      initialValue: "photo",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      description: 'e.g. "2025–26"',
      type: "string",
    }),
    defineField({
      name: "tag",
      title: "Tag",
      description: 'e.g. "RYLA", "Fellowship", "Awards"',
      type: "string",
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Lower shows first.",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "image",
      title: "Image",
      description: "The still. For a video, this is the thumbnail/poster.",
      type: "image",
      options: { hotspot: true },
      validation: (r) =>
        r.custom((value, ctx) => {
          const type = (ctx.parent as { type?: string })?.type;
          if (type !== "video" && !value) return "An image is required.";
          return true;
        }),
    }),
    defineField({
      name: "video",
      title: "Video file (mp4)",
      type: "file",
      options: { accept: "video/*" },
      hidden: ({ parent }) => parent?.type !== "video",
      validation: (r) =>
        r.custom((value, ctx) => {
          const type = (ctx.parent as { type?: string })?.type;
          if (type === "video" && !value) return "A video file is required.";
          return true;
        }),
    }),
    defineField({
      name: "album",
      title: "Album images",
      type: "array",
      of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
      hidden: ({ parent }) => parent?.type !== "album",
    }),
  ],
  preview: {
    select: { title: "caption", type: "type", tag: "tag", media: "image" },
    prepare: ({ title, type, tag, media }) => ({
      title,
      subtitle: [type, tag].filter(Boolean).join(" · "),
      media,
    }),
  },
});
