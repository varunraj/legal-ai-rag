import { Pinecone } from "@pinecone-database/pinecone";

interface LegalCase {
  id: string;
  title: string;
  content: string;
  jurisdiction: string;
  citation: string;
  date: string;
  outcome: string;
}

interface SearchResult {
  id: string;
  score: number;
  metadata: {
    title: string;
    jurisdiction: string;
    citation: string;
    date: string;
    outcome: string;
  };
}

class PineconeClient {
  private pinecone: Pinecone;
  private index: any;

  constructor() {
    this.pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
    });
  }

  async initialize() {
    try {
      this.index = this.pinecone.index(process.env.PINECONE_INDEX!);
      console.log("✅ Pinecone client initialized successfully");
    } catch (error) {
      console.error("❌ Failed to initialize Pinecone client:", error);
      throw error;
    }
  }

  async upsertCases(cases: LegalCase[], embeddings: number[][]) {
    if (!this.index) {
      throw new Error("Pinecone client not initialized");
    }

    const vectors = cases.map((legalCase, index) => ({
      id: legalCase.id,
      values: embeddings[index],
      metadata: {
        title: legalCase.title,
        content: legalCase.content,
        jurisdiction: legalCase.jurisdiction,
        citation: legalCase.citation,
        date: legalCase.date,
        outcome: legalCase.outcome,
      },
    }));

    try {
      await this.index.upsert(vectors);
      console.log(`✅ Successfully upserted ${cases.length} legal cases`);
    } catch (error) {
      console.error("❌ Failed to upsert cases:", error);
      throw error;
    }
  }

  async getRelevantCases(
    query: string,
    topK: number = 5
  ): Promise<SearchResult[]> {
    if (!this.index) {
      throw new Error("Pinecone client not initialized");
    }

    try {
      // Note: This assumes the query has already been embedded
      // The actual embedding should be done in the embedding module
      const queryEmbedding = await this.getQueryEmbedding(query);

      const queryResponse = await this.index.query({
        vector: queryEmbedding,
        topK,
        includeMetadata: true,
      });

      return (
        queryResponse.matches?.map((match: any) => ({
          id: match.id,
          score: match.score || 0,
          metadata: match.metadata as any,
        })) || []
      );
    } catch (error) {
      console.error("❌ Failed to search for relevant cases:", error);
      throw error;
    }
  }

  private async getQueryEmbedding(query: string): Promise<number[]> {
    // TODO: Implement proper embedding using OpenAI
    // For now, return a dummy embedding (1536 dimensions for text-embedding-ada-002)
    console.log(`🔍 Embedding query: "${query}"`);
    return new Array(1536).fill(0).map(() => Math.random() - 0.5);
  }
}

// Singleton instance
const pineconeClient = new PineconeClient();

export const initializePinecone = async () => {
  await pineconeClient.initialize();
};

export const upsertCases = async (
  cases: LegalCase[],
  embeddings: number[][]
) => {
  await pineconeClient.upsertCases(cases, embeddings);
};

export const getRelevantCases = async (
  query: string,
  topK: number = 5
): Promise<SearchResult[]> => {
  return await pineconeClient.getRelevantCases(query, topK);
};
