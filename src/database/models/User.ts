import { Schema, model } from "mongoose";

const userSchema = new Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
    require: true,
    unique: true,
    min: 3,
    max: 15,
  },
  password: {
    type: String,
    require: true,
  },
});

const User = model("User", userSchema, "users");

export default User;
