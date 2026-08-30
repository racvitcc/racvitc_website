import "server-only";

import type { SanityImageSource } from "@sanity/image-url";

import { sanityFetch } from "@/sanity/fetch";
import { imageUrl } from "@/sanity/image";
import { EVENTS_QUERY, TAGS } from "@/sanity/queries";

import type { ClubEvent } from "./types";

type RawEvent = {
  id: string;
  title: string;
  date: string;
  time: string | null;
  location: string | null;
  description: string | null;
  type: "past" | "upcoming";
  images: SanityImageSource[] | null;
};

/** All club events from Sanity, newest first. Each carries an images[] of CDN
 *  URLs that backs the detail card and hover-preview carousel (§5.13). */
export async function getEvents(): Promise<ClubEvent[]> {
  let rows: RawEvent[] = [];
  try {
    rows = await sanityFetch<RawEvent[]>(EVENTS_QUERY, { tags: [TAGS.events] });
  } catch (err) {
    console.warn("[content] getEvents failed — rendering no events.", err);
    return [];
  }
  return rows.map((e) => ({
    id: e.id,
    title: e.title,
    date: e.date,
    time: e.time ?? "",
    location: e.location ?? "",
    description: e.description ?? "",
    type: e.type,
    images: (e.images ?? [])
      .map((img) => imageUrl(img, 1600))
      .filter((u): u is string => Boolean(u)),
  }));
}

/** Nearest upcoming Kadal Karai date — lets the Signature Projects section
 *  (§5.9) cross-link to a real entry on the events calendar. */
export function nextKadalKaraiEventFrom(events: ClubEvent[]): ClubEvent | null {
  return (
    events
      .filter(
        (e) => e.type === "upcoming" && e.title.toLowerCase().includes("kadal karai")
      )
      .sort((a, b) => a.date.localeCompare(b.date))[0] ?? null
  );
}
