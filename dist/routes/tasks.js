"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tasksRouter = void 0;
//Import express router
const express_1 = require("express");
//Create router for task routes
exports.tasksRouter = (0, express_1.Router)();
//! HANDLE THE ROUTES
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------
exports.tasksRouter.route("/").get((req, res) => {
    res.status(200).json({ sms: 'Hello from task' });
});
exports.tasksRouter.route("/").post((req, res) => {
    res.status(200).json({ sms: 'Hello bro' });
});
//!---------------------------------------------------------------------------------------------------------------------------------------------------------------
