import { NextFunction, Request, Response } from "express";
import JWT from "jsonwebtoken";
import ForbiddenError from "../models/errors/forbiddenError.model";

async function bearerAuthentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
      throw new ForbiddenError("Credenciais não informadas.");
    }

    const [authenticationType, token] = authorizationHeader.split(" ");

    if (authenticationType !== "Bearer" || !token) {
      throw new ForbiddenError("Tipo de autenticação inválida.");
    }

    try {
      const tokenPayload = JWT.verify(token, "my_secret_key");

      if (typeof tokenPayload !== "object" || !tokenPayload.sub) {
        throw new ForbiddenError("Token inválido.");
      }

      const user = {
        uuid: tokenPayload.sub,
        username: tokenPayload.username,
      };

      req.user = user;

      next();
    } catch (error) {
      throw new ForbiddenError("Token inválido.", error);
    }
  } catch (error) {
    next(error);
  }
}

export default bearerAuthentication;
