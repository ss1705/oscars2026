import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://api.tavily.com/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
      api_key: process.env.TAVILY_API_KEY,
      query: "2026 Oscars Academy Awards nominees predictions winners film",
      search_depth: "basic",
      max_results: 6,
      include_domains: [
        "variety.com",
        "hollywoodreporter.com",
        "deadline.com",
        "indiewire.com",
        "rogerebert.com",
        "rottentomatoes.com"
      ],
      exclude_domains: [
        "nytimes.com",
        "bbc.com",
        "cnn.com",
        "foxnews.com",
        "politico.com",
        "theguardian.com"
      ]
      }),
    });
    const data = await res.json();
    return NextResponse.json(data.results ?? []);
  } catch {
    return NextResponse.json([]);
  }
}