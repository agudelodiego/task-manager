"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.showconfig = void 0;
//This function just will to show in the terminal information about the server
const showconfig = (port, appRoutes) => {
    console.log("------------ SERVER STATE ------------");
    console.log("");
    console.log(`Server up on port: ${port}`);
    console.log("Endpoints availables:");
    appRoutes.forEach((endpoint) => { console.log(`    endpoint --> ${endpoint.path}`); });
    console.log("");
    console.log("---------------------------------------");
};
exports.showconfig = showconfig;
