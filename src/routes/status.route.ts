import { Request, Response, Router } from "express";
import { StatusCodes } from "http-status-codes";

const statusRoute = Router();

statusRoute.get("/status", (req: Request, res: Response) => {
  res.status(StatusCodes.OK).send("Sucesso");
});

export default statusRoute;
