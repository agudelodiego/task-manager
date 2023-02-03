import express from "express";
import {config} from "dotenv";
import { connectDB } from "../db/connect";
import { showconfig } from "./showconfig";
import { Endpoint } from "../interfaces/endpoint";
import { appRouter } from "./appRouter";


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