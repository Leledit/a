import clienteDbMongo from "../../database/mongoDbConfig.ts";
import { Filme } from "../../entities/Filme.ts";
import { IFilmeRepository } from "../IFilmeRepository.ts";

export class MongoFilmeRepository implements IFilmeRepository {
  async findByName(name: string): Promise<boolean> {
    const refDb = clienteDbMongo();
    try {
      const resultRequest = await refDb.collection("filmes").findOne({
        name: name,
      });
      if (resultRequest) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("Falha ao validar a existencia de um filme");
    }
  }
  async save(filme: Filme): Promise<void> {
    const refDb = clienteDbMongo();
    try {
      await refDb.collection("filmes").insertOne(filme);
    } catch (error) {
      throw new Error("Falha ao cadastrar um novo filme");
    }
  }
  async listOne(id: string): Promise<Filme | null> {
    try {
      const refDb = clienteDbMongo();
      const collectionAnimes = refDb.collection("filmes");
      const resultRequest = await collectionAnimes.findOne({ id: id });

      if (resultRequest) {
        let id = resultRequest.id;
        return new Filme(
          {
            name: resultRequest.name,
            duration: resultRequest.duration,
            lauch: resultRequest.lauch,
            note: resultRequest.note,
            synopsis: resultRequest.synopsis,
            visa: resultRequest.visa,
            urlImg: resultRequest.urlImg,
          },
          id
        );
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("erro ao recuperar um filme: " + error);
    }
  }

  async changing(filme: Filme): Promise<void> {
    try {
      const refDb = clienteDbMongo();
      const resultRequest = await refDb.collection("filmes").updateOne(
        { id: filme.id },
        {
          $set: {
            name: filme.name,
            visa: filme.visa,
            duration: filme.duration,
            lauch: filme.lauch,
            note: filme.note,
            synopsis: filme.synopsis,
            urlImg: filme.urlImg,
          },
        }
      );

      if (resultRequest.matchedCount === 0) {
        throw new Error("Id invalido");
      }
    } catch (error) {
      throw new Error("erro ao atualizar um anime: " + error);
    }
  }
  async findAll(): Promise<Filme[] | null> {
    try {
      const refDb = clienteDbMongo();
      const resultRequest =  await refDb.collection("filmes").find({}).toArray();

      if (resultRequest.length !== 0) {
        let dataFilmes: Filme[] = [];
        resultRequest.map((item) => {
          let id = item.id;
          dataFilmes.push(
            new Filme(
              {
                name: item.name,
                duration: item.duration,
                lauch: item.lauch,
                note: item.note,
                synopsis: item.synopsis,
                visa: item.visa,
                urlImg: item.urlImg
              },
              id
            )
          );
        });

        return dataFilmes;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error("Falha ao obter todos os animes: " + error);
    }
  }
}
