import "server-only";
import { createHash } from "crypto";
import { NextRequest } from "next/server";
import { track } from "@vercel/analytics/server";

// Outreach links look like  /?ref=k3f9a2  and  /resume?ref=k3f9a2
// The ref is an opaque 6-char code: first 6 hex chars of sha256(<lead id tail>), e.g. tail "appfront".
// Opens are written to Supabase ap_events (shown on the /autopilot lead timeline) and sent to Vercel Analytics.
// Never throws: visitors are always served even if logging fails.
const BOT = /bot|crawl|spider|preview|scanner|safelinks|proofpoint|mimecast|barracuda|headless|python|curl|wget/i;
export const refCode = (tail: string) => createHash("sha256").update(tail).digest("hex").slice(0, 6);

export async function logOpen(req: NextRequest, kind: "resume_open" | "portfolio_open", rawRef: string | null) {
  const ref = (rawRef ?? "").toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 12);
  if (!ref) return;
  const ua = req.headers.get("user-agent") ?? "";
  const likelyBot = BOT.test(ua);
  const country = req.headers.get("x-vercel-ip-country") ?? "";
  const city = decodeURIComponent(req.headers.get("x-vercel-ip-city") ?? "");
  try { await track(kind, { ref, bot: likelyBot ? "yes" : "no" }, { headers: req.headers }); } catch {}

  const url = (process.env.NEXT_PUBLIC_SUPABASE_URL ?? process.env.SUPABASE_URL)?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;
  const h = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
  try {
    const r = await fetch(`${url}/rest/v1/ap_leads?select=id,company&order=found_at.desc&limit=2000`, { headers: h, cache: "no-store" });
    const leads = r.ok ? ((await r.json()) as { id: string; company: string | null }[]) : [];
    const lead = leads.find(l => refCode(l.id.split("-").slice(2).join("-")) === ref);
    const detail = `${lead?.company ?? "unknown ref"} (ref=${ref})${likelyBot ? " likely link scanner" : ""}${country ? ` from ${city ? city + ", " : ""}${country}` : ""} | ${ua.slice(0, 120)}`;
    await fetch(`${url}/rest/v1/ap_events`, {
      method: "POST", headers: { ...h, Prefer: "return=minimal" }, cache: "no-store",
      body: JSON.stringify({ lead_id: lead?.id ?? null, type: kind, detail }),
    });
  } catch {}
}
