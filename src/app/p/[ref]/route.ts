import { NextRequest, NextResponse } from "next/server";
import { logOpen } from "@/lib/track";

// /p/<ref> -> logs a portfolio visit for that outreach ref, then opens the portfolio home page.
export async function GET(req: NextRequest, { params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params;
  await logOpen(req, "portfolio_open", ref);
  const dest = new URL("/", req.url);
  dest.searchParams.set("utm_source", ref);
  dest.searchParams.set("utm_medium", "email");
  return NextResponse.redirect(dest, 302);
}
