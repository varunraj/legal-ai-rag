import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

dotenv.config();

const debugPinecone = async () => {
  try {
    console.log("🔍 Debugging Pinecone connection...");
    console.log(
      "API Key:",
      process.env.PINECONE_API_KEY ? "✅ Set" : "❌ Missing"
    );
    console.log("Index Name:", process.env.PINECONE_INDEX || "Not set");

    const pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });

    console.log("\n📋 Attempting to list indexes...");
    const indexes = await pinecone.listIndexes();

    console.log("Raw response:", JSON.stringify(indexes, null, 2));

    if (indexes && indexes.indexes && Array.isArray(indexes.indexes)) {
      console.log(`\n✅ Found ${indexes.indexes.length} indexes:`);
      indexes.indexes.forEach((index, i) => {
        console.log(`${i + 1}. Name: ${index.name}`);
        console.log(`   Host: ${index.host}`);
        console.log(
          `   Status: ${index.status?.ready ? "Ready" : "Initializing"}`
        );
        console.log("");
      });
    } else {
      console.log("\n❌ No indexes found or unexpected response format");
      console.log("Response type:", typeof indexes);
      console.log("Response keys:", Object.keys(indexes || {}));
    }
  } catch (error) {
    console.error("❌ Debug failed:", error);
    console.log("\n💡 Possible issues:");
    console.log("- API key might be incorrect");
    console.log("- Index might still be initializing");
    console.log("- Network connectivity issues");
  }
};

debugPinecone();
