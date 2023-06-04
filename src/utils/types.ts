import type CustomError from "../CustomError/CustomError.js";

export interface ErrorStructure {
  incorrectCredentials: CustomError;
  endpointNotFound: CustomError;
}
export interface ResponseStructure {
  statusCode: number;
  message: string;
  publicMessage?: string;
}
