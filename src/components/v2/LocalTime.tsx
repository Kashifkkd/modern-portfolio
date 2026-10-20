"use client";
import { useEffect, useState } from "react";
import { profile } from "@/lib/site";

/** Live clock in Kashif's timezone, so a client knows when a reply is likely. */
export default function LocalTime({ className = "" }: { className?: string }) {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: profile.timezone });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={`font-mono tabular-nums ${className}`} suppressHydrationWarning>
      {time ? `${time} ${profile.tzLabel}` : " "}
    </span>
  );
}
