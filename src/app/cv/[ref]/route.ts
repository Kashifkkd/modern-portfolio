import { NextRequest, NextResponse } from "next/server";
import { logOpen } from "@/lib/track";

// /cv/<ref> -> logs a resume open for that outreach ref, then serves the resume PDF.
export async function GET(req: NextRequest, { params }: { params: Promise<{ ref: string }> }) {
  const { ref } = await params;
  await logOpen(req, "resume_open", ref);
  return NextResponse.redirect(new URL("/Kashif-Deshmukh-Resume.pdf", req.url), 302);
}
