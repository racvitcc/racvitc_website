import { createImageUrlBuilder } from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

import { dataset, projectId } from "./env";

const builder = createImageUrlBuilder({ projectId, dataset });

/** Build a Sanity CDN URL for an image source (from a GROQ-projected image
 *  field). Auto-format + reasonable default width; callers can chain more. */
export function urlFor(source: SanityImageSource) {
  return builder.image(source).auto("format").fit("max");
}

/** Resolve an image source to a plain URL string, or `undefined` when absent
 *  (so downstream <Placeholder> components fall back cleanly). */
export function imageUrl(
  source: SanityImageSource | null | undefined,
  width = 1600
): string | undefined {
  if (!source) return undefined;
  return urlFor(source).width(width).url();
}
