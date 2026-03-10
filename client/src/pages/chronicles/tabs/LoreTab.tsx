import { useQuery } from "@tanstack/react-query";
import type { ChroniclesCharacter, ChroniclesBattle } from "@shared/schema";
import { SectionHeader } from "@/components/chronicles/SectionHeader";
import { CharacterCard } from "@/components/chronicles/CharacterCard";
import { BattleCard } from "@/components/chronicles/BattleCard";
import { EmptyState } from "@/components/chronicles/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Swords, Users } from "lucide-react";
import { useState } from "react";

export function LoreTab() {
  const [view, setView] = useState<"characters" | "battles">("characters");

  const { data: characters, isLoading: charsLoading } = useQuery<ChroniclesCharacter[]>({
    queryKey: ["/api/chronicles/characters"],
  });

  const { data: battles, isLoading: battlesLoading } = useQuery<ChroniclesBattle[]>({
    queryKey: ["/api/chronicles/battles"],
  });

  const featuredBattles = battles?.filter(b => b.featured) || [];
  const otherBattles = battles?.filter(b => !b.featured) || [];

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-4">
        <SectionHeader
          title="Lore & Characters"
          subtitle="The heroes, battles, and sacred history behind the Chronicles Reborn universe."
          badge="Lore Library"
        />
        <div className="flex gap-1.5 p-1 bg-white/5 rounded-lg border border-white/10">
          <button
            onClick={() => setView("characters")}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded transition-all ${view === "characters" ? "bg-purple-600 text-white" : "text-muted-foreground hover:text-white"}`}
            data-testid="view-characters"
          >
            <Users className="w-3.5 h-3.5" /> Characters
          </button>
          <button
            onClick={() => setView("battles")}
            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold rounded transition-all ${view === "battles" ? "bg-purple-600 text-white" : "text-muted-foreground hover:text-white"}`}
            data-testid="view-battles"
          >
            <Swords className="w-3.5 h-3.5" /> Battles
          </button>
        </div>
      </div>

      {/* Lore intro */}
      <div className="relative rounded-xl overflow-hidden border border-white/10 p-6"
        style={{ background: "linear-gradient(135deg, rgba(15,23,42,0.9) 0%, rgba(30,27,75,0.8) 100%)" }}>
        <div className="absolute inset-0" style={{ background: "radial-gradient(ellipse at top left, rgba(124,58,237,0.1) 0%, transparent 70%)" }} />
        <div className="relative z-10 flex items-start gap-4">
          <BookOpen className="w-8 h-8 text-purple-400 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-lg font-black text-white mb-2">The Chronicles Universe</h3>
            <p className="text-sm text-white/70 leading-relaxed">
              Chronicles Reborn is a scripture-based anime battle game where the greatest heroes of the Bible battle through history's most legendary moments of faith. Every character, every power, every battle is rooted in the living Word of God. This is not just a game — it's a new way to experience the Bible.
            </p>
          </div>
        </div>
      </div>

      {/* Characters View */}
      {view === "characters" && (
        <div>
          <h3 className="text-lg font-black text-white mb-5">The Six Heroes of Faith</h3>
          {charsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-72 rounded-xl" />)}
            </div>
          ) : !characters || characters.length === 0 ? (
            <EmptyState icon="⚔️" title="No characters found" description="Character data is loading..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {characters.map(char => <CharacterCard key={char.id} character={char} />)}
            </div>
          )}
        </div>
      )}

      {/* Battles View */}
      {view === "battles" && (
        <div className="space-y-8">
          {/* Featured battles */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-5 bg-amber-400 rounded-full" />
              <h3 className="text-base font-black text-white">Legendary Battles</h3>
            </div>
            {battlesLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-56 rounded-xl" />)}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {featuredBattles.map(battle => <BattleCard key={battle.id} battle={battle} />)}
              </div>
            )}
          </div>

          {/* Other battles */}
          {otherBattles.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-1 h-5 bg-blue-400 rounded-full" />
                <h3 className="text-base font-black text-white">More Battles</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {otherBattles.map(battle => <BattleCard key={battle.id} battle={battle} />)}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
