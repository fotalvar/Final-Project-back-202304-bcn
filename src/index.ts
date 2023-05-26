import "./loadEnviroment.js";
import createDebug from "debug";
import app from "./server/index.js";
import connectToDatabase from "./database/connectToDatabase.js";

const debug = createDebug("teams-impact-api:root");

const port = process.env.PORT ?? 4000;

const mongoDbConnection = process.env.MONGODB_CONNECTION;

if (!mongoDbConnection) {
  debug("Missing enviroment variables");
  process.exit(1);
}

app.listen(port, () => {
  debug(`Listening on http://localhost:${port}`);
});

try {
  await connectToDatabase(mongoDbConnection);
  debug("Connected to database");
} catch (error: unknown) {
  debug(`Error connecting to database: ${(error as Error).message}`);
}
