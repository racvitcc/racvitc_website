"use client";

/**
 * Client boundary for the embedded Studio. Importing `sanity.config` (and thus
 * the whole `sanity` library) here — rather than in the Server Component page —
 * keeps it out of the RSC graph, where some of Sanity's deps resolve to
 * react-server builds that break the compile.
 */
import { NextStudio } from "next-sanity/studio";

import config from "../../../../sanity.config";

export default function Studio() {
  return <NextStudio config={config} />;
}
