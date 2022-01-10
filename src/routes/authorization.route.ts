import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import JWT from "jsonwebtoken";
import basicAuthentication from "../middlewares/basicAuthentication.middleware";
import bearerAuthentication from "../middlewares/bearerAuthentication.middleware";
import ForbiddenError from "../models/errors/forbiddenError.model";

const authorizationRoute = Router();

authorizationRoute.post(
  "/token/validate",
  bearerAuthentication,
  (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
  }
);

authorizationRoute.post(
  "/token",
  basicAuthentication,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user;

      if (!user) {
        throw new ForbiddenError("Usuário não informado.");
      }

      const jwt = JWT.sign({ username: user?.username }, "my_secret_key", {
        subject: user?.uuid,
      });

      res.status(StatusCodes.OK).json({ token: jwt });
    } catch (error) {
      next(error);
    }
  }
);

export default authorizationRoute;
