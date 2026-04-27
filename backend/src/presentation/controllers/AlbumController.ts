import { FastifyRequest, FastifyReply } from "fastify";
import { GetAlbumsUseCase } from "../../application/GetAlbumsUseCase.js";

/**
 * AlbumController
 *
 * Handles HTTP requests for album operations.
 * Delegates all business logic to the GetAlbumsUseCase.
 */
export class AlbumController {
  constructor(private readonly getAlbumsUseCase: GetAlbumsUseCase) {}

  /**
   * GET /api/albums — Retrieve all albums.
   */
  getAll = async (_req: FastifyRequest, reply: FastifyReply) => {
    try {
      const albums = await this.getAlbumsUseCase.execute();
      return reply.status(200).send({ data: albums });
    } catch (error) {
      console.error("[AlbumController] Error fetching albums:", error);
      return reply.status(500).send({ error: "Failed to fetch albums" });
    }
  };

  /**
   * GET /api/albums/:id — Retrieve a single album.
   */
  getById = async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) => {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return reply.status(400).send({ error: "Invalid album ID" });
      }

      const album = await this.getAlbumsUseCase.executeById(id);
      if (!album) {
        return reply.status(404).send({ error: "Album not found" });
      }

      return reply.status(200).send({ data: album });
    } catch (error) {
      console.error("[AlbumController] Error fetching album:", error);
      return reply.status(500).send({ error: "Failed to fetch album" });
    }
  };
}
