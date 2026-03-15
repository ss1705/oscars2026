"use client";
import { useEffect, useState } from "react";

const CEREMONY = new Date("2026-03-15T23:00:00Z");

function getTimeLeft() {
  const diff = CEREMONY.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    hours: Math.floor(diff / 1000 / 60 / 60),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown() {
  const [time, setTime] = useState<ReturnType<typeof getTimeLeft>>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeLeft());
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  // Don't render anything until client is mounted
  if (!mounted) return (
    <div className="flex items-center justify-center gap-6 my-6">
      {["hrs", "min", "sec"].map(label => (
        <div key={label} className="flex flex-col items-center">
          <span className="text-4xl font-bold text-[#D4AF37] tabular-nums">--</span>
          <span className="text-xs text-[#555555] uppercase tracking-widest mt-1">{label}</span>
        </div>
      ))}
    </div>
  );

  if (!time) return (
    <p className="text-center text-[#D4AF37] font-bold tracking-widest text-sm uppercase animate-pulse">
      🎬 The ceremony is live right now!
    </p>
  );

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="flex items-center justify-center gap-6 my-6">
      {([["hrs", time.hours], ["min", time.minutes], ["sec", time.seconds]] as const).map(([label, val]) => (
        <div key={label} className="flex flex-col items-center">
          <span className="text-4xl font-bold text-[#D4AF37] tabular-nums">{pad(val)}</span>
          <span className="text-xs text-[#555555] uppercase tracking-widest mt-1">{label}</span>
        </div>
      ))}
    </div>
  );
}