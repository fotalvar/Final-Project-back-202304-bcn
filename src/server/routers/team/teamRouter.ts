import { Router } from "express";
import auth from "../../middlewares/authMiddlewares/authMiddlewares.js";
import getTeams, {
  addTeam,
  deleteTeam,
  getTeamsById,
} from "../../controllers/teamController/teamController.js";
import path from "../../../paths.js";
import { validate } from "express-validation";
import { addTeamSchema } from "../../../schemas/teamsSchema.js";

const teamRouter = Router();

teamRouter.get(path.root, auth, getTeams);

teamRouter.delete(path.delete, auth, deleteTeam);

teamRouter.get(path.detail, auth, getTeamsById);

teamRouter.post(
  path.add,
  validate(addTeamSchema, {}, { abortEarly: false }),
  auth,
  addTeam
);

export default teamRouter;
