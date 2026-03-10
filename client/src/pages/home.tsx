import { useQuery } from "@tanstack/react-query";
import type { ChroniclesPost, ChroniclesCreatorProfile } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/chronicles/PostCard";
import { CreatorSpotlightCard } from "@/components/chronicles/CreatorSpotlightCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Users, ArrowRight, Swords, Star, BookOpen, Sparkles, Flame, Trophy, Zap } from "lucide-react";
import { Link } from "wouter";

const navLinks = [
  { href: "/chronicles", label: "Chronicles Hub" },
  { href: "/chronicles?tab=community", label: "Community" },
  { href: "/chronicles?tab=challenges", label: "Challenges" },
  { href: "/chronicles?tab=lore", label: "Lore" },
];

const platformFeatures = [
  { icon: Swords, title: "Game Hub", description: "Your home for Chronicles Reborn — overview, demo, and deep lore.", color: "#f59e0b", href: "/chronicles" },
  { icon: Users, title: "Community", description: "Fan art, gameplay clips, strategies, and faith reflections.", color: "#a855f7", href: "/chronicles?tab=community" },
  { icon: Trophy, title: "Challenges", description: "Weekly events with exclusive rewards for the best content.", color: "#22c55e", href: "/chronicles?tab=challenges" },
  { icon: Star, title: "Creator Spotlight", description: "Top creators featured for their contribution to the universe.", color: "#3b82f6", href: "/chronicles?tab=creators" },
  { icon: BookOpen, title: "Lore Library", description: "Characters, battles, and the scripture behind the game.", color: "#ec4899", href: "/chronicles?tab=lore" },
  { icon: Zap, title: "Rewards", description: "Earn badges and exclusive content by participating.", color: "#14b8a6", href: "/chronicles?tab=rewards" },
];

