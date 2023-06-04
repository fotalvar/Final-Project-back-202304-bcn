import CustomError from "../CustomError/CustomError.js";
import { type ResponseStructure, type ErrorStructure } from "./types.js";

export const responseErrorData: ErrorStructure = {
  incorrectCredentials: new CustomError(401, "Incorrect username or password"),
  endpointNotFound: new CustomError(404, "Endpoint not found"),
};

export const correctResponse: ResponseStructure = {
  statusCode: 200,
  message: "OK",
};

export const statusCode = {
  ok: 200,
  badRequest: 400,
  unauthorized: 401,
  notFound: 404,
  internalServerError: 500,
};
