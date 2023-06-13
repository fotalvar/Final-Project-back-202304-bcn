import { type Request } from "express";
import { type Types } from "mongoose";

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
  image: string;
}

export interface TeamCompleteStructure {
  id?: string;
  name: string;
  description: string;
  character1: string;
  character2: string;
  character3: string;
  character4: string;
  rating: string;
  type: string;
  image: string;
  user: Types.ObjectId | string;
}
export interface TeamStructureRequest extends Request {
  body: TeamsStructure;
  id: string;
}
