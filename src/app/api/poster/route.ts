import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const title = req.nextUrl.searchParams.get("title");
  if (!title) return NextResponse.json({ poster: null });

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&year=2025`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  const data = await res.json();
  const poster = data.results?.[0]?.poster_path ?? null;
  return NextResponse.json({ poster });
}