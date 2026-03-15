# 🎬 Oscars 2026 — Catch-Up Guide

A sleek, real-time web app covering everything you need to know before the **98th Academy Awards** ceremony on March 15, 2026.

🔗 **Live:** [oscars2026.vercel.app](https://oscars2026.vercel.app)

---

## Features

- 🏆 **All 20+ Oscar categories** with nominees, win probabilities, and predicted winners
- 🎬 **TMDB film posters** on every Best Picture and Director card
- 👑 **Winner glow** — predicted winners pulse with a gold border animation
- 🎉 **Confetti burst** — click any predicted winner card to celebrate
- ⏱️ **Live countdown** to the 4PM PT ceremony
- 📡 **Scrolling stat ticker** with key facts and predictions
- 🗂️ **Sticky category tabs** — jump between sections instantly
- 📰 **Live news feed** via Tavily — pulls latest Oscar coverage from Variety, THR, Deadline
- ☕ **The Tea** — drama feed covering snubs, controversies, and surprises
- 🤖 **AI Chatbox** — ask anything about the Oscars, powered by Groq

---

## Tech Stack

- [Next.js 15](https://nextjs.org/) — App Router
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Groq API](https://groq.com/) — AI chatbox (llama-3)
- [Tavily API](https://tavily.com/) — live news search
- [TMDB API](https://themoviedb.org/) — film posters
- [canvas-confetti](https://github.com/catdad/canvas-confetti) — confetti burst
- Deployed on [Vercel](https://vercel.com/)

---

## Getting Started

```bash
git clone https://github.com/ss1705/oscars2026.git
cd oscars2026
npm install

Create a `.env.local` file:

```
GROQ_API_KEY=your_groq_key
TAVILY_API_KEY=your_tavily_key
TMDB_TOKEN=your_tmdb_token
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Data

All nominee data, win probabilities, and drama items live in:

- `src/data/nominees.json` — all categories and nominees
- `src/data/drama.json` — The Tea drama feed

---

## License

MIT — built for fun the night before the Oscars 🍿
