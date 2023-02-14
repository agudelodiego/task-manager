// Import express router
import { Router } from "express";

// Controllers
import { 
  deleteUser,
  getUser,
  login,
  logout,
  searchUsers,
  signup,
  updateUser
} from "../controllers/users.controller";

// Middlewares
import { validateBody } from "../middlewares/validateSchema";
import { auth } from "../middlewares/auth";

// Schemas
import { signupValidator, loginValidator, updateUserValidator } from "../schemas/user.schema";



// Create our router
export const usersRouter = Router();



// Routes without auth
usersRouter.post("/signup", validateBody(signupValidator), signup);
usersRouter.post("/login", validateBody(loginValidator), login);

// Routes with auth middleware
usersRouter.get("/search", auth, searchUsers);
usersRouter.get("/logout", auth, logout);
usersRouter.get("/:username", auth, getUser);
usersRouter.patch("/:username", auth, validateBody(updateUserValidator), updateUser);
usersRouter.delete("/:username", auth, deleteUser);