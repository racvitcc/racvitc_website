import { defineQuery } from "next-sanity";

/** Cache tags — a Sanity webhook busts these via /api/revalidate on any edit. */
export const TAGS = {
  events: "events",
  projects: "projects",
  gallery: "gallery",
} as const;

// Events, newest first. `id` prefers the human slug so the calendar's default
// selection (e.g. "kadal-karai-aug") keeps working after migration.
export const EVENTS_QUERY = defineQuery(`
  *[_type == "event"] | order(date desc){
    "id": coalesce(slug.current, _id),
    title,
    date,
    time,
    location,
    description,
    type,
    "images": images[]{ _type, asset, hotspot, crop }
  }
`);

// Projects, ordered by an optional manual "order" then creation time.
export const PROJECTS_QUERY = defineQuery(`
  *[_type == "project"] | order(order asc, _createdAt asc){
    "slug": slug.current,
    name,
    tagline,
    paragraphs,
    "images": images[]{ _type, asset, hotspot, crop },
    "sceneImages": sceneImages[]{ _type, asset, hotspot, crop },
    stats[]{ value, suffix, label }
  }
`);

// Gallery items. `image` is the still (also the poster for videos); `video` is
// the mp4 file; `album` is an optional set of images.
export const GALLERY_QUERY = defineQuery(`
  *[_type == "galleryItem"] | order(order asc, _createdAt asc){
    "id": _id,
    type,
    caption,
    year,
    tag,
    "image": image{ _type, asset, hotspot, crop },
    "videoUrl": video.asset->url,
    "album": album[]{ _type, asset, hotspot, crop }
  }
`);
