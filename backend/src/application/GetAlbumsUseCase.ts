import { Album } from "../domain/entities/Album.js";
import { IAlbumRepository } from "../domain/interfaces/IAlbumRepository.js";

/**
 * GetAlbumsUseCase
 *
 * Retrieves albums from the repository.
 * Demonstrates Clean Architecture: the use case depends on an
 * interface, not a concrete Prisma implementation.
 */
export class GetAlbumsUseCase {
  constructor(private readonly albumRepository: IAlbumRepository) {}

  /**
   * Get all albums sorted by release date.
   */
  async execute(): Promise<Album[]> {
    return this.albumRepository.findAll();
  }

  /**
   * Get a single album by ID.
   */
  async executeById(id: number): Promise<Album | null> {
    return this.albumRepository.findById(id);
  }

  /**
   * Get albums filtered by era.
   */
  async executeByEra(era: string): Promise<Album[]> {
    return this.albumRepository.findByEra(era);
  }
}
