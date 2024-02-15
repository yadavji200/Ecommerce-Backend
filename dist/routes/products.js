"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const product_1 = require("../controllers/product");
const multer_1 = require("../middlewares/multer");
const product_2 = require("../models/product");
const mongoose_1 = __importDefault(require("mongoose"));
const app = express_1.default.Router();
const deleteOneDoc = async (req, res, next) => {
    console.log("Callingg...");
    try {
        let val = await product_2.Product.findOne({ name: "Macbook" });
        console.log(val);
        const del = await product_2.Product.deleteOne({ _id: new mongoose_1.default.Types.ObjectId("65cde6fa1364afa994f7b738") });
        res.status(200).json({ message: "Deleted" });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
app.post("/new", multer_1.singleUpload, product_1.newProduct);
app.delete('/', deleteOneDoc);
exports.default = app;
