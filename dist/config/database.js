"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfig = void 0;
const database_json_1 = require("./database.json");
const getConfig = () => {
    if (process.env.NODE_ENV === 'test')
        return database_json_1.test;
    return database_json_1.development;
};
exports.getConfig = getConfig;
//# sourceMappingURL=database.js.map