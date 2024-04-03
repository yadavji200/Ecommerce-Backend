"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.myCache = exports.stripe = void 0;
const express_1 = __importDefault(require("express"));
const features_js_1 = require("./utils/features.js");
const error_js_1 = require("./middlewares/error.js");
const node_cache_1 = __importDefault(require("node-cache"));
const dotenv_1 = require("dotenv");
const morgan_1 = __importDefault(require("morgan"));
const stripe_1 = __importDefault(require("stripe"));
const cors_1 = __importDefault(require("cors"));
// Importing Routes
const user_js_1 = __importDefault(require("./routes/user.js"));
const products_js_1 = __importDefault(require("./routes/products.js"));
const order_js_1 = __importDefault(require("./routes/order.js"));
const payment_js_1 = __importDefault(require("./routes/payment.js"));
const stats_js_1 = __importDefault(require("./routes/stats.js"));
(0, dotenv_1.config)({
    path: "./.env",
});
const port = process.env.PORT || 4000;
const mongoURI = process.env.MONGO_URI || "";
const stripeKey = process.env.STRIPE_KEY || "";
(0, features_js_1.connectDB)(mongoURI);
exports.stripe = new stripe_1.default(stripeKey);
exports.myCache = new node_cache_1.default();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("API Working with /api/v1");
});
// Using Routes
app.use("/api/v1/user", user_js_1.default);
app.use("/api/v1/product", products_js_1.default);
app.use("/api/v1/order", order_js_1.default);
app.use("/api/v1/payment", payment_js_1.default);
app.use("/api/v1/dashboard", stats_js_1.default);
app.use("/uploads", express_1.default.static("uploads"));
app.use(error_js_1.errorMiddleware);
app.listen(port, () => {
    console.log(`Express is working on http://localhost:${port}`);
});
