import type { ChroniclesChallenge } from "@shared/schema";
import { Calendar, Trophy, Users, Clock, Flame, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format, formatDistanceToNow, isPast } from "date-fns";

const statusConfig = {
  active: { label: "Live Now", color: "#22c55e", bg: "#22c55e20", border: "#22c55e40", pulse: true },
  upcoming: { label: "Coming Soon", color: "#f59e0b", bg: "#f59e0b20", border: "#f59e0b40", pulse: false },
  closed: { label: "Closed", color: "#6b7280", bg: "#6b728020", border: "#6b728040", pulse: false },
};

const typeIcons: Record<string, string> = {
  "fan art": "🎨",
  "clip": "🎮",
  "strategy": "🧠",
  "animation": "🎬",
  "reflection": "📖",
};

interface ChallengeCardProps {
  challenge: ChroniclesChallenge;
  onSubmit?: (challenge: ChroniclesChallenge) => void;
}

export function ChallengeCard({ challenge, onSubmit }: ChallengeCardProps) {
  const config = statusConfig[challenge.status as keyof typeof statusConfig] || statusConfig.upcoming;
  const typeIcon = typeIcons[challenge.type] || "⚔️";

  const timeLeft = challenge.endDate && !isPast(new Date(challenge.endDate))
    ? formatDistanceToNow(new Date(challenge.endDate), { addSuffix: true })
    : null;

  return (
    <div
      className="relative rounded-xl overflow-hidden border bg-card group hover:border-white/20 transition-all duration-300"
      style={{ borderColor: `${config.color}30` }}
      data-testid={`challenge-card-${challenge.id}`}
    >
      {/* Top bar */}
      <div className="h-1" style={{ background: `linear-gradient(90deg, ${config.color}, ${config.color}66)` }} />

      <div className="p-5">
        {/* Header row */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{typeIcon}</span>
            <div>
              <div
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-bold"
                style={{ background: config.bg, color: config.color, border: `1px solid ${config.border}` }}
              >
                {config.pulse && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: config.color }} />
                    <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: config.color }} />
                  </span>
                )}
                {config.label}
              </div>
            </div>
          </div>
          {challenge.submissionCount !== null && challenge.submissionCount !== undefined && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Users className="w-3.5 h-3.5" />
              {challenge.submissionCount} entries
            </div>
          )}
        </div>

        <h3 className="text-lg font-black text-white mb-2 leading-tight">{challenge.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3">
          {challenge.description}
        </p>

        {/* Theme */}
        {challenge.theme && (
          <div className="flex items-center gap-2 mb-3">
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span className="text-xs text-amber-300 font-medium">Theme: {challenge.theme}</span>
          </div>
        )}

        {/* Reward */}
        {challenge.rewardText && (
          <div className="flex items-start gap-2 mb-4 p-3 rounded-lg bg-amber-400/10 border border-amber-400/20">
            <Trophy className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-300 font-medium">{challenge.rewardText}</p>
          </div>
        )}

        {/* Dates */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
          {challenge.endDate && (
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {timeLeft ? `Ends ${timeLeft}` : `Ended ${format(new Date(challenge.endDate), "MMM d, yyyy")}`}
            </div>
          )}
          <span className="capitalize text-xs font-medium px-2 py-0.5 rounded bg-white/5">
            {challenge.type}
          </span>
        </div>

        {/* CTA */}
        {challenge.status === "active" && onSubmit && (
          <Button
            className="w-full text-sm font-bold"
            style={{ background: `linear-gradient(135deg, ${config.color}cc, ${config.color})` }}
            onClick={() => onSubmit(challenge)}
            data-testid={`submit-challenge-${challenge.id}`}
          >
            Submit Entry <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        )}
        {challenge.status === "upcoming" && (
          <Button variant="outline" className="w-full text-sm" disabled>
            Opens {challenge.startDate ? format(new Date(challenge.startDate), "MMM d") : "Soon"}
          </Button>
        )}
        {challenge.status === "closed" && (
          <Button variant="outline" className="w-full text-sm opacity-50" disabled>
            Challenge Closed
          </Button>
        )}
      </div>
    </div>
  );
}
