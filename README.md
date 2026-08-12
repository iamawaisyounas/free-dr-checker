# Free DR Checker

A small free Domain Rating checker powered by the Ahrefs Domain Rating API. Ahrefs now requires a free APIv3 key for the public Domain Rating endpoint, so production must have `AHREFS_API_KEY` configured server-side.

Live URL:

```text
https://ahrefs-dr-checker-dusky.vercel.app
```

Official Ahrefs reference:

```text
https://docs.ahrefs.com/en/api/reference/public/get-domain-rating-free
```

## Run locally

```bash
npm start
```

Then open:

```text
http://localhost:3000
```

## API

The frontend calls the local backend only:

```text
GET /api/dr-checker?domain=socialbu.com
```

Bulk tool endpoints:

```text
POST /api/dr-checker
POST /api/tools/domain-age
POST /api/tools/authority-score
```

Public tool pages:

```text
/
/bulk-dr-checker
/domain-authority-checker
/domain-age-checker
/google-serp-simulator
```

Both accept JSON in the shape:

```json
{ "domains": ["github.com", "google.com"] }
```

Required Vercel environment variables for the DR checker and supporting tools:

```text
AHREFS_API_KEY=xxxxx
OPEN_PAGERANK_API_KEY=xxxxx
NEXT_PUBLIC_TURNSTILE_SITE_KEY=xxxxx
TURNSTILE_SECRET=xxxxx
KV_REST_API_URL=auto-injected by Vercel KV/Redis
KV_REST_API_TOKEN=auto-injected by Vercel KV/Redis
CRON_SECRET=optional shared secret for manual quota checks
ALERT_WEBHOOK_URL=optional Slack-compatible alert webhook
```

Required Vercel environment variables for the contact form:

```text
RESEND_API_KEY=xxxxx
CONTACT_FROM_EMAIL=DR Checker <support@dr-checker.com>
CONTACT_TO_EMAIL=support@dr-checker.com
```

`CONTACT_FROM_EMAIL` must be a sender/domain verified in Resend. The form sends submissions to `CONTACT_TO_EMAIL` and sets the visitor email as the reply-to address.

## Sanity blog CMS

The public blog URLs stay the same:

```text
/blog
/blog/[slug]
```

Sanity Studio is embedded at:

```text
/studio
```

Required Sanity environment variables:

```text
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxx
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=optional, only needed for private datasets
SANITY_REVALIDATE_SECRET=random shared webhook secret
SANITY_WRITE_TOKEN=only needed locally when running the one-time migration script
```

Publishing in Sanity can revalidate the live site through:

```text
POST https://dr-checker.com/api/revalidate
```

Configure that webhook in Sanity with:

```text
Dataset: production
Trigger: Create, Update, Delete
Filter: _type == "post"
Projection: {"slug": slug.current}
Secret: same value as SANITY_REVALIDATE_SECRET
```

The current file-based posts remain as a fallback until Sanity is configured and populated. To migrate them into Sanity with identical slugs:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxx \
NEXT_PUBLIC_SANITY_DATASET=production \
SANITY_WRITE_TOKEN=xxxxx \
npm run sanity:migrate-blog
```

The quota monitor runs daily through `vercel.json` at `/api/internal/quota-check`.

Example response:

```json
{
  "domain": "socialbu.com",
  "dr": 78
}
```

The backend validates and normalizes domains, then calls:

```text
GET https://api.ahrefs.com/v3/public/domain-rating-free?target=socialbu.com&output=json
```

The official docs define `target` as the required domain or URL parameter and `output` as the optional response format. Ahrefs now requires a free APIv3 key sent as `Authorization: Bearer <token>`.

## Deploy to Vercel

Make sure `AHREFS_API_KEY` is set for the Production environment before deploying. The key is used only by the Next.js API route and is never exposed to the browser.

Deploy with:

```bash
npm run build
npx vercel --prod
```

Or import this GitHub repository from the Vercel dashboard:

```text
https://github.com/iamawaisyounas/free-dr-checker
```

Use these Vercel settings:

```text
Framework Preset: Next.js
Build Command: npm run build
Output Directory: .next
Install Command: npm install
```

The frontend calls the production API at:

```text
/api/dr-checker?domain=socialbu.com
```
