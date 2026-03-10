import type { ChroniclesReward } from "@shared/schema";
import { Lock, Unlock, Star } from "lucide-react";

const rarityConfig = {
  common: { label: "Common", color: "#9ca3af", bg: "#9ca3af15", border: "#9ca3af30", glow: "" },
  uncommon: { label: "Uncommon", color: "#22c55e", bg: "#22c55e15", border: "#22c55e30", glow: "0 0 20px #22c55e20" },
  rare: { label: "Rare", color: "#3b82f6", bg: "#3b82f615", border: "#3b82f630", glow: "0 0 25px #3b82f620" },
  epic: { label: "Epic", color: "#a855f7", bg: "#a855f715", border: "#a855f730", glow: "0 0 30px #a855f720" },
  legendary: { label: "Legendary", color: "#eab308", bg: "#eab30815", border: "#eab30830", glow: "0 0 40px #eab30820" },
};

interface RewardCardProps {
  reward: ChroniclesReward;
  unlocked?: boolean;
}

export function RewardCard({ reward, unlocked = false }: RewardCardProps) {
  const config = rarityConfig[reward.rarity as keyof typeof rarityConfig] || rarityConfig.common;

  return (
    <div
      className={`relative rounded-xl overflow-hidden border bg-card transition-all duration-300 ${unlocked ? "group hover:scale-[1.02]" : "opacity-60 grayscale"}`}
      style={{ borderColor: config.border, boxShadow: unlocked ? config.glow : "" }}
      data-testid={`reward-card-${reward.id}`}
    >
      {/* Rarity top stripe */}
      <div className="h-0.5" style={{ background: config.color }} />

      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl flex-shrink-0 relative"
            style={{ background: config.bg, border: `1px solid ${config.border}` }}
          >
            <span className={unlocked ? "" : "blur-sm"}>{reward.icon}</span>
            {!unlocked && (
              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/40">
                <Lock className="w-4 h-4 text-gray-400" />
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0">
            {/* Rarity badge */}
            <div className="flex items-center gap-2 mb-1">
              <span
                className="text-xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                style={{ color: config.color, background: config.bg }}
              >
                {config.label}
              </span>
              {unlocked && (
                <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                  <Unlock className="w-3 h-3" /> Unlocked
                </span>
              )}
            </div>

            <h4 className={`font-bold text-sm mb-1 ${unlocked ? "text-white" : "text-muted-foreground"}`}>
              {reward.name}
            </h4>
            <p className="text-xs text-muted-foreground line-clamp-2">{reward.description}</p>
          </div>
        </div>

        {/* Unlock rule */}
        <div className="mt-3 pt-3 border-t border-white/10">
          <div className="flex items-start gap-1.5">
            <Star className="w-3 h-3 text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-muted-foreground">{reward.unlockRule}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
