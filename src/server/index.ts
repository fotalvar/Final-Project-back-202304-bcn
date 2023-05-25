import "../loadEnviroment.js";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import pingController from "./controllers/pingController/pingController.js";

const allowedOrigins = process.env.ALLOWED_ORIGINS;

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.disable("x-powered-by");

app.use(cors(corsOptions));

app.use(morgan("dev"));

app.use(express.json());

app.get("/", pingController);

export default app;
