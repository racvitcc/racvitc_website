import "server-only";

import type { SanityImageSource } from "@sanity/image-url";

import { sanityFetch } from "@/sanity/fetch";
import { imageUrl } from "@/sanity/image";
import { PROJECTS_QUERY, TAGS } from "@/sanity/queries";

import type { Project } from "./types";

type RawProject = {
  slug: string;
  name: string;
  tagline: string | null;
  paragraphs: string[] | null;
  images: SanityImageSource[] | null;
  sceneImages: SanityImageSource[] | null;
  stats: { value: number; suffix: string | null; label: string }[] | null;
};

const toUrls = (imgs: SanityImageSource[] | null, width: number): string[] =>
  (imgs ?? [])
    .map((img) => imageUrl(img, width))
    .filter((u): u is string => Boolean(u));

/** All projects from Sanity, ordered by `order` then creation time. */
export async function getProjects(): Promise<Project[]> {
  let rows: RawProject[] = [];
  try {
    rows = await sanityFetch<RawProject[]>(PROJECTS_QUERY, {
      tags: [TAGS.projects],
    });
  } catch (err) {
    console.warn("[content] getProjects failed — rendering no projects.", err);
    return [];
  }
  return rows.map((p) => ({
    slug: p.slug,
    name: p.name,
    tagline: p.tagline ?? "",
    paragraphs: p.paragraphs ?? [],
    images: toUrls(p.images, 1600),
    sceneImages: toUrls(p.sceneImages, 1600),
    stats: (p.stats ?? []).map((s) => ({
      value: s.value,
      suffix: s.suffix ?? "",
      label: s.label,
    })),
  }));
}

/** The signature project (first by order) — the Kadal Karai showpiece. */
export function signatureProjectFrom(projects: Project[]): Project | null {
  return projects[0] ?? null;
}
