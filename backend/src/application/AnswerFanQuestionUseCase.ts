import { ILLMService } from "../domain/interfaces/ILLMService.js";
import { IVectorStore } from "../domain/interfaces/IVectorStore.js";

/**
 * AnswerFanQuestionUseCase
 *
 * Orchestrates the RAG pipeline:
 * 1. Searches the vector store for relevant BTS facts
 * 2. Passes the context + question to the LLM
 * 3. Returns or streams the answer
 */
export class AnswerFanQuestionUseCase {
  constructor(
    private readonly llmService: ILLMService,
    private readonly vectorStore: IVectorStore
  ) {}

  /**
   * Execute the use case and return a complete answer.
   */
  async execute(question: string): Promise<string> {
    const results = await this.vectorStore.similaritySearch(question, 5);
    const context = results.map((r) => r.content).join("\n\n");

    return this.llmService.generateAnswer(question, context);
  }

  /**
   * Execute the use case and stream the answer token by token.
   */
  async *executeStream(
    question: string
  ): AsyncGenerator<string, void, unknown> {
    const results = await this.vectorStore.similaritySearch(question, 5);
    const context = results.map((r) => r.content).join("\n\n");

    yield* this.llmService.streamAnswer(question, context);
  }
}
