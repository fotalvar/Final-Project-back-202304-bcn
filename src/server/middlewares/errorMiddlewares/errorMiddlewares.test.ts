import { type NextFunction, type Request, type Response } from "express";
import { generalError, notFoundError } from "./errorMiddlewares.js";
import CustomError from "../../../CustomError/CustomError.js";

type CustomResponse = Pick<Response, "status" | "json">;

const res: CustomResponse = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const req = {};
const next = jest.fn();

describe("Given a generalError middleware", () => {
  describe("When it receives an error with statuscode 404 and message 'Endpoint not found'", () => {
    test("Then it should call de response method with status code 404", () => {
      const error = new CustomError(404, "Endpoint not found");
      const expectedStatusCode = 404;

      generalError(
        error,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it is called with and an unknown error", () => {
    test("Then it should call response with code 500 and json with 'General server error'", () => {
      const error = new Error("General server error");
      const statusCode = 500;
      const { message } = error;

      generalError(
        error as CustomError,
        req as Request,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(statusCode);
      expect(res.json).toHaveBeenCalledWith({ message });
    });
  });
});

describe("Given a notFoundError middleware", () => {
  describe("When it receives a request and a next function", () => {
    test("Then it should call the next function with the text 'Endpoint not found'", () => {
      const req = {};
      const res = {};
      const next = jest.fn();
      const expectedError = new CustomError(404, "Endpoint not found");

      notFoundError(req as Request, res as Response, next as NextFunction);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
