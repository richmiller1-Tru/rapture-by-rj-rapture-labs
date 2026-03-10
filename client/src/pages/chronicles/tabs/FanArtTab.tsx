import { useQuery } from "@tanstack/react-query";
import type { ChroniclesPost } from "@shared/schema";
import { SectionHeader } from "@/components/chronicles/SectionHeader";
import { EmptyState } from "@/components/chronicles/EmptyState";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Heart, User, Tag, ExternalLink, X } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Link } from "wouter";

export function FanArtTab() {
  const [selected, setSelected] = useState<ChroniclesPost | null>(null);
  const queryClient = useQueryClient();

  const { data: posts, isLoading } = useQuery<ChroniclesPost[]>({
    queryKey: ["/api/chronicles/posts", { category: "Fan Art" }],
    queryFn: async () => {
      const res = await fetch("/api/chronicles/posts?category=Fan%20Art");
      return res.json();
    },
  });

  const editPosts = useQuery<ChroniclesPost[]>({
    queryKey: ["/api/chronicles/posts", { category: "Character Edit" }],
    queryFn: async () => {
      const res = await fetch("/api/chronicles/posts?category=Character%20Edit");
      return res.json();
    },
  });

  const animPosts = useQuery<ChroniclesPost[]>({
    queryKey: ["/api/chronicles/posts", { category: "Animation" }],
    queryFn: async () => {
      const res = await fetch("/api/chronicles/posts?category=Animation");
      return res.json();
    },
  });

  const allArt = [
    ...(posts?.filter(p => p.featured) || []),
    ...(posts?.filter(p => !p.featured) || []),
    ...(editPosts.data || []),
    ...(animPosts.data || []),
  ];

  const likeMutation = useMutation({
    mutationFn: (id: string) => apiRequest("POST", `/api/chronicles/posts/${id}/like`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["/api/chronicles/posts"] }),
  });

  const gradients = [
    "from-purple-900/80 to-blue-900/80",
    "from-amber-900/80 to-red-900/80",
    "from-emerald-900/80 to-teal-900/80",
    "from-pink-900/80 to-purple-900/80",
    "from-blue-900/80 to-indigo-900/80",
    "from-orange-900/80 to-amber-900/80",
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <SectionHeader
          title="Fan Art Gallery"
          subtitle="Original artwork inspired by the Chronicles Reborn universe. Every pixel a prayer."
          badge="Fan Art"
        />
        <Button asChild className="font-bold bg-purple-600 hover:bg-purple-500 flex-shrink-0" data-testid="submit-fanart-button">
          <Link href="/chronicles?tab=community">Submit Your Art</Link>
        </Button>
      </div>

      {/* Featured art hero */}
      {allArt.filter(p => p.featured).length > 0 && (
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-1 h-6 bg-amber-400 rounded-full" />
            <span className="text-sm font-bold text-amber-300 uppercase tracking-wider">Featured Works</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allArt.filter(p => p.featured).slice(0, 2).map((post, i) => (
              <div
                key={post.id}
                className={`relative rounded-xl overflow-hidden cursor-pointer group border border-amber-400/20 hover:border-amber-400/40 transition-all`}
                style={{ minHeight: "220px" }}
                onClick={() => setSelected(post)}
                data-testid={`fanart-featured-${post.id}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${gradients[i % gradients.length]}`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  {post.thumbnailUrl ? (
                    <img src={post.thumbnailUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  ) : (
                    <div className="text-6xl font-black text-white/10 select-none">{post.authorName[0]}</div>
                  )}
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="font-bold text-white text-sm mb-1 line-clamp-1">{post.title}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-white/60">{post.authorName}</span>
                    <span className="flex items-center gap-1 text-xs text-red-300">
                      <Heart className="w-3 h-3" /> {post.likes ?? 0}
                    </span>
                  </div>
                </div>
                <div className="absolute top-3 left-3">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">Featured</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Grid */}
      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[...Array(8)].map((_, i) => <Skeleton key={i} className="aspect-square rounded-xl" />)}
        </div>
      ) : allArt.length === 0 ? (
        <EmptyState
          icon="🎨"
          title="Gallery is empty"
          description="Be the first to submit Chronicles fan art. Any medium welcome — digital, traditional, or mixed."
          action={
            <Button asChild className="font-bold bg-purple-600">
              <Link href="/chronicles?tab=community">Submit Fan Art</Link>
            </Button>
          }
        />
      ) : (
        <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
          {allArt.map((post, i) => (
            <div
              key={post.id}
              className="break-inside-avoid rounded-xl overflow-hidden cursor-pointer group border border-white/10 hover:border-white/25 transition-all"
              onClick={() => setSelected(post)}
              data-testid={`fanart-card-${post.id}`}
            >
              <div
                className={`relative bg-gradient-to-br ${gradients[i % gradients.length]}`}
                style={{ minHeight: i % 3 === 0 ? "200px" : "140px" }}
              >
                {post.thumbnailUrl ? (
                  <img src={post.thumbnailUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl font-black text-white/20">{post.authorName[0]}</span>
                  </div>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 translate-y-1 group-hover:translate-y-0 transition-transform">
                  <p className="text-white text-xs font-semibold line-clamp-1">{post.title}</p>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-white/50 text-xs">{post.authorName}</span>
                    <span className="flex items-center gap-1 text-xs text-red-300">
                      <Heart className="w-3 h-3" /> {post.likes ?? 0}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Art Detail Modal */}
      {selected && (
        <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
          <DialogContent className="max-w-2xl bg-card border-white/10">
            <DialogHeader>
              <DialogTitle className="text-white font-black">{selected.title}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              {selected.thumbnailUrl && (
                <div className="rounded-lg overflow-hidden aspect-video bg-black/40">
                  <img src={selected.thumbnailUrl} alt={selected.title} className="w-full h-full object-contain" />
                </div>
              )}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-sm font-bold">
                    {selected.authorName[0]}
                  </div>
                  <span className="text-sm font-medium text-white">{selected.authorName}</span>
                </div>
                <button
                  className="flex items-center gap-1.5 text-sm text-red-400 hover:text-red-300 transition-colors"
                  onClick={() => likeMutation.mutate(selected.id)}
                  data-testid={`modal-like-${selected.id}`}
                >
                  <Heart className="w-4 h-4" /> {selected.likes ?? 0} Likes
                </button>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{selected.content}</p>
              {selected.tags && selected.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {selected.tags.map(tag => (
                    <span key={tag} className="text-xs bg-white/5 px-2 py-0.5 rounded text-muted-foreground border border-white/10">#{tag}</span>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
