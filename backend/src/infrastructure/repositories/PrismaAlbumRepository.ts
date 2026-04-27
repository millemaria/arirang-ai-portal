import { Album } from "../../domain/entities/Album.js";
import { IAlbumRepository } from "../../domain/interfaces/IAlbumRepository.js";
import { ThemeConfig } from "../../domain/types/ThemeConfig.js";
import { prisma } from "../database/PrismaClient.js";

/**
 * PrismaAlbumRepository
 *
 * Implements IAlbumRepository using Prisma + SQLite.
 * Handles the JSON parsing of themeConfig from TEXT to typed object.
 */
export class PrismaAlbumRepository implements IAlbumRepository {
  /**
   * Parse the raw Prisma album record into a domain Album entity.
   */
  private toDomainEntity(raw: {
    id: number;
    title: string;
    titleKo: string | null;
    era: string;
    releaseDate: Date;
    albumType: string;
    coverUrl: string | null;
    themeConfig: string;
    trackCount: number;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): Album {
    return {
      ...raw,
      themeConfig: JSON.parse(raw.themeConfig) as ThemeConfig,
    };
  }

  async findAll(): Promise<Album[]> {
    const albums = await prisma.album.findMany({
      orderBy: { releaseDate: "asc" },
    });
    return albums.map((a) => this.toDomainEntity(a));
  }

  async findById(id: number): Promise<Album | null> {
    const album = await prisma.album.findUnique({ where: { id } });
    return album ? this.toDomainEntity(album) : null;
  }

  async findByEra(era: string): Promise<Album[]> {
    const albums = await prisma.album.findMany({
      where: { era },
      orderBy: { releaseDate: "asc" },
    });
    return albums.map((a) => this.toDomainEntity(a));
  }
}
