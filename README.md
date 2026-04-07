# 🏆 Oscars 2026 — Predictions, Drama & OscarBot

An interactive web app for the 98th Academy Awards featuring live predictions,
behind-the-scenes drama, and an AI-powered chatbot that knows everything about
the 2026 Oscars.

🔗 **Live Site:** [https://oscars-guide.vercel.app/](https://oscars-guide.vercel.app/)

---

## Features

- 🎬 **Nominees & Predictions** — Browse all major categories with win
  probabilities and predicted winners
- ☕ **Drama Board** — Controversies, snubs, and behind-the-scenes tea from
  this year's awards season
- 🤖 **OscarBot** — An AI chatbot powered by Groq (Llama 3.3 70B) that answers
  questions about nominees, plots, predictions, and Oscar drama in real time
  using Wikipedia and DuckDuckGo

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Styling | Tailwind CSS |
| AI Model | Llama 3.3 70B via Groq API |
| LLM Orchestration | LangChain.js |
| Tools | Wikipedia API, DuckDuckGo Search |
| Deployment | Vercel |

---

## OscarBot

OscarBot is a witty, opinionated cinephile assistant built with LangChain's
tool-calling pipeline on top of Groq's Llama 3.3 70B model.

**How it works:**
1. User sends a message via the chat UI
2. The model decides whether to call a tool (Wikipedia for film/cast details,
   DuckDuckGo for news and current events)
3. If a tool is called, the result is fed back into the model as context
4. The model responds naturally — no technical jargon, no process narration

**Data sources:**
- `nominees.json` — All nominated films, predicted winners, and win
  probabilities per category
- `drama.json` — Curated controversies and headlines from the 2026 awards
  season
- Wikipedia — Real-time plot and cast lookups
- DuckDuckGo — Real-time news and precursor award results

---

## Project Structure
├── src/ \
│ ├── app/ \
│ │ ├── page.tsx # Main page \
│ │ └── api/ \
│ │ └── chat/ \
│ │ └── route.ts # OscarBot API endpoint \
│ ├── components/ \
│ │ └── ChatBox.tsx # Chat UI component \
│ └── data/ \
│ ├── nominees.json # Nominees + predictions data \
│ └── drama.json # Drama + controversies data \
├── public/ \
└── ... \

---

## Getting Started

### Prerequisites
- Node.js 18+
- A [Groq API key](https://console.groq.com)

### Installation

```bash
git clone https://github.com/ss1705/oscars-2026.git
cd oscars-2026
npm install
```

### Environment Variables

Create a `.env.local` file:
GROQ_API_KEY=your_groq_api_key_here


### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment

Deployed on Vercel. To deploy your own:

1. Push to GitHub
2. Import the repo on [vercel.com](https://vercel.com)
3. Add `GROQ_API_KEY` to Environment Variables
4. Deploy

---

## Author

Built by Shwetha Sadanand for the 98th Academy Awards (2026).
