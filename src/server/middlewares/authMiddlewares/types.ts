import { type Request } from "express";
import { type TeamsMockStructure } from "../../../types";

export interface UserCredentials {
  username: string;
  password: string;
}

export type UserCredentialsRequest = Request<
  Record<string, unknown>,
  Record<string, unknown>,
  UserCredentials
>;

export interface UserStructure extends UserCredentials {
  _id?: string;
  name: string;
}

export interface CustomRequest extends Request {
  id: string;
  query: {
    limit?: string;
  };
}

export interface CustomTestRequest extends Request {
  id: string;
}

export interface CustomParamsRequest extends Request {
  id: string;
  params: { teamsId: string };
  body: TeamsMockStructure;
}

export interface CustomRequest2 extends Request {}
