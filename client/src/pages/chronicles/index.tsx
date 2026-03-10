import { useState, useEffect } from "react";
import { OverviewTab } from "./tabs/OverviewTab";
import { PlayGameTab } from "./tabs/PlayGameTab";
import { CommunityTab } from "./tabs/CommunityTab";
import { FanArtTab } from "./tabs/FanArtTab";
import { GameplayTab } from "./tabs/GameplayTab";
import { ChallengesTab } from "./tabs/ChallengesTab";
import { RewardsTab } from "./tabs/RewardsTab";
import { FeaturedCreatorsTab } from "./tabs/FeaturedCreatorsTab";
import { LeaderboardTab } from "./tabs/LeaderboardTab";
import { LoreTab } from "./tabs/LoreTab";
import { Button } from "@/components/ui/button";
import { Home, Play, Users, Image, Gamepad2, Trophy, Star, Award, BarChart3, BookOpen, Menu, X, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const tabs = [
  { id: "overview", label: "Overview", icon: Home, shortLabel: "Overview" },
  { id: "play", label: "Play Game", icon: Play, shortLabel: "Play" },
  { id: "community", label: "Community", icon: Users, shortLabel: "Community" },
  { id: "fanart", label: "Fan Art", icon: Image, shortLabel: "Fan Art" },
  { id: "gameplay", label: "Gameplay Clips", icon: Gamepad2, shortLabel: "Clips" },
  { id: "challenges", label: "Challenges", icon: Trophy, shortLabel: "Challenges" },
  { id: "rewards", label: "Rewards", icon: Award, shortLabel: "Rewards" },
  { id: "creators", label: "Featured Creators", icon: Star, shortLabel: "Creators" },
  { id: "leaderboard", label: "Leaderboard", icon: BarChart3, shortLabel: "Ranks" },
  { id: "lore", label: "Lore & Characters", icon: BookOpen, shortLabel: "Lore" },
];

function TabContent({ tab }: { tab: string }) {
  switch (tab) {
    case "overview": return <OverviewTab />;
    case "play": return <PlayGameTab />;
    case "community": return <CommunityTab />;
    case "fanart": return <FanArtTab />;
    case "gameplay": return <GameplayTab />;
    case "challenges": return <ChallengesTab />;
    case "rewards": return <RewardsTab />;
    case "creators": return <FeaturedCreatorsTab />;
    case "leaderboard": return <LeaderboardTab />;
    case "lore": return <LoreTab />;
    default: return <OverviewTab />;
  }
}

function getTabFromUrl(): string {
  const params = new URLSearchParams(window.location.search);
  return params.get("tab") || "overview";
}

export default function ChroniclesHub() {
  const [activeTab, setActiveTab] = useState(getTabFromUrl);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  useEffect(() => {
    const handlePopState = () => setActiveTab(getTabFromUrl());
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const tab = getTabFromUrl();
    if (tab !== activeTab) setActiveTab(tab);
  }, []);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const url = tabId === "overview" ? "/chronicles" : `/chronicles?tab=${tabId}`;
    window.history.pushState({}, "", url);
  };

  const currentTab = tabs.find(t => t.id === activeTab) || tabs[0];

  return (
    <div className="min-h-screen bg-background">
      {/* Top nav bar */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-background/95 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link href="/">
              <button className="flex items-center gap-2 text-muted-foreground hover:text-white transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">Rapture</span>
              </button>
            </Link>
            <div className="h-4 w-px bg-white/15" />
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-black text-xs font-black">CR</div>
              <span className="font-black text-white text-sm tracking-tight">Chronicles Reborn Hub</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              asChild
              size="sm"
              className="hidden sm:inline-flex font-bold bg-gradient-to-r from-amber-500 to-orange-500 text-black border-0 text-xs"
            >
              <a href="https://chronicles-reborn-rjrapturelabs.replit.app" target="_blank" rel="noopener noreferrer">
                <Play className="w-3 h-3 mr-1.5 fill-current" /> Play Now
              </a>
            </Button>
            <button
              className="md:hidden p-2 rounded-lg border border-white/10 text-muted-foreground hover:text-white"
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              data-testid="mobile-nav-toggle"
            >
              {mobileNavOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile nav dropdown */}
        {mobileNavOpen && (
          <div className="md:hidden border-t border-white/10 bg-background px-4 py-3 grid grid-cols-2 gap-1.5">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => { handleTabChange(tab.id); setMobileNavOpen(false); }}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-purple-600/30 text-white border border-purple-500/30"
                    : "text-muted-foreground hover:text-white hover:bg-white/5"
                }`}
                data-testid={`mobile-tab-${tab.id}`}
              >
                <tab.icon className="w-4 h-4 flex-shrink-0" />
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 flex gap-0 md:gap-6 py-6">
        {/* Sidebar nav — desktop */}
        <aside className="hidden md:block w-52 flex-shrink-0">
          <nav className="sticky top-20 space-y-1">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm font-medium transition-all hover-elevate ${
                  activeTab === tab.id
                    ? "bg-purple-600/25 text-white border border-purple-500/30"
                    : "text-muted-foreground hover:text-white hover:bg-white/5 border border-transparent"
                }`}
                data-testid={`sidebar-tab-${tab.id}`}
              >
                <tab.icon className={`w-4 h-4 flex-shrink-0 ${activeTab === tab.id ? "text-purple-400" : ""}`} />
                {tab.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-w-0">
          {/* Mobile horizontal scroll tabs */}
          <div className="md:hidden mb-6 overflow-x-auto pb-1">
            <div className="flex gap-1.5 w-max">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? "bg-purple-600 text-white"
                      : "bg-white/5 text-muted-foreground hover:text-white border border-white/10"
                  }`}
                  data-testid={`mobile-scroll-tab-${tab.id}`}
                >
                  <tab.icon className="w-3.5 h-3.5" />
                  {tab.shortLabel}
                </button>
              ))}
            </div>
          </div>

          <TabContent tab={activeTab} />
        </main>
      </div>
    </div>
  );
}
