import { ThemeConfig } from "../types/ThemeConfig.js";

/**
 * Album — Domain entity representing a BTS album.
 * Framework-agnostic: no Prisma or ORM references.
 */
export interface Album {
  id: number;
  title: string;
  titleKo: string | null;
  era: string;
  releaseDate: Date;
  albumType: string;
  coverUrl: string | null;
  themeConfig: ThemeConfig;
  trackCount: number;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}
