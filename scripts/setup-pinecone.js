import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

dotenv.config();

const setupPinecone = async () => {
  try {
    console.log("🔧 Setting up Pinecone index...");

    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });

    // Check if index already exists
    const indexName = process.env.PINECONE_INDEX || "legal-case-index";
    const existingIndexes = await pinecone.listIndexes();

    console.log("📋 Checking existing indexes...");
    console.log("Existing indexes:", existingIndexes);

    if (
      existingIndexes &&
      Array.isArray(existingIndexes) &&
      existingIndexes.some((index) => index.name === indexName)
    ) {
      console.log(`✅ Index '${indexName}' already exists`);
      return;
    }

    // Create new index
    console.log(`📦 Creating index '${indexName}'...`);
    await pinecone.createIndex({
      name: indexName,
      dimension: 1024, // Using 1024 dimensions for Pinecone
      metric: "cosine",
      spec: {
        serverless: {
          cloud: "gcp",
          region: "us-east-1",
        },
      },
    });

    console.log(`✅ Successfully created index '${indexName}'`);
    console.log("⏳ Waiting for index to be ready...");

    // Wait for index to be ready
    let isReady = false;
    while (!isReady) {
      const indexes = await pinecone.listIndexes();
      const index = indexes && indexes.find((idx) => idx.name === indexName);
      if (index && index.status?.ready) {
        isReady = true;
      } else {
        console.log("⏳ Index still initializing...");
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds
      }
    }

    console.log("🎉 Pinecone index is ready!");
  } catch (error) {
    console.error("❌ Failed to setup Pinecone:", error);
    throw error;
  }
};

setupPinecone();
