import { SignJWT } from "jose";
import { JWTconfig } from "../interfaces/JWT";

const KEY = new TextEncoder().encode(process.env.KEY);

export const generateJWT = async ({payload,header,expiration}:JWTconfig) =>{
  return await new SignJWT(payload)
    .setProtectedHeader(header)
    .setIssuedAt()
    .setExpirationTime(expiration)
    .sign(KEY); 
}