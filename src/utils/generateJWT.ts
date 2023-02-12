import { SignJWT } from "jose";
import { jwtconfig } from "../interfaces/Jwt";

const KEY = new TextEncoder().encode(process.env.KEY);




export const generateJWT = async ({payload,header,expiration}:jwtconfig) =>{
  return await new SignJWT(payload)
    .setProtectedHeader(header)
    .setIssuedAt()
    .setExpirationTime(expiration)
    .sign(KEY); 
}