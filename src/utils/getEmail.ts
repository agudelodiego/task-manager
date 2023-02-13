import { Request } from "express"
import { jwtVerify, JWTVerifyResult } from "jose";
import { KEY } from "./KEY";



// This function will get the user email from the jwt in the cookies
export const getEmail = async(req:Request) => {

  try{
    // Get the user email and search the in the database
    let  {jwt} = req.cookies;
    let {payload:{email}}:JWTVerifyResult = await jwtVerify(jwt,KEY);
    
    if(typeof email == "string"){
      return email;
    }
    else{
      return false;
    }
  }
  catch(error){
    return false;
  }

};