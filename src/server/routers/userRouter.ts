import { Router } from "express";
import { validate } from "express-validation";
import path from "../../paths.js";
import loginSchema from "../../schemas/loginSchema.js";
import { loginUser } from "../controllers/userController/userController.js";

const userRouter = Router();

userRouter.post(
  path.login,
  validate(loginSchema, {}, { abortEarly: false }),
  loginUser
);

export default userRouter;
