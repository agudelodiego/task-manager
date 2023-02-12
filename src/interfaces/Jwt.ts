import { JWTHeaderParameters, JWTPayload } from "jose";

export interface jwtconfig {
  payload: JWTPayload,
  header: JWTHeaderParameters,
  expiration: string
};