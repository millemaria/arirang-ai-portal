import { FastifyInstance } from "fastify";
import { ChatController } from "../controllers/ChatController.js";

/**
 * Register chat-related routes.
 */
export function registerChatRoutes(
  app: FastifyInstance,
  controller: ChatController
) {
  app.post("/api/chat", controller.chat);
  app.post("/api/chat/sync", controller.chatSync);
}
