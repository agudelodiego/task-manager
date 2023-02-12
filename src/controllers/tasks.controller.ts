// Import some interfaces
import { Request, Response } from "express";

// Import the models
import { TaskModel } from "../models/task.model";
import { UserModel } from "../models/user.model";

// Import some utils
import { getEmail } from "../utils/getEmail";
import { internalError } from "../utils/Responses";




//* -------------------------------------------------------------------------------------------------------------------------------------------------------------
export const getAll = async (req:Request,res:Response) => {
  try{

    // Get the user email
    let email = await getEmail(req);
    
    // Search the user in the database
    let user = await UserModel.findOne({email});
    let id = user?._id;

    console.log(typeof id);

    const tasks = await TaskModel.find();
    res.status(200).json(tasks);
  }
  catch(error){
    res.status(500).json(internalError);
  }
};
//* -------------------------------------------------------------------------------------------------------------------------------------------------------------




//* -------------------------------------------------------------------------------------------------------------------------------------------------------------
export const getById = (req:Request,res:Response) => {
  const task = {
    id:"akjdka",
    description:"nasdjakj dalksdjalkjd lksajdaldjf alkjdaslkdjas",
    date: "23/05/2022",
    complete:false
  };
  res.json(task)
};
//* -------------------------------------------------------------------------------------------------------------------------------------------------------------





//* -------------------------------------------------------------------------------------------------------------------------------------------------------------
export const createTask = async (req:Request,res:Response) => {
  try{
    // const Task = await TaskModel.create(req.body);
    console.log(req.body)
    res.status(201).json({result:"hola"});
  }
  catch(error){
    res.status(400).json(error);
  }
};
//* -------------------------------------------------------------------------------------------------------------------------------------------------------------




//* -------------------------------------------------------------------------------------------------------------------------------------------------------------
export const updateTask = (req:Request,res:Response) => {
  res.json({result:"Task updated correctly"});
}
//* -------------------------------------------------------------------------------------------------------------------------------------------------------------




//* -------------------------------------------------------------------------------------------------------------------------------------------------------------
export const deleteTask = (req:Request,res:Response) => {
  res.json({result:"Task deleted correctly"})
}
//* -------------------------------------------------------------------------------------------------------------------------------------------------------------