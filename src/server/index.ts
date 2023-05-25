import "./loadEnviroment.js";
import express from "express";
import cors from "cors";

const allowedOrigins = process.env.ALLOWED_ORIGINS;

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

const app = express();

app.disable("x-powered-by");

app.use(cors(corsOptions));

app.use(express.json());

export default app;
