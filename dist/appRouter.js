"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
// This function just perform the routing using a forEach
const appRouter = (paths, app) => {
    paths.forEach((endpoint) => {
        let { path, handler } = endpoint;
        app.use(path, handler);
    });
};
exports.appRouter = appRouter;
