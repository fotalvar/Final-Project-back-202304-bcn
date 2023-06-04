import { Router } from "express";
import auth from "../../middlewares/authMiddlewares/authMiddlewares.js";
import getTeams from "../../controllers/teamController/teamController.js";
import path from "../../../paths.js";

const teamRouter = Router();

teamRouter.get(path.root, auth, getTeams);

export default teamRouter;
