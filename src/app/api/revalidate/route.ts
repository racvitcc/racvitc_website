import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/** Sanity `_type` → the cache tag used by the data fetchers in src/content/*. */
const TYPE_TO_TAG: Record<string, string> = {
  event: "events",
  project: "projects",
  galleryItem: "gallery",
};

/**
 * Sanity webhook target. Configure it in the dashboard (API → Webhooks) with
 * the same secret as SANITY_REVALIDATE_SECRET. On publish/unpublish/delete it
 * invalidates just the affected content tag, so edits go live within seconds.
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 401 });
    }

    const type = body?._type;
    const tag = type ? TYPE_TO_TAG[type] : undefined;
    if (!tag) {
      return NextResponse.json({
        revalidated: false,
        message: `No cache tag mapped for type "${type ?? "unknown"}"`,
      });
    }

    // Second arg (Next 16): stale-while-revalidate window. "max" serves stale
    // content while the fresh version regenerates in the background.
    revalidateTag(tag, "max");
    return NextResponse.json({ revalidated: true, tag, now: Date.now() });
  } catch (err) {
    console.error("Revalidate webhook error:", err);
    return new Response("Error revalidating", { status: 500 });
  }
}
