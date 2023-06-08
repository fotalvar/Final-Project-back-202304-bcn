import { type NextFunction, type Request, type Response } from "express";
import Team from "../../../schemas/teamsSchema.js";
import { statusCode } from "../../../utils/responseUtils.js";

const getTeams = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const teams = await Team.find().limit(3).exec();

    res.status(statusCode.ok).json({ teams });
  } catch (error) {
    next(error);
  }
};

export const deleteTeam = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { teamId } = req.params;

    await Team.findByIdAndDelete(teamId).exec();

    res.status(statusCode.ok).json("Team deleted");
  } catch (error: unknown) {
    next(error);
  }
};

export default getTeams;
