import { Response } from "express"


export const SendResponse = (res: Response,status:number, message:any) =>{
  return res.status(status).json(message);
};