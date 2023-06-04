import { Router } from "express";
import auth from "../../middlewares/authMiddlewares/authMiddlewares.js";
import getTeams from "../../controllers/teamController/teamController.js";

const teamRouter = Router();

teamRouter.get("/", auth, getTeams);

export default teamRouter;
