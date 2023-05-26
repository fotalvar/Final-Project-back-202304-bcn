import { type UserDataCredentials, type UserCredentials } from "../../types";

export const userData: UserCredentials = {
  username: "fede",
  password: "fede",
};

export const userDataCredentials: UserDataCredentials = {
  ...userData,
  _id: "1",
};

export const userDataHashed: UserCredentials = {
  username: "fede",
  password: "$2y$10$blaOzQMIIk.nnf/jGKHSJeM3KcG8mX9skl5e9z5uAYshXyv8pAfRq",
};

export const invalidUserCredentials: UserCredentials = {
  username: "fede",
  password: "fede1234",
};
