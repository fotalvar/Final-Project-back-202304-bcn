import Team from "../../../schemas/teamsSchema";
import { type NextFunction, type Response } from "express";
import { type CustomRequest } from "../../middlewares/authMiddlewares/types";
import getTeams from "./teamController";

describe("Given a getTeams controller", () => {
  describe("When it receives a next function and the exec method rejects with an 'tot malament' error", () => {
    test("Then it should call next function with the error 'tot malament'", async () => {
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
