import type { ClubEvent } from "./types";

/** Real club events. Each event carries an images[] array (real photo paths)
 *  that backs both the detail card and the hover-preview carousel (§5.13). */
export const events: ClubEvent[] = [
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

/** Nearest upcoming Kadal Karai date — lets the Signature Projects section
 *  (§5.9) cross-link to a real entry on the events calendar instead of
 *  floating disconnected from it. */
export const nextKadalKaraiEvent =
  events
    .filter((e) => e.type === "upcoming" && e.title.toLowerCase().includes("kadal karai"))
    .sort((a, b) => a.date.localeCompare(b.date))[0] ?? null;
