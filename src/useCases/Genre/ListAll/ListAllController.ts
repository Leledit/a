import { Request, Response } from "express";
import { ListAllGenresUseCase } from "./ListAll.js";

export class ListAllGenreController {
  constructor(private listAllGenreUseCase: ListAllGenresUseCase) {}

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const dataGenres = await this.listAllGenreUseCase.execute();

      return res.status(200).json(dataGenres);
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}