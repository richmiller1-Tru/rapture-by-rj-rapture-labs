import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/chronicles/SectionHeader";
import { Play, Share2, MessageSquare, Gamepad2, Trophy, Swords, Shield, Music, BookOpen, Zap, Star, ExternalLink } from "lucide-react";
import { Link } from "wouter";

const features = [
  { icon: Swords, title: "10 Epic Battles", description: "Fight through scripture-based battles from David vs Goliath to Elijah vs the Prophets of Baal. Each battle is unique, challenging, and rooted in the Bible." },
  { icon: Shield, title: "6 Unique Heroes", description: "Play as David, Samson, Joshua, Gideon, Elijah, and unlock the Holy Spirit. Each hero has a unique playstyle and faith-powered abilities." },
  { icon: Zap, title: "Faith Power System", description: "Fill your faith meter through prayer sequences and scripture verses. Unleash devastating divine abilities at peak faith." },
  { icon: Trophy, title: "Boss Battles", description: "Face Goliath, the Armies of Jericho, the Midianites, and more. Every boss is a test of faith and strategy." },
  { icon: Music, title: "Original Soundtrack", description: "A fully original, cinematic battle soundtrack composed to match the epic scale of each biblical showdown." },
  { icon: BookOpen, title: "Scripture Integration", description: "Every ability, battle, and power is tied to actual Bible verses. Learn scripture through gameplay." },
];

const stats = [
  { value: "10", label: "Epic Battles" },
  { value: "6", label: "Playable Heroes" },
  { value: "100%", label: "Scripture-Based" },
  { value: "Free", label: "To Play Demo" },
];

export function PlayGameTab() {
  return (
    <div className="space-y-12">
      {/* Main Play Card */}
      <div className="relative rounded-2xl overflow-hidden border border-white/10">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-950/60 to-slate-900" />
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.2) 0%, transparent 70%)" }} />
        <div className="absolute top-0 right-0 bottom-0 w-1/3 opacity-30"
          style={{ background: "radial-gradient(ellipse at 80% 50%, rgba(234,179,8,0.3) 0%, transparent 70%)" }} />

        <div className="relative z-10 p-8 md:p-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/20 border border-green-500/40 text-green-300 text-xs font-bold uppercase tracking-widest mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              Live Demo Available Now
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight mb-4">
              Play <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Chronicles Reborn</span>
            </h2>
            <p className="text-white/70 text-lg mb-8 leading-relaxed">
              Jump straight into the free demo. No download required. Experience what it feels like when faith becomes a superpower.
            </p>

            <div className="flex flex-wrap gap-4 mb-8">
              <Button
                asChild
                size="lg"
                className="font-black text-lg h-14 px-8 bg-gradient-to-r from-amber-500 to-orange-500 text-black border-0 shadow-xl shadow-amber-500/30 hover:from-amber-400 hover:to-orange-400"
                data-testid="play-game-button"
              >
                <a href="https://chronicles-reborn-rjrapturelabs.replit.app" target="_blank" rel="noopener noreferrer">
                  <Play className="w-5 h-5 mr-2 fill-current" /> Launch Game Demo
                </a>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <div className="text-2xl font-black text-white">{value}</div>
                  <div className="text-xs text-muted-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Game Preview Frame */}
      <div className="rounded-2xl overflow-hidden border border-white/10 bg-card">
        <div className="px-5 py-4 border-b border-white/10 flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/60" />
            <div className="w-3 h-3 rounded-full bg-amber-500/60" />
            <div className="w-3 h-3 rounded-full bg-green-500/60" />
          </div>
          <span className="text-xs text-muted-foreground font-mono">chronicles-reborn-rjrapturelabs.replit.app</span>
        </div>

        {/* Iframe embed attempt */}
        <div className="relative w-full aspect-video bg-slate-900">
          <iframe
            src="https://chronicles-reborn-rjrapturelabs.replit.app"
            className="w-full h-full"
            title="Chronicles Reborn Game Demo"
            allow="fullscreen"
            style={{ border: "none" }}
          />
          {/* Fallback overlay that shows if iframe blocks */}
          <div className="absolute inset-0 flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-purple-950 hidden" id="game-fallback">
            <div className="text-center p-8">
              <Gamepad2 className="w-16 h-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-black text-white mb-2">Ready to Battle?</h3>
              <p className="text-white/60 mb-6">Click below to launch the Chronicles Reborn demo in a new window.</p>
              <Button asChild size="lg" className="font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-black border-0">
                <a href="https://chronicles-reborn-rjrapturelabs.replit.app" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" /> Open Game Demo
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Community CTAs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="rounded-xl border border-white/10 bg-card p-6 hover:border-purple-500/30 transition-colors">
          <Share2 className="w-8 h-8 text-purple-400 mb-3" />
          <h3 className="text-lg font-black text-white mb-2">Share Your Gameplay</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Record your best moments, upload clips, and let the community see your faith in action.
          </p>
          <Button asChild variant="outline" className="border-purple-500/30 text-purple-300" data-testid="share-gameplay-cta">
            <Link href="/chronicles?tab=community">Post a Gameplay Clip</Link>
          </Button>
        </div>

        <div className="rounded-xl border border-white/10 bg-card p-6 hover:border-amber-500/30 transition-colors">
          <MessageSquare className="w-8 h-8 text-amber-400 mb-3" />
          <h3 className="text-lg font-black text-white mb-2">Post Your Reaction</h3>
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
            Played a level and had a moment? Share your reaction, Bible reflection, or strategy with the community.
          </p>
          <Button asChild variant="outline" className="border-amber-500/30 text-amber-300" data-testid="post-reaction-cta">
            <Link href="/chronicles?tab=community">Post a Reaction</Link>
          </Button>
        </div>
      </div>

      {/* Feature List */}
      <div>
        <SectionHeader title="What's In the Game" subtitle="Every feature built on faith." badge="Game Content" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map(({ icon: Icon, title, description }) => (
            <div key={title} className="rounded-xl border border-white/10 bg-card p-5 hover:border-white/20 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-purple-500/20 border border-purple-500/30 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-purple-400" />
              </div>
              <h4 className="font-bold text-white mb-2">{title}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
