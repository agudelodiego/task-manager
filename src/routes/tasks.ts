//Import express router
import { Router } from "express";


//Create router for task routes
export const tasksRouter = Router();


//! HANDLE THE ROUTES
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------
tasksRouter.route("/").get((req,res)=>{
  res.status(200).json({sms:'Hello from task'})
});
tasksRouter.route("/").post((req,res)=>{
  res.status(200).json({sms:'Hello bro'})
});
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------
