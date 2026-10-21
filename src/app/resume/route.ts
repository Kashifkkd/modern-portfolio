import { NextRequest, NextResponse } from "next/server";
import { logOpen } from "@/lib/track";

// /resume?ref=<code> -> logs a resume open, then serves the resume PDF.
export async function GET(req: NextRequest) {
  await logOpen(req, "resume_open", req.nextUrl.searchParams.get("ref"));
  return NextResponse.redirect(new URL("/Kashif-Deshmukh-Resume.pdf", req.url), 302);
}
