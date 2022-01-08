import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import DatabaseError from "../models/errors/databaseError.model";

function errorHandler(error: any, req: Request, res: Response) {
  if (error instanceof DatabaseError) {
    res.sendStatus(StatusCodes.BAD_REQUEST);
  } else {
    res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
  }
}

export default errorHandler;
