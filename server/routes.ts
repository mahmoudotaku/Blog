import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { chatWithGemini } from "./services/gemini";
import { insertChatMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat with Gemini AI
  app.post("/api/chat", async (req, res) => {
    try {
      const { content } = insertChatMessageSchema.parse(req.body);
      
      // Save user message
      const userMessage = await storage.createChatMessage({
        content,
        sender: "user"
      });

      // Get AI response
      const aiResponse = await chatWithGemini(content);
      
      // Save AI message
      const aiMessage = await storage.createChatMessage({
        content: aiResponse,
        sender: "ai"
      });

      res.json({
        userMessage,
        aiMessage
      });
    } catch (error) {
      console.error("Chat error:", error);
      res.status(500).json({ 
        message: "Failed to process chat message. Please check if GEMINI_API_KEY is properly configured." 
      });
    }
  });

  // Get chat history
  app.get("/api/chat/history", async (req, res) => {
    try {
      const messages = await storage.getChatMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching chat history:", error);
      res.status(500).json({ message: "Failed to fetch chat history" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
