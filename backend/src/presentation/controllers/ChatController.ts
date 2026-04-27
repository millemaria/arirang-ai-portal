import { FastifyRequest, FastifyReply } from "fastify";
import { AnswerFanQuestionUseCase } from "../../application/AnswerFanQuestionUseCase.js";

interface ChatBody {
  question: string;
}

/**
 * ChatController
 *
 * Handles the AI chat endpoint.
 * Streams responses back to the client using Server-Sent Events (SSE).
 */
export class ChatController {
  constructor(
    private readonly answerFanQuestionUseCase: AnswerFanQuestionUseCase
  ) {}

  /**
   * POST /api/chat — Stream an AI-generated answer.
   */
  chat = async (
    req: FastifyRequest<{ Body: ChatBody }>,
    reply: FastifyReply
  ) => {
    try {
      const { question } = req.body;

      if (!question || typeof question !== "string" || question.trim() === "") {
        return reply.status(400).send({ error: "Question is required" });
      }

      // Set headers for SSE streaming
      reply.raw.writeHead(200, {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
      });

      const stream = this.answerFanQuestionUseCase.executeStream(
        question.trim()
      );

      for await (const chunk of stream) {
        reply.raw.write(`data: ${JSON.stringify({ content: chunk })}\n\n`);
      }

      reply.raw.write(`data: ${JSON.stringify({ done: true })}\n\n`);
      reply.raw.end();
    } catch (error) {
      console.error("[ChatController] Error in chat:", error);

      // If headers haven't been sent yet, send JSON error
      if (!reply.raw.headersSent) {
        return reply.status(500).send({
          error: "Failed to generate answer. Is ChromaDB running?",
        });
      }

      // If already streaming, send error event
      reply.raw.write(
        `data: ${JSON.stringify({ error: "Stream interrupted" })}\n\n`
      );
      reply.raw.end();
    }
  };

  /**
   * POST /api/chat/sync — Get a complete (non-streamed) AI answer.
   */
  chatSync = async (
    req: FastifyRequest<{ Body: ChatBody }>,
    reply: FastifyReply
  ) => {
    try {
      const { question } = req.body;

      if (!question || typeof question !== "string" || question.trim() === "") {
        return reply.status(400).send({ error: "Question is required" });
      }

      const answer = await this.answerFanQuestionUseCase.execute(
        question.trim()
      );
      return reply.status(200).send({ data: { answer } });
    } catch (error) {
      console.error("[ChatController] Error in sync chat:", error);
      return reply.status(500).send({
        error: "Failed to generate answer. Is ChromaDB running?",
      });
    }
  };
}
