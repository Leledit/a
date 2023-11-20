import clienteDbMongo from "../../database/mongoDbConfig.ts";
import { Anime } from "../../entities/Anime.ts";
import { IAnimeRepository } from "../IAnimeRepository.ts";

export class MongoAnimeRepository implements IAnimeRepository {
  async save(anime: Anime): Promise<void> {
    try {
      const refDb = clienteDbMongo();
      const collectionAnimes = refDb.collection("animes");
      await collectionAnimes.insertOne(anime);
    } catch (error: any) {
      throw new Error("Falha ao cadastrar um anime: " + error.message);
    }
  }

  async findByName(name: string): Promise<boolean> {
    try {
      const refDb = clienteDbMongo();
      const collectionAnime = refDb.collection("animes");
      const resultRequest = await collectionAnime.findOne({
        name: name
      });

      if (resultRequest) {
        return true;
      } else {
        return false;
      }
    } catch (error: any) {
      throw new Error(
        "Falha ao validar a existencia de um genero: " + error.message
      );
    }
  }
  
  async listOne(id: string): Promise<Anime|null> {
    try {
      const refDb = clienteDbMongo();
      const collectionAnimes = refDb.collection("animes");
      const resultRequest = await collectionAnimes.findOne({ id: id});
      
      if(resultRequest){
        return new Anime({
          name: resultRequest.name,
          genres:resultRequest.genres,
          nextSeason:resultRequest.nextSeason,
          note:resultRequest.note,
          previousSeason:resultRequest.previousSeason,
          qtdEpisodes:resultRequest.qtdEpisodes,
          releaseYear:resultRequest.releaseYear,
          status:resultRequest.status,
          synopsis:resultRequest.synopsis,
          watched:resultRequest.watched,
          updateDate:resultRequest.updateDate,
          urlImg:resultRequest.urlImg,
        })
      }else{
          return null
      }
      

    } catch (error) {
      throw new Error("erro ao recuperar um anime: " + error);
    }
  }
}