import { FastifyInstance } from "fastify";
import { AlbumController } from "../controllers/AlbumController.js";

/**
 * Register album-related routes.
 */
export function registerAlbumRoutes(
  app: FastifyInstance,
  controller: AlbumController
) {
  app.get("/api/albums", controller.getAll);
  app.get("/api/albums/:id", controller.getById);
}
