import { NextFunction,Request,Response }  from "express";
import { authJWT } from "../interfaces/JWT";
import { jwtVerify } from "jose";
import { internalError } from "../utils/errors";
import { KEY } from "../utils/KEY";


export const authJWTmdware = async(req:Request,res:Response,next:NextFunction) =>{

  try{

    // Get the token
    let {jwt}:authJWT = req.cookies;

    if(!jwt){
      return res.status(401).json({error:"You must be authenticated, go to login or signup if you dont have an account"});
    }

    await jwtVerify(jwt,KEY);

    return next();
  }
  catch(error){
    console.log(`Erro in authJWT.mdwate.ts -22 ${error}`);
    return res.status(500).json({internalError})
  }
  
};