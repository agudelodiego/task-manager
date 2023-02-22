//! This is the main function. This will be perfom the database conection and aply some global middlewares
import { launchServer } from "./utils/launchServer";

// Interfaces
import { Endpoint } from "./interfaces/Endpoint";

// API Routes
import { tasksRouter } from "./routes/tasks.route";
import { usersRouter } from "./routes/users.route";
import { chatsRouter } from "./routes/chats.route";


// ENDPOINTS
const appRoutes:Endpoint[] = [
  {
    path:"/api/v1/tasks",
    handler: tasksRouter
  },
  {
    path:"/api/v1/users",
    handler: usersRouter
  },
  {
    path:"/api/v1/chats",
    handler: chatsRouter
  }
];


//! Launching the server
launchServer(appRoutes);