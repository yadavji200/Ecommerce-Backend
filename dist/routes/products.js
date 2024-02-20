"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_js_1 = require("../middlewares/auth.js");
const product_js_1 = require("../controllers/product.js");
const multer_1 = require("../middlewares/multer");
const product_1 = require("../models/product");
const mongoose_1 = __importDefault(require("mongoose"));
const app = express_1.default.Router();
const deleteOneDoc = async (req, res, next) => {
    console.log("Callingg...");
    try {
        let val = await product_1.Product.findOne({ name: "" });
        console.log(val);
        const del = await product_1.Product.deleteOne({ _id: new mongoose_1.default.Types.ObjectId("") });
        res.status(200).json({ message: "Deleted" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
app.post("/new", auth_js_1.adminOnly, multer_1.singleUpload, product_js_1.newProduct);
app.delete('/', deleteOneDoc);
app.get("/latest", product_js_1.getlatestProducts);
app.get("/cateogories", product_js_1.getAllCategories);
exports.default = app;
