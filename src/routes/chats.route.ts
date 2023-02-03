import { Router } from "express";


// Import our controllers
import {
  getChat,
  getChats,
  createChat,
  updateChat
} from "../controllers/chats.controller"



// Lets create our router
export const chatsRouter = Router();


// Routes
chatsRouter.route("/").get(getChats);
chatsRouter.route("/").post(createChat);
chatsRouter.route("/:id").get(getChat);
chatsRouter.route("/:id").patch(updateChat);