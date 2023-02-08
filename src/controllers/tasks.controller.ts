import { Request, Response } from "express";
import { TaskModel } from "../models/task.model";
// import { task } from "../interfaces/task";


export const getAll = async (req:Request,res:Response) => {
  try{
    const tasks = await TaskModel.find();
    res.status(200).json(tasks);
  }
  catch(error){
    res.status(500).json(error);
  }
};



export const getById = (req:Request,res:Response) => {
  const task = {
    id:"akjdka",
    description:"nasdjakj dalksdjalkjd lksajdaldjf alkjdaslkdjas",
    date: "23/05/2022",
    complete:false
  };
  res.json(task)
};



export const createTask = async (req:Request,res:Response) => {
  try{
    const Task = await TaskModel.create(req.body);
    res.status(201).json(Task);
  }
  catch(error){
    res.status(400).json(error);
  }
};


export const updateTask = (req:Request,res:Response) => {
  res.json({result:"Task updated correctly"});
}


export const deleteTask = (req:Request,res:Response) => {
  res.json({result:"Task deleted correctly"})
}