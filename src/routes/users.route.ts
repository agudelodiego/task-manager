import { Router } from "express";


// Import some middlewares
import { loginMdware } from "../middlewares/login.mdware";
import { signupMdware } from "../middlewares/signup.mdware";

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
usersRouter.route("/signup").post(signupMdware,signup);
usersRouter.route("/login").post(loginMdware,login);
usersRouter.route("/:id").get(getUser);
usersRouter.route("/:id").patch(updateUser);
usersRouter.route("/:id").delete(deleteUser);