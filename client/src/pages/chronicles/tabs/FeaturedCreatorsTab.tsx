import { useQuery } from "@tanstack/react-query";
import type { ChroniclesCreatorProfile } from "@shared/schema";
import { SectionHeader } from "@/components/chronicles/SectionHeader";
import { CreatorSpotlightCard } from "@/components/chronicles/CreatorSpotlightCard";
import { EmptyState } from "@/components/chronicles/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Star, Users } from "lucide-react";
import { Link } from "wouter";

const creatorTypes = [
  { type: "Fan Artist", desc: "Visual artists bringing biblical heroes to life", icon: "🎨", color: "#a855f7" },
  { type: "Gameplay Creator", desc: "Players sharing their best battle footage", icon: "🎮", color: "#3b82f6" },
  { type: "Strategist", desc: "Masters sharing game-winning tactics", icon: "🧠", color: "#22c55e" },
  { type: "Faith Storyteller", desc: "Writers connecting scripture to gameplay", icon: "📖", color: "#8b5cf6" },
  { type: "Animator", desc: "Motion artists creating Chronicles animations", icon: "🎬", color: "#ec4899" },
  { type: "Music Creator", desc: "Musicians inspired by the Chronicles universe", icon: "🎵", color: "#14b8a6" },
];

export function FeaturedCreatorsTab() {
  const { data: creators, isLoading } = useQuery<ChroniclesCreatorProfile[]>({
    queryKey: ["/api/chronicles/creators", { featured: "true" }],
    queryFn: async () => {
      const res = await fetch("/api/chronicles/creators?featured=true");
      return res.json();
    },
  });

  return (
    <div className="space-y-12">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <SectionHeader
          title="Featured Creators"
          subtitle="The top Chronicles Reborn community members. Original creators, storytellers, and champions of faith."
          badge="Creator Spotlight"
        />
      </div>

      {/* Creator types overview */}
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">Creator Roles</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {creatorTypes.map(({ type, desc, icon, color }) => (
            <div key={type} className="flex items-center gap-3 p-3 rounded-lg border border-white/10 bg-card hover:border-white/20 transition-colors">
              <div
                className="w-8 h-8 rounded flex items-center justify-center text-base flex-shrink-0"
                style={{ background: `${color}20`, border: `1px solid ${color}30` }}
              >
                {icon}
              </div>
              <div>
                <div className="text-xs font-bold text-white">{type}</div>
                <div className="text-xs text-muted-foreground line-clamp-1">{desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured creators grid */}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <Star className="w-5 h-5 text-amber-400" />
          <h3 className="text-lg font-black text-white">Spotlight Creators</h3>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
          </div>
        ) : !creators || creators.length === 0 ? (
          <EmptyState
            icon="🌟"
            title="No featured creators yet"
            description="Start creating content to get featured in the Chronicles community spotlight."
            action={
              <Button asChild className="font-bold bg-purple-600">
                <Link href="/chronicles?tab=community">Start Creating</Link>
              </Button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {creators.map((creator, i) => (
              <CreatorSpotlightCard key={creator.id} creator={creator} rank={i + 1} />
            ))}
          </div>
        )}
      </div>

      {/* Become a creator CTA */}
      <div className="relative rounded-2xl overflow-hidden p-8 text-center border border-purple-500/20"
        style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(15,23,42,0.8) 100%)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(124,58,237,0.1) 0%, transparent 60%)" }} />
        <div className="relative z-10">
          <Users className="w-12 h-12 text-purple-400 mx-auto mb-4" />
          <h3 className="text-2xl font-black text-white mb-3">Become a Featured Creator</h3>
          <p className="text-white/60 max-w-md mx-auto mb-6 text-sm leading-relaxed">
            The Chronicles community is in its founding days. The creators who show up now and build with us will be the legends remembered when this franchise grows. This is your moment.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="font-bold bg-gradient-to-r from-purple-600 to-purple-500 border-0">
              <Link href="/chronicles?tab=community">Start Creating</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 text-white">
              <Link href="/chronicles?tab=challenges">Join a Challenge</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
