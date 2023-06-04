import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectToDatabase from "../../../database/connectToDatabase.js";
import { mockedTeam, mockedToken } from "../../mocks/mocks.js";
import Team from "../../../schemas/teamsSchema.js";
import path from "../../../paths.js";
import app from "../../index.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectToDatabase(server.getUri());
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given a GET method  with the path '/teams'", () => {
  beforeAll(async () => {
    await Team.create(mockedTeam);
  });

  describe("When it receives a request with an authorization header and a valid Bearer token", () => {
    test("Then it should call the response's status method with the status code 200 and a list with 2 teams", async () => {
      const expectedStatuscode = 200;

      const response = await request(app)
        .get(`${path.teams}`)
        .set("Authorization", `Bearer ${mockedToken}`)
        .expect(expectedStatuscode);

      expect(response.body.teams).toHaveLength(2);
    });
  });
});
