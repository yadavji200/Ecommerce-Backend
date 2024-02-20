"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getSingleProduct = exports.getAdminProducts = exports.getAllCategories = exports.getlatestProducts = exports.newProduct = void 0;
const error_1 = require("../middlewares/error");
const product_js_1 = require("../models/product.js");
const utillity_class_js_1 = __importDefault(require("../utils/utillity-class.js"));
const fs_1 = require("fs");
const products_1 = __importDefault(require("../routes/products"));
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
exports.getAdminProducts = (0, error_1.TryCatch)(async (req, res, next) => {
    const Products = await product_js_1.Product.find({});
    return res.status(200).json({
        success: true,
        products: products_1.default,
    });
});
exports.getSingleProduct = (0, error_1.TryCatch)(async (req, res, next) => {
    const product = await product_js_1.Product.findById(req.params.id);
    return res.status(200).json({
        success: true,
        product,
    });
});
exports.updateProduct = (0, error_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    const product = await product_js_1.Product.findById(id);
    if (!product)
        return next(new utillity_class_js_1.default("Product Not Found", 404));
    if (photo) {
        (0, fs_1.rm)(product.photo, () => {
            console.log("Old Photo Deleted");
        });
        product.photo = photo.path;
    }
    if (name)
        product.name = name;
    if (price)
        product.price = price;
    if (stock)
        product.stock = stock;
    if (category)
        product.category = category;
    await product.save();
    return res.status(200).json({
        success: true,
        message: "Product Updated Successfully",
    });
});
exports.deleteProduct = (0, error_1.TryCatch)(async (req, res, next) => {
    const product = await product_js_1.Product.findById(req.params.id);
    if (!product)
        return next(new utillity_class_js_1.default("Product Not Found", 404));
    (0, fs_1.rm)(product.photo, () => {
        console.log("Product Photo Deleted");
    });
    await product.deleteOne();
    return res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
    });
});
