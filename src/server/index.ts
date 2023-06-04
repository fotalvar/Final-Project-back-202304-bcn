import "../loadEnviroment.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import pingController from "./controllers/pingController/pingController.js";
import path from "../paths.js";
import {
  generalError,
  notFoundError,
} from "./middlewares/errorMiddlewares/errorMiddlewares.js";
import userRouter from "./routers/userRouter.js";
import teamRouter from "./routers/team/teamRouter.js";

const allowedOrigins = [process.env.LOCAL_ORIGIN!, process.env.REMOTE_ORIGIN!];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.use(cors(corsOptions));

app.use(express.json());

app.disable("x-powered-by");

app.use(morgan("dev"));

app.get(path.pingController, pingController);

app.use(path.user, userRouter);

app.use(path.teams, teamRouter);

app.use(notFoundError);

app.use(generalError);

export default app;
