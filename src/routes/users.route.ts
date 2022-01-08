import { NextFunction, Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";
import userRepository from "../repositories/user.repository";

const usersRoute = Router();

usersRoute.get("/users", async (req: Request, res: Response) => {
  const users = await userRepository.findAllUsers();

  res.status(StatusCodes.OK).send({ users });
});

usersRoute.get(
  "/users/:uuid",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { uuid } = req.params;
      const user = await userRepository.findUserById(uuid);

      res.status(StatusCodes.OK).send(user);
    } catch (error) {
      next(error);
    }
  }
);

usersRoute.post("/users", async (req: Request, res: Response) => {
  const newUser = req.body;
  const user = await userRepository.createUser(newUser);

  res.status(StatusCodes.CREATED).send(user);
});

usersRoute.put("/users/:uuid", async (req: Request, res: Response) => {
  const { uuid } = req.params;
  const modifiedUser = req.body;

  modifiedUser.uuid = uuid;

  await userRepository.updateUser(modifiedUser);

  res.status(StatusCodes.OK).send(modifiedUser);
});

usersRoute.delete("/users/:uuid", async (req: Request, res: Response) => {
  const { uuid } = req.params;

  await userRepository.userDelete(uuid);

  res.sendStatus(StatusCodes.OK);
});

export default usersRoute;
