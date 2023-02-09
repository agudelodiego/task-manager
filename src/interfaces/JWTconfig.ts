import { JWTHeaderParameters, JWTPayload } from "jose";

export interface JWTconfig {
  payload:JWTPayload,
  header:JWTHeaderParameters,
  expiration:string
}