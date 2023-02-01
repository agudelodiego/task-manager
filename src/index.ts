import express from "express";
import {config} from "dotenv";
config();

// Interfaces
import { Endpoint } from "./interfaces/endpoint";

// Routes
import { tasksRouter } from "./routes/tasks";

// Router
import { appRouter } from "./appRouter";

// Utils
import { showconfig } from "./utils/showconfig";



// App
const app = express();

// Port where ther server will up
const PORT = process.env.PORT || 3000;


// Global middlewares
app.use(express.json());

//*--------------------------------------------------------------------------------------------------------------------------------------------------------------
//* ENDPOINTS
const appRoutes:Endpoint[] = [
  {
    path:"/api/v1/tasks",
    handler: tasksRouter
  },
  {
    path:"/api/v1/users",
    handler: tasksRouter
  }
];
//*--------------------------------------------------------------------------------------------------------------------------------------------------------------



//*--------------------------------------------------------------------------------------------------------------------------------------------------------------
//* Perform the Routing
appRouter(appRoutes,app);
//*--------------------------------------------------------------------------------------------------------------------------------------------------------------


app.listen(PORT);
showconfig(PORT,appRoutes);