import { type Request } from "express";

export interface PathStructure {
  pingController: string;
  login: string;
  user: string;
}
export type UserCredencialAlias = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  { username: string; password: string }
>;

export interface UserCredentials {
  username: string;
  password: string;
}
export interface UserDataCredentials extends UserCredentials {
  _id: string;
}
