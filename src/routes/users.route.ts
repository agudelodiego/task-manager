import { Router } from "express";


// Import some middlewares
import { loginMdware } from "../middlewares/login.mdware";
import { signupMdware } from "../middlewares/signup.mdware";
import { searchUserMdware } from "../middlewares/users.mdware";

// Import our controllers
import {
  getUser,
  signup,
  deleteUser,
  updateUser,
  login,
  searchUsers,
  logout
} from "../controllers/users.controller";
import { authJWTmdware } from "../middlewares/authJWT.mdware";


// Create our router
export const usersRouter = Router();


// Routes
usersRouter.route("/search").get(authJWTmdware,searchUserMdware,searchUsers);
usersRouter.route("/signup").post(signupMdware,signup);
usersRouter.route("/login").post(loginMdware,login);
usersRouter.route("/logout").get(logout);
usersRouter.route("/:username").get(authJWTmdware,getUser);
usersRouter.route("/:id").patch(updateUser);
usersRouter.route("/:id").delete(deleteUser);