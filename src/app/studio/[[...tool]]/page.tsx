/**
 * Embedded Sanity Studio, served at /studio. The Studio UI itself lives in the
 * client `Studio` component; this Server Component only sets metadata and
 * renders it. It's kept out of the marketing-site chrome (see SiteChrome).
 */
import Studio from "./Studio";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <Studio />;
}
