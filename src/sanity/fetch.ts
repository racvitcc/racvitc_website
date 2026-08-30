import "server-only";

import type { QueryParams } from "@sanity/client";

import { client } from "./client";

// The Sanity webhook (/api/revalidate) busts cache tags the instant an editor
// publishes. This time-based value is only a safety net so content still
// refreshes even before the webhook is wired up.
const REVALIDATE_SECONDS = 60;

/** Server-only tagged fetch. Results land in Next's Data Cache under `tags`,
 *  so on-demand revalidation can invalidate them precisely. */
export async function sanityFetch<T>(
  query: string,
  { params = {}, tags = [] }: { params?: QueryParams; tags?: string[] } = {}
): Promise<T> {
  return client.fetch<T>(query, params, {
    next: { revalidate: REVALIDATE_SECONDS, tags },
  });
}
