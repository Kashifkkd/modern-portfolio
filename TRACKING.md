# Outreach link tracking

Each outreach email carries two links with an opaque per-company code (no company name in the URL):

- Portfolio: `https://kashif-portfolio.vercel.app/?ref=<code>` → page loads normally; `RefTracker` beacons `/api/t` → logs `portfolio_open`
- Resume: `https://kashif-portfolio.vercel.app/resume?ref=<code>` → logs `resume_open`, then serves `/Kashif-Deshmukh-Resume.pdf`

`<code>` = first 6 hex chars of sha256(lead id tail), e.g. lead `20261020-r10-appfront` → tail `appfront`.
Python: `hashlib.sha256(b"appfront").hexdigest()[:6]`. `src/lib/track.ts` maps the code back to the lead.

See opens on the /autopilot lead timeline (ap_events types resume_open / portfolio_open, with company, country, user agent) and in Vercel → Analytics → Events (Pro plan).
Email security scanners sometimes open links automatically; those rows say "likely link scanner".
The older /cv/<slug> and /p/<slug> routes still work for drafts sent before this change.

Deploy: commit and push; Vercel needs SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL) and SUPABASE_SERVICE_ROLE_KEY (already set for /autopilot).
