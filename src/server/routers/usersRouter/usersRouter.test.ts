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

  describe("When it receives a request with a user with name 'Diana' and password 'quehagoquehago'", () => {
    test("Then it should respond with status 200 and token 'nosedemomento'", async () => {
      const user = await User.create(mockUser);
      const jwtPayload = {
        sub: user?._id,
      };
      const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);

      const expectedStatus = 200;

      const response = await request(app)
        .post("/users/login")
        .send(mockUser)
        .expect(expectedStatus);
      console.log(response.body);
      console.log(token);
      expect(response.body).toHaveProperty("token", token);
    });
  });
});
