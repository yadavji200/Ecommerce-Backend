"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Importing Routes
const user_js_1 = __importDefault(require("./routes/user.js"));
const port = 4000;
const app = (0, express_1.default)();
// using Routes
app.use("/api/v1/user", user_js_1.default);
app.listen(port, () => {
    console.log(`server is working on http://localhost:${port}`);
});
