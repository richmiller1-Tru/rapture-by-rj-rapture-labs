import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Chronicles Characters
export const chroniclesCharacters = pgTable("chronicles_characters", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  role: text("role").notNull(),
  description: text("description").notNull(),
  signatureAbility: text("signature_ability").notNull(),
  faithStyle: text("faith_style").notNull(),
  battleSpecialty: text("battle_specialty").notNull(),
  imageUrl: text("image_url"),
  color: text("color").notNull().default("#7c3aed"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertChroniclesCharacterSchema = createInsertSchema(chroniclesCharacters).omit({ id: true, createdAt: true });
export type InsertChroniclesCharacter = z.infer<typeof insertChroniclesCharacterSchema>;
export type ChroniclesCharacter = typeof chroniclesCharacters.$inferSelect;

// Chronicles Battles
export const chroniclesBattles = pgTable("chronicles_battles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  heroes: text("heroes").array().notNull().default(sql`'{}'::text[]`),
  enemies: text("enemies").array().notNull().default(sql`'{}'::text[]`),
  scripture: text("scripture"),
  imageUrl: text("image_url"),
  difficulty: text("difficulty").notNull().default("medium"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertChroniclesBattleSchema = createInsertSchema(chroniclesBattles).omit({ id: true, createdAt: true });
export type InsertChroniclesBattle = z.infer<typeof insertChroniclesBattleSchema>;
export type ChroniclesBattle = typeof chroniclesBattles.$inferSelect;

// Chronicles Posts
export const chroniclesPosts = pgTable("chronicles_posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  authorName: text("author_name").notNull().default("Anonymous"),
  authorAvatar: text("author_avatar"),
  title: text("title").notNull(),
  content: text("content").notNull(),
  category: text("category").notNull(),
  mediaUrl: text("media_url"),
  videoUrl: text("video_url"),
  thumbnailUrl: text("thumbnail_url"),
  tags: text("tags").array().default(sql`'{}'::text[]`),
  battleTag: text("battle_tag"),
  heroTag: text("hero_tag"),
  featured: boolean("featured").default(false),
  moderationStatus: text("moderation_status").default("approved"),
  likes: integer("likes").default(0),
  comments: integer("comments").default(0),
  shares: integer("shares").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertChroniclesPostSchema = createInsertSchema(chroniclesPosts).omit({ id: true, createdAt: true, updatedAt: true, likes: true, comments: true, shares: true });
export type InsertChroniclesPost = z.infer<typeof insertChroniclesPostSchema>;
export type ChroniclesPost = typeof chroniclesPosts.$inferSelect;

// Chronicles Challenges
export const chroniclesChallenges = pgTable("chronicles_challenges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  type: text("type").notNull(),
  theme: text("theme"),
  rewardText: text("reward_text"),
  bannerUrl: text("banner_url"),
  status: text("status").notNull().default("upcoming"),
  startDate: timestamp("start_date"),
  endDate: timestamp("end_date"),
  submissionCount: integer("submission_count").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertChroniclesChallengeSchema = createInsertSchema(chroniclesChallenges).omit({ id: true, createdAt: true, updatedAt: true, submissionCount: true });
export type InsertChroniclesChallenge = z.infer<typeof insertChroniclesChallengeSchema>;
export type ChroniclesChallenge = typeof chroniclesChallenges.$inferSelect;

// Chronicles Challenge Submissions
export const chroniclesChallengeSubmissions = pgTable("chronicles_challenge_submissions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  challengeId: varchar("challenge_id").notNull(),
  userId: varchar("user_id"),
  authorName: text("author_name").notNull().default("Anonymous"),
  title: text("title").notNull(),
  content: text("content"),
  mediaUrl: text("media_url"),
  featured: boolean("featured").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertChroniclesChallengeSubmissionSchema = createInsertSchema(chroniclesChallengeSubmissions).omit({ id: true, createdAt: true });
export type InsertChroniclesChallengeSubmission = z.infer<typeof insertChroniclesChallengeSubmissionSchema>;
export type ChroniclesChallengeSubmission = typeof chroniclesChallengeSubmissions.$inferSelect;

// Chronicles Rewards
export const chroniclesRewards = pgTable("chronicles_rewards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  rewardType: text("reward_type").notNull(),
  unlockRule: text("unlock_rule").notNull(),
  rarity: text("rarity").notNull().default("common"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertChroniclesRewardSchema = createInsertSchema(chroniclesRewards).omit({ id: true, createdAt: true });
export type InsertChroniclesReward = z.infer<typeof insertChroniclesRewardSchema>;
export type ChroniclesReward = typeof chroniclesRewards.$inferSelect;

// User Rewards (unlocked)
export const userChroniclesRewards = pgTable("user_chronicles_rewards", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  rewardId: varchar("reward_id").notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow(),
});

export const insertUserChroniclesRewardSchema = createInsertSchema(userChroniclesRewards).omit({ id: true, unlockedAt: true });
export type InsertUserChroniclesReward = z.infer<typeof insertUserChroniclesRewardSchema>;
export type UserChroniclesReward = typeof userChroniclesRewards.$inferSelect;

// Chronicles Creator Profiles
export const chroniclesCreatorProfiles = pgTable("chronicles_creator_profiles", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  displayName: text("display_name").notNull(),
  avatar: text("avatar"),
  creatorType: text("creator_type").notNull(),
  bio: text("bio"),
  badges: text("badges").array().default(sql`'{}'::text[]`),
  featured: boolean("featured").default(false),
  totalLikes: integer("total_likes").default(0),
  totalPosts: integer("total_posts").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertChroniclesCreatorProfileSchema = createInsertSchema(chroniclesCreatorProfiles).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertChroniclesCreatorProfile = z.infer<typeof insertChroniclesCreatorProfileSchema>;
export type ChroniclesCreatorProfile = typeof chroniclesCreatorProfiles.$inferSelect;
