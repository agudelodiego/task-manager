// Model
import { UserModel } from "../models/user.model";

//Interfaces
import { loginData } from "../interfaces/login";
import { authJWT, JWTconfig } from "../interfaces/JWT";
import { signupData } from "../interfaces/signup";
import { Request, Response } from "express";

// Library for encryp the passwords
import argon2 from "argon2";

// Utils
import { generateJWT } from "../utils/generateJWT";
import { internalError } from "../utils/errors";

// JWT library
import { jwtVerify } from "jose";
import { KEY } from "../utils/KEY";




//* -------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Documentation searchUser:
/*This function searches for users in a database. It takes a "username" query from the request and uses it to find users in the database whose username starts with the query using a regex pattern. If there are any matching users, they are returned in a JSON format. If there are no matches, a 404 error message is returned. In case of any errors, it logs the error message and returns a JSON response with a 500 internal server error.*/
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
};
//* -------------------------------------------------------------------------------------------------------------------------------------------------------------




//* -------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Documentation signup:
/* handles the process of registering a new user. It does so by:

  1- Destructuring the request body to extract the values for "username", "email", and "password".

  2- Checking if the email already exists in the database by using the UserModel to findOne with the email. If it exists, the function returns a 409 Conflict error with a message of "Email already exists".

  3- Checking if the username already exists in the database by using the UserModel to findOne with the username. If it exists, the function returns a 409 Conflict error with a message of "Username already exists".

  4- Hashing the password using argon2.hash and creating a new user in the database with UserModel.create and the extracted "username", "email", and hashed password.

  5- If the user is successfully created, the function returns a 201 Created status and the newly created username.

  6- In the event of an error, a message is logged with the error and a 500 Internal Server Error is returned to the client with an "internalError" message.*/
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
//* -------------------------------------------------------------------------------------------------------------------------------------------------------------




//* -------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Documentation loginn:
/*is an asynchronous function in the user controller that allows users to log in to the application. It performs the following tasks:

  1- Extracts email and password from the request body.

  2- Searches for the user in the database by email. If the user is not found, returns a 401 error with an error message saying "Email or password incorrect".

  3- Validates the password provided by the client using the Argon2 library. If the password is not valid, returns a 401 error with an error message saying "Email or password incorrect".

  4- If the email and password are correct, a JWT config object is created with the email as the payload, header properties for the algorithm and type, and an expiration time of 30 days.

  5- Generates a new JWT using the JWT config object and the generateJWT function.

  6- Sets the JWT in the browser cookies with a max age of 30 days and httpOnly set to true.

  7- Returns the JWT to the client.

In case of any error, it logs the error message in the console and returns a 500 error with a predefined internal error message.*/
export const login = async (req:Request,res:Response) => {
  try{
    let {email,password}:loginData = req.body;
    
    // Fin the user in database
    let user = await UserModel.findOne({email});


    if(!user){
      return res.status(401).json({errors:"Email or Password incorrect"});
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
      });

      return res.json(jwt);
    }
  }
  catch(error){
    console.log(`Error in user.controller.ts -> login -95 ${error}`);
    return res.status(500).json(internalError);
  }
};
//* -------------------------------------------------------------------------------------------------------------------------------------------------------------





//* -------------------------------------------------------------------------------------------------------------------------------------------------------------
//! logout --> I think it dont need documentation
export const logout = (req:Request,res:Response) =>{
  res.clearCookie("jwt");
  return res.status(200).json({message:"Logout successful"})
};
//* -------------------------------------------------------------------------------------------------------------------------------------------------------------





//* -------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Documentation getUser:
/*Is an asynchronous function in the user controller that retrieves information about a user from the database. The function performs the following tasks:

  1- Takes the "username" from the request parameters.

  2- Searches for a user with the specified username in the database and retrieves the "username" and "email" information.

  3- If the user is not found, returns a 404 error with a corresponding error message.

  4- Otherwise, returns the information about the user.

  5- In case of an error, logs the error message and returns a 500 internal server error.*/
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
//* -------------------------------------------------------------------------------------------------------------------------------------------------------------





//* -------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Documentation updateUser:
/*Is an asynchronous function in the user controller that updates a user's information in the database. The function performs the following tasks:

  1- Verifies the user's email through a JWT received in a cookie and searches for the user in the database. If the user is not found, returns a 404 error with an error message.

  2- Verifies the password provided by the client in the request body. If the password is invalid, returns a 401 error.

  3- Checks if the update object is empty. If it is empty, does not update anything and returns a 200 response.

  4- Updates the user's information in the database.

  5- Removes the old JWT token and generates a new JWT token.

  5- Returns a response with a message indicating that the user has been updated successfully..*/
export const updateUser = async(req:Request,res:Response) => {
  try{

    // Get the user email and search the in the database
    let  {jwt}:authJWT = req.cookies
    let {payload:{email}} = await jwtVerify(jwt,KEY);
    let user = await UserModel.findOne({email});
    if(!user){
      return res.status(404).json({errors:[`User with the ${email} not found`]});
    }

    // lets get the password provided from the client in the body and verify
    let {password,forUpdate} = req.body;
    let isValidPassword = await argon2.verify(user.password,password);
    if(!isValidPassword){
      return res.status(401).json({error:"Password incorrect"});
    }

    // Lets verify for update object
    if(Object.keys(forUpdate).length < 1){
      return res.status(200).end();
    }

    // Update the user information
    for(let i in forUpdate){
      user.set(i, forUpdate[i]);
    };
    await user.save();

    // Now remove the token
    res.clearCookie("jwt");

    // Ant the generate another token
    let config:JWTconfig = {
      payload:{email:user.email},
      header:{
        alg:"HS256",
        typ:"jwt"
      },
      expiration:"30d"
    };

    // Now generate a new token and set it inside the cookies
    let newJwt = await generateJWT(config);
    res.cookie("jwt",newJwt,{
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 días en milisegundos
      httpOnly: true 
    })

    return res.json({result:"User updated correctly"});
  }
  catch(error){
    console.log(`Error in user.controller.ts -> updateUser -178 ${error}`);
    return res.status(500).json(internalError);
  }
  
};
//* -------------------------------------------------------------------------------------------------------------------------------------------------------------





//* -------------------------------------------------------------------------------------------------------------------------------------------------------------
//! Documentation deleteUser
/*This function is an exported function in TypeScript that deletes a user in a backend application. Here is a detailed description of each step in the function:

  1- It retrieves the username from the params object in the HTTP request.

  2- It uses the findOne method of the UserModel to find a user in the database with the specified username. If the user is not found, it returns a 404 status code along with a message indicating that the user was not found.

  3- If the user is found, it uses the deleteOne method of the UserModel to delete the user from the database.

  4- After the user has been deleted, it removes the JWT token from the response using the clearCookie method.

  5- Finally, it returns a JSON response with a success message indicating that the user was removed correctly.

In case of any error, it returns a 500 status code with a JSON response indicating an internal error.*/
export const deleteUser = async(req:Request,res:Response) => {
  try{

    //Get the username
    let {username} = req.params;

    // Find the user in the database
    let user = await UserModel.findOne({username});
    if(!user){
      return res.status(404).json(`User ${username} not found`)
    }

    //If the user exist delete it
    await UserModel.deleteOne({username});
    
    // Now remove the token
    res.clearCookie("jwt");
    return res.json({result:`User ${username} was removed correctly`});
  }
  catch(error){
    return res.status(500).json(internalError);
  }
};
//* -------------------------------------------------------------------------------------------------------------------------------------------------------------