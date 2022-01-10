import { NextFunction, Request, Response, Router } from "express";
import ForbiddenError from "../models/errors/forbiddenError.model";
import userRepository from "../repositories/user.repository";
import JWT from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";
import basicAuthentication from "../middlewares/basicAuthentication.middleware";

const authorizationRoute = Router();

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
