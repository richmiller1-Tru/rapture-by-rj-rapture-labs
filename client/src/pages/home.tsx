import { useQuery } from "@tanstack/react-query";
import type { ChroniclesPost, ChroniclesCreatorProfile, ChroniclesChallenge } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { PostCard } from "@/components/chronicles/PostCard";
import { CreatorSpotlightCard } from "@/components/chronicles/CreatorSpotlightCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Play, Users, ArrowRight, Swords, Star, BookOpen, Sparkles, Flame, Trophy, Zap, Award, Clock, Heart, FileText, ChevronRight, Gamepad2, Shield, Image, LogOut, UserCircle } from "lucide-react";
import { Link } from "wouter";
import { formatDistanceToNow, isPast } from "date-fns";
import { useAuth } from "@/hooks/use-auth";

const navLinks = [
  { href: "/chronicles", label: "Chronicles Hub" },
  { href: "/chronicles?tab=community", label: "Community" },
  { href: "/chronicles?tab=challenges", label: "Challenges" },
  { href: "/chronicles?tab=lore", label: "Lore" },
  { href: "/picoin", label: "Pi Coin" },
];

const platformFeatures = [
  { icon: Swords, title: "Game Hub", description: "Overview, demo, and deep lore for Chronicles Reborn.", color: "#f59e0b", href: "/chronicles" },
  { icon: Users, title: "Community", description: "Fan art, gameplay clips, strategies, and faith reflections.", color: "#a855f7", href: "/chronicles?tab=community" },
  { icon: Trophy, title: "Challenges", description: "Weekly events with exclusive rewards for the best content.", color: "#22c55e", href: "/chronicles?tab=challenges" },
  { icon: Star, title: "Creator Spotlight", description: "Top creators featured for community contribution.", color: "#3b82f6", href: "/chronicles?tab=creators" },
  { icon: BookOpen, title: "Lore Library", description: "Characters, battles, and the scripture behind the game.", color: "#ec4899", href: "/chronicles?tab=lore" },
  { icon: Award, title: "Rewards", description: "Earn badges and exclusive content by participating.", color: "#14b8a6", href: "/chronicles?tab=rewards" },
];

const staticSocialProof = [
  { value: "10", label: "Epic Battles", icon: Swords },
  { value: "6", label: "Playable Heroes", icon: Shield },
  { value: "Free", label: "Demo Available", icon: Gamepad2 },
  { value: "100%", label: "Scripture-Based", icon: BookOpen },
];

