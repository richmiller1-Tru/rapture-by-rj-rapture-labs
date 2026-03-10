import type { ChroniclesPost } from "@shared/schema";
import { Heart, MessageCircle, Share2, Star, Flame } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useState } from "react";

const categoryColors: Record<string, string> = {
  "Fan Art": "#a855f7",
  "Gameplay Clip": "#3b82f6",
  "Theory / Lore": "#06b6d4",
  "Strategy Guide": "#22c55e",
  "Character Edit": "#f59e0b",
  "Bible Reflection": "#8b5cf6",
  "Battle Reaction": "#ef4444",
  "Animation": "#ec4899",
  "Music Inspired by Chronicles": "#14b8a6",
};

interface PostCardProps {
  post: ChroniclesPost;
  compact?: boolean;
}

export function PostCard({ post, compact }: PostCardProps) {
  const [liked, setLiked] = useState(false);
  const [localLikes, setLocalLikes] = useState(post.likes ?? 0);
  const queryClient = useQueryClient();
  const color = categoryColors[post.category] || "#7c3aed";

  const likeMutation = useMutation({
    mutationFn: () => apiRequest("POST", `/api/chronicles/posts/${post.id}/like`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/chronicles/posts"] });
    },
  });

  const handleLike = () => {
    if (!liked) {
      setLiked(true);
      setLocalLikes(prev => prev + 1);
      likeMutation.mutate();
    }
  };

  return (
    <div
      className="relative rounded-xl overflow-hidden border border-white/10 bg-card hover:border-white/20 transition-all duration-200 group"
      data-testid={`post-card-${post.id}`}
    >
      {post.featured && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <Flame className="w-3 h-3" /> Featured
          </span>
        </div>
      )}

      {/* Thumbnail if present */}
      {post.thumbnailUrl && (
        <div className="w-full aspect-video bg-white/5 overflow-hidden">
          <img src={post.thumbnailUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        </div>
      )}

      <div className="p-4">
        {/* Category tag */}
        <div className="flex items-center gap-2 mb-2">
          <span
            className="px-2 py-0.5 text-xs font-semibold rounded"
            style={{ background: `${color}20`, color, border: `1px solid ${color}30` }}
          >
            {post.category}
          </span>
          {post.battleTag && (
            <span className="px-2 py-0.5 text-xs text-muted-foreground bg-white/5 rounded border border-white/10">
              {post.battleTag}
            </span>
          )}
        </div>

        <h3 className={`font-bold text-white mb-2 leading-tight ${compact ? "text-sm" : "text-base"}`}>
          {post.title}
        </h3>

        {!compact && (
          <p className="text-sm text-muted-foreground line-clamp-3 mb-4 leading-relaxed">
            {post.content}
          </p>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && !compact && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.slice(0, 4).map(tag => (
              <span key={tag} className="text-xs text-muted-foreground bg-white/5 px-1.5 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
              {post.authorName[0]}
            </div>
            <span className="text-xs text-muted-foreground font-medium">{post.authorName}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleLike}
              className={`flex items-center gap-1 text-xs transition-colors ${liked ? "text-red-400" : "text-muted-foreground hover:text-red-400"}`}
              data-testid={`like-button-${post.id}`}
            >
              <Heart className={`w-3.5 h-3.5 ${liked ? "fill-current" : ""}`} />
              {localLikes}
            </button>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MessageCircle className="w-3.5 h-3.5" />
              {post.comments ?? 0}
            </span>
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Share2 className="w-3.5 h-3.5" />
              {post.shares ?? 0}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
