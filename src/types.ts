import { type Request } from "express";

export interface PathStructure {
  pingController: string;
}

export interface UserCredentials {
  username: string;
  password: string;
}

export interface UserData extends UserCredentials {
  _id: string;
}

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;
