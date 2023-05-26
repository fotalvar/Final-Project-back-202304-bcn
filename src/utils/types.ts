import type CustomError from "../CustomError/CustomError.js";

export interface ErrorStructure {
  incorrectCredentials: CustomError;
  endpointNotFound: CustomError;
}
