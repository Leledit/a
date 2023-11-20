import { Anime } from "../entities/Anime.ts";

export interface IAnimeRepository {
  save(anime: Anime): Promise<void>;
  listOne(id: string): Promise<Anime | null>;
  findByName(name: string): Promise<boolean>;
  findAll(): Promise<Anime[] | null>;
}
