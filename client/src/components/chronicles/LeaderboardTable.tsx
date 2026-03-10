import type { ChroniclesCreatorProfile } from "@shared/schema";
import { Heart, FileText, Trophy, Medal } from "lucide-react";

const avatarGradients = [
  "from-purple-500 to-blue-600",
  "from-amber-500 to-red-600",
  "from-emerald-500 to-cyan-600",
  "from-pink-500 to-purple-600",
  "from-blue-500 to-indigo-600",
  "from-orange-500 to-amber-600",
];

interface LeaderboardTableProps {
  creators: ChroniclesCreatorProfile[];
}

export function LeaderboardTable({ creators }: LeaderboardTableProps) {
  return (
    <div className="rounded-xl border border-white/10 overflow-hidden bg-card">
      {/* Header */}
      <div className="grid grid-cols-12 gap-4 px-5 py-3 border-b border-white/10 bg-white/5">
        <div className="col-span-1 text-xs font-bold uppercase tracking-wider text-muted-foreground text-center">#</div>
        <div className="col-span-5 text-xs font-bold uppercase tracking-wider text-muted-foreground">Creator</div>
        <div className="col-span-2 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Likes</div>
        <div className="col-span-2 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Posts</div>
        <div className="col-span-2 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Badges</div>
      </div>

      {/* Rows */}
      {creators.map((creator, index) => {
        const rank = index + 1;
        const gradient = avatarGradients[parseInt(creator.id.slice(-1), 16) % avatarGradients.length];
        const isTop3 = rank <= 3;

        return (
          <div
            key={creator.id}
            className={`grid grid-cols-12 gap-4 px-5 py-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors ${isTop3 ? "bg-white/[0.02]" : ""}`}
            data-testid={`leaderboard-row-${creator.id}`}
          >
            {/* Rank */}
            <div className="col-span-1 flex items-center justify-center">
              {rank === 1 ? (
                <Trophy className="w-5 h-5 text-amber-400" />
              ) : rank === 2 ? (
                <Medal className="w-5 h-5 text-slate-300" />
              ) : rank === 3 ? (
                <Medal className="w-5 h-5 text-orange-500" />
              ) : (
                <span className="text-sm font-bold text-muted-foreground">{rank}</span>
              )}
            </div>

            {/* Creator */}
            <div className="col-span-5 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-black flex-shrink-0`}>
                {creator.displayName[0]}
              </div>
              <div>
                <div className="font-bold text-white text-sm leading-tight">{creator.displayName}</div>
                <div className="text-xs text-muted-foreground">{creator.creatorType}</div>
              </div>
            </div>

            {/* Likes */}
            <div className="col-span-2 flex items-center justify-end gap-1">
              <Heart className="w-3.5 h-3.5 text-red-400" />
              <span className="font-bold text-white text-sm">{creator.totalLikes?.toLocaleString()}</span>
            </div>

            {/* Posts */}
            <div className="col-span-2 flex items-center justify-end gap-1">
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span className="font-bold text-white text-sm">{creator.totalPosts}</span>
            </div>

            {/* Badges */}
            <div className="col-span-2 flex items-center justify-end">
              <span className="text-sm text-muted-foreground font-medium">
                {creator.badges?.length ?? 0}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
