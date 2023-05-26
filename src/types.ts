import { type Request } from "express";

export interface PathStructure {
  pingController: string;
  login: string;
}
export type UserCredencialAlias = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  { username: string; password: string }
>;

export interface UserStructure {
  username: string;
  password: string;
}
export interface UserData extends UserStructure {
  _id: string;
}
