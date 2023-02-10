// Model
import { UserModel } from "../models/user.model";

//Interfaces
import { loginData } from "../interfaces/login";
import { JWTconfig } from "../interfaces/JWT";
import { signupData } from "../interfaces/signup";
import { Request, Response } from "express";

// Library for encryp the passwords
import argon2 from "argon2";

// Utils
import { generateJWT } from "../utils/generateJWT";
import { internalError } from "../utils/errors";



export const searchUsers = async (req:Request,res:Response) => {
  try{
    let {username} = req.query;
    const users = await UserModel.find({ username: { $regex: new RegExp(`^${username}.*`, 'i') } }, "username email");
    if(users.length < 1){
      return res.status(404).json({error:`Not found user with username: ${username}`})
    }
    return res.json(users);
  }
  catch(error){
    console.log(`Error in users.controller.ts -> searchUsers - 35 ${error} `);
    return res.status(500).json(internalError);
  }
}


export const signup = async (req:Request,res:Response) =>{
  try{
    let {username,email,password}:signupData = req.body;

    // First validate if the username or email alredy exist in database
    let emailExist = await UserModel.findOne({email});
    if(emailExist){
      return res.status(409).json({error:"Email alredy exist"})
    }

    // Now validate if the username alredy exist
    let usernameExist = await UserModel.findOne({username});
    if(usernameExist){
      return res.status(409).json({error:"Username alredy exist"})
    }

    // Now lets encrypt the password and create the new user
    let hashedPassword = await argon2.hash(password);
    

    let newUser = await UserModel.create({username,email,password:hashedPassword});
    return res.status(201).json(newUser.username);
  }
  catch(error){
    console.log(`Error in user.controller.ts -> signup - 54 ${error}`)
    return res.status(500).json(internalError);
  }
};


export const login = async (req:Request,res:Response) => {
  try{
    let {email,password}:loginData = req.body;
    
    // Fin the user in database
    let user = await UserModel.findOne({email});


    if(!user){
      return res.status(401).json({error:"Email or Password incorrect"});
    }
    else{

      // Validate the password
      let isValidPassword = await argon2.verify(user.password,password);

      if(!isValidPassword) {
        return res.status(401).json({error:"Email or password incorrect"});
      }

      // Create config object ant then pass it to generateJWT function
      let config:JWTconfig = {
        payload:{email},
        header:{
          alg:"HS256",
          typ:"jwt"
        },
        expiration:"30d"
      };

      // Now generate our token
      let jwt = await generateJWT(config);

      // Set jwt in the browser cookies
      res.cookie("jwt",jwt,{
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días en milisegundos
        httpOnly: true 
      })

      return res.json(jwt);
    }
  }
  catch(error){
    console.log(`Error in user.controller.ts -> login -95 ${error}`);
    return res.status(500).json(internalError);
  }
};


export const logout = (req:Request,res:Response) =>{
  res.clearCookie("jwt");
  return res.status(200).json({message:"Logout successful"})
}


export const getUser = async(req:Request,res:Response) => {
  try{
    let {username} = req.params;
    let user = await UserModel.findOne({username},"username email");

    if(!user){
      return res.status(404).json({error:`Not found user with username: ${username}`})
    }

    return res.send(user);
  }
  catch(error){
    console.log(`Error in user.controller.ts -> getUser -116 ${error}`);
    return res.status(500).json(internalError);
  }
};


export const updateUser = (req:Request,res:Response) => {
  res.json({result:"User updated correctly"});
};


export const deleteUser = (req:Request,res:Response) => {
  res.json({result:"User deleted correctly"});
};