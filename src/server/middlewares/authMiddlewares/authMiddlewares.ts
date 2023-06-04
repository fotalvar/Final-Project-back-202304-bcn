import jwt from "jsonwebtoken";
import { type Response, type NextFunction } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import { type CustomRequest } from "./types.js";

const auth = (req: CustomRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.header("Authorization");

    if (!authorizationHeader?.includes("Bearer")) {
      const error = new CustomError(401, "Missing token");

      throw error;
    }

    const token = authorizationHeader.replace("Bearer ", "");

    const { sub: id } = jwt.verify(token, process.env.JWT_SECRET!);

    req.id = id as string;

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
