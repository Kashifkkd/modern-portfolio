"use client";
import { useEffect } from "react";

// Logs a portfolio visit once per tab when the page is opened with ?ref=<code>.
export default function RefTracker() {
  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (!ref) return;
    try {
      if (sessionStorage.getItem("ref_logged") === ref) return;
      sessionStorage.setItem("ref_logged", ref);
    } catch {}
    const body = JSON.stringify({ ref });
    if (!navigator.sendBeacon?.("/api/t", new Blob([body], { type: "application/json" }))) {
      fetch("/api/t", { method: "POST", body, headers: { "Content-Type": "application/json" }, keepalive: true }).catch(() => {});
    }
  }, []);
  return null;
}
