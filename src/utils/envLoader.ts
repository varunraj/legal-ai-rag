import * as dotenv from "dotenv";
import { existsSync } from "fs";
import { join } from "path";

export const loadEnvironment = () => {
  const nodeEnv = process.env.NODE_ENV || "development";

  console.log(`🌍 Loading environment: ${nodeEnv}`);

  // Load environment-specific file
  const envFile = `.env.${nodeEnv}`;
  const envPath = join(process.cwd(), envFile);

  if (existsSync(envPath)) {
    console.log(`📁 Loading ${envFile}`);
    dotenv.config({ path: envPath });
  } else {
    console.log(`⚠️  ${envFile} not found, using default .env`);
    dotenv.config();
  }

  // Validate required environment variables
  const requiredVars = ["OPENAI_API_KEY", "PINECONE_API_KEY", "PINECONE_INDEX"];

  const missingVars = requiredVars.filter((varName) => !process.env[varName]);

  if (missingVars.length > 0) {
    console.error(
      `❌ Missing required environment variables: ${missingVars.join(", ")}`
    );
    console.error(`💡 Please check your ${envFile} file`);
    console.error(
      `💡 Or run: ./scripts/fetch-github-secrets.sh to get from GitHub`
    );
    process.exit(1);
  }

  console.log("✅ Environment loaded successfully");

  return {
    NODE_ENV: nodeEnv,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY!,
    OPENAI_MODEL: process.env.OPENAI_MODEL || "gpt-4",
    EMBEDDING_MODEL: process.env.EMBEDDING_MODEL || "text-embedding-ada-002",
    PINECONE_API_KEY: process.env.PINECONE_API_KEY!,
    PINECONE_INDEX: process.env.PINECONE_INDEX!,
    LOG_LEVEL: process.env.LOG_LEVEL || "info",
    MAX_TOKENS: parseInt(process.env.MAX_TOKENS || "1000"),
  };
};
