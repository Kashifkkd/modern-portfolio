import { NextRequest, NextResponse } from "next/server";
import { logOpen } from "@/lib/track";

// Beacon from RefTracker when the portfolio is opened with ?ref=<code>.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
  await logOpen(req, "portfolio_open", typeof body.ref === "string" ? body.ref : null);
  return new NextResponse(null, { status: 204 });
}
