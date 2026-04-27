import { AnswerFanQuestionUseCase } from "../application/AnswerFanQuestionUseCase.js";
import { GetAlbumsUseCase } from "../application/GetAlbumsUseCase.js";
import { RecommendSongsUseCase } from "../application/RecommendSongsUseCase.js";
import { GeminiLangChainService } from "../infrastructure/llm/GeminiLangChainService.js";
import { PrismaAlbumRepository } from "../infrastructure/repositories/PrismaAlbumRepository.js";
import { ChromaVectorStoreService } from "../infrastructure/vectorstore/ChromaVectorStoreService.js";
import { AlbumController } from "../presentation/controllers/AlbumController.js";
import { ChatController } from "../presentation/controllers/ChatController.js";

/**
 * Dependency Injection Container
 *
 * Wires all layers of the Clean Architecture:
 *   Infrastructure → Application (Use Cases) → Presentation (Controllers)
 *
 * No DI framework needed — manual constructor injection keeps it simple
 * and fully type-safe.
 */
export function createContainer() {
  const googleApiKey = process.env.GOOGLE_API_KEY || "";
  const chromaUrl = process.env.CHROMA_URL || "http://localhost:8000";
  const chromaCollection = process.env.CHROMA_COLLECTION || "bts-facts";

  // ── Infrastructure ──────────────────────────────────────────
  const albumRepository = new PrismaAlbumRepository();
  const llmService = new GeminiLangChainService(googleApiKey);
  const vectorStore = new ChromaVectorStoreService(
    googleApiKey,
    chromaUrl,
    chromaCollection
  );

  // ── Application (Use Cases) ─────────────────────────────────
  const getAlbumsUseCase = new GetAlbumsUseCase(albumRepository);
  const answerFanQuestionUseCase = new AnswerFanQuestionUseCase(
    llmService,
    vectorStore
  );
  const recommendSongsUseCase = new RecommendSongsUseCase(
    llmService,
    vectorStore
  );

  // ── Presentation (Controllers) ──────────────────────────────
  const albumController = new AlbumController(getAlbumsUseCase);
  const chatController = new ChatController(answerFanQuestionUseCase);

  return {
    // Infrastructure
    albumRepository,
    llmService,
    vectorStore,

    // Use Cases
    getAlbumsUseCase,
    answerFanQuestionUseCase,
    recommendSongsUseCase,

    // Controllers
    albumController,
    chatController,
  };
}
