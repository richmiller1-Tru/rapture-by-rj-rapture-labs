import type { ChroniclesCharacter } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { Sword, Zap, Star } from "lucide-react";

interface CharacterCardProps {
  character: ChroniclesCharacter;
}

export function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div
      className="relative rounded-xl overflow-hidden border border-white/10 bg-card group hover:scale-[1.02] transition-all duration-300 cursor-pointer"
      style={{ boxShadow: `0 0 40px ${character.color}22` }}
      data-testid={`character-card-${character.id}`}
    >
      {/* Top gradient accent */}
      <div
        className="absolute top-0 left-0 right-0 h-1"
        style={{ background: `linear-gradient(90deg, transparent, ${character.color}, transparent)` }}
      />

      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
        style={{ background: `radial-gradient(ellipse at center, ${character.color}, transparent 70%)` }}
      />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <div
                className="w-3 h-3 rounded-full"
                style={{ background: character.color, boxShadow: `0 0 8px ${character.color}` }}
              />
              <span className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                {character.role}
              </span>
            </div>
            <h3 className="text-2xl font-black text-white tracking-tight">{character.name}</h3>
          </div>
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl font-black"
            style={{ background: `${character.color}20`, color: character.color, border: `1px solid ${character.color}40` }}
          >
            {character.name[0]}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {character.description}
        </p>

        {/* Signature Ability */}
        <div
          className="rounded-lg p-3 mb-3"
          style={{ background: `${character.color}12`, border: `1px solid ${character.color}25` }}
        >
          <div className="flex items-start gap-2">
            <Zap className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: character.color }} />
            <div>
              <div className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: character.color }}>
                Signature Ability
              </div>
              <p className="text-xs text-white/80">{character.signatureAbility}</p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-2 flex-wrap mt-3">
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400" />
            <span className="text-xs text-muted-foreground">{character.faithStyle}</span>
          </div>
          <div className="flex items-center gap-1">
            <Sword className="w-3 h-3 text-blue-400" />
            <span className="text-xs text-muted-foreground">{character.battleSpecialty}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
