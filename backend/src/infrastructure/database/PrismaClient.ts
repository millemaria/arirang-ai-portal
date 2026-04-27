import { PrismaClient as PrismaORM } from "@prisma/client";

/**
 * Singleton Prisma client instance.
 * Prevents multiple connections during development with hot-reload.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaORM | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaORM({
    log: process.env.NODE_ENV === "development" ? ["query", "warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
