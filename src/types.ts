import { type Request } from "express";

export interface PathStructure {
  root: string;
  pingController: string;
  login: string;
  user: string;
  teams: string;
  id: string;
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
export interface TeamsStructure {
  id?: string;
  name: string;
  description: string;
  character1: string;
  character2: string;
  character3: string;
  character4: string;
  rating: string;
  type: string;
  bgimage: string;
}
