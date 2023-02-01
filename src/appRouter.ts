//Import our interfaces
import { Endpoint } from "./interfaces/endpoint";
import { Express } from "express";


// This function just perform the routing using a forEach
export const appRouter = (paths:Endpoint[],app:Express) => {
  
  paths.forEach((endpoint)=>{
    let {path,handler} = endpoint;
    app.use(path,handler)
  })

};