export default function Home() {
  const { data: featuredPosts } = useQuery<ChroniclesPost[]>({
    queryKey: ["/api/chronicles/posts/featured"],
  });

  const { data: creators } = useQuery<ChroniclesCreatorProfile[]>({
    queryKey: ["/api/chronicles/creators", { featured: "true" }],
    queryFn: async () => {
      const res = await fetch("/api/chronicles/creators?featured=true");
      return res.json();
    },
  });

  return (
    <div className="min-h-screen bg-background dark text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-xs font-black">R</div>
              <span className="font-black text-white tracking-tight">RAPTURE</span>
              <span className="hidden sm:block text-xs text-muted-foreground font-medium">by RJ Rapture Labs</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href}>
                <button className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-white transition-colors rounded-lg hover:bg-white/5">
                  {link.label}
                </button>
              </Link>
            ))}
          </nav>
          <Button
            asChild
            size="sm"
            className="font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-black border-0"
          >
            <a href="https://chronicles-reborn-rjrapturelabs.replit.app" target="_blank" rel="noopener noreferrer">
              <Play className="w-3 h-3 mr-1.5 fill-current" /> Play Now
            </a>
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 80% at 50% -20%, rgba(124,58,237,0.25) 0%, transparent 60%)" }} />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        {/* Decorative orbs */}
        <div className="absolute top-20 right-40 w-72 h-72 rounded-full bg-amber-400/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-48 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3 h-3" /> RJ Rapture Labs · Official Platform
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight mb-6">
              Play.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">Create.</span>
              <br />Rise.
            </h1>

            <p className="text-xl text-white/70 mb-8 max-w-xl leading-relaxed">
              Rapture is the official home of <span className="text-white font-semibold">Chronicles Reborn</span> — a scripture-based anime battle game. Discover the game, join the community, and become an original creator.
            </p>

            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                asChild
                size="lg"
                className="font-black text-base h-13 px-8 bg-gradient-to-r from-amber-500 to-orange-500 text-black border-0 shadow-xl shadow-amber-500/25 hover:from-amber-400 hover:to-orange-400"
                data-testid="hero-play-button"
              >
                <a href="https://chronicles-reborn-rjrapturelabs.replit.app" target="_blank" rel="noopener noreferrer">
                  <Play className="w-4 h-4 mr-2 fill-current" /> Play Chronicles — Free
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="font-bold h-13 px-8 border-white/20 text-white hover:bg-white/10"
                data-testid="hero-explore-button"
              >
                <Link href="/chronicles">
                  Explore the Hub <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            <div className="flex flex-wrap gap-6 text-sm">
              <div>
                <div className="text-2xl font-black text-white">10</div>
                <div className="text-muted-foreground text-xs">Epic Battles</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">6</div>
                <div className="text-muted-foreground text-xs">Playable Heroes</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">Free</div>
                <div className="text-muted-foreground text-xs">Demo Available</div>
              </div>
              <div>
                <div className="text-2xl font-black text-white">100%</div>
                <div className="text-muted-foreground text-xs">Scripture-Based</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chronicles Reborn Feature Banner */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="relative rounded-2xl overflow-hidden border border-amber-400/20">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950/60 via-orange-950/40 to-slate-900" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(234,179,8,0.15) 0%, transparent 60%)" }} />
          <div className="absolute top-0 right-0 bottom-0 w-1/2 opacity-20"
            style={{ background: "radial-gradient(ellipse at right, rgba(234,179,8,0.4) 0%, transparent 70%)" }} />

          <div className="relative z-10 p-8 md:p-10 md:flex items-center justify-between gap-8">
            <div className="max-w-xl mb-6 md:mb-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
                <Flame className="w-3 h-3" /> Founding Chronicles Creators Wanted
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                Battle through scripture.<br />
                <span className="text-amber-400">Build the universe.</span>
              </h2>
              <p className="text-white/70 text-base leading-relaxed mb-1">
                Join the founding Chronicles community. Post fan art, gameplay clips, theories, and faith reflections. The original creators of this community will be remembered when Chronicles becomes a franchise.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0">
              <Button
                asChild
                size="lg"
                className="font-black bg-gradient-to-r from-amber-500 to-orange-500 text-black border-0 w-full"
                data-testid="feature-banner-play"
              >
                <a href="https://chronicles-reborn-rjrapturelabs.replit.app" target="_blank" rel="noopener noreferrer">
                  <Play className="w-4 h-4 mr-2 fill-current" /> Play Now
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-amber-400/30 text-amber-300 hover:bg-amber-400/10 w-full font-bold"
                data-testid="feature-banner-explore"
              >
                <Link href="/chronicles">
                  Explore Community <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">What's Inside</div>
            <h2 className="text-2xl md:text-3xl font-black text-white">The Chronicles Ecosystem</h2>
          </div>
          <Link href="/chronicles">
            <Button variant="outline" size="sm" className="border-white/20 text-white hidden sm:inline-flex">
              Enter Hub <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {platformFeatures.map(({ icon: Icon, title, description, color, href }) => (
            <Link key={title} href={href}>
              <div
                className="rounded-xl border border-white/10 bg-card p-5 hover:border-white/20 transition-all hover:scale-[1.01] cursor-pointer group"
                data-testid={`feature-${title.toLowerCase().replace(/\s/g, "-")}`}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform"
                  style={{ background: `${color}20`, border: `1px solid ${color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color }} />
                </div>
                <h3 className="font-bold text-white mb-1 text-sm">{title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
                <div className="flex items-center gap-1 mt-3 text-xs font-semibold" style={{ color }}>
                  Explore <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Community Posts */}
      {featuredPosts && featuredPosts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">Community</div>
              <h2 className="text-2xl font-black text-white">Featured Chronicles Content</h2>
            </div>
            <Link href="/chronicles?tab=community">
              <Button variant="outline" size="sm" className="border-white/20 text-white">
                All Posts <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {featuredPosts.slice(0, 3).map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Creators */}
      {creators && creators.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">Spotlight</div>
              <h2 className="text-2xl font-black text-white">Top Chronicles Creators</h2>
            </div>
            <Link href="/chronicles?tab=creators">
              <Button variant="outline" size="sm" className="border-white/20 text-white">
                All Creators <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {creators.slice(0, 3).map((creator, i) => (
              <CreatorSpotlightCard key={creator.id} creator={creator} rank={i + 1} />
            ))}
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="max-w-7xl mx-auto px-4 py-12 mb-8">
        <div className="relative rounded-2xl overflow-hidden p-10 md:p-14 text-center border border-purple-500/20"
          style={{ background: "linear-gradient(135deg, #0f0c29 0%, #1e1b4b 50%, #0f172a 100%)" }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(124,58,237,0.2) 0%, transparent 65%)" }} />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3 h-3" /> Join the Founding Community
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              From gameplay to fan art,<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">this is where the Chronicles universe lives.</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8 text-base">
              Join Rapture and become an original Chronicles creator. Post content, earn rewards, and help shape what this franchise becomes.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="font-black bg-gradient-to-r from-purple-600 to-purple-500 border-0 px-8"
                data-testid="final-cta-community"
              >
                <Link href="/chronicles?tab=community">Join the Community</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 text-white px-8"
                data-testid="final-cta-play"
              >
                <a href="https://chronicles-reborn-rjrapturelabs.replit.app" target="_blank" rel="noopener noreferrer">
                  Play the Demo
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center text-white text-xs font-black">R</div>
            <span className="font-bold text-white">Rapture</span>
            <span>· RJ Rapture Labs</span>
          </div>
          <div className="flex gap-4 text-xs">
            <Link href="/chronicles">Chronicles Hub</Link>
            <Link href="/chronicles?tab=community">Community</Link>
            <Link href="/chronicles?tab=challenges">Challenges</Link>
            <a href="https://chronicles-reborn-rjrapturelabs.replit.app" target="_blank" rel="noopener noreferrer">Play Game</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
