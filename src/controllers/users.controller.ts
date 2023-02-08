import { Request, Response } from "express";


export const getUsers = (req:Request,res:Response) => {
  const users = [
    {
      name:"lkas",
      age:23,
      email:"jaslda@jalsdj.asd",
      password:"aslkdlaksdjalk"
    },
    {
      name:"lkas",
      age:23,
      email:"jaslda@jalsdj.asd",
      password:"aslkdlaksdjalk"
    }
  ];
  res.json(users);
};


export const signup = (req:Request,res:Response) =>{
  res.status(201).json({result:"User created correctly"})
};


export const login = (req:Request,res:Response) => {
  res.json({result:"Login works"})
};


export const getUser = (req:Request,res:Response) => {
  const user = {
    name:"lkas",
    age:23,
    email:"jaslda@jalsdj.asd",
    password:"aslkdlaksdjalk"
  }
  res.json(user);
};


export const updateUser = (req:Request,res:Response) => {
  res.json({result:"User updated correctly"});
};


export const deleteUser = (req:Request,res:Response) => {
  res.json({result:"User deleted correctly"});
};