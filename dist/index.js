"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const launchServer_1 = require("./utils/launchServer");
// Routes
const tasks_route_1 = require("./routes/tasks.route");
const users_route_1 = require("./routes/users.route");
const chats_route_1 = require("./routes/chats.route");
// ENDPOINTS
const appRoutes = [
    {
        path: "/api/v1/tasks",
        handler: tasks_route_1.tasksRouter
    },
    {
        path: "/api/v1/users",
        handler: users_route_1.usersRouter
    },
    {
        path: "/api/v1/chats",
        handler: chats_route_1.chatsRouter
    }
];
//! Launching the server
(0, launchServer_1.launchServer)(appRoutes);
