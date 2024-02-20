"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCategories = exports.getlatestProducts = exports.newProduct = void 0;
const error_1 = require("../middlewares/error");
const product_js_1 = require("../models/product.js");
const utillity_class_js_1 = __importDefault(require("../utils/utillity-class.js"));
const fs_1 = require("fs");
exports.newProduct = (0, error_1.TryCatch)(async (req, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    if (!photo)
        return next(new utillity_class_js_1.default("Please Add Photo", 400));
    if (!name || !price || !stock || !category) {
        (0, fs_1.rm)(photo.path, () => {
            console.log("Deleted");
        });
        return next(new utillity_class_js_1.default("Please enter All Fields", 400));
    }
    await product_js_1.Product.create({
        name,
        price,
        stock,
        category: category.toLocaleLowerCase(),
        photo: photo.path,
    });
    return res.status(201).json({
        success: true,
        message: "product Created Successfully",
    });
});
exports.getlatestProducts = (0, error_1.TryCatch)(async (req, res, next) => {
    const Products = await product_js_1.Product.find({}).sort({ createdAt: -1 }).limit(5);
    return res.status(200).json({
        success: true,
        Products,
    });
});
exports.getAllCategories = (0, error_1.TryCatch)(async (req, res, next) => {
    const cateogories = await product_js_1.Product.distinct("category");
    return res.status(200).json({
        success: true,
        cateogories,
    });
});
