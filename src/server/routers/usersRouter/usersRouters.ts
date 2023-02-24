import { Router } from "express";
import { validate } from "express-validation";
import {
  createUser,
  loginUser,
} from "../../controllers/usersControllers/usersControllers.js";
import multerMiddleware from "../../middlewares/multer/multer.js";
import registerSchema from "../../schemas/registerRequestSchema.js";

const usersRouter = Router();

usersRouter.post("/login", loginUser);
usersRouter.post(
  "/register",
  multerMiddleware,
  validate(registerSchema, {}, { abortEarly: false }),
  createUser
);

export default usersRouter;
