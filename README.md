# ⚖️ AI Legal Research Assistant

A Retrieval-Augmented Generation (RAG) prototype that helps attorneys find relevant legal precedents from public case law databases, using OpenAI's LLMs and vector search (Pinecone).

This project is designed to demonstrate:

- Practical AI integration using TypeScript
- Prompt engineering, retrieval, and evaluation

---

## 🚀 Features

- 🔍 Accepts a legal research question (e.g. “Are non-compete clauses enforceable in California?”)
- 📚 Retrieves relevant case law chunks using semantic search (via Pinecone)
- 🤖 Generates grounded summaries using OpenAI GPT-4
- 📎 Includes jurisdiction + citation information
- 🧱 Modular architecture for easy extension

---

## 🗂 Project Structure

```
legal-ai-rag/
├── .env                        # API keys and config
├── src/
│   ├── index.ts                # Entry point
│   ├── data/                   # Raw or sample legal cases
│   ├── embedding/              # Embedding logic (OpenAI)
│   ├── vectorstore/            # Pinecone client + similarity search
│   ├── llm/                    # LLM prompt and summarization
│   └── utils/                  # Utilities (e.g. tokenizer)
```

---

## 🔧 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/legal-ai-rag.git
cd legal-ai-rag
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the template and add your API keys:

```bash
# Copy template
cp env.template .env.development

# Edit with your real API keys
nano .env.development
```

Required environment variables:

```env
OPENAI_API_KEY=your-openai-key
PINECONE_API_KEY=your-pinecone-key
PINECONE_INDEX=legal-case-index
```

### 4. Run the app

```bash
npx ts-node src/index.ts
```

---

## 🧠 How It Works

1. Legal opinions are chunked and embedded using OpenAI’s embedding model
2. Chunks are indexed in Pinecone with citation metadata
3. User submits a legal query → converted to embedding → top relevant chunks retrieved
4. OpenAI GPT-4 summarizes retrieved chunks into a concise legal summary
5. Output includes sources and jurisdiction info for verification

---

## 🛠 Stack

- TypeScript + Node.js
- OpenAI API (chat + embedding)
- Pinecone (vector database)
- dotenv, axios, uuid
- Cursor.dev (AI-native IDE)

---

## 📈 Future Improvements

- Add filters by jurisdiction, date, outcome
- Support multiple vector DB backends
- Add evaluation framework (manual + LLM-as-a-judge)
- Add a minimal frontend (Next.js or Streamlit)

---

## 👤 Author

**[Varun Raj](https://www.linkedin.com/in/varunraj537/)**  
Technical Product Manager

---

## 📜 License

MIT
