import { Router } from "express";


// Import our controllers
import {
  getUsers,
  getUser,
  signup,
  deleteUser,
  updateUser,
  login
} from "../controllers/users.controller";


// Create our router
export const usersRouter = Router();


// Routes
usersRouter.route("/").get(getUsers);
usersRouter.route("/signup").post(signup);
usersRouter.route("/login").post(login)
usersRouter.route("/:id").get(getUser);
usersRouter.route("/:id").patch(updateUser);
usersRouter.route("/:id").delete(deleteUser);