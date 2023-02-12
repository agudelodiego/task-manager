import { Router } from "express";

// Controllers
import { 
  login,
  logout,
  searchUsers,
  signup
} from "../controllers/users.controller";
import { auth } from "../middlewares/auth";

// Middlewares
import { validateBody } from "../middlewares/validateSchema";

// Schemas
import { signupValidator, loginValidator } from "../schemas/user.schema";






// Import our controllers
/* import {
  getUser,
  signup,
  deleteUser,
  updateUser,
  login,
  searchUsers,
  logout
} from "../controllers/users.controller";
 */


// Create our router
export const usersRouter = Router();



// Routes
/* usersRouter.route("/search").get(searchUsers);
usersRouter.route("/signup").post(signup);
usersRouter.route("/login").post(login);
usersRouter.route("/logout").get(logout);
usersRouter.route("/:username").get(getUser);
usersRouter.route("/:username").patch(updateUser);
usersRouter.route("/:username").delete(deleteUser); */


usersRouter.get("/search", auth, searchUsers);
usersRouter.get("/logout", auth, logout);
usersRouter.post("/signup", validateBody(signupValidator), signup);
usersRouter.post("/login", validateBody(loginValidator), login);