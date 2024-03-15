"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myCache = void 0;
const features_js_1 = require("./utils/features.js");
const express_1 = __importDefault(require("express"));
const error_js_1 = require("./middlewares/error.js");
const app = (0, express_1.default)();
const node_cache_1 = __importDefault(require("node-cache"));
const dotenv_1 = require("dotenv");
const morgan_1 = __importDefault(require("morgan"));
// Importing Routes
const user_js_1 = __importDefault(require("./routes/user.js"));
const products_js_1 = __importDefault(require("./routes/products.js"));
const order_js_1 = __importDefault(require("./routes/order.js"));
(0, dotenv_1.config)({
    path: "./.env",
});
const port = process.env.PORT || 4000;
console.log("process.env.MONGO_URI... : ", process.env.MONGO_URI);
const mongoURI = process.env.MONGO_URI || "";
(0, features_js_1.connectDB)(mongoURI);
exports.myCache = new node_cache_1.default();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.get("/", (req, res) => {
    res.send("API Working with /api/v1");
});
// using Routes
app.use("/api/v1/user", user_js_1.default);
app.use("/api/v1/product", products_js_1.default);
app.use("/api/v1/order", order_js_1.default);
app.use("/uploads", express_1.default.static("uploads"));
app.use(error_js_1.errorMiddleware);
app.listen(port, () => {
    console.log(`server is working on http://localhost:${port}`);
});
