/**
 * One-time import of the site's original Events / Projects / Gallery content
 * into Sanity, uploading each referenced public/ image and video as an asset.
 *
 *   npx tsx scripts/migrate-to-sanity.ts
 *
 * Reads config + SANITY_API_WRITE_TOKEN from .env.local. Idempotent: documents
 * use deterministic ids and are createOrReplace'd, and each asset file is
 * uploaded only once per run. Missing files are skipped with a warning.
 */
import { createReadStream, existsSync } from "node:fs";
import { randomUUID } from "node:crypto";
import path from "node:path";

import { createClient } from "@sanity/client";

import { seedEvents, seedGallery, seedProjects } from "./seed-data";

// Load .env.local (Node 20.12+/22). Cast: not in older @types/node.
try {
  (process as unknown as { loadEnvFile: (p: string) => void }).loadEnvFile(
    ".env.local"
  );
} catch {
  // env may already be present in the environment; continue.
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env. Need NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET and SANITY_API_WRITE_TOKEN in .env.local"
  );
  process.exit(1);
}

const client = createClient({ projectId, dataset, apiVersion, token, useCdn: false });

const PUBLIC_DIR = path.join(process.cwd(), "public");
const assetCache = new Map<string, string>(); // absolute path -> asset _id

type ImageValue = {
  _type: "image";
  _key?: string;
  asset: { _type: "reference"; _ref: string };
};
type FileValue = {
  _type: "file";
  asset: { _type: "reference"; _ref: string };
};

async function uploadAsset(
  kind: "image" | "file",
  publicPath: string
): Promise<string | null> {
  const full = path.join(PUBLIC_DIR, publicPath.replace(/^\//, ""));
  if (!existsSync(full)) {
    console.warn(`  ⚠ skip missing file: ${publicPath}`);
    return null;
  }
  if (assetCache.has(full)) return assetCache.get(full)!;
  const asset = await client.assets.upload(kind, createReadStream(full), {
    filename: path.basename(full),
  });
  assetCache.set(full, asset._id);
  console.log(`  ↑ ${kind}: ${publicPath}`);
  return asset._id;
}

async function imageValue(
  publicPath: string,
  withKey = false
): Promise<ImageValue | null> {
  const id = await uploadAsset("image", publicPath);
  if (!id) return null;
  return {
    _type: "image",
    ...(withKey ? { _key: randomUUID() } : {}),
    asset: { _type: "reference", _ref: id },
  };
}

async function imageArray(paths: string[]): Promise<ImageValue[]> {
  const out: ImageValue[] = [];
  for (const p of paths) {
    const v = await imageValue(p, true);
    if (v) out.push(v);
  }
  return out;
}

async function fileValue(publicPath: string): Promise<FileValue | null> {
  const id = await uploadAsset("file", publicPath);
  if (!id) return null;
  return { _type: "file", asset: { _type: "reference", _ref: id } };
}

async function migrateEvents() {
  console.log(`\nEvents (${seedEvents.length})`);
  for (const e of seedEvents) {
    console.log(`• ${e.title}`);
    const images = await imageArray(e.images);
    await client.createOrReplace({
      _id: `event-${e.id}`,
      _type: "event",
      title: e.title,
      slug: { _type: "slug", current: e.id },
      date: e.date,
      time: e.time,
      location: e.location,
      description: e.description,
      type: e.type,
      images,
    });
  }
}

async function migrateProjects() {
  console.log(`\nProjects (${seedProjects.length})`);
  for (const p of seedProjects) {
    console.log(`• ${p.name}`);
    await client.createOrReplace({
      _id: `project-${p.slug}`,
      _type: "project",
      name: p.name,
      slug: { _type: "slug", current: p.slug },
      order: p.order,
      tagline: p.tagline,
      paragraphs: p.paragraphs,
      images: await imageArray(p.images),
      sceneImages: await imageArray(p.sceneImages),
      stats: p.stats.map((s) => ({ _type: "stat", _key: randomUUID(), ...s })),
    });
  }
}

async function migrateGallery() {
  console.log(`\nGallery (${seedGallery.length})`);
  for (let i = 0; i < seedGallery.length; i++) {
    const g = seedGallery[i];
    console.log(`• ${g.caption}`);
    const doc: Record<string, unknown> = {
      _id: `gallery-${i}`,
      _type: "galleryItem",
      type: g.type,
      caption: g.caption,
      year: g.year,
      tag: g.tag,
      order: i,
    };
    if (g.image) {
      const img = await imageValue(g.image);
      if (img) doc.image = img;
    }
    if (g.type === "video" && g.video) {
      const file = await fileValue(g.video);
      if (file) doc.video = file;
    }
    await client.createOrReplace(doc as never);
  }
}

async function main() {
  console.log(`Migrating into Sanity project ${projectId} / ${dataset}`);
  await migrateEvents();
  await migrateProjects();
  await migrateGallery();
  console.log("\n✅ Done. Open /studio to review, then publish is automatic (createOrReplace writes published docs).");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
