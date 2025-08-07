import * as dotenv from "dotenv";
dotenv.config();

import { getRelevantCases } from "./vectorstore/pineconeClient";
import { summarizeCases } from "./llm/summarizer";

const run = async () => {
  const query = "Are non-compete clauses enforceable in California?";

  const retrieved = await getRelevantCases(query);
  const summary = await summarizeCases(query, retrieved);

  console.log("🧾 Summary:");
  console.log(summary);
};

run();
