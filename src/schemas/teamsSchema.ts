import { Joi } from "express-validation";

export const addTeamSchema = {
  body: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    character1: Joi.string(),
    character2: Joi.string(),
    character3: Joi.string(),
    character4: Joi.string(),
    rating: Joi.string(),
    type: Joi.string(),
    image: Joi.string(),
    user: Joi.string(),
  }),
};
