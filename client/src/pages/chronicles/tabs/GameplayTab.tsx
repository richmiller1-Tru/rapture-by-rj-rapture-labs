import { useQuery } from "@tanstack/react-query";
import type { ChroniclesPost } from "@shared/schema";
import { SectionHeader } from "@/components/chronicles/SectionHeader";
import { EmptyState } from "@/components/chronicles/EmptyState";
import { PostCard } from "@/components/chronicles/PostCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";
import { Link } from "wouter";

const HERO_FILTERS = ["All", "David", "Samson", "Joshua", "Gideon", "Elijah", "Holy Spirit", "Goliath", "Jericho", "Red Sea", "Baal"];

export function GameplayTab() {
  const [heroFilter, setHeroFilter] = useState("All");

  const { data: posts, isLoading } = useQuery<ChroniclesPost[]>({
    queryKey: ["/api/chronicles/posts", { category: "Gameplay Clip" }],
    queryFn: async () => {
      const res = await fetch("/api/chronicles/posts?category=Gameplay%20Clip");
      return res.json();
    },
  });

  const { data: reactionPosts } = useQuery<ChroniclesPost[]>({
    queryKey: ["/api/chronicles/posts", { category: "Battle Reaction" }],
    queryFn: async () => {
      const res = await fetch("/api/chronicles/posts?category=Battle%20Reaction");
      return res.json();
    },
  });

  const allClips = [...(posts || []), ...(reactionPosts || [])];
  const filtered = heroFilter === "All" ? allClips : allClips.filter(p =>
    p.heroTag === heroFilter || p.battleTag?.toLowerCase().includes(heroFilter.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <SectionHeader
          title="Gameplay Clips"
          subtitle="Watch the community battle through scripture. Share your own gameplay moments."
          badge="Gameplay"
        />
        <Button asChild className="font-bold bg-blue-600 hover:bg-blue-500 flex-shrink-0" data-testid="submit-clip-button">
          <Link href="/chronicles?tab=community">Post a Clip</Link>
        </Button>
      </div>

      {/* Hero filters */}
      <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto">
        {HERO_FILTERS.map(hero => (
          <button
            key={hero}
            onClick={() => setHeroFilter(hero)}
            className={`px-3 py-1.5 text-xs font-bold rounded-full border transition-all whitespace-nowrap ${
              heroFilter === hero
                ? "bg-blue-600 text-white border-blue-600"
                : "border-white/15 text-muted-foreground hover:text-white hover:border-white/30 bg-transparent"
            }`}
            data-testid={`hero-filter-${hero.toLowerCase()}`}
          >
            {hero}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState
          icon="🎮"
          title="No clips yet"
          description="Be the first to post a Chronicles Reborn gameplay clip or battle reaction."
          action={
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild className="font-bold bg-blue-600">
                <a href="https://chronicles-reborn-rjrapturelabs.replit.app" target="_blank" rel="noopener noreferrer">
                  <Play className="w-4 h-4 mr-2" /> Play and Record
                </a>
              </Button>
              <Button asChild variant="outline" className="border-white/20">
                <Link href="/chronicles?tab=community">Post a Clip</Link>
              </Button>
            </div>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(post => <PostCard key={post.id} post={post} />)}
        </div>
      )}

      {/* Play CTA */}
      <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-6 text-center">
        <Play className="w-10 h-10 text-blue-400 mx-auto mb-3" />
        <h3 className="text-lg font-black text-white mb-2">Create Your Own Gameplay Content</h3>
        <p className="text-sm text-muted-foreground mb-4">Play the demo, record your battles, and share them with the Chronicles community.</p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Button asChild size="sm" className="bg-amber-500 text-black font-bold border-0">
            <a href="https://chronicles-reborn-rjrapturelabs.replit.app" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3.5 h-3.5 mr-1.5" /> Play Demo
            </a>
          </Button>
          <Button asChild size="sm" variant="outline" className="border-white/20 text-white">
            <Link href="/chronicles?tab=community">Post Your Clip</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
