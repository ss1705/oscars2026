export function StatTicker() {
  const facts = [
    "🎬 Sinners leads with a record 16 nominations",
    "🏆 Jessie Buckley is 95% predicted to win Best Actress",
    "🎙️ Conan O'Brien hosting the 98th Academy Awards",
    "👻 First horror film ever to lead Oscar nominations",
    "⭐ One Battle After Another is 69% favored for Best Picture",
    "🧙‍♀️ Wicked: For Good received zero nominations",
    "🎭 Paul Mescal snubbed for Best Actor despite rave reviews",
  ];

  const repeated = [...facts, ...facts]; // seamless loop

  return (
    <div className="overflow-hidden border-y border-[#2A2A2A] py-2 mb-10 bg-[#0D0D0D]">
      <div className="flex animate-ticker whitespace-nowrap">
        {repeated.map((fact, i) => (
          <span key={i} className="text-xs sm:text-sm text-[#888888] mx-6 sm:mx-8 shrink-0">
            {fact}
            <span className="text-[#2A2A2A] ml-8">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}