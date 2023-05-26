import { type Request } from "express";

export interface PathStructure {
  pingController: string;
}
export interface UserStructure {
  username: string;
  password: string;
}

export type UserCredencialAlias = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  { username: string; password: string }
>;
export interface UserData extends UserStructure {
  _id: string;
}
