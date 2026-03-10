import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { seedDatabase } from "./seed";
import {
  insertChroniclesPostSchema,
  insertChroniclesChallengeSubmissionSchema,
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Seed the database on startup
  await seedDatabase();

  // ---- Characters ----
  app.get("/api/chronicles/characters", async (req, res) => {
    try {
      const characters = await storage.getCharacters();
      res.json(characters);
    } catch (e) {
      res.status(500).json({ error: "Failed to get characters" });
    }
  });

  // ---- Battles ----
  app.get("/api/chronicles/battles", async (req, res) => {
    try {
      const battles = await storage.getBattles();
      res.json(battles);
    } catch (e) {
      res.status(500).json({ error: "Failed to get battles" });
    }
  });

  // ---- Posts ----
  app.get("/api/chronicles/posts", async (req, res) => {
    try {
      const { filter, category } = req.query;
      const posts = await storage.getPosts(
        filter as string | undefined,
        category as string | undefined
      );
      res.json(posts);
    } catch (e) {
      res.status(500).json({ error: "Failed to get posts" });
    }
  });

  app.get("/api/chronicles/posts/featured", async (req, res) => {
    try {
      const posts = await storage.getFeaturedPosts();
      res.json(posts);
    } catch (e) {
      res.status(500).json({ error: "Failed to get featured posts" });
    }
  });

  app.post("/api/chronicles/posts", async (req, res) => {
    try {
      const parsed = insertChroniclesPostSchema.safeParse(req.body);
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
      }
      const post = await storage.createPost(parsed.data);
      res.status(201).json(post);
    } catch (e) {
      res.status(500).json({ error: "Failed to create post" });
    }
  });

  app.post("/api/chronicles/posts/:id/like", async (req, res) => {
    try {
      const post = await storage.likePost(req.params.id);
      res.json(post);
    } catch (e) {
      res.status(500).json({ error: "Failed to like post" });
    }
  });

  // ---- Challenges ----
  app.get("/api/chronicles/challenges", async (req, res) => {
    try {
      const { status } = req.query;
      const challenges = await storage.getChallenges(status as string | undefined);
      res.json(challenges);
    } catch (e) {
      res.status(500).json({ error: "Failed to get challenges" });
    }
  });

  app.get("/api/chronicles/challenges/:id", async (req, res) => {
    try {
      const challenge = await storage.getChallenge(req.params.id);
      if (!challenge) return res.status(404).json({ error: "Not found" });
      res.json(challenge);
    } catch (e) {
      res.status(500).json({ error: "Failed to get challenge" });
    }
  });

  app.post("/api/chronicles/challenges/:id/submit", async (req, res) => {
    try {
      const parsed = insertChroniclesChallengeSubmissionSchema.safeParse({
        ...req.body,
        challengeId: req.params.id,
      });
      if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
      }
      const submission = await storage.submitToChallenge(parsed.data);
      res.status(201).json(submission);
    } catch (e) {
      res.status(500).json({ error: "Failed to submit to challenge" });
    }
  });

  app.get("/api/chronicles/challenges/:id/submissions", async (req, res) => {
    try {
      const submissions = await storage.getChallengeSubmissions(req.params.id);
      res.json(submissions);
    } catch (e) {
      res.status(500).json({ error: "Failed to get submissions" });
    }
  });

  // ---- Rewards ----
  app.get("/api/chronicles/rewards", async (req, res) => {
    try {
      const rewards = await storage.getRewards();
      res.json(rewards);
    } catch (e) {
      res.status(500).json({ error: "Failed to get rewards" });
    }
  });

  // ---- Creator Profiles ----
  app.get("/api/chronicles/creators", async (req, res) => {
    try {
      const { featured } = req.query;
      const creators = await storage.getCreatorProfiles(featured === "true");
      res.json(creators);
    } catch (e) {
      res.status(500).json({ error: "Failed to get creators" });
    }
  });

  // ---- Leaderboard ----
  app.get("/api/chronicles/leaderboard", async (req, res) => {
    try {
      const { period } = req.query;
      const leaderboard = await storage.getLeaderboard(period as string | undefined);
      res.json(leaderboard);
    } catch (e) {
      res.status(500).json({ error: "Failed to get leaderboard" });
    }
  });

  return httpServer;
}