export default function Home() {
  const { user, logoutMutation } = useAuth();

  const { data: featuredPosts, isLoading: postsLoading } = useQuery<ChroniclesPost[]>({
    queryKey: ["/api/chronicles/posts/featured"],
  });

  const { data: creators, isLoading: creatorsLoading } = useQuery<ChroniclesCreatorProfile[]>({
    queryKey: ["/api/chronicles/creators", { featured: "true" }],
    queryFn: async () => {
      const res = await fetch("/api/chronicles/creators?featured=true");
      return res.json();
    },
  });

  const { data: challenges, isLoading: challengesLoading } = useQuery<ChroniclesChallenge[]>({
    queryKey: ["/api/chronicles/challenges", { status: "active" }],
    queryFn: async () => {
      const res = await fetch("/api/chronicles/challenges?status=active");
      return res.json();
    },
  });

  return (
    <div className="min-h-screen bg-background text-foreground">
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
                <button className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-white transition-colors rounded-lg hover:bg-white/5" data-testid={`nav-${link.label.toLowerCase().replace(/\s/g, "-")}`}>
                  {link.label}
                </button>
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {user ? (
              <>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xs font-bold">
                    {user.username[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-white hidden sm:inline" data-testid="nav-username">{user.username}</span>
                </div>
                <button
                  onClick={() => logoutMutation.mutate()}
                  className="p-2 rounded-lg text-muted-foreground hover:text-white hover:bg-white/5 transition-colors"
                  data-testid="nav-logout"
                  title="Sign out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <Button
                asChild
                size="sm"
                className="font-bold bg-purple-600 hover:bg-purple-500 border-0"
                data-testid="nav-signin-button"
              >
                <Link href="/auth">
                  <UserCircle className="w-3.5 h-3.5 mr-1.5" /> Sign In
                </Link>
              </Button>
            )}
            <Button
              asChild
              size="sm"
              className="font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-black border-0"
              data-testid="nav-play-button"
            >
              <a href="https://chronicles-reborn-rjrapturelabs.replit.app" target="_blank" rel="noopener noreferrer">
                <Play className="w-3 h-3 mr-1.5 fill-current" /> Play Now
              </a>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-purple-950/50 to-slate-950" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 100% 80% at 50% -20%, rgba(124,58,237,0.25) 0%, transparent 60%)" }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="absolute top-20 right-40 w-72 h-72 rounded-full bg-amber-400/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-48 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 py-20 md:py-28 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3 h-3" /> RJ Rapture Labs · Official Platform
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white leading-[0.95] tracking-tight mb-6">
              Battle Through<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-red-400">Scripture.</span>
              <br />
              <span className="text-3xl md:text-5xl text-white/90">Build the Universe.</span>
            </h1>

            <p className="text-lg md:text-xl text-white/70 mb-8 max-w-xl leading-relaxed">
              <span className="text-white font-semibold">Chronicles Reborn</span> is a scripture-based anime battle game with 6 heroes, 10 legendary battles, and a growing community of creators. Play free. Create content. Earn your place among the founding members.
            </p>

            <div className="flex flex-wrap gap-3 mb-10">
              <Button
                asChild
                size="lg"
                className="font-black text-base h-13 px-8 bg-gradient-to-r from-amber-500 to-orange-500 text-black border-0 shadow-xl shadow-amber-500/25 hover:from-amber-400 hover:to-orange-400"
                data-testid="hero-play-button"
              >
                <a href="https://chronicles-reborn-rjrapturelabs.replit.app" target="_blank" rel="noopener noreferrer">
                  <Play className="w-4 h-4 mr-2 fill-current" /> Play the Demo — Free
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

            <div className="flex flex-wrap gap-8">
              {staticSocialProof.map(({ value, label, icon: Icon }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-white leading-none">{value}</div>
                    <div className="text-xs text-muted-foreground">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-white/5">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, #0a0a0f 0%, #1a0a2e 40%, #0d1117 100%)" }} />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 0% 50%, rgba(124,58,237,0.18) 0%, transparent 60%)" }} />
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative max-w-7xl mx-auto px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-bold uppercase tracking-widest mb-6">
                <Star className="w-3 h-3" /> The Origin · Founded March 2026
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white leading-[1.05] mb-6">
                One man's vision.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-amber-400">An entire universe born.</span>
              </h2>
              <blockquote className="border-l-4 border-purple-500 pl-5 mb-6">
                <p className="text-white/80 text-lg leading-relaxed italic">
                  "I didn't just want to build a game. I wanted to build a world where the Bible came alive — where David's courage, Elijah's fire, and Joshua's boldness were things you could feel. Chronicles Reborn is that world."
                </p>
                <footer className="mt-3 text-purple-300 font-black text-sm tracking-wide">— RJ · Founder, RJ Rapture Labs</footer>
              </blockquote>
              <p className="text-white/60 leading-relaxed text-sm mb-6">
                RJ Rapture Labs was founded with a single mission: to create faith-based gaming experiences that don't compromise on quality, depth, or truth. Chronicles Reborn is the first title — a scripture-based anime battle game that has never been done before. The Rapture platform was built to give this community the home it deserves.
              </p>
              <div className="flex flex-wrap gap-6">
                {[
                  { label: "Founded", value: "March 2026" },
                  { label: "Studio", value: "RJ Rapture Labs" },
                  { label: "Mission", value: "Faith × Gaming" },
                ].map(item => (
                  <div key={item.label}>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest mb-1">{item.label}</div>
                    <div className="text-white font-black text-sm">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-purple-500/20 bg-purple-500/5 p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white text-3xl font-black border border-purple-500/30 shadow-xl shadow-purple-500/20 flex-shrink-0">
                    RJ
                  </div>
                  <div>
                    <div className="font-black text-white text-lg leading-tight">RJ</div>
                    <div className="text-purple-300 font-bold text-sm">Founder & Creator</div>
                    <div className="text-xs text-muted-foreground">RJ Rapture Labs · Est. 2026</div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                  {[
                    { icon: Swords, label: "Games Built", value: "1" },
                    { icon: Users, label: "Community", value: "Growing" },
                    { icon: BookOpen, label: "Scripture", value: "100%" },
                  ].map(({ icon: Icon, label, value }) => (
                    <div key={label} className="text-center">
                      <Icon className="w-4 h-4 text-purple-400 mx-auto mb-1" />
                      <div className="text-white font-black text-sm">{value}</div>
                      <div className="text-xs text-muted-foreground">{label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-amber-400/20 bg-amber-400/5 p-5">
                <div className="flex items-start gap-3">
                  <Flame className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-black text-white text-sm mb-1">The Founding Period Is Happening Now</div>
                    <p className="text-xs text-white/60 leading-relaxed">
                      This is the ground floor. The creators who join during this founding period will be permanently recognized as the original builders of the Chronicles Reborn universe. There will never be another founding period.
                    </p>
                  </div>
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">The Vision Road</div>
                <div className="space-y-3">
                  {[
                    { phase: "Phase 1", title: "Chronicles Reborn Launches", status: "complete", color: "text-green-400" },
                    { phase: "Phase 2", title: "Rapture Community Platform", status: "live", color: "text-amber-400" },
                    { phase: "Phase 3", title: "New Game Chapters + Animated Series", status: "next", color: "text-purple-400" },
                    { phase: "Phase 4", title: "RJ Rapture Labs Franchise Expansion", status: "future", color: "text-blue-400" },
                  ].map(({ phase, title, status, color }) => (
                    <div key={phase} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full flex-shrink-0 ${status === "complete" ? "bg-green-400" : status === "live" ? "bg-amber-400 animate-pulse" : "bg-white/20"}`} />
                      <div className="flex-1 min-w-0">
                        <span className={`text-xs font-bold ${color} mr-2`}>{phase}</span>
                        <span className="text-xs text-white/70">{title}</span>
                      </div>
                      {status === "live" && <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/30">LIVE</span>}
                      {status === "complete" && <span className="text-xs font-bold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full border border-green-400/30">DONE</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="relative rounded-2xl overflow-hidden border border-amber-400/20">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-950/60 via-orange-950/40 to-slate-900" />
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(234,179,8,0.15) 0%, transparent 60%)" }} />
          <div className="absolute top-0 right-0 bottom-0 w-1/2 opacity-20"
            style={{ background: "radial-gradient(ellipse at right, rgba(234,179,8,0.4) 0%, transparent 70%)" }} />

          <div className="relative z-10 p-8 md:p-10 md:flex items-center justify-between gap-8">
            <div className="max-w-xl mb-6 md:mb-0">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest mb-4">
                <Flame className="w-3 h-3" /> Founding Creators Wanted
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white mb-3 leading-tight">
                The original creators of this community<br />
                <span className="text-amber-400">will be remembered forever.</span>
              </h2>
              <p className="text-white/70 text-base leading-relaxed">
                We're looking for the first wave of fan artists, gameplay creators, strategy writers, and faith storytellers. The founding period is happening now — your name goes in the history books.
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
                data-testid="feature-banner-community"
              >
                <Link href="/chronicles?tab=community">
                  Join Community <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">What's Inside</div>
            <h2 className="text-2xl md:text-3xl font-black text-white">The Chronicles Ecosystem</h2>
          </div>
          <Link href="/chronicles">
            <Button variant="outline" size="sm" className="border-white/20 text-white hidden sm:inline-flex" data-testid="ecosystem-enter-hub">
              Enter Hub <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {platformFeatures.map(({ icon: Icon, title, description, color, href }) => (
            <Link key={title} href={href}>
              <div
                className="rounded-xl border border-white/10 bg-card p-5 hover:border-white/20 transition-all hover:scale-[1.01] cursor-pointer group h-full"
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

      {(challengesLoading || (challenges && challenges.length > 0)) && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-green-400 mb-2">Live Now</div>
              <h2 className="text-2xl font-black text-white">Active Challenges</h2>
              <p className="text-sm text-muted-foreground mt-1">Submit your entry and win exclusive Chronicles rewards.</p>
            </div>
            <Link href="/chronicles?tab=challenges">
              <Button variant="outline" size="sm" className="border-white/20 text-white" data-testid="challenges-view-all">
                All Challenges <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {challengesLoading && [1,2,3].map(i => (
              <div key={i} className="rounded-xl border border-green-500/20 bg-card p-5 space-y-3">
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-8 w-full rounded-lg" />
              </div>
            ))}
            {challenges?.slice(0, 3).map(challenge => {
              const typeIcons: Record<string, string> = { "fan art": "🎨", "clip": "🎮", "strategy": "🧠", "reflection": "📖" };
              const timeLeft = challenge.endDate && !isPast(new Date(challenge.endDate))
                ? formatDistanceToNow(new Date(challenge.endDate), { addSuffix: true })
                : null;
              return (
                <Link key={challenge.id} href="/chronicles?tab=challenges">
                  <div className="rounded-xl border border-green-500/20 bg-card p-5 hover:border-green-500/40 transition-all cursor-pointer group h-full" data-testid={`challenge-preview-${challenge.id}`}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-xl">{typeIcons[challenge.type] || "⚔️"}</span>
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold bg-green-500/20 text-green-300 border border-green-500/30">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                        </span>
                        Live
                      </div>
                    </div>
                    <h3 className="font-black text-white text-base mb-2 leading-tight">{challenge.title}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{challenge.description}</p>
                    {challenge.rewardText && (
                      <div className="flex items-center gap-2 p-2.5 rounded-lg bg-amber-400/10 border border-amber-400/20 mb-3">
                        <Trophy className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <p className="text-xs text-amber-300 font-medium line-clamp-1">{challenge.rewardText}</p>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      {timeLeft && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> Ends {timeLeft}
                        </span>
                      )}
                      <span className="text-green-400 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Enter <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {(postsLoading || (featuredPosts && featuredPosts.length > 0)) && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-purple-400 mb-2">Community</div>
              <h2 className="text-2xl font-black text-white">Featured Chronicles Content</h2>
              <p className="text-sm text-muted-foreground mt-1">The best fan art, gameplay clips, and reflections from the community.</p>
            </div>
            <Link href="/chronicles?tab=community">
              <Button variant="outline" size="sm" className="border-white/20 text-white" data-testid="posts-view-all">
                All Posts <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {postsLoading && [1,2,3,4,5,6].map(i => (
              <div key={i} className="rounded-xl border border-white/10 bg-card p-5 space-y-3">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            ))}
            {featuredPosts?.slice(0, 6).map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </section>
      )}

      {(creatorsLoading || (creators && creators.length > 0)) && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-end justify-between mb-6">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-2">Spotlight</div>
              <h2 className="text-2xl font-black text-white">Founding Creators</h2>
              <p className="text-sm text-muted-foreground mt-1">The original community builders shaping the Chronicles universe.</p>
            </div>
            <Link href="/chronicles?tab=creators">
              <Button variant="outline" size="sm" className="border-white/20 text-white" data-testid="creators-view-all">
                All Creators <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>

          {creatorsLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {[1,2,3].map(i => (
                <div key={i} className="rounded-xl border border-white/10 bg-card p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <Skeleton className="w-12 h-12 rounded-lg" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-3 w-1/3" />
                    </div>
                  </div>
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {creators?.slice(0, 3).map((creator, i) => (
              <CreatorSpotlightCard key={creator.id} creator={creator} rank={i + 1} />
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {creators?.slice(3, 6).map((creator) => {
              const avatarGradients = ["from-purple-500 to-blue-600", "from-amber-500 to-red-600", "from-emerald-500 to-cyan-600", "from-pink-500 to-purple-600", "from-blue-500 to-indigo-600", "from-orange-500 to-amber-600"];
              const gradient = avatarGradients[parseInt(creator.id.slice(-1), 16) % avatarGradients.length];
              return (
                <Link key={creator.id} href="/chronicles?tab=creators">
                  <div className="rounded-xl border border-white/10 bg-card p-4 hover:border-white/20 transition-all cursor-pointer" data-testid={`creator-mini-${creator.id}`}>
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} flex items-center justify-center text-white text-sm font-black flex-shrink-0`}>
                        {creator.displayName[0]}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold text-white text-sm truncate">{creator.displayName}</div>
                        <div className="text-xs text-muted-foreground">{creator.creatorType}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-white/10">
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Heart className="w-3 h-3 text-red-400" /> {creator.totalLikes?.toLocaleString()}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <FileText className="w-3 h-3 text-blue-400" /> {creator.totalPosts} posts
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/chronicles?tab=community">
            <div className="rounded-xl border border-purple-500/20 bg-purple-500/5 p-6 hover:border-purple-500/40 transition-all cursor-pointer group h-full" data-testid="cta-post-content">
              <Image className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-black text-white text-base mb-1">Post Your Content</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">Share fan art, gameplay clips, strategies, or Bible reflections.</p>
              <span className="text-xs font-bold text-purple-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Create a Post <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
          <Link href="/chronicles?tab=challenges">
            <div className="rounded-xl border border-green-500/20 bg-green-500/5 p-6 hover:border-green-500/40 transition-all cursor-pointer group h-full" data-testid="cta-join-challenge">
              <Trophy className="w-8 h-8 text-green-400 mb-3" />
              <h3 className="font-black text-white text-base mb-1">Win a Challenge</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">Compete in weekly challenges for exclusive badges and rewards.</p>
              <span className="text-xs font-bold text-green-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                View Challenges <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
          <Link href="/chronicles?tab=rewards">
            <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-6 hover:border-amber-500/40 transition-all cursor-pointer group h-full" data-testid="cta-earn-rewards">
              <Award className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="font-black text-white text-base mb-1">Earn Rewards</h3>
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">Collect badges from common to legendary. The Founding Creator badge won't last forever.</p>
              <span className="text-xs font-bold text-amber-400 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                See Rewards <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12 mb-8">
        <div className="relative rounded-2xl overflow-hidden p-10 md:p-14 text-center border border-purple-500/20"
          style={{ background: "linear-gradient(135deg, #0f0c29 0%, #1e1b4b 50%, #0f172a 100%)" }}>
          <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at center, rgba(124,58,237,0.2) 0%, transparent 65%)" }} />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles className="w-3 h-3" /> The Founding Period Is Now
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              Every community starts<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">with its founding creators.</span>
            </h2>
            <p className="text-white/60 max-w-xl mx-auto mb-8 text-base leading-relaxed">
              The creators who build the Chronicles Reborn community now will be the ones remembered when this universe grows. Post content, win challenges, earn badges. This is your moment.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button
                asChild
                size="lg"
                className="font-black bg-gradient-to-r from-purple-600 to-purple-500 border-0 px-8 shadow-lg shadow-purple-500/25"
                data-testid="final-cta-community"
              >
                <Link href="/chronicles?tab=community">
                  <Users className="w-4 h-4 mr-2" /> Join the Community
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/20 text-white px-8"
                data-testid="final-cta-play"
              >
                <a href="https://chronicles-reborn-rjrapturelabs.replit.app" target="_blank" rel="noopener noreferrer">
                  <Gamepad2 className="w-4 h-4 mr-2" /> Play the Demo
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-purple-800 flex items-center justify-center text-white font-black text-lg border border-purple-500/30">R</div>
                <div>
                  <div className="font-black text-white text-base leading-none">RAPTURE</div>
                  <div className="text-xs text-purple-400 font-medium">by RJ Rapture Labs</div>
                </div>
              </div>
              <p className="text-sm text-white/50 leading-relaxed max-w-xs mb-4">
                The official community platform for Chronicles Reborn — a scripture-based anime battle game built from the ground up by RJ Rapture Labs.
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-bold">
                <Zap className="w-3 h-3" /> Founded by RJ · March 2026
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Platform</div>
              <div className="space-y-2.5 text-sm">
                <Link href="/chronicles"><span className="text-white/60 hover:text-white transition-colors cursor-pointer block">Chronicles Hub</span></Link>
                <Link href="/chronicles?tab=community"><span className="text-white/60 hover:text-white transition-colors cursor-pointer block">Community</span></Link>
                <Link href="/chronicles?tab=challenges"><span className="text-white/60 hover:text-white transition-colors cursor-pointer block">Challenges</span></Link>
                <Link href="/chronicles?tab=rewards"><span className="text-white/60 hover:text-white transition-colors cursor-pointer block">Rewards</span></Link>
                <Link href="/chronicles?tab=leaderboard"><span className="text-white/60 hover:text-white transition-colors cursor-pointer block">Leaderboard</span></Link>
              </div>
            </div>
            <div>
              <div className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Chronicles Reborn</div>
              <div className="space-y-2.5 text-sm">
                <Link href="/chronicles?tab=lore"><span className="text-white/60 hover:text-white transition-colors cursor-pointer block">Lore Library</span></Link>
                <Link href="/chronicles?tab=creators"><span className="text-white/60 hover:text-white transition-colors cursor-pointer block">Creator Spotlight</span></Link>
                <Link href="/chronicles?tab=fan-art"><span className="text-white/60 hover:text-white transition-colors cursor-pointer block">Fan Art Gallery</span></Link>
                <a href="https://chronicles-reborn-rjrapturelabs.replit.app" target="_blank" rel="noopener noreferrer">
                  <span className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer block font-bold">Play Free Demo ↗</span>
                </a>
                <Link href="/auth"><span className="text-white/60 hover:text-white transition-colors cursor-pointer block">Sign Up / Register</span></Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="text-center md:text-left">
                <p className="text-xs text-white/30">
                  © 2026 RJ Rapture Labs. All rights reserved. Chronicles Reborn and Rapture are original creations of RJ Rapture Labs.
                </p>
                <p className="text-xs text-purple-400/60 mt-1 font-medium">
                  Built by one founder. For the faith. For the culture. For history.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-purple-900 flex items-center justify-center text-white font-black text-sm border border-purple-500/20">RJ</div>
                <div className="text-xs text-right">
                  <div className="text-white font-black">RJ Rapture Labs</div>
                  <div className="text-white/40">Founder & Creator · Est. 2026</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
