import { Router } from "express";
import {
  createUser,
  loginUser,
} from "../../controllers/usersControllers/usersControllers.js";

const usersRouter = Router();

usersRouter.post("/login", loginUser);
usersRouter.post("/register", createUser);

export default usersRouter;
