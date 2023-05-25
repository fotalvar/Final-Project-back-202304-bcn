import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import createDebug from "debug";

const debug = createDebug(
  "teams-impact-api:server:middlewares:errorMiddleware"
);

export const notFoundError = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new CustomError(404, "Endpoint not found");
  next(error);
};

export const generalError = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  debug(`error ${error.message}`);

  const statusCode = error.statusCode || 500;
  const message = error.statusCode ? error.message : "General server error";

  res.status(statusCode).json({ message });
};
