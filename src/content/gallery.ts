import type { GalleryItem } from "./types";

/** Real gallery assets from public/gallery — photos, films & awards for the
 *  Yearbook / Polaroid Wall (§5.14). Paths point at renamed, sorted files. */
const raw: Omit<GalleryItem, "id">[] = [
  // — Photos —
  { type: "photo", caption: "FUN-RYLA", year: "2025–26", tag: "RYLA", src: "/gallery/photo-installation.jpeg" },
  { type: "photo", caption: "Orientation on the lawn", year: "2025–26", tag: "RYLA", src: "/gallery/photo-ryla-circle.jpeg" },
  { type: "photo", caption: "The Big Band night", year: "2025–26", tag: "Fellowship", src: "/gallery/photo-big-band.jpeg" },
  { type: "photo", caption: "Club Expo — Unite Together", year: "2025–26", tag: "Community", src: "/gallery/photo-club-expo.jpeg" },
  { type: "photo", caption: "District Rotaract Council", year: "2025–26", tag: "District", src: "/gallery/photo-district-council.jpeg" },

  // — Videos (reels) —
  { type: "video", caption: "A year in motion", year: "2025–26", tag: "Reel", src: "/gallery/video-1.mp4" },
  { type: "video", caption: "Moments from the field", year: "2025–26", tag: "Reel", src: "/gallery/video-2.mp4" },
  { type: "video", caption: "Behind the scenes", year: "2025–26", tag: "Reel", src: "/gallery/video-3.mp4" },
  { type: "video", caption: "The movement, in motion", year: "2025–26", tag: "Reel", src: "/gallery/video-4.mp4" },

  // — Awards —
  { type: "award", caption: "Rising Club Recognition", year: "2025–26", tag: "Awards", src: "/gallery/award-rising-club.jpeg" },
  { type: "award", caption: "Nakshatra — Champions", year: "2025–26", tag: "Awards", src: "/gallery/award-nakshatra-trophy.jpeg" },
  { type: "award", caption: "Recognition plaque", year: "2025–26", tag: "Awards", src: "/gallery/award-recognition-plaque.jpeg" },
];

export const gallery: GalleryItem[] = raw.map((item, i) => ({
  ...item,
  id: `g-${i}`,
}));

export const galleryTags = [
  "All",
  "Photos",
  "Videos",
  "Awards",
] as const;

/** Sets for the image-scatter preview (heading + scattered photos). Real stills. */
export const scatterSets = [
  {
    heading: "On the ground",
    images: [
      "/gallery/photo-installation.jpeg",
      "/gallery/photo-ryla-circle.jpeg",
      "/gallery/photo-club-expo.jpeg",
      "/gallery/photo-big-band.jpeg",
      "/gallery/photo-district-council.jpeg",
    ],
  },
  {
    heading: "Recognitions",
    images: [
      "/gallery/award-rising-club.jpeg",
      "/gallery/award-nakshatra-trophy.jpeg",
      "/gallery/award-recognition-plaque.jpeg",
      "/gallery/photo-installation.jpeg",
      "/gallery/photo-big-band.jpeg",
    ],
  },
];
