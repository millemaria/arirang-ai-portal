/**
 * ILLMService — Interface for Large Language Model interactions.
 * Implemented by GeminiLangChainService in infrastructure layer.
 */
export interface ILLMService {
  /**
   * Generate a complete answer given a question and retrieved context.
   */
  generateAnswer(question: string, context: string): Promise<string>;

  /**
   * Stream an answer token by token.
   */
  streamAnswer(
    question: string,
    context: string
  ): AsyncGenerator<string, void, unknown>;
}
