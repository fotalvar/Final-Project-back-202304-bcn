import { type NextFunction, type Request, type Response } from "express";
import Team from "../../../schemas/teamsSchema";
import { statusCode } from "../../../utils/responseUtils";

const getTeams = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teams = await Team.find().limit(3).exec();

    res.status(statusCode.ok).json({ teams });
  } catch (error) {
    next(error);
  }
};

export default getTeams;
