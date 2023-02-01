"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
// Routes
const tasks_1 = require("./routes/tasks");
// Router
const appRouter_1 = require("./appRouter");
// Utils
const showconfig_1 = require("./utils/showconfig");
// App
const app = (0, express_1.default)();
// Port where ther server will up
const PORT = process.env.PORT || 3000;
// Global middlewares
app.use(express_1.default.json());
//*--------------------------------------------------------------------------------------------------------------------------------------------------------------
//* ENDPOINTS
const appRoutes = [
    {
        path: "/api/v1/tasks",
        handler: tasks_1.tasksRouter
    },
    {
        path: "/api/v1/users",
        handler: tasks_1.tasksRouter
    }
];
//*--------------------------------------------------------------------------------------------------------------------------------------------------------------
//*--------------------------------------------------------------------------------------------------------------------------------------------------------------
//* Perform the Routing
(0, appRouter_1.appRouter)(appRoutes, app);
//*--------------------------------------------------------------------------------------------------------------------------------------------------------------
app.listen(PORT);
(0, showconfig_1.showconfig)(PORT, appRoutes);
