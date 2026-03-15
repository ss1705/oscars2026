import { NextRequest, NextResponse } from "next/server";
import { ChatGroq } from "@langchain/groq";
import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";
import { DuckDuckGoSearch } from "@langchain/community/tools/duckduckgo_search";
import nominees from "@/data/nominees.json";
import drama from "@/data/drama.json";
import { HumanMessage, AIMessage, SystemMessage } from "@langchain/core/messages";

const wikipedia = new WikipediaQueryRun({ topKResults: 1, maxDocContentLength: 2000 });
const duckduckgo = new DuckDuckGoSearch({ maxResults: 3 });
const tools = [wikipedia, duckduckgo];

const SYSTEM_PROMPT = `
You are OscarBot, a witty and passionate cinephile assistant for the 2026 Oscars (98th Academy Awards).
You love movies and love talking about them. You have strong opinions and aren't afraid to share them.

You have this base data available:
NOMINEES & PREDICTIONS: ${JSON.stringify(nominees, null, 2).replace(/\{/g, "{{").replace(/\}/g, "}}")}
DRAMA & CONTROVERSIES: ${JSON.stringify(drama, null, 2).replace(/\{/g, "{{").replace(/\}/g, "}}")}

Rules:
- For win probabilities and predictions, use the base data above.
- ALWAYS use the Wikipedia tool immediately when asked for any plot, cast, or film details.
- ALWAYS use DuckDuckGo for news, controversy, or current events questions.
- If Wikipedia returns less than 500 characters, supplement with DuckDuckGo automatically.
- If no detailed plot exists, say so naturally and suggest checking IMDb — don't loop or hedge.
- When asked for an IMDb link, always respond with: https://www.imdb.com/find?q=[FILM TITLE] — construct the URL yourself by replacing spaces with + signs. Never try to search for it.
- NEVER mention tools, Wikipedia, DuckDuckGo, or any technical process in your response. Just answer naturally as if you know it.
- NEVER say "I can try", "would you like me to", or "the tool result says". Just answer.
- Never make up plot details beyond what you find.
- Be warm, witty, and opinionated — like a film-obsessed friend. But keep it chill, not over the top.
- When asked WHY someone is predicted to win, reason intelligently: consider their win probability, the precursor awards circuit (SAGs, BAFTAs, Critics Choice, Golden Globes), the Academy's historical preferences, and the competition. Use DuckDuckGo to find recent precursor wins if needed.
- Never say "it's not explicitly stated" or "I don't have that info" — form an opinion like a real film critic would.
- No terms of endearment. No "honey", "darling", etc.
- Keep answers concise unless the user explicitly asks for detail.
- Remember the conversation history and use it for follow-up questions.
`;

type Message = { role: string; text: string };

function buildHistory(history: Message[]) {
  return (history || [])
    .filter(m => m.text !== "Hey! Ask me anything about the 2026 Oscars — nominees, predictions, or all the drama ☕")
    .map(m => m.role === "user" ? new HumanMessage(m.text) : new AIMessage(m.text));
}

export async function POST(req: NextRequest) {
  const { message, history } = await req.json();
  const historyMessages = buildHistory(history || []);

  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
    temperature: 0.7,
  }).bindTools(tools);

  const allMessages = [
    new SystemMessage(SYSTEM_PROMPT.replace(/\{\{/g, "{").replace(/\}\}/g, "}")),
    ...historyMessages,
    new HumanMessage(message),
  ];

  let response = await model.invoke(allMessages);

  if (response.tool_calls && response.tool_calls.length > 0) {
    const toolCall = response.tool_calls[0];
    let toolResult = "";

    if (toolCall.name === "wikipedia-api") {
      try {
      toolResult = await wikipedia.invoke(toolCall.args.query ?? toolCall.args.input);
      if (toolResult.length < 500) {
        try {
              const ddgResult = await duckduckgo.invoke(
        `${toolCall.args.query ?? toolCall.args.input} film plot 2026`
      );
      toolResult += "\n\nAdditional info:\n" + ddgResult;
    }  
    catch { }
  }
}
    catch(e) {
      toolResult = "No detailed plot found.";
    }
  } else if (toolCall.name === "duckduckgo-search") {
    try {
      toolResult = await duckduckgo.invoke(toolCall.args.query ?? toolCall.args.input);
    } 
    catch { toolResult = "Search temporarily unavailable."; }
  }

    const plainModel = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama-3.3-70b-versatile",
      temperature: 0.7,
    });

    const finalMessages = [
      new SystemMessage(SYSTEM_PROMPT.replace(/\{\{/g, "{").replace(/\}\}/g, "}")),
      ...historyMessages,
      new HumanMessage(message),
      new AIMessage(`Tool result from ${toolCall.name}: ${toolResult}`),
      new HumanMessage("Based on the above tool result, please answer my original question."),
    ];

    response = await plainModel.invoke(finalMessages);
  }

  const reply = typeof response.content === "string" 
  ? response.content 
  : Array.isArray(response.content)
    ? response.content.filter((c: any) => c.type === "text").map((c: any) => c.text).join("")
    : "";

  return NextResponse.json({ reply });
}