import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

dotenv.config();

const checkPineconeEnvironment = async () => {
  try {
    console.log("🔍 Checking Pinecone environment...");

    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });

    // List all indexes to see environment
    const indexes = await pinecone.listIndexes();

    console.log("\n📋 Your Pinecone Indexes:");
    if (indexes && indexes.length > 0) {
      indexes.forEach((index) => {
        console.log(`- Name: ${index.name}`);
        console.log(`  Host: ${index.host}`);
        console.log(
          `  Status: ${index.status?.ready ? "Ready" : "Initializing"}`
        );
        console.log("");
      });

      // Show index details
      const firstIndex = indexes[0];
      if (firstIndex?.host) {
        console.log(`🌍 Index Host: ${firstIndex.host}`);
        console.log(`✅ Your Pinecone setup is working correctly!`);
      }
    } else {
      console.log(
        "ℹ️  No indexes found. You can create one using the setup script."
      );
      console.log("\n💡 Your API key is working correctly!");
    }
  } catch (error) {
    console.error("❌ Failed to check Pinecone environment:", error);
    console.log("\n💡 Make sure your PINECONE_API_KEY is correct in .env file");
  }
};

checkPineconeEnvironment();
