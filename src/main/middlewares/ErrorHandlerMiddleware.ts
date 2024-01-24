import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";

class ErrorHandlerMiddleware {
  execute(err: Error | AppError, req: Request, res: Response, next: NextFunction) {
    if (err) {
      if (err instanceof AppError) {
        return res.status(err.status).send({ mensagem: err.mensagem });
      }
    }
    
    return res.status(500).send({ mensagem: 'Erro interno do servidor' });
  }
}

const errorHandlerMiddleware = new ErrorHandlerMiddleware();

export { errorHandlerMiddleware };