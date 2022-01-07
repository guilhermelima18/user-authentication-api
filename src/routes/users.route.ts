import { Request, Response, Router } from "express";

const usersRoute = Router();

usersRoute.get("/users", (req: Request, res: Response) => {
  const users = [
    {
      id: 1,
      nome: "Guilherme",
    },
  ];

  res.status(200).send({ users });
});

usersRoute.get("/users/:uuid", (req: Request, res: Response) => {
  const { uuid } = req.params;

  console.log(uuid);

  res.sendStatus(200);
});

export default usersRoute;
