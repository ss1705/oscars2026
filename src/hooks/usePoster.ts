import { useEffect, useState } from "react";

export function usePoster(title: string) {
  const [poster, setPoster] = useState<string | null>(null);

  useEffect(() => {
    if (!title) return;
    fetch(`/api/poster?title=${encodeURIComponent(title)}`)
      .then(r => r.json())
      .then(data => {
        if (data.poster) setPoster(`https://image.tmdb.org/t/p/w342${data.poster}`);
      });
  }, [title]);

  return poster;
}