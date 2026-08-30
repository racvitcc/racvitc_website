"use client";

// Client boundary for the below-the-fold homepage sections. Each is code-split
// (ssr:false) and mounted on approach via LazySection, keeping their JS out of
// the initial bundle/hydration so mobile TBT + LCP improve. Server-rendered,
// above-the-fold sections stay statically imported in page.tsx.
import dynamic from "next/dynamic";
import LazySection from "@/components/motion/LazySection";
import type { ClubEvent, GalleryItem } from "@/content/types";

const GalleryWallD = dynamic(() => import("@/components/gallery/GalleryWall"), { ssr: false });
const EventsCalendarD = dynamic(() => import("@/components/sections/EventsCalendar"), { ssr: false });
const JoinJourneyD = dynamic(() => import("@/components/sections/JoinJourney"), { ssr: false });
const RegistrationBlockD = dynamic(() => import("@/components/sections/RegistrationBlock"), { ssr: false });
const PartnerTeaserD = dynamic(() => import("@/components/sections/PartnerTeaser"), { ssr: false });
const FAQD = dynamic(() => import("@/components/sections/FAQ"), { ssr: false });

export function LazyGalleryWall({ items }: { items: GalleryItem[] }) {
  return <LazySection minHeight="80vh"><GalleryWallD items={items} /></LazySection>;
}
export function LazyEventsCalendar({ events }: { events: ClubEvent[] }) {
  return <LazySection minHeight="60vh"><EventsCalendarD events={events} /></LazySection>;
}
export function LazyJoinJourney() {
  return <LazySection minHeight="70vh"><JoinJourneyD /></LazySection>;
}
export function LazyRegistrationBlock() {
  return <LazySection minHeight="60vh"><RegistrationBlockD /></LazySection>;
}
export function LazyPartnerTeaser() {
  return <LazySection minHeight="80vh"><PartnerTeaserD /></LazySection>;
}
export function LazyFAQ({ limit }: { limit?: number }) {
  return <LazySection minHeight="70vh"><FAQD limit={limit} /></LazySection>;
}
