import { type Request, type NextFunction, type Response } from "express";
import User from "../../../database/models/User";
import { type UserCredentials } from "../../../types";
import { createUser } from "./usersControllers";

describe("Given the createUser controller", () => {
  const user = {
    username: "hola",
    password: "12345678",
  };
  describe("When it receives a request with username: 'hola' and a password: '12345678", () => {
    test("Then it should call the status method with 201", async () => {
      const req = {
        body: {
          username: "hola",
          password: "12345678",
        },
      } as Request<
        Record<string, unknown>,
        Record<string, unknown>,
        UserCredentials
      >;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = (() => {}) as NextFunction;
      const expectedStatusCode = 201;

      User.create = jest.fn();

      await createUser(req, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("then it should call its json method with object with property user containing the given user", async () => {
      const req = {
        body: {
          username: "hola",
          password: "12345678",
        },
      } as Request<
        Record<string, unknown>,
        Record<string, unknown>,
        UserCredentials
      >;
      const res: Partial<Response> = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockResolvedValue(user),
      };
      const next = (() => {}) as NextFunction;
      User.create = jest.fn().mockReturnValue(user);

      await createUser(req, res as Response, next);

      expect(res.json).toBeCalledWith({ user });
    });
  });
});
