import nominees from "@/data/nominees.json";
import { FilmCard } from "@/components/FilmCard";
import { LiveNews } from "@/components/LiveNews";
import { DramaFeed } from "@/components/DramaFeed";
import { ChatBox } from "@/components/ChatBox";
import { Countdown } from "@/components/Countdown";
import { StatTicker } from "@/components/StatTicker";
import { CategoryTabs } from "@/components/CategoryTabs";

export default function Home() {
  const bestPicture = nominees.categories.find(c => c.name === "Best Picture");
  const bestActor = nominees.categories.find(c => c.name === "Best Actor");
  const bestActress = nominees.categories.find(c => c.name === "Best Actress");
  const bestSuppActor = nominees.categories.find(c => c.name === "Best Supporting Actor");
  const bestSuppActress = nominees.categories.find(c => c.name === "Best Supporting Actress");
  const bestDirector = nominees.categories.find(c => c.name === "Best Director");
  const bestOrigScreenplay = nominees.categories.find(c => c.name === "Best Original Screenplay");
  const bestAdaptScreenplay = nominees.categories.find(c => c.name === "Best Adapted Screenplay");
  const bestAnimated = nominees.categories.find(c => c.name === "Best Animated Feature");
  const bestInternational = nominees.categories.find(c => c.name === "Best International Feature Film");
  const bestDocFeature = nominees.categories.find(c => c.name === "Best Documentary Feature");
  const bestScore = nominees.categories.find(c => c.name === "Best Original Score");
  const bestCinematography = nominees.categories.find(c => c.name === "Best Cinematography");
  const bestEditing = nominees.categories.find(c => c.name === "Best Film Editing");
  const bestProductionDesign = nominees.categories.find(c => c.name === "Best Production Design");
  const bestCostume = nominees.categories.find(c => c.name === "Best Costume Design");
  const bestMakeup = nominees.categories.find(c => c.name === "Best Makeup & Hairstyling");
  const bestVFX = nominees.categories.find(c => c.name === "Best Visual Effects");
  const bestSound = nominees.categories.find(c => c.name === "Best Sound");
  const bestCasting = nominees.categories.find(c => c.name === "Best Casting");
  const bestSong = nominees.categories.find(c => c.name === "Best Original Song");

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">

      {/* Hero */}
      <div className="text-center mb-8">
        <p className="text-[#D4AF37] text-sm tracking-[0.3em] uppercase mb-3">98th Academy Awards</p>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-[#F0EDE8] tracking-tight mb-4">
          Oscars <span className="text-[#D4AF37]">2026</span>
        </h1>
        <div className="w-24 h-px bg-[#D4AF37] mx-auto mb-4" />
        <p className="text-[#888888] text-lg">Your complete catch-up guide · Hosted by Conan O'Brien</p>
        <p className="text-[#555555] text-sm mt-1">Sunday, March 15 · Dolby Theatre, Hollywood</p>
      </div>

      {/* Countdown */}
      <div className="text-center mb-6">
        <p className="text-xs text-[#555555] uppercase tracking-widest mb-2">Ceremony begins in</p>
        <Countdown />
      </div>

      {/* Stat Ticker */}
      <StatTicker />

      {/* Category Tabs */}
      <CategoryTabs />

      {/* Best Picture — ranked by index */}
      <section id="best-picture" className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-[#F0EDE8]">Best Picture</h2>
          <div className="flex-1 h-px bg-[#2A2A2A]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-3">
          {bestPicture?.nominees.map((n, i) => (
            <FilmCard key={i} nominee={n} rank={i + 1} />
          ))}
        </div>
      </section>

      {/* Acting & Directing */}
      <div id="acting" className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-[#F0EDE8]">Best Actor</h2>
            <div className="flex-1 h-px bg-[#2A2A2A]" />
          </div>
          <div className="space-y-3">
            {bestActor?.nominees.map((n, i) => <FilmCard key={i} nominee={n} isActor />)}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-[#F0EDE8]">Best Actress</h2>
            <div className="flex-1 h-px bg-[#2A2A2A]" />
          </div>
          <div className="space-y-3">
            {bestActress?.nominees.map((n, i) => <FilmCard key={i} nominee={n} isActor />)}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-[#F0EDE8]">Best Supporting Actor</h2>
            <div className="flex-1 h-px bg-[#2A2A2A]" />
          </div>
          <div className="space-y-3">
            {bestSuppActor?.nominees.map((n, i) => <FilmCard key={i} nominee={n} isActor />)}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-[#F0EDE8]">Best Supporting Actress</h2>
            <div className="flex-1 h-px bg-[#2A2A2A]" />
          </div>
          <div className="space-y-3">
            {bestSuppActress?.nominees.map((n, i) => <FilmCard key={i} nominee={n} isActor />)}
          </div>
        </section>
      </div>

      <section id="directing" className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-[#F0EDE8]">Best Director</h2>
          <div className="flex-1 h-px bg-[#2A2A2A]" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bestDirector?.nominees.map((n, i) => <FilmCard key={i} nominee={n} isActor />)}
        </div>
      </section>

      {/* Screenplays */}
      <div id="screenplay" className="grid grid-cols-1 xl:grid-cols-2 gap-12 mb-16">
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-[#F0EDE8]">Best Original Screenplay</h2>
            <div className="flex-1 h-px bg-[#2A2A2A]" />
          </div>
          <div className="space-y-3">
            {bestOrigScreenplay?.nominees.map((n, i) => <FilmCard key={i} nominee={n} isActor />)}
          </div>
        </section>
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-[#F0EDE8]">Best Adapted Screenplay</h2>
            <div className="flex-1 h-px bg-[#2A2A2A]" />
          </div>
          <div className="space-y-3">
            {bestAdaptScreenplay?.nominees.map((n, i) => <FilmCard key={i} nominee={n} isActor />)}
          </div>
        </section>
      </div>

      {/* Animated, International, Documentary */}
      <div id="other-categories" className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {[
          { label: "🎨 Best Animated Feature", data: bestAnimated },
          { label: "🌍 Best International Feature", data: bestInternational },
          { label: "🎥 Best Documentary Feature", data: bestDocFeature },
        ].map(({ label, data }) => (
          <section key={label}>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xl font-bold text-[#F0EDE8]">{label}</h2>
              <div className="flex-1 h-px bg-[#2A2A2A]" />
            </div>
            <div className="space-y-3">
              {data?.nominees.map((n, i) => <FilmCard key={i} nominee={n} isActor />)}
            </div>
          </section>
        ))}
      </div>

      {/* Technical Awards */}
      <section id="technical" className="mb-16">
      <div className="flex items-center gap-4 mb-8">
        <h2 className="text-2xl font-bold text-[#F0EDE8]">🏆 Technical Awards</h2>
        <div className="flex-1 h-px bg-[#2A2A2A]" />
      </div>
      <div className="space-y-10">
        {[bestScore, bestSong, bestCinematography, bestEditing, bestProductionDesign, bestCostume, bestMakeup, bestVFX, bestSound, bestCasting].map((cat) => (
          cat && (
            <div key={cat.name}>
              <h3 className="text-sm font-semibold text-[#D4AF37] uppercase tracking-widest mb-3">
                {cat.name}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {cat.nominees.map((n, i) => (
                  <FilmCard key={i} nominee={n} isActor />
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </section>

      {/* Live News */}
      <section id="news" className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-[#F0EDE8]">📰 Latest News</h2>
          <div className="flex-1 h-px bg-[#2A2A2A]" />
          <span className="text-xs text-[#D4AF37] border border-[#D4AF37] px-2 py-0.5 rounded-full animate-pulse">
            Live
          </span>
        </div>
        <LiveNews />
      </section>

      {/* Drama */}
      <section id="the-tea" className="mb-24">
        <div className="flex items-center gap-4 mb-6">
          <h2 className="text-2xl font-bold text-[#F0EDE8]">☕ The Tea</h2>
          <div className="flex-1 h-px bg-[#2A2A2A]" />
        </div>
        <DramaFeed />
      </section>

      <ChatBox />
    </main>
  );
}