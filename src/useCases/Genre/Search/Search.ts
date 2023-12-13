import { Genre } from "../../../entities/Genre.js";
import { IGenreRepository } from "../../../repositories/IGenreRepository.js";
import { IGenresRequestDTO } from "../Register/RegisterDTO.js";

export class SearchGenresUseCase {
  constructor(private genresRepository: IGenreRepository) {}
  async execute(data: IGenresRequestDTO) {
    const genre = new Genre(data);

    const searchResult = await this.genresRepository.findByName(genre);
    if (searchResult.name !== "") {
      return searchResult;
    } else {
      return undefined;
    }
  }
}