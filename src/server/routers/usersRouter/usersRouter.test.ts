import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import connectDataBase from "../../../database/connectDataBase";
import User from "../../../database/models/User";
import request from "supertest";
import { app } from "../..";
import jwt from "jsonwebtoken";
import { type NextFunction, type Request, type Response } from "express";
import { type UserCredentials } from "../../../types";

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
  const userData = {
    username: "Diana",
    password: "quehagoquehago",
  };
  beforeAll(async () => {
    await User.create(userData);
  });

  describe("When it receives a request with a user with username 'Diana' and password 'quehagoquehago'", () => {
    test("Then it should respond with status 200 and property token with value 'mocken'", async () => {
      const expectedStatus = 200;
      const expectedToken = "mocken";
      const path = "/users/login";
      jwt.sign = jest.fn().mockReturnValue(expectedToken);

      const response = await request(app)
        .post(path)
        .send(userData)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty("token", expectedToken);
    });
  });
});

describe("Given the POST /users/register endpoint", () => {
  describe("when it receives a request with a user with username 'Manolo', password 'queesunafuncionpura' and a file", () => {
    test("Then it should respond with status 201 and the same user", async () => {
      const expectedStatus = 201;
      const userData = {
        username: "Manolo",
        password: "queesunafuncionpura",
      };
      User.create = jest.fn().mockResolvedValue(userData);

      const response = await request(app)
        .post("/users/register")
        .send(userData)
        .expect(expectedStatus);

      expect(response.body).toHaveProperty(
        "message",
        `User '${userData.username}' created!`
      );
    });
  });
  describe("when it receives a request with a user with username 'Manolo', password 'queesunafuncionpura' and a file 'oaihdf.js'", () => {
    test("Then it should respond with status 201 and the same user", async () => {
      const expectedStatus = 201;
      const userData = {
        username: "Manolo",
        password: "queesunafuncionpura",
      };
      const req = { body: userData } as Request<
        Record<string, unknown>,
        Record<string, unknown>,
        UserCredentials
      >;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(userData),
      };
      const next = (() => {}) as NextFunction;

      const response = await request(app)
        .post("/users/register")
        .field("username", userData.password)
        .field("password", userData.username)
        .attach("avatar", "src/testMedia/1677238314361favicon.ico.jpg")
        .expect(expectedStatus);

      expect(response.body).toHaveProperty(
        "message",
        `User '${userData.username}' created!`
      );
    });
  });
});
