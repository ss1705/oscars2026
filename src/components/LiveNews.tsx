"use client";
import { useEffect, useState } from "react";

type NewsItem = {
  title: string;
  url: string;
  content: string;
  published_date?: string;
};

function getDomain(url: string) {
  try { return new URL(url).hostname.replace("www.", ""); }
  catch { return ""; }
}

export function LiveNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news")
      .then(r => r.json())
      .then(data => { setNews(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="space-y-3">
      {[1, 2, 3].map(i => (
        <div key={i} className="surface rounded-lg p-4 animate-pulse h-20" />
      ))}
    </div>
  );

  if (news.length === 0) return (
    <p className="text-[#555555] text-sm">No news available right now. Check back soon.</p>
  );

  return (
    <div className="space-y-3">
      {news.map((item, i) => (
        <a
          key={i}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="surface rounded-lg p-4 flex items-start gap-3 hover:border-[#D4AF37] transition-colors group block"
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-[#F0EDE8] group-hover:text-[#D4AF37] transition-colors leading-snug mb-1">
              {item.title}
            </p>
            <p className="text-xs text-[#555555] line-clamp-2 mb-2">{item.content}</p>
            <span className="text-xs text-[#444444]">{getDomain(item.url)}</span>
          </div>
          <span className="text-[#555555] group-hover:text-[#D4AF37] transition-colors text-lg shrink-0 mt-0.5">→</span>
        </a>
      ))}
    </div>
  );
}