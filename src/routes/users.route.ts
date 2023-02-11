import { Router } from "express";


// Import some middlewares
import { loginMdware } from "../middlewares/login.mdware";
import { signupMdware } from "../middlewares/signup.mdware";
import { searchUserMdware, updateUserMdware } from "../middlewares/users.mdware";
import { authJWTmdware } from "../middlewares/authJWT.mdware";

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


// Create our router
export const usersRouter = Router();


// Routes
usersRouter.route("/search").get(authJWTmdware,searchUserMdware,searchUsers);
usersRouter.route("/signup").post(signupMdware,signup);
usersRouter.route("/login").post(loginMdware,login);
usersRouter.route("/logout").get(logout);
usersRouter.route("/:username").get(authJWTmdware,getUser);
usersRouter.route("/:username").patch(authJWTmdware,updateUserMdware,updateUser);
usersRouter.route("/:id").delete(deleteUser);