import Team from "../../../schemas/teamsSchema";
import { type NextFunction, type Response } from "express";
import { type CustomRequest } from "../../middlewares/authMiddlewares/types";
import getTeams from "./teamController";
import { mockedTeam } from "../../mocks/mocks";
import { correctResponse } from "../../../utils/responseUtils";

describe("Given a getTeams controller", () => {
  const req = {};
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a response", () => {
    Team.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(mockedTeam),
    });
    test("Then it should call the response's method status with 200", async () => {
      const expectedStatus = correctResponse.statusCode;

      await getTeams(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method json with a list of teams", async () => {
      await getTeams(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ teams: mockedTeam });
    });
  });

  describe("When it receives a next function and the exec method rejects with an 'Error connecting to database' error", () => {
    test("Then it should call next function with the error 'Error connecting to database'", async () => {
      const expectedError = new Error("Error connecting to database");
      const req = {};
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      Team.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await getTeams(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
