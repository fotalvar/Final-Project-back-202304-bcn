import { Joi } from "express-validation";
import { type UserStructure } from "../types";

const loginSchema = {
  body: Joi.object<UserStructure>({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

export default loginSchema;
