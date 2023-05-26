import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";
import jwt from "jsonwebtoken";
import connectToDatabase from "../../database/connectToDatabase.js";
import User from "../../database/models/User.js";
import { type UserCredentials } from "../../types.js";
import path from "../../paths.js";
import app from "../index.js";
import {
  invalidUserCredentials,
  userData,
  userDataHashed,
} from "../mocks/userMocks.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

afterEach(async () => {
  await User.deleteMany();
});

const mockUserCredentials: UserCredentials = userData;

const mockUserHashed: UserCredentials = userDataHashed;

const mockInvalidUserPassword: UserCredentials = invalidUserCredentials;

describe("Given a POST '/user/login' endpoint", () => {
  beforeEach(async () => {
    await User.create(mockUserHashed);
  });

  describe("When it receives a request with valid credentials", () => {
    test("Then it should return the response's a status code '200' and a 'token'", async () => {
      const expectedStatusCode = 200;

      const newUser = await User.findOne({
        username: mockUserCredentials.username,
      }).exec();

      const response = await request(app)
        .post(`${path.user}${path.login}`)
        .send(mockUserCredentials)
        .expect(expectedStatusCode);

      const payload = jwt.verify(
        response.body.token as string,
        process.env.JWT_SECRET!
      );

      const userId = payload.sub as string;

      expect(userId).toStrictEqual(newUser?._id.toString());
    });
  });

  describe("When it receives a request with invalid credentials", () => {
    test("Then it should return the response's method with a code '401' and a message 'Incorrect username or password'", async () => {
      const expectedStatusCode = 401;
      const expectedMessage = "Incorrect username or password";

      const response = await request(app)
        .post(`${path.user}${path.login}`)
        .send(mockInvalidUserPassword)
        .expect(expectedStatusCode);

      expect(response.body.message).toBe(expectedMessage);
    });
  });
});
