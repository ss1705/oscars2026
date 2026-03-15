"use client";
import { useState, useEffect } from "react";

const TABS = [
  { label: "🎬 Best Picture", href: "best-picture" },
  { label: "🎭 Acting", href: "acting" },
  { label: "🎥 Directing", href: "directing" },
  { label: "✏️ Screenplay", href: "screenplay" },
  { label: "🌍 Other Categories", href: "other-categories" },
  { label: "🏆 Technical", href: "technical" },
  { label: "📰 News", href: "news" },
  { label: "☕ The Tea", href: "the-tea" },
];

export function CategoryTabs() {
  const [active, setActive] = useState("best-picture");

  useEffect(() => {
    const sections = TABS.map(t => document.getElementById(t.href)).filter(Boolean);
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach(s => observer.observe(s!));
    return () => observer.disconnect();
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  }

  return (
    <div className="sticky top-0 z-50 bg-[#0D0D0D]/90 backdrop-blur-sm border-b border-[#2A2A2A] mb-10">
    <div className="max-w-6xl mx-auto px-4 relative">
      {/* Fade edge hint */}
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0D0D0D] to-transparent z-10 pointer-events-none" />
      <div className="flex gap-1 overflow-x-auto scrollbar-none py-3 pr-8">
        {TABS.map(tab => (
          <button
            key={tab.href}
            onClick={() => scrollTo(tab.href)}
            className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
              ${active === tab.href
                ? "bg-[#D4AF37] text-[#0D0D0D]"
                : "text-[#555555] hover:text-[#F0EDE8] hover:bg-[#1A1A1A]"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  </div>
  );
}