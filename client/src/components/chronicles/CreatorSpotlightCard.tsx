import type { ChroniclesCreatorProfile } from "@shared/schema";
import { Heart, FileText, Star, Trophy, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const creatorTypeColors: Record<string, string> = {
  "Fan Artist": "#a855f7",
  "Strategist": "#22c55e",
  "Animator": "#ec4899",
  "Faith Storyteller": "#8b5cf6",
  "Gameplay Creator": "#3b82f6",
  "Lore Builder": "#06b6d4",
  "Music Creator": "#14b8a6",
};

const avatarGradients = [
  "from-purple-500 to-blue-600",
  "from-amber-500 to-red-600",
  "from-emerald-500 to-cyan-600",
  "from-pink-500 to-purple-600",
  "from-blue-500 to-indigo-600",
  "from-orange-500 to-amber-600",
];

interface CreatorSpotlightCardProps {
  creator: ChroniclesCreatorProfile;
  rank?: number;
}

export function CreatorSpotlightCard({ creator, rank }: CreatorSpotlightCardProps) {
  const color = creatorTypeColors[creator.creatorType] || "#7c3aed";
  const gradient = avatarGradients[parseInt(creator.id.slice(-1), 16) % avatarGradients.length];

  return (
    <div
      className="relative rounded-xl overflow-hidden border border-white/10 bg-card hover:border-white/20 hover:scale-[1.01] transition-all duration-300 group"
      style={{ boxShadow: `0 4px 30px ${color}15` }}
      data-testid={`creator-card-${creator.id}`}
    >
      {rank && rank <= 3 && (
        <div className="absolute top-3 right-3">
          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-black
            ${rank === 1 ? "bg-amber-400/20 text-amber-400 border border-amber-400/40" :
              rank === 2 ? "bg-slate-300/20 text-slate-300 border border-slate-300/40" :
              "bg-orange-600/20 text-orange-400 border border-orange-600/40"}`}>
            #{rank}
          </div>
        </div>
      )}

      <div className="p-5">
        {/* Avatar + name */}
        <div className="flex items-start gap-4 mb-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-xl font-black flex-shrink-0 border-2 border-white/10`}>
            {creator.displayName[0]}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-black text-white text-lg leading-tight truncate">{creator.displayName}</h3>
            <span
              className="inline-block mt-0.5 text-xs font-semibold px-2 py-0.5 rounded"
              style={{ background: `${color}20`, color, border: `1px solid ${color}30` }}
            >
              {creator.creatorType}
            </span>
          </div>
        </div>

        {/* Bio */}
        {creator.bio && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
            {creator.bio}
          </p>
        )}

        {/* Badges */}
        {creator.badges && creator.badges.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {creator.badges.slice(0, 3).map(badge => (
              <span key={badge} className="text-xs px-2 py-0.5 rounded bg-white/5 border border-white/10 text-muted-foreground">
                {badge}
              </span>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-red-400" />
            <div>
              <div className="text-base font-black text-white">{creator.totalLikes?.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Likes</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <div>
              <div className="text-base font-black text-white">{creator.totalPosts}</div>
              <div className="text-xs text-muted-foreground">Posts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
