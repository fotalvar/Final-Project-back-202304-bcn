import { type NextFunction, type Request, type Response } from "express";
import Team from "../../../schemas/teamsSchema.js";
import { statusCode } from "../../../utils/responseUtils.js";
import CustomError from "../../../CustomError/CustomError.js";
import { type TeamStructureRequest } from "../../../types.js";
import { Types } from "mongoose";

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
  const { id } = req.params;

  try {
    const team = await Team.findById(id).exec();

    if (!team) {
      const deleteError = new CustomError(404, "Team not found");
      throw deleteError;
    }

    await Team.findByIdAndDelete(id).exec();

    res.status(statusCode.ok).json("Team deleted");
  } catch (error: unknown) {
    next(error);
  }
};

export const addTeam = async (
  req: TeamStructureRequest,
  res: Response,
  next: NextFunction
) => {
  const { id, body } = req;
  try {
    const newTeam = await Team.create({
      ...body,
      user: new Types.ObjectId(id),
    });

    res.status(201).json({ newTeam });
  } catch (error: unknown) {
    next(error);
  }
};

export default getTeams;
