import { signupValidate } from "../DTOs/signup.dto";
import { NextFunction,Request,Response }  from "express";


export const signupMdware = (req:Request,res:Response,next:NextFunction) =>{
  // Validate if the information provided has a good shape and format
  const isValidRequest = signupValidate(req.body);

  if(!isValidRequest){
    return res.status(400).json({errors:signupValidate.errors?.map((error)=>error.message)});
  }
  else{
    return next();
  }
};