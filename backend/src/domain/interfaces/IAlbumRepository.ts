import { Album } from "../entities/Album.js";

/**
 * IAlbumRepository — Interface for album data access.
 * Implemented by PrismaAlbumRepository in infrastructure layer.
 */
export interface IAlbumRepository {
  /**
   * Retrieve all albums ordered by release date.
   */
  findAll(): Promise<Album[]>;

  /**
   * Find a single album by its ID.
   */
  findById(id: number): Promise<Album | null>;

  /**
   * Find albums belonging to a specific era.
   */
  findByEra(era: string): Promise<Album[]>;
}
