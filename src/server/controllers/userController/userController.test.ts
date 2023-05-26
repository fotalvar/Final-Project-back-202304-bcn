import { type NextFunction, type Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  type UserCredentials,
  type UserDataCredentials,
  type UserCredencialAlias,
} from "../../../types";
import { Types } from "mongoose";
import User from "../../../database/models/User";
import { loginUser } from "./userController";
import { responseErrorData } from "../../../utils/responseUtils";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("Given a loginUser controller", () => {
  const usersCredentials: UserCredentials = {
    password: "hola",
    username: "fede",
  };
  const req: Partial<UserCredencialAlias> = {
    body: usersCredentials,
  };
  const res: Partial<Response> = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  const mockedUser: UserDataCredentials = {
    _id: new Types.ObjectId().toString(),
    password: "hola",
    username: "fede",
  };
  const token = "token";

  describe("When it receives a request with valid username and password", () => {
    test("Then it should call the status method with a status code 200", async () => {
      const expectedStatus = 200;

      User.findOne = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockedUser),
      });

      bcrypt.compare = jest.fn().mockResolvedValue(true);

      jwt.sign = jest.fn().mockReturnValue(token);

      await loginUser(
        req as UserCredencialAlias,
        res as Response,
        next as NextFunction
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatus);
    });

    test("Then it should call the method json with the token", async () => {
      await loginUser(
        req as UserCredencialAlias,
        res as Response,
        next as NextFunction
      );

      expect(res.json).toHaveBeenCalledWith({ token });
    });
  });

  describe("When it receives an invalid username or password and the next function", () => {
    test("Then it should call the next function with the error 'Incorrect username or password', and status code 401", async () => {
      const expectedError = responseErrorData.incorrectCredentials;
      bcrypt.compare = jest.fn().mockResolvedValue(false);

      await loginUser(
        req as UserCredencialAlias,
        res as Response,
        next as NextFunction
      );

      expect(next).toHaveBeenCalledWith(expectedError);
    });
  });
});
