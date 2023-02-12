import { ValidateFunction } from "ajv"
import { Request, Response, NextFunction } from "express"
import { SendResponse } from "../utils/Responses";

export const validateBody = 
  (validator:ValidateFunction) =>
  (req:Request, res:Response, next:NextFunction) => {

  let result = validator(req.body);
  
  if(!result){
    
    let errors = validator.errors?.map( error => error.message);
    return SendResponse(res,400,{errors});

  }
  return next();

}