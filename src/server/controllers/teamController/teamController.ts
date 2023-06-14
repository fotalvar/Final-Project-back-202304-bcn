import { type NextFunction, type Request, type Response } from "express";
import { statusCode } from "../../../utils/responseUtils.js";
import CustomError from "../../../CustomError/CustomError.js";
import { type TeamStructureRequest } from "../../../types.js";
import { Types } from "mongoose";
import { type CustomRequest } from "../../middlewares/authMiddlewares/types.js";
import Team from "../../../database/models/Team.js";

const getTeams = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { limit } = req.query;
    const limitNumber = Number(limit);

    const teams = await Team.find().sort({ _id: -1 }).limit(limitNumber).exec();

    const totalCount = await Team.where().countDocuments();

    res.status(statusCode.ok).json({ teams, totalCount });
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

export const getTeamsById = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { teamId } = req.params;

    const selectedTeam = await Team.findById(teamId).exec();

    if (!selectedTeam) {
      const error = new CustomError(404, "Team not found");

      throw error;
    }

    res.status(200).json({ teamById: selectedTeam });
  } catch (error) {
    next(error);
  }
};

export default getTeams;
