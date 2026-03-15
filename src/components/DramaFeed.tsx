import dramaData from "@/data/drama.json";

const severityConfig: Record<string, { bar: string; badge: string; label: string }> = {
  high: { bar: "bg-red-700", badge: "bg-red-900 text-red-300 border-red-700", label: "🔥 Hot" },
  medium: { bar: "bg-yellow-600", badge: "bg-yellow-900 text-yellow-300 border-yellow-700", label: "⚡ Notable" },
  low: { bar: "bg-blue-700", badge: "bg-blue-900 text-blue-300 border-blue-700", label: "💬 Buzz" },
};

export function DramaFeed() {
  return (
    <div className="space-y-4">
      {dramaData.items.map((item, i) => {
        const config = severityConfig[item.severity];
        return (
          <div key={i} className="surface rounded-lg overflow-hidden">
            <div className={`h-1 w-full ${config.bar}`} />
            <div className="p-4">
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-[#F0EDE8] text-sm">{item.headline}</h3>
                <span className={`text-xs border px-2 py-0.5 rounded-full shrink-0 ${config.badge}`}>
                  {config.label}
                </span>
              </div>
              <p className="text-sm text-[#888888]">{item.detail}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}