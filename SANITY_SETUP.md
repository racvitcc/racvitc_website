# Sanity CMS — setup & editor guide

The **Events**, **Projects**, and **Gallery** sections are managed in Sanity.
Everything else on the site is still edited in code.

- **Project ID:** `76uynjq8`
- **Manage dashboard:** https://www.sanity.io/manage/project/76uynjq8
- **Editor login (once deployed):** `https://<your-site>/studio`

---

## 1. One-time setup (developer)

### Environment variables
Copy the values into `.env.local` (already git-ignored). Get the tokens from
the dashboard → **API → Tokens**.

| Variable | Public? | Value |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes | `76uynjq8` |
| `NEXT_PUBLIC_SANITY_DATASET` | yes | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | yes | `2024-10-01` |
| `SANITY_API_READ_TOKEN` | **secret** | a **Viewer** token |
| `SANITY_API_WRITE_TOKEN` | **secret** | an **Editor** token (migration only; delete after) |
| `SANITY_REVALIDATE_SECRET` | **secret** | pre-generated random string (also goes in the webhook) |

### CORS origins (dashboard → API → CORS origins, "Allow credentials" ✓)
- `http://localhost:3000`
- your production URL, e.g. `https://racvitc.vercel.app`

### Migrate existing content into Sanity (one time)
```bash
npx tsx scripts/migrate-to-sanity.ts
```
Uploads the current events/projects/gallery and their `public/` images/videos as
Sanity assets. Safe to re-run (upserts by a stable id).

---

## 2. Deploy (Vercel)
Add the same 6 env vars in **Vercel → Project → Settings → Environment Variables**
(Production + Preview). Redeploy.

### Webhook so edits go live automatically
Dashboard → **API → Webhooks → Create webhook**:
- **URL:** `https://<your-site>/api/revalidate`
- **Dataset:** `production`
- **Trigger on:** Create, Update, Delete
- **Filter:** `_type in ["event","project","galleryItem"]`
- **Secret:** the value of `SANITY_REVALIDATE_SECRET`
- **HTTP method:** POST · **API version:** `v2024-10-01`

---

## 3. For editors (non-technical)
1. Go to `https://<your-site>/studio` and log in with the email you were invited on.
2. Pick **Events**, **Projects**, or **Gallery** in the left sidebar.
3. Add/edit an entry, upload photos or videos, then press **Publish**.
4. The website updates within a minute — no code, no redeploy.

Invite editors: dashboard → **Members → Invite** (role: **Editor**).
