import CustomError from "../CustomError/CustomError.js";
import { type ErrorStructure } from "./types.js";

export const responseErrorData: ErrorStructure = {
  incorrectCredentials: new CustomError(401, "Incorrect username or password"),
  endpointNotFound: new CustomError(404, "Endpoint not found"),
};
