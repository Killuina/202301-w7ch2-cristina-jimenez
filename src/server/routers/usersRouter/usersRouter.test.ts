import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDataBase from "../../../database/connectDataBase";
import User from "../../../database/models/User";
import request from "supertest";
import { app } from "../..";
import jwt from "jsonwebtoken";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  await connectDataBase(server.getUri());
});

afterAll(async () => {
  await server.stop();
  await mongoose.connection.close();
});

describe("Given the POST /users/login endpoint", () => {
  const mockUser = {
    username: "Diana",
    password: "quehagoquehago",
  };
  beforeAll(async () => {
    await User.create(mockUser);
  });

  describe("When it receives a request with a user with username 'Diana' and password 'quehagoquehago'", () => {
    test("Then it should respond with status 200 and property token with value 'mocken'", async () => {
      const expectedStatus = 200;
      const expectedToken = "mocken";
      const path = "/users/login";
      jwt.sign = jest.fn().mockReturnValue(expectedToken);

      const response = await request(app)
        .post(path)
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("token", expectedToken);
    });
  });
});

describe("Given the POST /users/register endpoint", () => {
  describe("when it receives a request with a user with username 'Manolo' and password 'queesunafuncionpura'", () => {
    test("Then it should respond with status 201 and the same user", async () => {
      const expectedStatus = 201;
      const mockUser = {
        username: "Manolo",
        password: "queesunafuncionpura",
      };
      User.create = jest.fn().mockResolvedValue(mockUser);

      const response = await request(app)
        .post("/users/register")
        .send(mockUser)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("user", mockUser);
    });
  });
});
