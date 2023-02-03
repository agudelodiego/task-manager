//Import the intefaces
import { Endpoint } from "../interfaces/endpoint";


//This function just will to show in the terminal information about the server
export const showconfig = (port:number|string,appRoutes:Endpoint[]) => {
  console.log("------------ SERVER STATE ------------");
  console.log("");
  console.log(` Server up on port: ${port}`);
  console.log("");
  console.log(" Endpoints availables:");
  appRoutes.forEach((endpoint)=>{console.log(`    endpoint --> ${endpoint.path}`)});
  console.log("");
  console.log(` Database url: ${process.env.MONGOURL || "No set yet"}`);
  console.log("");
  console.log("---------------------------------------");
};