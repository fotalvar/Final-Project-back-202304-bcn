import { type Request, type NextFunction, type Response } from "express";
import {
  type CustomParamsRequest,
  type CustomRequest,
} from "../../middlewares/authMiddlewares/types";
import getTeams, { addTeam, deleteTeam, getTeamsById } from "./teamController";
import { mockedTeam, mockedSingleTeam } from "../../mocks/mocks";
import { Types } from "mongoose";
import { type TeamStructureRequest } from "../../../types";
import Team from "../../../database/models/Team";
import CustomError from "../../../CustomError/CustomError";

type CustomResponse = Pick<Response, "status" | "json">;

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a getTeams controller", () => {
  const req: Partial<CustomRequest> = { query: { limit: "3" } };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();
  describe("When it receives a next function and the exec method rejects with an 'Error connecting to database' error", () => {
    test("Then it should call next function with the error 'Error connecting to database'", async () => {
      const expectedError = new Error("Error connecting to database");

      Team.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        sort: jest.fn().mockReturnThis(),
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
  describe("When it receives a response", () => {
    test("Then it should call the response's method status with 200", async () => {
      Team.find = jest.fn().mockReturnValue({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockResolvedValue(mockedTeam),
      });

      Team.where = jest.fn().mockReturnValue({
        countDocuments: jest.fn().mockReturnValue(mockedTeam.length),
      });
      const expectedStatusCode = 200;

      await getTeams(req as CustomRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
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

    describe("When it receives a invalid team id", () => {
      const req: Partial<CustomParamsRequest> = {
        params: {
          teamsId: mockedSingleTeam[0].id?.toString(),
        },
      };
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      Team.findByIdAndDelete = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockedSingleTeam),
      });

      test("Then it should call the response's method status code with 200", async () => {
        await deleteTeam(req as CustomRequest, res as Response, next);

        expect(res.status).toHaveBeenCalledWith(200);
      });
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
  Team.create = jest.fn().mockReturnValue(mockedTeam[0]);
  const expectedStatusCode = 201;
  const req: Pick<TeamStructureRequest, "body" | "id"> = {
    body: mockedTeam[0],
    id: "647cd44b96ddfdfe6857e5e0",
  };
  const res: CustomResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };

  const next = jest.fn();
  describe("When it receives a request with a new team", () => {
    test("Then it should call the response's status method with the statuscode 201", async () => {
      await addTeam(
        req as TeamStructureRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });
  });

  describe("When it receives a next function with an 'Validation Failed' error", () => {
    test("Then it should call next function with the 'Validation Failed' error", async () => {
      const expectedError = new Error("Validation Failed");

      Team.create = jest.fn().mockRejectedValue(expectedError);

      await addTeam(
        req as TeamStructureRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});

describe("Given a getTeamsById controller", () => {
  const req: Partial<CustomParamsRequest> = {
    params: {
      teamsId: mockedSingleTeam[0].id?.toString(),
    },
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  describe("When it receives a valid team id", () => {
    test("Then it should call the response's method status with 200", async () => {
      const expectedStatus = 200;

      Team.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockedSingleTeam[0]),
      });

      await getTeamsById(
        req as CustomParamsRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the response's method json with the team", async () => {
      Team.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockedSingleTeam[0]),
      });

      await getTeamsById(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ teamById: mockedSingleTeam[0] });
    });
  });

  describe("When it receives a invalid team id", () => {
    test("Then it should call the response's method status with 404", async () => {
      const expectedError = new CustomError(404, "Team not found");

      Team.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      await getTeamsById(
        req as CustomRequest,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
