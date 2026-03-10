import { db } from "./db";
import { eq, desc, ilike, and, or, sql } from "drizzle-orm";
import {
  users, type User, type InsertUser,
  chroniclesCharacters, type ChroniclesCharacter, type InsertChroniclesCharacter,
  chroniclesBattles, type ChroniclesBattle, type InsertChroniclesBattle,
  chroniclesPosts, type ChroniclesPost, type InsertChroniclesPost,
  chroniclesChallenges, type ChroniclesChallenge, type InsertChroniclesChallenge,
  chroniclesChallengeSubmissions, type ChroniclesChallengeSubmission, type InsertChroniclesChallengeSubmission,
  chroniclesRewards, type ChroniclesReward, type InsertChroniclesReward,
  userChroniclesRewards, type UserChroniclesReward, type InsertUserChroniclesReward,
  chroniclesCreatorProfiles, type ChroniclesCreatorProfile, type InsertChroniclesCreatorProfile,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Characters
  getCharacters(): Promise<ChroniclesCharacter[]>;
  getCharacter(id: string): Promise<ChroniclesCharacter | undefined>;
  createCharacter(char: InsertChroniclesCharacter): Promise<ChroniclesCharacter>;

  // Battles
  getBattles(): Promise<ChroniclesBattle[]>;
  getBattle(id: string): Promise<ChroniclesBattle | undefined>;
  createBattle(battle: InsertChroniclesBattle): Promise<ChroniclesBattle>;

  // Posts
  getPosts(filter?: string, category?: string): Promise<ChroniclesPost[]>;
  getPost(id: string): Promise<ChroniclesPost | undefined>;
  createPost(post: InsertChroniclesPost): Promise<ChroniclesPost>;
  likePost(id: string): Promise<ChroniclesPost>;
  getFeaturedPosts(): Promise<ChroniclesPost[]>;

  // Challenges
  getChallenges(status?: string): Promise<ChroniclesChallenge[]>;
  getChallenge(id: string): Promise<ChroniclesChallenge | undefined>;
  createChallenge(challenge: InsertChroniclesChallenge): Promise<ChroniclesChallenge>;
  submitToChallenge(submission: InsertChroniclesChallengeSubmission): Promise<ChroniclesChallengeSubmission>;
  getChallengeSubmissions(challengeId: string): Promise<ChroniclesChallengeSubmission[]>;

  // Rewards
  getRewards(): Promise<ChroniclesReward[]>;
  createChroniclesReward(reward: InsertChroniclesReward): Promise<ChroniclesReward>;
  getUserRewards(userId: string): Promise<UserChroniclesReward[]>;
  unlockReward(data: InsertUserChroniclesReward): Promise<UserChroniclesReward>;

  // Creator Profiles
  getCreatorProfiles(featured?: boolean): Promise<ChroniclesCreatorProfile[]>;
  getCreatorProfile(id: string): Promise<ChroniclesCreatorProfile | undefined>;
  createCreatorProfile(profile: InsertChroniclesCreatorProfile): Promise<ChroniclesCreatorProfile>;

  // Leaderboard
  getLeaderboard(period?: string): Promise<ChroniclesCreatorProfile[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values({ ...insertUser, id: randomUUID() }).returning();
    return user;
  }

  async getCharacters(): Promise<ChroniclesCharacter[]> {
    return db.select().from(chroniclesCharacters).orderBy(chroniclesCharacters.name);
  }

  async getCharacter(id: string): Promise<ChroniclesCharacter | undefined> {
    const [char] = await db.select().from(chroniclesCharacters).where(eq(chroniclesCharacters.id, id));
    return char;
  }

  async createCharacter(char: InsertChroniclesCharacter): Promise<ChroniclesCharacter> {
    const [created] = await db.insert(chroniclesCharacters).values({ ...char, id: randomUUID() }).returning();
    return created;
  }

  async getBattles(): Promise<ChroniclesBattle[]> {
    return db.select().from(chroniclesBattles).orderBy(desc(chroniclesBattles.featured));
  }

  async getBattle(id: string): Promise<ChroniclesBattle | undefined> {
    const [battle] = await db.select().from(chroniclesBattles).where(eq(chroniclesBattles.id, id));
    return battle;
  }

  async createBattle(battle: InsertChroniclesBattle): Promise<ChroniclesBattle> {
    const [created] = await db.insert(chroniclesBattles).values({ ...battle, id: randomUUID() }).returning();
    return created;
  }

  async getPosts(filter?: string, category?: string): Promise<ChroniclesPost[]> {
    let query = db.select().from(chroniclesPosts);
    const conditions = [eq(chroniclesPosts.moderationStatus, "approved")];
    if (category && category !== "all") {
      conditions.push(eq(chroniclesPosts.category, category));
    }
    if (filter === "featured") {
      conditions.push(eq(chroniclesPosts.featured, true));
    }
    const results = await query.where(and(...conditions));
    if (filter === "trending") {
      return results.sort((a, b) => (b.likes ?? 0) - (a.likes ?? 0));
    }
    return results.sort((a, b) => new Date(b.createdAt!).getTime() - new Date(a.createdAt!).getTime());
  }

  async getPost(id: string): Promise<ChroniclesPost | undefined> {
    const [post] = await db.select().from(chroniclesPosts).where(eq(chroniclesPosts.id, id));
    return post;
  }

  async createPost(post: InsertChroniclesPost): Promise<ChroniclesPost> {
    const [created] = await db.insert(chroniclesPosts).values({ ...post, id: randomUUID() }).returning();
    return created;
  }

  async likePost(id: string): Promise<ChroniclesPost> {
    const [updated] = await db
      .update(chroniclesPosts)
      .set({ likes: sql`${chroniclesPosts.likes} + 1` })
      .where(eq(chroniclesPosts.id, id))
      .returning();
    return updated;
  }

  async getFeaturedPosts(): Promise<ChroniclesPost[]> {
    return db.select().from(chroniclesPosts)
      .where(and(eq(chroniclesPosts.featured, true), eq(chroniclesPosts.moderationStatus, "approved")))
      .limit(6)
      .orderBy(desc(chroniclesPosts.createdAt));
  }

  async getChallenges(status?: string): Promise<ChroniclesChallenge[]> {
    if (status) {
      return db.select().from(chroniclesChallenges)
        .where(eq(chroniclesChallenges.status, status))
        .orderBy(desc(chroniclesChallenges.createdAt));
    }
    return db.select().from(chroniclesChallenges).orderBy(desc(chroniclesChallenges.createdAt));
  }

  async getChallenge(id: string): Promise<ChroniclesChallenge | undefined> {
    const [ch] = await db.select().from(chroniclesChallenges).where(eq(chroniclesChallenges.id, id));
    return ch;
  }

  async createChallenge(challenge: InsertChroniclesChallenge): Promise<ChroniclesChallenge> {
    const [created] = await db.insert(chroniclesChallenges).values({ ...challenge, id: randomUUID() }).returning();
    return created;
  }

  async submitToChallenge(submission: InsertChroniclesChallengeSubmission): Promise<ChroniclesChallengeSubmission> {
    const [created] = await db.insert(chroniclesChallengeSubmissions).values({ ...submission, id: randomUUID() }).returning();
    // Increment submission count
    await db.update(chroniclesChallenges)
      .set({ submissionCount: sql`${chroniclesChallenges.submissionCount} + 1` })
      .where(eq(chroniclesChallenges.id, submission.challengeId));
    return created;
  }

  async getChallengeSubmissions(challengeId: string): Promise<ChroniclesChallengeSubmission[]> {
    return db.select().from(chroniclesChallengeSubmissions)
      .where(eq(chroniclesChallengeSubmissions.challengeId, challengeId))
      .orderBy(desc(chroniclesChallengeSubmissions.createdAt));
  }

  async getRewards(): Promise<ChroniclesReward[]> {
    return db.select().from(chroniclesRewards).orderBy(chroniclesRewards.name);
  }

  async createChroniclesReward(reward: InsertChroniclesReward): Promise<ChroniclesReward> {
    const [created] = await db.insert(chroniclesRewards).values({ ...reward, id: randomUUID() }).returning();
    return created;
  }

  async getUserRewards(userId: string): Promise<UserChroniclesReward[]> {
    return db.select().from(userChroniclesRewards).where(eq(userChroniclesRewards.userId, userId));
  }

  async unlockReward(data: InsertUserChroniclesReward): Promise<UserChroniclesReward> {
    const [created] = await db.insert(userChroniclesRewards).values({ ...data, id: randomUUID() }).returning();
    return created;
  }

  async getCreatorProfiles(featured?: boolean): Promise<ChroniclesCreatorProfile[]> {
    if (featured) {
      return db.select().from(chroniclesCreatorProfiles)
        .where(eq(chroniclesCreatorProfiles.featured, true))
        .orderBy(desc(chroniclesCreatorProfiles.totalLikes));
    }
    return db.select().from(chroniclesCreatorProfiles).orderBy(desc(chroniclesCreatorProfiles.totalLikes));
  }

  async getCreatorProfile(id: string): Promise<ChroniclesCreatorProfile | undefined> {
    const [profile] = await db.select().from(chroniclesCreatorProfiles).where(eq(chroniclesCreatorProfiles.id, id));
    return profile;
  }

  async createCreatorProfile(profile: InsertChroniclesCreatorProfile): Promise<ChroniclesCreatorProfile> {
    const [created] = await db.insert(chroniclesCreatorProfiles).values({ ...profile, id: randomUUID() }).returning();
    return created;
  }

  async getLeaderboard(period?: string): Promise<ChroniclesCreatorProfile[]> {
    return db.select().from(chroniclesCreatorProfiles)
      .orderBy(desc(chroniclesCreatorProfiles.totalLikes))
      .limit(20);
  }
}

export const storage = new DatabaseStorage();
