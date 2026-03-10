import { useQuery } from "@tanstack/react-query";
import type { ChroniclesReward } from "@shared/schema";
import { SectionHeader } from "@/components/chronicles/SectionHeader";
import { RewardCard } from "@/components/chronicles/RewardCard";
import { EmptyState } from "@/components/chronicles/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Lock, Trophy, Sparkles, Info } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

const unlockJourney = [
  { step: 1, action: "Make your first post", reward: "First Post Badge", icon: "✍️" },
  { step: 2, action: "Upload fan art", reward: "Fan Artist Badge", icon: "🎨" },
  { step: 3, action: "Post gameplay clip", reward: "Gameplay Creator Badge", icon: "🎮" },
  { step: 4, action: "Submit to a challenge", reward: "Challenge Champion Badge", icon: "⚔️" },
  { step: 5, action: "Receive 10 likes", reward: "Community Beloved Badge", icon: "❤️" },
  { step: 6, action: "Win a challenge", reward: "Battle Winner Badge", icon: "🥇" },
];

const rarityOrder = ["legendary", "epic", "rare", "uncommon", "common"];

export function RewardsTab() {
  const [filter, setFilter] = useState<string>("all");

  const { data: rewards, isLoading } = useQuery<ChroniclesReward[]>({
    queryKey: ["/api/chronicles/rewards"],
  });

  const sorted = rewards?.slice().sort((a, b) => {
    return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
  });

  const filtered = filter === "all" ? sorted : sorted?.filter(r => r.rarity === filter);

  const rarityFilters = [
    { id: "all", label: "All Rewards" },
    { id: "legendary", label: "Legendary" },
    { id: "epic", label: "Epic" },
    { id: "rare", label: "Rare" },
    { id: "uncommon", label: "Uncommon" },
    { id: "common", label: "Common" },
  ];

  const rarityColors: Record<string, string> = {
    legendary: "#eab308",
    epic: "#a855f7",
    rare: "#3b82f6",
    uncommon: "#22c55e",
    common: "#9ca3af",
  };

  return (
    <div className="space-y-10">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <SectionHeader
          title="Chronicles Rewards"
          subtitle="Earn badges, wallpapers, and exclusive recognition by participating in the community."
          badge="Rewards System"
        />
        <Button asChild className="font-bold bg-amber-500 text-black border-0 flex-shrink-0">
          <Link href="/chronicles?tab=challenges">Join a Challenge</Link>
        </Button>
      </div>

      {/* Reward Journey */}
      <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-purple-400" />
          <h3 className="font-black text-white">Your Reward Journey</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {unlockJourney.map(({ step, action, reward, icon }) => (
            <div key={step} className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400 text-sm font-black flex-shrink-0">
                {step}
              </div>
              <div>
                <div className="text-xs text-muted-foreground">{action}</div>
                <div className="text-xs font-semibold text-white">{icon} {reward}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
        <Info className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
        <p className="text-sm text-blue-300 leading-relaxed">
          Rewards are currently displayed in preview mode. Full automation connects when you create an account and start posting. All rewards shown below can be unlocked through community participation.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {rarityFilters.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all ${
              filter === f.id
                ? "text-white border-transparent"
                : "border-white/15 text-muted-foreground hover:text-white"
            }`}
            style={filter === f.id && f.id !== "all" ? {
              background: `${rarityColors[f.id]}25`,
              borderColor: `${rarityColors[f.id]}50`,
              color: rarityColors[f.id],
            } : filter === f.id ? { background: "rgba(124,58,237,0.3)", borderColor: "rgba(124,58,237,0.5)" } : {}}
            data-testid={`rarity-filter-${f.id}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Rewards Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-40 rounded-xl" />)}
        </div>
      ) : !filtered || filtered.length === 0 ? (
        <EmptyState icon="🏆" title="No rewards found" description="Rewards will appear here as you participate in the community." />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(reward => (
            <RewardCard key={reward.id} reward={reward} unlocked={false} />
          ))}
        </div>
      )}

      {/* CTA */}
      <div className="text-center py-8 border border-amber-400/20 rounded-xl bg-amber-400/5">
        <Trophy className="w-12 h-12 text-amber-400 mx-auto mb-3" />
        <h3 className="text-xl font-black text-white mb-2">Start Earning Today</h3>
        <p className="text-sm text-muted-foreground mb-5 max-w-sm mx-auto">
          Every post, challenge entry, and interaction brings you closer to the next reward. The Founding Creator badge is only available during the launch period.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild className="font-bold bg-amber-500 text-black border-0">
            <Link href="/chronicles?tab=community">Start Posting</Link>
          </Button>
          <Button asChild variant="outline" className="border-white/20 text-white">
            <Link href="/chronicles?tab=challenges">Join a Challenge</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
