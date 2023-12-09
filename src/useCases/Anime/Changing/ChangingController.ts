import { NextFunction, Request, Response, query } from "express";
import { ChangingAnimeUseCase } from "./Changing.ts";
import { changingAnimeSchema } from "./scheme.ts";
import { getFileFromRequest } from "../../../providers/MulterImage.ts";

export class ChangingAnimeController {
  constructor(private changingAnimeUseCase: ChangingAnimeUseCase) {}

  validateRequest = (req: Request, res: Response, next: NextFunction) => {
    const { error } = changingAnimeSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: "Requisição inválida",
        details: error.message,
      });
    }

    next();
  };

  async handle(req: Request, res: Response): Promise<Response> {
    try {
      const dataImage = getFileFromRequest(req);

      if (!dataImage) {
        return res.status(400).json({
          error: "Requisição inválida",
          details: "É necessario enviar uma imagem na requsição",
        });
      }

      const {
        name,
        watched,
        qtdEpisodes,
        releaseYear,
        note,
        status,
        nextSeason,
        previousSeason,
        synopsis,
      } = req.body;

      const {id} = req.params;

      await this.changingAnimeUseCase.execute({
        name,
        id,
        nextSeason,
        note: parseInt(note),
        previousSeason,
        qtdEpisodes: parseInt(qtdEpisodes),
        releaseYear: parseInt(releaseYear),
        status,
        synopsis,
        watched,
        dataImg: dataImage,
      });

      return res.status(200).json({
        error: "Edição realizada com sucesso",
        details: "O anime sofreu alterações nos seus dados",
      });
    } catch (err: any) {
      return res.status(500).json({
        error: "Recurso não encontrado",
        details: err.message,
      });
    }
  }
}
