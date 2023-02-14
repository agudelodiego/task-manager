//Import express router
import { Router } from "express";

// Import the middlewares
import { auth } from "../middlewares/auth";
import { validateBody } from "../middlewares/validateSchema";

// Import controllers
import { 
  createTask, 
  deleteTask, 
  getMyTasks, 
  searchTasks,
  updateTask
} from "../controllers/tasks.controller";

// Schemas
import { createTaskValidator, taskValidator } from "../schemas/task.schema";

//Create router for task routes
export const tasksRouter = Router();


// Routes
/* tasksRouter.route("/").get(getAll);
tasksRouter.route("/").post(createTask);
tasksRouter.route("/:id").get(getById);
tasksRouter.route("/:id").patch(updateTask);
tasksRouter.route("/:id").delete(deleteTask); */
tasksRouter.get("/", auth, getMyTasks);
tasksRouter.post("/", auth, validateBody(createTaskValidator), createTask);
tasksRouter.get("/search", auth, searchTasks);
tasksRouter.patch("/:_id", auth, validateBody(taskValidator),updateTask);
tasksRouter.delete("/:_id",auth, deleteTask);