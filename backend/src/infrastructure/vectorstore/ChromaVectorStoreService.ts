import { Chroma } from "@langchain/community/vectorstores/chroma";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Document } from "@langchain/core/documents";
import {
  IVectorStore,
  VectorDocument,
  VectorSearchResult,
} from "../../domain/interfaces/IVectorStore.js";

/**
 * ChromaVectorStoreService
 *
 * Implements IVectorStore using LangChain + ChromaDB + Gemini Embeddings.
 * Uses text-embedding-004 for embedding generation.
 * Connects to a local ChromaDB server.
 */
export class ChromaVectorStoreService implements IVectorStore {
  private embeddings: GoogleGenerativeAIEmbeddings | null = null;
  private apiKey: string;
  private vectorStore: Chroma | null = null;
  private collectionName: string;
  private chromaUrl: string;

  constructor(apiKey: string, chromaUrl?: string, collectionName?: string) {
    this.apiKey = apiKey;
    this.chromaUrl = chromaUrl || "http://localhost:8000";
    this.collectionName = collectionName || "bts-facts";
  }

  private getEmbeddings(): GoogleGenerativeAIEmbeddings {
    if (!this.embeddings) {
      if (!this.apiKey) {
        throw new Error(
          "GOOGLE_API_KEY is not configured. Please set it in backend/.env"
        );
      }
      this.embeddings = new GoogleGenerativeAIEmbeddings({
        model: "text-embedding-004",
        apiKey: this.apiKey,
      });
    }
    return this.embeddings;
  }

  /**
   * Get or create the Chroma vector store instance.
   */
  private async getStore(): Promise<Chroma> {
    if (!this.vectorStore) {
      this.vectorStore = new Chroma(this.getEmbeddings(), {
        collectionName: this.collectionName,
        url: this.chromaUrl,
      });
    }
    return this.vectorStore;
  }

  async addDocuments(docs: VectorDocument[]): Promise<void> {
    const langchainDocs = docs.map(
      (d) =>
        new Document({
          pageContent: d.content,
          metadata: (d.metadata as Record<string, string>) || {},
        })
    );

    // Create a new store from documents (overwrites if same collection)
    this.vectorStore = await Chroma.fromDocuments(
      langchainDocs,
      this.getEmbeddings(),
      {
        collectionName: this.collectionName,
        url: this.chromaUrl,
      }
    );
  }

  async similaritySearch(
    query: string,
    k: number = 5
  ): Promise<VectorSearchResult[]> {
    const store = await this.getStore();
    const results = await store.similaritySearchWithScore(query, k);

    return results.map(([doc, score]) => ({
      content: doc.pageContent,
      score,
      metadata: doc.metadata as Record<string, unknown>,
    }));
  }

  async isInitialized(): Promise<boolean> {
    try {
      const store = await this.getStore();
      const results = await store.similaritySearch("test", 1);
      return results.length > 0;
    } catch {
      return false;
    }
  }
}
