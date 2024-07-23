import request from "supertest";
import app from "../app";

describe("demo", () => {
  test("test api server-template", () =>
    request(app)
      .get("/")
      .expect(200)
      .expect({ message: "Welcome to the template server dude!" }));
});
