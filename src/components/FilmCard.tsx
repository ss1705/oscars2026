"use client";
import confetti from "canvas-confetti";
import { usePoster } from "@/hooks/usePoster";
import { PredictionBar } from "./PredictionBar";

export function FilmCard({ nominee, isActor, rank }: { nominee: any; isActor?: boolean; rank?: number }) {
  const posterTitle = isActor ? null : nominee.title;
  const poster = usePoster(posterTitle ?? "");

  function fireConfetti() {
    if (!nominee.isPredictedWinner) return;
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 },
      colors: ["#D4AF37", "#F0EDE8", "#B8960C", "#FFD700", "#FFFFFF"],
    });
  }

  return (
    <div
      onClick={fireConfetti}
      className={`surface rounded-lg overflow-hidden transition-colors duration-200 h-full flex flex-col relative
        ${nominee.isPredictedWinner
          ? "border border-[#D4AF37] animate-winner-glow cursor-pointer"
          : "hover:border-[#D4AF37] cursor-default"
        }`}
    >
      {/* Poster */}
      {!isActor && (
        poster ? (
          <div className="w-full aspect-[2/3] overflow-hidden">
            <img
              src={poster}
              alt={posterTitle ?? ""}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full aspect-[2/3] bg-[#1A1A1A] flex items-center justify-center">
            <span className="text-4xl">🎬</span>
          </div>
        )
      )}


      <div className="p-4 flex flex-col flex-1">
        {/* Rank badge */}
        {rank !== undefined && (
          <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-[#0D0D0D]/80 border border-[#D4AF37] flex items-center justify-center z-10">
            <span className="text-xs font-bold text-[#D4AF37]">#{rank}</span>
          </div>
        )}

        {/* Winner crown */}
        {nominee.isPredictedWinner && (
          <span className="absolute top-2 right-2 text-base z-10">👑</span>
        )}

        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-[#F0EDE8] text-base leading-tight">
            {isActor ? nominee.name : nominee.title}
          </h3>
          {nominee.nominations && (
            <span className="text-xs border border-[#D4AF37] text-[#D4AF37] px-2 py-0.5 rounded-full shrink-0">
              {nominee.nominations} noms
            </span>
          )}
        </div>

        {isActor && <p className="text-sm text-[#888888] mb-2">{nominee.film}</p>}
        {nominee.director && <p className="text-sm text-[#888888] mb-2">Dir. {nominee.director}</p>}
        {nominee.synopsis && <p className="text-sm text-[#888888] mb-3 flex-1">{nominee.synopsis}</p>}
        {nominee.imdbScore && (
          <p className="text-sm mb-3">
            ⭐ <span className="text-[#D4AF37] font-semibold">{nominee.imdbScore}</span>
            <span className="text-[#888888]">/10 on IMDb</span>
          </p>
        )}

        <PredictionBar
          name={nominee.name}
          film={nominee.title}
          probability={nominee.winProbability}
          isWinner={nominee.isPredictedWinner}
        />

        {nominee.isPredictedWinner && (
          <p className="text-xs text-[#444444] text-center mt-3 tracking-wide">✨ click to celebrate</p>
        )}
      </div>
    </div>
  );
}