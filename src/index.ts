import { loadEnvironment } from "./utils/envLoader";

// Load environment variables
const env = loadEnvironment();

import { getRelevantCases } from "./vectorstore/pineconeClient";
// import { summarizeCases } from "./llm/summarizer";

const run = async () => {
  const query = "Are non-compete clauses enforceable in California?";

  // Initialize Pinecone first
  const { initializePinecone } = await import("./vectorstore/pineconeClient");
  await initializePinecone();

  const retrieved = await getRelevantCases(query);
  // const summary = await summarizeCases(query, retrieved);

  console.log("🧾 Retrieved Cases:");
  console.log(retrieved);
};

run();
