import { type NextFunction, type Request, type Response } from "express";
import debug from "debug";
import type CustomError from "../../../CustomError/CustomError.js";

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
