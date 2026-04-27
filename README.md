# 🟣 ARMY Portal — Arirang AI Portal

> A BTS fan portal built with Next.js 16, Fastify, LangChain + Gemini AI, and Clean Architecture.

## ✨ Features

- **Dynamic Album Catalog** — BTS albums with unique visual themes stored in SQLite
- **Arirang Tour Countdown** — Live countdown to MorumBIS shows (Oct 2026)
- **AI Chat (RAG)** — Ask BTS trivia powered by Gemini 1.5 Flash + ChromaDB

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, Tailwind CSS v4, TypeScript |
| Backend | Fastify 5, TypeScript, Clean Architecture |
| Database | SQLite via Prisma |
| Vector Store | ChromaDB (local) |
| AI/LLM | Google Gemini 1.5 Flash + text-embedding-004 via LangChain |

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- Google API Key ([Get one here](https://aistudio.google.com/apikey))
- Docker (optional, for ChromaDB)

### 1. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your GOOGLE_API_KEY

npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts

npm run dev
```

### 2. ChromaDB (for AI Chat)
```bash
docker run -d -p 8000:8000 chromadb/chroma
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 💜

## 📁 Architecture

```
backend/src/
├── domain/          # Entities, Interfaces, Types (no dependencies)
├── application/     # Use Cases (depends on domain only)
├── infrastructure/  # Prisma, LangChain, ChromaDB implementations
└── presentation/    # Fastify Controllers & Routes
```

## 📄 License
MIT
