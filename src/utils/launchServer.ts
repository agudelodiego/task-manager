import express from "express";

// Cookie parser
import cookieParser from "cookie-parser";

// envarioments variables configuration
import {config} from "dotenv";

// This will do the connection with the db
import { connectDB } from "../db/connect";

// This just print the terminal information about the server
import { showconfig } from "./showconfig";

// Typescript interfaces
import { Endpoint } from "../interfaces/endpoint";

// This function will do routin for each endpoint
import { appRouter } from "./appRouter";



//! Main aplication function, beacuse it will leuch the server, connect to db, apply middlewares
export const launchServer = async(appRoutes:Endpoint[]) => {

  try{

    // dotenv configuration
    config();

    // Create an express app
    const app = express();

    // Port where ther server will up
    const PORT = process.env.PORT || 3000;

    // Global middlewares
    app.use(express.json());
    app.use(cookieParser());

    // Connect to database
    await connectDB();

    // Show information about the server
    showconfig(PORT,appRoutes);

    // Routing the aplication
    appRouter(appRoutes,app);

    // Listen for request
    app.listen(PORT);

  }
  catch(error){

    console.log("------------------------------------------------------------------");
    console.log("");
    console.log(" It was an error launching the server");
    console.log(` FATAL: ${error}`);
    console.log("");
    console.log("------------------------------------------------------------------");

  }
};