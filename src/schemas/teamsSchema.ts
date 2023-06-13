import { Joi } from "express-validation";

import { type TeamCompleteStructure } from "../types";

export const addTeamSchema = {
  body: Joi.object({
    team: Joi.object<TeamCompleteStructure>({
      name: Joi.string().required(),
      description: Joi.string().required(),
      character1: Joi.string().required(),
      character2: Joi.string().required(),
      character3: Joi.string().required(),
      character4: Joi.string().required(),
      rating: Joi.string().required(),
      type: Joi.string().required(),
      image: Joi.string().required(),
      user: Joi.string().required(),
    }),
  }),
};
