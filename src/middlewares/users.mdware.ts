import { searchUserValidate } from "../DTOs/users.dto";
import { NextFunction,Request,Response }  from "express";

export const searchUserMdware = (req:Request,res:Response,next:NextFunction) => {

  let isValidSearch = searchUserValidate(req.query);

  if(!isValidSearch){
    return res.status(400).json({error:"You must provide a query(search/username=example) and it must be greater than two and smaller than 20"});
  }
  else
  return next();
};