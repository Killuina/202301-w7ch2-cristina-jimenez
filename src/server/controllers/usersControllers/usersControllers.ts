import "../../../loadEnvironment.js";
import { type NextFunction, type Request, type Response } from "express";
import { CustomError } from "../../../CustomError/CustomError.js";
import User from "../../../database/models/User.js";
import { type UserCredentials } from "../../../types";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

export const loginUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username, password });

  if (!user) {
    const customError = new CustomError(
      "Wrong credentials",
      401,
      "Wrong credentials"
    );

    next(customError);

    return;
  }

  const jwtPayload = {
    sub: user?._id,
  };

  const token = jwt.sign(jwtPayload, process.env.JWT_SECRET!);

  res.status(200).json({ token });
};

export const createUser = async (
  req: Request<
    Record<string, unknown>,
    Record<string, unknown>,
    UserCredentials
  >,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, username } = req.body;

    const saltLength = 10;
    const hashedPassword = await bcryptjs.hash(password, saltLength);

    const user = await User.create({
      password: hashedPassword,
      username,
      avatar: req.file?.originalname,
    });

    res.status(201).json({ message: `User '${user.username}' created!` });
  } catch (error) {
    const customError = new CustomError(
      (error as Error).message,
      500,
      "Error while creating the user"
    );

    next(customError);
  }
};
