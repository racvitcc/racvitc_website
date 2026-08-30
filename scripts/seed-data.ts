/**
 * One-time seed for migrate-to-sanity.ts — the site's original hard-coded
 * Events, Projects and Gallery content plus the public/ media paths. After the
 * import, Sanity is the source of truth and this file can be deleted.
 */

export type SeedEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  type: "past" | "upcoming";
  images: string[];
};

export type SeedProject = {
  slug: string;
  name: string;
  order: number;
  tagline: string;
  paragraphs: string[];
  images: string[];
  sceneImages: string[];
  stats: { value: number; suffix: string; label: string }[];
};

export type SeedGalleryItem = {
  type: "photo" | "video" | "award" | "album";
  caption: string;
  year: string;
  tag: string;
  /** Still image path (also the poster for videos). */
  image?: string;
  /** mp4 path for videos. */
  video?: string;
};

export const seedEvents: SeedEvent[] = [
  {
    id: "kadal-karai-aug",
    title: "Kadal Karai Beach Cleanup",
    date: "2026-08-02",
    time: "06:00 AM – 08:30 AM",
    location: "Besant Nagar Beach, Chennai",
    description:
      "Our signature environmental campaign to restore and protect Chennai's coastline. Join us for a morning of cleanup and community.",
    images: ["/kk/kk-3.jpg"],
    type: "upcoming",
  },
  {
    id: "club-expo-jul",
    title: "Club Expo — RAC VIT Chennai",
    date: "2026-07-22",
    time: "Full day",
    location: "VIT Chennai",
    description:
      "The Rotaract Club of VIT Chennai showcased its avenues, projects, and community impact at the campus Club Expo, welcoming new members to the movement.",
    images: ["/Events/club_expo.jpeg"],
    type: "past",
  },
  {
    id: "dols-jun",
    title: "District Officials Learning Seminar (DOLS)",
    date: "2026-06-06",
    time: "6 & 7 June 2026",
    location: "Day 1: Dr. MGR Janaki College · Day 2: Farm Guru",
    description:
      "A two-day District Officials Learning Seminar hosted along with the District Rotaract Council, Rotary International District 3234, with our club serving as the Secretary Club. Day 1 at Dr. MGR Janaki College, Day 2 at Farm Guru.",
    images: ["/Events/dols.jpeg"],
    type: "past",
  },
];

export const seedProjects: SeedProject[] = [
  {
    slug: "kadal-karai",
    name: "Kadal Karai",
    order: 0,
    tagline: "Preserving Chennai's coastline, one cleanup at a time.",
    paragraphs: [
      "Kadal Karai is the flagship environmental initiative of the Rotaract Club of VIT Chennai, dedicated to preserving Chennai's coastline through consistent beach clean-up drives and environmental awareness. Conducted every alternate weekend, the project brings together volunteers who are passionate about protecting marine ecosystems and promoting sustainable living.",
      "With each cleanup, volunteers remove plastic waste, bottles, packaging materials, and other non-biodegradable debris from the shoreline, restoring cleaner and safer beaches for both people and marine life. Beyond waste collection, Kadal Karai aims to educate participants and the public on the importance of responsible waste disposal, environmental conservation, and collective action.",
      "More than just a clean-up drive, Kadal Karai has grown into a movement that inspires youth to become active environmental stewards. Through consistency, community participation, and a shared commitment to sustainability, the initiative continues to create a lasting impact — one beach, one volunteer and one cleanup at a time.",
    ],
    images: [
      "/projects/kadal-karai-1.jpg",
      "/projects/kadal-karai-2.jpg",
      "/projects/kadal-karai-3.jpg",
    ],
    sceneImages: [
      "/kk/kk-1.jpg",
      "/kk/kk-2.jpg",
      "/kk/kk-3.jpg",
      "/kk/kk-4.jpg",
      "/kk/kk-5.jpg",
      "/kk/kk-6.jpg",
      "/kk/kk-7.jpg",
    ],
    stats: [
      { value: 40, suffix: "+", label: "Cleanup drives" },
      { value: 5000, suffix: "kg+", label: "Waste removed" },
      { value: 2, suffix: "×", label: "South Asia awards" },
    ],
  },
];

export const seedGallery: SeedGalleryItem[] = [
  // — Photos —
  { type: "photo", caption: "FUN-RYLA", year: "2025–26", tag: "RYLA", image: "/gallery/photo-installation.jpeg" },
  { type: "photo", caption: "Orientation on the lawn", year: "2025–26", tag: "RYLA", image: "/gallery/photo-ryla-circle.jpeg" },
  { type: "photo", caption: "The Big Band night", year: "2025–26", tag: "Fellowship", image: "/gallery/photo-big-band.jpeg" },
  { type: "photo", caption: "Club Expo — Unite Together", year: "2025–26", tag: "Community", image: "/gallery/photo-club-expo.jpeg" },
  { type: "photo", caption: "District Rotaract Council", year: "2025–26", tag: "District", image: "/gallery/photo-district-council.jpeg" },

  // — Videos (reels) — poster is the sibling .jpg
  { type: "video", caption: "A year in motion", year: "2025–26", tag: "Reel", video: "/gallery/video-1.mp4", image: "/gallery/video-1.jpg" },
  { type: "video", caption: "Moments from the field", year: "2025–26", tag: "Reel", video: "/gallery/video-2.mp4", image: "/gallery/video-2.jpg" },
  { type: "video", caption: "Behind the scenes", year: "2025–26", tag: "Reel", video: "/gallery/video-3.mp4", image: "/gallery/video-3.jpg" },
  { type: "video", caption: "The movement, in motion", year: "2025–26", tag: "Reel", video: "/gallery/video-4.mp4", image: "/gallery/video-4.jpg" },

  // — Awards —
  { type: "award", caption: "Rising Club Recognition", year: "2025–26", tag: "Awards", image: "/gallery/award-rising-club.jpeg" },
  { type: "award", caption: "Nakshatra — Champions", year: "2025–26", tag: "Awards", image: "/gallery/award-nakshatra-trophy.jpeg" },
  { type: "award", caption: "Recognition plaque", year: "2025–26", tag: "Awards", image: "/gallery/award-recognition-plaque.jpeg" },
];
