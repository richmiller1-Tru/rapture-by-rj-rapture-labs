import { useQuery } from "@tanstack/react-query";
import type { ChroniclesCreatorProfile } from "@shared/schema";
import { SectionHeader } from "@/components/chronicles/SectionHeader";
import { LeaderboardTable } from "@/components/chronicles/LeaderboardTable";
import { EmptyState } from "@/components/chronicles/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Crown, Heart, FileText } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

const PERIODS = [
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
  { id: "all", label: "All Time" },
];

const avatarGradients = [
  "from-purple-500 to-blue-600",
  "from-amber-500 to-red-600",
  "from-emerald-500 to-cyan-600",
  "from-pink-500 to-purple-600",
  "from-blue-500 to-indigo-600",
  "from-orange-500 to-amber-600",
];

export function LeaderboardTab() {
  const [period, setPeriod] = useState("all");

  const { data: creators, isLoading } = useQuery<ChroniclesCreatorProfile[]>({
    queryKey: ["/api/chronicles/leaderboard", { period }],
    queryFn: async () => {
      const res = await fetch(`/api/chronicles/leaderboard?period=${period}`);
      return res.json();
    },
  });

  const top3 = creators?.slice(0, 3) || [];
  const rest = creators?.slice(3) || [];

  return (
    <div className="space-y-10">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <SectionHeader
          title="Chronicles Leaderboard"
          subtitle="The top community contributors ranked by total likes, posts, and community impact."
          badge="Leaderboard"
        />
        {/* Period filter */}
        <div className="flex gap-1.5 p-1 bg-white/5 rounded-lg border border-white/10">
          {PERIODS.map(p => (
            <button
              key={p.id}
              onClick={() => setPeriod(p.id)}
              className={`px-3 py-1.5 text-xs font-bold rounded transition-all ${period === p.id ? "bg-purple-600 text-white" : "text-muted-foreground hover:text-white"}`}
              data-testid={`period-filter-${p.id}`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)}
          </div>
          <Skeleton className="h-64 rounded-xl" />
        </div>
      ) : !creators || creators.length === 0 ? (
        <EmptyState
          icon="🏆"
          title="Leaderboard empty"
          description="Be the first to post and climb the Chronicles leaderboard."
          action={
            <Button asChild className="font-bold bg-purple-600">
              <Link href="/chronicles?tab=community">Start Posting</Link>
            </Button>
          }
        />
      ) : (
        <>
          {/* Top 3 Podium */}
          {top3.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Hall of Champions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {top3.map((creator, i) => {
                  const rank = i + 1;
                  const gradient = avatarGradients[parseInt(creator.id.slice(-1), 16) % avatarGradients.length];
                  const rankIcon = rank === 1 ? <Crown className="w-5 h-5 text-amber-400" /> :
                    rank === 2 ? <Medal className="w-5 h-5 text-slate-300" /> :
                    <Medal className="w-5 h-5 text-orange-500" />;
                  const borderColor = rank === 1 ? "border-amber-400/30" : rank === 2 ? "border-slate-400/20" : "border-orange-500/20";
                  const glowColor = rank === 1 ? "rgba(234,179,8,0.15)" : rank === 2 ? "rgba(203,213,225,0.1)" : "rgba(249,115,22,0.1)";

                  return (
                    <div
                      key={creator.id}
                      className={`relative rounded-xl border ${borderColor} bg-card p-5 text-center`}
                      style={{ boxShadow: `0 4px 30px ${glowColor}` }}
                      data-testid={`podium-${rank}`}
                    >
                      <div className="absolute top-3 right-3">{rankIcon}</div>
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-2xl font-black mx-auto mb-3 border-2 border-white/10`}>
                        {creator.displayName[0]}
                      </div>
                      <h4 className="font-black text-white mb-0.5 text-base">{creator.displayName}</h4>
                      <p className="text-xs text-muted-foreground mb-4">{creator.creatorType}</p>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/5 rounded-lg p-2">
                          <div className="flex items-center justify-center gap-1 text-red-400 mb-0.5">
                            <Heart className="w-3 h-3" />
                            <span className="text-sm font-black text-white">{creator.totalLikes?.toLocaleString()}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">Likes</div>
                        </div>
                        <div className="bg-white/5 rounded-lg p-2">
                          <div className="flex items-center justify-center gap-1 text-blue-400 mb-0.5">
                            <FileText className="w-3 h-3" />
                            <span className="text-sm font-black text-white">{creator.totalPosts}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">Posts</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Full Leaderboard Table */}
          {creators.length > 0 && (
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Full Rankings</h3>
              <LeaderboardTable creators={creators} />
            </div>
          )}
        </>
      )}

      {/* CTA */}
      <div className="text-center p-8 rounded-xl border border-white/10 bg-card">
        <Trophy className="w-10 h-10 text-amber-400 mx-auto mb-3" />
        <h3 className="text-lg font-black text-white mb-2">Climb the Rankings</h3>
        <p className="text-sm text-muted-foreground mb-4">Post content, receive likes, and win challenges to rise on the Chronicles leaderboard.</p>
        <Button asChild className="font-bold bg-purple-600">
          <Link href="/chronicles?tab=community">Start Creating</Link>
        </Button>
      </div>
    </div>
  );
}
