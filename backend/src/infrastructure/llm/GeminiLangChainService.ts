import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { ILLMService } from "../../domain/interfaces/ILLMService.js";

/**
 * GeminiLangChainService
 *
 * Implements ILLMService using LangChain + Google Gemini API.
 * Uses gemini-1.5-flash for text generation.
 */
export class GeminiLangChainService implements ILLMService {
  private model: ChatGoogleGenerativeAI | null = null;
  private apiKey: string;
  private promptTemplate: PromptTemplate;
  private outputParser: StringOutputParser;

  constructor(apiKey: string) {
    this.apiKey = apiKey;

    this.promptTemplate = PromptTemplate.fromTemplate(`
You are ARMY Bot 💜, a friendly and knowledgeable BTS fan assistant.
You speak with enthusiasm about BTS and use ARMY-friendly language.
Answer the fan's question using the context provided below.
If the context doesn't contain enough information, use your general knowledge about BTS.
Always be positive and supportive. Use emojis sparingly but warmly.

Context from BTS knowledge base:
{context}

Fan's question: {question}

ARMY Bot's answer:`);

    this.outputParser = new StringOutputParser();
  }

  private getModel(): ChatGoogleGenerativeAI {
    if (!this.model) {
      if (!this.apiKey) {
        throw new Error(
          "GOOGLE_API_KEY is not configured. Please set it in backend/.env"
        );
      }
      this.model = new ChatGoogleGenerativeAI({
        model: "gemini-1.5-flash",
        apiKey: this.apiKey,
        temperature: 0.7,
        maxOutputTokens: 1024,
      });
    }
    return this.model;
  }

  async generateAnswer(question: string, context: string): Promise<string> {
    const chain = this.promptTemplate.pipe(this.getModel()).pipe(this.outputParser);

    const result = await chain.invoke({ question, context });
    return result;
  }

  async *streamAnswer(
    question: string,
    context: string
  ): AsyncGenerator<string, void, unknown> {
    const chain = this.promptTemplate.pipe(this.getModel()).pipe(this.outputParser);

    const stream = await chain.stream({ question, context });

    for await (const chunk of stream) {
      yield chunk;
    }
  }
}
