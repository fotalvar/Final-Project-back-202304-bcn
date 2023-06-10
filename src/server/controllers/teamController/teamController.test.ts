import Team from "../../../schemas/teamsSchema";
import { type Request, type NextFunction, type Response } from "express";
import { type CustomRequest } from "../../middlewares/authMiddlewares/types";
import getTeams, { addTeam, deleteTeam } from "./teamController";
import { mockedTeam } from "../../mocks/mocks";
import { correctResponse } from "../../../utils/responseUtils";
import { Types } from "mongoose";
import { type TeamStructureRequest } from "../../../types";

type CustomResponse = Pick<Response, "status" | "json">;

beforeEach(() => {
  jest.clearAllMocks();
});

const req = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next = jest.fn();

describe("Given a getTeams controller", () => {
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

describe("Given a deleteTeam controller", () => {
  const teamId = new Types.ObjectId().toString();

  const req: Partial<Request> = {
    params: { teamId },
  };

  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();

  describe("When it receives a request with an existing id, a response and next function", () => {
    test("Then it should call its status method with a status 200 and the the message 'Team deleted'", async () => {
      const expectedStatusCode = 200;
      const expectedMessage = "Team deleted";

      Team.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(teamId),
      });

      Team.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(teamId),
      });

      await deleteTeam(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
      expect(res.json).toHaveBeenCalledWith(expectedMessage);
    });
  });

  describe("When it receives a request with an invalid id, a response and next function", () => {
    test("Then it should call the next function with the error message 'Can't delete Team'", async () => {
      const expectedError = new Error("Can't delete Team");

      Team.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(expectedError),
      });

      await deleteTeam(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a AddTeam controller", () => {
  describe("When it receives a request with a new team", () => {
    test("Then it should call the response's status method with the statuscode 201", async () => {
      Team.create = jest.fn().mockReturnValue(mockedTeam[0]);
      const expectedStatusCode = 201;
      const req: Pick<TeamStructureRequest, "body" | "id"> = {
        body: mockedTeam[0],
        id: "647cd44b96ddfdfe6857e5e0",
      };

      await addTeam(
        req as TeamStructureRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });
});
