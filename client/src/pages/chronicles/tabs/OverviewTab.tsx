import { useQuery } from "@tanstack/react-query";
import type { ChroniclesCharacter, ChroniclesBattle, ChroniclesPost } from "@shared/schema";
import { CharacterCard } from "@/components/chronicles/CharacterCard";
import { BattleCard } from "@/components/chronicles/BattleCard";
import { PostCard } from "@/components/chronicles/PostCard";
import { SectionHeader } from "@/components/chronicles/SectionHeader";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Users, Sparkles, BookOpen, Music, Swords, Shield, Zap } from "lucide-react";
import { Link } from "wouter";

const features = [
  { icon: Swords, label: "10 Epic Battles", desc: "From David vs Goliath to Elijah vs Baal", color: "#f59e0b" },
  { icon: Shield, label: "6 Playable Heroes", desc: "Each with unique faith-powered abilities", color: "#3b82f6" },
  { icon: Zap, label: "Faith Powers", desc: "Prayer-activated super abilities", color: "#a855f7" },
  { icon: BookOpen, label: "Boss Battles", desc: "Face Goliath, Jericho, and more legends", color: "#dc2626" },
  { icon: Music, label: "Original Music", desc: "Cinematic battle soundtrack", color: "#22c55e" },
  { icon: Sparkles, label: "Scripture-Based", desc: "Every ability rooted in the Bible", color: "#ec4899" },
];

export function OverviewTab() {
  const { data: characters, isLoading: charsLoading } = useQuery<ChroniclesCharacter[]>({ queryKey: ["/api/chronicles/characters"] });
  const { data: battles, isLoading: battlesLoading } = useQuery<ChroniclesBattle[]>({ queryKey: ["/api/chronicles/battles"] });
  const { data: featuredPosts } = useQuery<ChroniclesPost[]>({ queryKey: ["/api/chronicles/posts/featured"] });

  const featuredBattles = battles?.filter(b => b.featured).slice(0, 4) || [];

  return (
    <div className="space-y-16">
      {/* Hero Banner */}
      <div className="relative rounded-2xl overflow-hidden min-h-[380px] flex items-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-950/80 to-slate-900" />
        <div className="absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.3) 0%, transparent 70%)" }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        {/* Decorative orbs */}
        <div className="absolute top-10 right-20 w-48 h-48 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute bottom-5 left-10 w-64 h-32 rounded-full bg-purple-600/20 blur-3xl" />

        <div className="relative z-10 px-8 py-12 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-widest mb-5">
            <Sparkles className="w-3 h-3" /> RJ Rapture Labs Presents
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white leading-none tracking-tight mb-4">
            Chronicles<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Reborn</span>
          </h1>
          <p className="text-lg text-white/80 mb-6 leading-relaxed max-w-xl">
            A scripture-based anime battle game where biblical heroes fight through legendary faith-filled battles. <span className="text-amber-400 font-semibold">Battle through scripture.</span>
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="font-bold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black border-0 shadow-lg shadow-amber-500/30"
              data-testid="hero-play-now"
            >
              <a href="https://chronicles-reborn-rjrapturelabs.replit.app" target="_blank" rel="noopener noreferrer">
                <Play className="w-4 h-4 mr-2" /> Play Now — Free Demo
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="font-bold border-white/20 text-white hover:bg-white/10"
              data-testid="hero-join-community"
            >
              <Link href="/chronicles?tab=community">
                <Users className="w-4 h-4 mr-2" /> Join Community
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Feature Grid */}
      <div>
        <SectionHeader title="What Makes Chronicles Different" subtitle="Every element of the game is built on real scripture." badge="Game Features" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, label, desc, color }) => (
            <div key={label} className="rounded-xl border border-white/10 bg-card p-5 hover:border-white/20 transition-colors group">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-3" style={{ background: `${color}20`, border: `1px solid ${color}30` }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
              <div className="font-bold text-white mb-1 text-sm">{label}</div>
              <div className="text-xs text-muted-foreground">{desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Characters */}
      <div>
        <SectionHeader title="The Heroes of Faith" subtitle="Six playable biblical champions, each with unique divine abilities." badge="Characters">
          <Link href="/chronicles?tab=lore">
            <Button variant="outline" size="sm" className="border-white/20 text-white">View All Lore</Button>
          </Link>
        </SectionHeader>
        {charsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-64 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {characters?.map(char => <CharacterCard key={char.id} character={char} />)}
          </div>
        )}
      </div>

      {/* Featured Battles */}
      <div>
        <SectionHeader title="Legendary Battles" subtitle="The defining moments of faith in scripture, now playable." badge="Epic Battles">
          <Link href="/chronicles?tab=lore">
            <Button variant="outline" size="sm" className="border-white/20 text-white">View All Battles</Button>
          </Link>
        </SectionHeader>
        {battlesLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-48 rounded-xl" />)}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredBattles.map(battle => <BattleCard key={battle.id} battle={battle} />)}
          </div>
        )}
      </div>

      {/* Community tagline block */}
      <div className="relative rounded-2xl overflow-hidden p-10 text-center"
        style={{ background: "linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #1e1b4b 100%)", border: "1px solid rgba(124,58,237,0.2)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(124,58,237,0.15) 0%, transparent 70%)" }} />
        <div className="relative z-10">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-4">
            Create. Watch. <span className="text-amber-400">Battle. Believe.</span>
          </h2>
          <p className="text-white/70 max-w-xl mx-auto mb-8 text-lg">
            From gameplay to fan art, this is where the Chronicles universe lives. Join the founding Chronicles community and shape what this world becomes.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button size="lg" asChild className="font-bold bg-gradient-to-r from-purple-600 to-purple-500 border-0">
              <Link href="/chronicles?tab=community">Post Your Content</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white/20 text-white">
              <a href="https://chronicles-reborn-rjrapturelabs.replit.app" target="_blank" rel="noopener noreferrer">
                Play the Demo
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Featured Community Posts Preview */}
      {featuredPosts && featuredPosts.length > 0 && (
        <div>
          <SectionHeader title="Community Highlights" subtitle="The best content from your fellow Chronicles fans." badge="From the Community">
            <Link href="/chronicles?tab=community">
              <Button variant="outline" size="sm" className="border-white/20 text-white">See All Posts</Button>
            </Link>
          </SectionHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredPosts.slice(0, 3).map(post => <PostCard key={post.id} post={post} />)}
          </div>
        </div>
      )}
    </div>
  );
}
