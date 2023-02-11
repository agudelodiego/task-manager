import { searchUserValidate, updateUserValidate } from "../DTOs/users.dto";
import { NextFunction,Request,Response }  from "express";



//* ------------------------------------------------------------------------------------------------------------------------------------------------------------
// This middlware will validate that the client will provide a correct structure in the query string
export const searchUserMdware = (req:Request,res:Response,next:NextFunction) => {

  let isValidSearch = searchUserValidate(req.query);

  if(!isValidSearch){
    return res.status(400).json({errors:searchUserValidate.errors?.map((error)=>error.message)});
  }
  else{
    return next();
  }

};
//* ------------------------------------------------------------------------------------------------------------------------------------------------------------



//* ------------------------------------------------------------------------------------------------------------------------------------------------------------
export const updateUserMdware = (req:Request,res:Response,next:NextFunction) =>{

  let isValidUpdate = updateUserValidate(req.body);

  if(!isValidUpdate){
    return res.status(400).json({errors:updateUserValidate.errors?.map((error)=>error.message)});
  }
  else{
    return next();
  }

}
//* ------------------------------------------------------------------------------------------------------------------------------------------------------------