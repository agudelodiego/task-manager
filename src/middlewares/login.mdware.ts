import { loginValidate } from "../DTOs/login.dto";
import { NextFunction,Request,Response }  from "express";

export const loginMdware = (req:Request,res:Response,next:NextFunction) =>{

  // Validate if the client reques have email and password and also validate if the email has a correct format
  const isValidRequest = loginValidate(req.body);

  if(!isValidRequest){
    return res.status(400).json({error:"The request doesnt have the correct structure"});
  }
  else{
    return next();
  }
}