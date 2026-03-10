# Rapture — Chronicles Reborn Hub

**Platform:** Rapture by RJ Rapture Labs  
**Stack:** React + TypeScript + Express + PostgreSQL (Drizzle ORM) + Tailwind + shadcn/ui

## What This Is

Rapture is the official platform home for **Chronicles Reborn** — a scripture-based anime battle game by RJ Rapture Labs. The platform serves as a growth engine, community hub, and content ecosystem for the game.

## Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero section, Chronicles feature banner, community posts, creator spotlight |
| `/chronicles` | Chronicles Reborn Hub (main hub with 10-tab navigation) |
| `/chronicles?tab=overview` | Game overview, hero banner, characters, featured battles |
| `/chronicles?tab=play` | Play game — iframe embed + demo launch + community CTAs |
| `/chronicles?tab=community` | Full community feed — create posts, like, filter by category |
| `/chronicles?tab=fanart` | Fan art gallery — masonry grid, featured art, modal viewer |
| `/chronicles?tab=gameplay` | Gameplay clips — hero filter, post clips |
| `/chronicles?tab=challenges` | Weekly challenges — active/upcoming/closed, submit entries |
| `/chronicles?tab=rewards` | Rewards system — badges, rarities, unlock journey |
| `/chronicles?tab=creators` | Featured creators spotlight |
| `/chronicles?tab=leaderboard` | Leaderboard with podium display and full rankings |
| `/chronicles?tab=lore` | Characters + battles lore library |

## Architecture

- **Frontend:** React (Vite), wouter for routing, TanStack Query v5 for data fetching, shadcn/ui components
- **Backend:** Express.js with RESTful API routes prefixed `/api/`
- **Database:** PostgreSQL with Drizzle ORM (drizzle-zod for validation)
- **Styling:** Tailwind CSS, dark mode default, purple primary theme with amber/gold accents

## Database Tables

- `users` — core user table
- `chronicles_characters` — 6 playable biblical heroes  
- `chronicles_battles` — 10 scripture-based battles
- `chronicles_posts` — community posts (fan art, gameplay, lore, etc.)
- `chronicles_challenges` — weekly challenge events
- `chronicles_challenge_submissions` — user entries to challenges
- `chronicles_rewards` — badge/reward definitions
- `user_chronicles_rewards` — unlocked rewards per user
- `chronicles_creator_profiles` — featured creator profiles

## Key Components

All in `client/src/components/chronicles/`:
- `CharacterCard` — hero profile cards with faith abilities
- `BattleCard` — battle entries with scripture references
- `PostCard` — community post cards with like functionality  
- `ChallengeCard` — challenge display with live status and countdown
- `RewardCard` — reward cards with rarity system (common → legendary)
- `CreatorSpotlightCard` — creator profiles with badges/stats
- `LeaderboardTable` — ranked creator table with podium display
- `SectionHeader` — consistent section headings
- `EmptyState` — empty state UI component

## Seed Data

Database seeds automatically on first startup (checks if characters exist to prevent duplicates):
- 6 characters (David, Samson, Joshua, Gideon, Elijah, Holy Spirit)
- 10 battles (all major biblical battles)
- 8 community posts (fan art, strategy guides, clips, reflections)
- 5 challenges (active + upcoming)
- 10 rewards (common to legendary)
- 6 featured creator profiles

## Design

- **Dark mode** by default (game/anime aesthetic)
- **Primary color:** Purple (#7c3aed)
- **Accent color:** Amber/Gold (#f59e0b, #ea580c)
- **Typography:** Open Sans (body), heavy font weights for headings
- **Mobile-first** responsive design with collapsible sidebar navigation
