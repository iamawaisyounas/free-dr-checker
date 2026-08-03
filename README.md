# Free DR Checker

A small free Domain Rating checker powered by the Ahrefs free Domain Rating API.

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

New bulk tool endpoints:

```text
POST /api/tools/domain-age
POST /api/tools/authority-score
```

Both accept JSON in the shape:

```json
{ "domains": ["github.com", "google.com"] }
```

Required Vercel environment variables for the new tools:

```text
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

The official docs define `target` as the required domain or URL parameter and `output` as the optional response format. No Ahrefs API key is required for this free endpoint.

## Deploy to Vercel

This project includes a Vercel serverless function at:

```text
api/dr-checker.js
```

Deploy with:

```bash
npx vercel --prod
```

Or import this GitHub repository from the Vercel dashboard:

```text
https://github.com/iamawaisyounas/free-dr-checker
```

Use these Vercel settings:

```text
Framework Preset: Other
Build Command: empty
Output Directory: public
Install Command: npm install
```

The public frontend will be served from `public/`, and the frontend will call the production API at:

```text
/api/dr-checker?domain=socialbu.com
```
