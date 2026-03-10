import type { ChroniclesBattle } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Sword, Shield, Flame } from "lucide-react";

const difficultyConfig = {
  easy: { label: "Easy", color: "#22c55e", bg: "#22c55e20" },
  medium: { label: "Medium", color: "#f59e0b", bg: "#f59e0b20" },
  hard: { label: "Hard", color: "#f97316", bg: "#f9731620" },
  epic: { label: "Epic", color: "#a855f7", bg: "#a855f720" },
  legendary: { label: "Legendary", color: "#eab308", bg: "#eab30820" },
};

interface BattleCardProps {
  battle: ChroniclesBattle;
  featured?: boolean;
}

export function BattleCard({ battle, featured }: BattleCardProps) {
  const diff = difficultyConfig[battle.difficulty as keyof typeof difficultyConfig] || difficultyConfig.medium;

  return (
    <div
      className={`relative rounded-xl overflow-hidden border border-white/10 bg-card group hover:border-white/20 hover:scale-[1.01] transition-all duration-300 ${featured ? "md:col-span-2" : ""}`}
      data-testid={`battle-card-${battle.id}`}
    >
      {/* Diagonal accent */}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-20"
        style={{ background: `radial-gradient(circle at top right, ${diff.color}, transparent)` }} />

      {battle.featured && (
        <div className="absolute top-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <Flame className="w-3 h-3" /> Featured
          </span>
        </div>
      )}

      <div className="p-5">
        {/* Difficulty badge */}
        <div className="flex items-center gap-2 mb-3">
          <span
            className="px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider"
            style={{ background: diff.bg, color: diff.color, border: `1px solid ${diff.color}40` }}
          >
            {diff.label}
          </span>
        </div>

        <h3 className="text-xl font-black text-white mb-2 tracking-tight">{battle.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {battle.description}
        </p>

        {/* Heroes vs Enemies */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wider text-blue-400 font-semibold mb-1">Heroes</div>
            <div className="flex flex-wrap gap-1">
              {battle.heroes.map((h) => (
                <span key={h} className="px-2 py-0.5 text-xs rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">{h}</span>
              ))}
            </div>
          </div>
          <div className="text-muted-foreground font-black">VS</div>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-wider text-red-400 font-semibold mb-1">Enemies</div>
            <div className="flex flex-wrap gap-1">
              {battle.enemies.map((e) => (
                <span key={e} className="px-2 py-0.5 text-xs rounded bg-red-500/20 text-red-300 border border-red-500/30">{e}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Scripture */}
        {battle.scripture && (
          <div className="flex items-center gap-2 pt-3 border-t border-white/10">
            <BookOpen className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
            <span className="text-xs text-purple-300 font-medium">{battle.scripture}</span>
          </div>
        )}
      </div>
    </div>
  );
}
