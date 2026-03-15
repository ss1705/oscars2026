export function PredictionBar({ name, film, probability, isWinner }: {
  name?: string;
  film?: string;
  probability: number;
  isWinner: boolean;
}) {
  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-[#F0EDE8]">
          {name ?? film}
          {isWinner && (
            <span className="ml-2 text-xs bg-[#D4AF37] text-black px-2 py-0.5 rounded-full font-semibold">
              🏆 Predicted
            </span>
          )}
        </span>
        <span className="text-sm text-[#888888]">{probability}%</span>
      </div>
      <div className="w-full bg-[#2A2A2A] rounded-full h-1.5">
        <div
          className="h-1.5 rounded-full transition-all"
          style={{
            width: `${probability}%`,
            backgroundColor: isWinner ? "#D4AF37" : "#555555"
          }}
        />
      </div>
    </div>
  );
}