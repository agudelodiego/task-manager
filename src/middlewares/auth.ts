import { NextFunction,Request,Response }  from "express";
import { jwtVerify } from "jose";
import { KEY } from "../utils/KEY";
import { SendResponse } from "../utils/Responses";


export const auth = async(req:Request,res:Response,next:NextFunction) =>{

  try{

    // Get the token
    let {jwt} = req.cookies;

    if(!jwt){
      let errors = ["You must be authenticated, go to login or signup if you dont have an account"];
      return SendResponse(res,401,{errors});
    }

    await jwtVerify(jwt,KEY);
  
    return next();
  }
  catch(error){
    console.log(`Erro in authJWT.mdwate.ts -22 ${error}`);
    let errors = ["Internal server error"];
    return res.status(500).json({errors});
  }
  
};