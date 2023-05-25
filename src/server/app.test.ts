import request from "supertest";
import app from "./index";

describe("Given a GET '/' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a statusCode 200 and a 'Pong' message", async () => {
      const expectedStatus = 200;
      const message = "Pong";

      const response = await request(app).get("/").expect(expectedStatus);

      expect(response.body).toStrictEqual({ message });
    });
  });
});
