// Import some interfaces
import { Request, Response } from "express";
import { TaskModel } from "../models/task.model";
import { UserModel } from "../models/user.model";
import { internalError } from "../utils/errors";
import { getEmail } from "../utils/getEmail";
import { SendResponse } from "../utils/Responses";



//* -------------------------------------------------------------------------------------------------------------------------------------------------------------
export const getMyTasks = async (req:Request,res:Response) => {
  try{
    let email = await getEmail(req);
    let user = await UserModel.findOne({email});
    let tasks = await TaskModel.find({ members: { $in: [user?._id] } }).populate({
      path: "owner members",
      select: "-password -friends -tasks -chats -verifiedEmail",
    });
    return SendResponse(res,200,tasks);
  }
  catch(error){
    console.log(`Error in task.controller -> getMyTasks: ${error}`);
    let errors = [internalError];
    return SendResponse(res,500,{errors});
  }
};
//* -------------------------------------------------------------------------------------------------------------------------------------------------------------




//* -------------------------------------------------------------------------------------------------------------------------------------------------------------
export const searchTasks = async (req:Request,res:Response) =>{
  try{

    // Verify if the client provide the keyword for the search
    let {keyword} = req.query;
    if(!keyword){
      let results = ["Provide the keyword for the search"];
      return SendResponse(res,204,{results})
    }

    // Get the email in the jwt
    let email = await getEmail(req);
    let user = await UserModel.findOne({email});
    

    // Search the keyword
    keyword = keyword.toString();
    let tasks = await TaskModel.find({ 
      $and: [
        { members: { $in: [user?._id] } },
        { 
          $or: [
            { title: { $regex: new RegExp(keyword, 'i') } },
            { description: { $regex: new RegExp(keyword, 'i') } }
          ]
        }
      ]
    }).populate({
      path: "owner members",
      select: "-password -friends -tasks -chats -verifiedEmail",
    });

    return res.json(tasks);
  }
  catch(error){
    console.log(`Error in task.controller -> getMyTasks: ${error}`);
    let errors = [internalError];
    return SendResponse(res,500,{errors});
  }
};
//* -------------------------------------------------------------------------------------------------------------------------------------------------------------





//* -------------------------------------------------------------------------------------------------------------------------------------------------------------
export const createTask = async (req:Request,res:Response) => {
  try{

    let {members} = req.body;
    if(members.length < 1){
      let errors = ["You must add any members to the task"];
      return SendResponse(res,400,{errors});
    }

    let newTask = new TaskModel(req.body);
    await newTask.save();
    let task = await TaskModel.findById(newTask._id).populate({
      path: "owner members",
      select: "-password -friends -tasks -chats -verifiedEmail"
    });
    
    return SendResponse(res,201,task);
  }
  catch(error){
    return SendResponse(res,400,error);
  }
};
//* -------------------------------------------------------------------------------------------------------------------------------------------------------------




//* -------------------------------------------------------------------------------------------------------------------------------------------------------------
export const updateTask = async(req:Request,res:Response) => {
  try{

    // Get the task id from the params and verify it
    let {_id} = req.params;
    if(!_id){
      let errors = ["You must provide the task id"];
      return SendResponse(res,400,{errors});
    };

    if(Object.keys(req.body).length < 1){
      let result = ["You must to provide in the body the properties you wanna update"];
      return SendResponse(res,204,{result});
    }

    // Now lets update the task
    let result = await TaskModel.findOneAndUpdate(
      {_id},
      req.body,
      {new: true}
    ).populate({
      path: "owner members",
      select: "-password -friends -tasks -chats -verifiedEmail"
    });

    return res.json(result);
  }
  catch(error){
    return SendResponse(res,400,error);
  }
}
//* -------------------------------------------------------------------------------------------------------------------------------------------------------------




//* -------------------------------------------------------------------------------------------------------------------------------------------------------------
export const deleteTask = (req:Request,res:Response) => {
  res.json({result:"Task deleted correctly"})
}
//* -------------------------------------------------------------------------------------------------------------------------------------------------------------