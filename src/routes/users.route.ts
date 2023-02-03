import { Router } from "express";


// Import our controllers
import {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser
} from "../controllers/users.controller";


// Create our router
export const usersRouter = Router();


// Routes
usersRouter.route("/").get(getUsers);
usersRouter.route("/").post(createUser);
usersRouter.route("/:id").get(getUser);
usersRouter.route("/:id").patch(updateUser);
usersRouter.route("/:id").delete(deleteUser);