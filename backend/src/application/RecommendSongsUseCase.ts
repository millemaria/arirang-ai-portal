import { ILLMService } from "../domain/interfaces/ILLMService.js";
import { IVectorStore } from "../domain/interfaces/IVectorStore.js";

/**
 * RecommendSongsUseCase
 *
 * Uses the RAG pipeline to recommend BTS songs based on mood/preference.
 */
export class RecommendSongsUseCase {
  constructor(
    private readonly llmService: ILLMService,
    private readonly vectorStore: IVectorStore
  ) {}

  /**
   * Recommend songs based on a mood description.
   */
  async execute(mood: string): Promise<string> {
    const results = await this.vectorStore.similaritySearch(
      `BTS songs for mood: ${mood}`,
      5
    );
    const context = results.map((r) => r.content).join("\n\n");

    const question = `Based on the following BTS knowledge, recommend 5 BTS songs that match this mood/feeling: "${mood}". For each song, briefly explain why it fits. Be enthusiastic and use ARMY-friendly language! 💜`;

    return this.llmService.generateAnswer(question, context);
  }
}
