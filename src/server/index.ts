import express from "express";

const app = express();

app.disable("x-powered-by");

app.use(express.json());

export default app;
