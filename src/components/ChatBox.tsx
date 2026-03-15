"use client";
import { useState, useRef, useEffect } from "react";

type Message = { role: "user" | "bot"; text: string };

export function ChatBox() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "bot", text: "Hey! Ask me anything about the 2026 Oscars — nominees, predictions, or all the drama ☕" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setMessages(m => [...m, { role: "user", text: userMsg }]);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history: messages }),
      });
      const data = await res.json();
      setMessages(m => [...m, { role: "bot", text: data.reply }]);
    } catch {
      setMessages(m => [...m, { role: "bot", text: "Something went wrong. Try again!" }]);
    }
    setLoading(false);
  }

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#D4AF37] text-black text-2xl shadow-lg hover:bg-[#F5D76E] transition-colors flex items-center justify-center"
        aria-label="Open OscarBot"
      >
        {open ? "✕" : "🎬"}
      </button>

      {/* Chat popup */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 md:w-96 rounded-xl overflow-hidden shadow-2xl border border-[#2A2A2A] flex flex-col"
          style={{ height: "460px", backgroundColor: "#141414" }}>

          {/* Header */}
          <div className="px-4 py-3 border-b border-[#2A2A2A] flex items-center gap-2"
            style={{ backgroundColor: "#0A0A0A" }}>
            <span className="text-[#D4AF37] text-lg">🏆</span>
            <div>
              <p className="text-sm font-semibold text-[#F0EDE8]">OscarBot</p>
              <p className="text-xs text-[#888888]">98th Academy Awards · Live</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div key={i} className={`text-sm px-3 py-2 rounded-lg max-w-[85%] leading-relaxed ${
                m.role === "user"
                  ? "ml-auto bg-[#D4AF37] text-black font-medium"
                  : "bg-[#1E1E1E] text-[#F0EDE8]"
              }`}>
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="bg-[#1E1E1E] text-[#888888] text-sm px-3 py-2 rounded-lg w-16 animate-pulse">
                ...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="px-3 py-3 border-t border-[#2A2A2A] flex gap-2"
            style={{ backgroundColor: "#0A0A0A" }}>
            <input
              suppressHydrationWarning
              className="flex-1 bg-[#1E1E1E] border border-[#2A2A2A] rounded-lg px-3 py-2 text-sm text-[#F0EDE8] placeholder-[#555555] focus:outline-none focus:border-[#D4AF37] transition-colors"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask about nominees, odds, drama..."
              disabled={loading}
            />
            <button
              onClick={send}
              disabled={loading}
              className="bg-[#D4AF37] hover:bg-[#F5D76E] disabled:opacity-50 text-black font-semibold text-sm px-3 py-2 rounded-lg transition-colors"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}