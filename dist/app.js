"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const features_js_1 = require("./utils/features.js");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// Importing Routes
const user_js_1 = __importDefault(require("./routes/user.js"));
const error_js_1 = require("./middlewares/error.js");
const port = 4000;
(0, features_js_1.connectDB)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("API Working with /api/v1");
});
// using Routes
app.use("/api/v1/user", user_js_1.default);
app.use(error_js_1.errorMiddleware);
app.listen(port, () => {
    console.log(`server is working on http://localhost:${port}`);
});
