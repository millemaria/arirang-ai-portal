import "dotenv/config";
import Fastify from "fastify";
import cors from "@fastify/cors";
import { createContainer } from "./config/container.js";
import { registerAlbumRoutes } from "./presentation/routes/albumRoutes.js";
import { registerChatRoutes } from "./presentation/routes/chatRoutes.js";

async function bootstrap() {
  const app = Fastify({
    logger: {
      level: "info",
      transport: {
        target: "pino-pretty",
        options: {
          translateTime: "HH:MM:ss Z",
          ignore: "pid,hostname",
        },
      },
    },
  });

  // ── CORS ─────────────────────────────────────────────────────
  await app.register(cors, {
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  });

  // ── Dependency Injection ─────────────────────────────────────
  const container = createContainer();

  // ── Routes ───────────────────────────────────────────────────
  registerAlbumRoutes(app, container.albumController);
  registerChatRoutes(app, container.chatController);

  // ── Health Check ─────────────────────────────────────────────
  app.get("/api/health", async () => ({
    status: "ok",
    service: "ARMY Portal Backend",
    timestamp: new Date().toISOString(),
  }));

  // ── Start Server ─────────────────────────────────────────────
  const port = parseInt(process.env.PORT || "3001", 10);
  const host = process.env.HOST || "0.0.0.0";

  try {
    await app.listen({ port, host });
    console.log(`\n🟣 ARMY Portal Backend running on http://${host}:${port}`);
    console.log(`   📀 Albums API:  http://localhost:${port}/api/albums`);
    console.log(`   💬 Chat API:    http://localhost:${port}/api/chat`);
    console.log(`   💜 Health:      http://localhost:${port}/api/health\n`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }

  // ── Graceful Shutdown ────────────────────────────────────────
  const signals: NodeJS.Signals[] = ["SIGINT", "SIGTERM"];
  for (const signal of signals) {
    process.on(signal, async () => {
      console.log(`\n🛑 Received ${signal}, shutting down gracefully...`);
      await app.close();
      process.exit(0);
    });
  }
}

bootstrap();
