import { Request } from "express"
import { jwtVerify } from "jose";
import { KEY } from "./KEY";



// This function will get the user email from the jwt in the cookies
export const getEmail = async(req:Request) => {

  // Get the user email and search the in the database
  let  {jwt} = req.cookies;
  let {payload:{email}} = await jwtVerify(jwt,KEY);
  return email;

};