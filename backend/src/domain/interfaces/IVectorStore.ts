/**
 * VectorDocument — A document with content and optional metadata.
 */
export interface VectorDocument {
  content: string;
  metadata?: Record<string, unknown>;
}

/**
 * VectorSearchResult — A result from a similarity search.
 */
export interface VectorSearchResult {
  content: string;
  score: number;
  metadata?: Record<string, unknown>;
}

/**
 * IVectorStore — Interface for vector store operations.
 * Implemented by ChromaVectorStoreService in infrastructure layer.
 */
export interface IVectorStore {
  /**
   * Add documents to the vector store with embeddings.
   */
  addDocuments(docs: VectorDocument[]): Promise<void>;

  /**
   * Perform a similarity search returning the top-k results.
   */
  similaritySearch(query: string, k?: number): Promise<VectorSearchResult[]>;

  /**
   * Check if the vector store has been initialized with data.
   */
  isInitialized(): Promise<boolean>;
}
