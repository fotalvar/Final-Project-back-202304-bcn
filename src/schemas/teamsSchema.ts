import { Schema, Types, model } from "mongoose";

const teamsSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  character1: {
    type: String,
    required: true,
  },
  character2: {
    type: String,
    required: true,
  },
  character3: {
    type: String,
    required: true,
  },
  character4: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  user: {
    type: Types.ObjectId,
    ref: "User",
  },
});

const Team = model("Team", teamsSchema, "teams");

export default Team;
