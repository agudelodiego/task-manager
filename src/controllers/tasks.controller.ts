import { Request, Response } from "express";


export const getAll = (req:Request,res:Response) => {
  const tasks = [
    {
      id:"akjdka",
      description:"nasdjakj dalksdjalkjd lksajdaldjf alkjdaslkdjas",
      date: "23/05/2022",
      complete:false
    },
    {
      id:"akjdka",
      description:"nasdjakj dalksdjalkjd lksajdaldjf alkjdaslkdjas",
      date: "23/05/2022",
      complete:false
    }
  ]
  res.json(tasks)
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



export const createTask = (req:Request,res:Response) => {
  res.status(201).json({restul:"Task created correctly"});
};


export const updateTask = (req:Request,res:Response) => {
  res.json({result:"Task updated correctly"});
}


export const deleteTask = (req:Request,res:Response) => {
  res.json({result:"Task deleted correctly"})
}