import "server-only";

import type { SanityImageSource } from "@sanity/image-url";

import { sanityFetch } from "@/sanity/fetch";
import { imageUrl } from "@/sanity/image";
import { GALLERY_QUERY, TAGS } from "@/sanity/queries";

import type { GalleryItem, GalleryType } from "./types";

type RawGalleryItem = {
  id: string;
  type: GalleryType;
  caption: string;
  year: string | null;
  tag: string | null;
  image: SanityImageSource | null;
  videoUrl: string | null;
  album: SanityImageSource[] | null;
};

/** Real gallery assets from Sanity — photos, films & awards for the
 *  Yearbook / Polaroid Wall (§5.14). */
export async function getGallery(): Promise<GalleryItem[]> {
  let rows: RawGalleryItem[] = [];
  try {
    rows = await sanityFetch<RawGalleryItem[]>(GALLERY_QUERY, {
      tags: [TAGS.gallery],
    });
  } catch (err) {
    console.warn("[content] getGallery failed — rendering no gallery.", err);
    return [];
  }
  return rows.map((g) => {
    const still = imageUrl(g.image, 1200);
    const isVideo = g.type === "video";
    const album = (g.album ?? [])
      .map((img) => imageUrl(img, 1200))
      .filter((u): u is string => Boolean(u));
    return {
      id: g.id,
      type: g.type,
      caption: g.caption,
      year: g.year ?? "",
      tag: g.tag ?? "",
      src: isVideo ? g.videoUrl ?? "" : still ?? "",
      poster: isVideo ? still : undefined,
      album: album.length ? album : undefined,
    };
  });
}

/** Two sets for the image-scatter preview (heading + scattered photos),
 *  derived from the gallery so editors never touch it directly. */
export function scatterSetsFrom(
  gallery: GalleryItem[]
): { heading: string; images: string[] }[] {
  const photos = gallery.filter((g) => g.type === "photo").map((g) => g.src);
  const awards = gallery.filter((g) => g.type === "award").map((g) => g.src);
  return [
    { heading: "On the ground", images: photos.slice(0, 5) },
    { heading: "Recognitions", images: [...awards, ...photos].slice(0, 5) },
  ];
}
