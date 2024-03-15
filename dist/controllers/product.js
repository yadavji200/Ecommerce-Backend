"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllProducts = exports.deleteProduct = exports.updateProduct = exports.newProduct = exports.getSingleProduct = exports.getAdminProducts = exports.getAllCategories = exports.getlatestProducts = void 0;
const error_js_1 = require("../middlewares/error.js");
const product_js_1 = require("../models/product.js");
const fs_1 = require("fs");
const app_js_1 = require("../app.js");
const features_js_1 = require("../utils/features.js");
const utillity_class_js_1 = __importDefault(require("../utils/utillity-class.js"));
// import { faker } from "@faker-js/faker";
// Revalidate on New,Update,Delete Product & on New Order
exports.getlatestProducts = (0, error_js_1.TryCatch)(async (req, res, next) => {
    let products;
    if (app_js_1.myCache.has("latest-products"))
        products = JSON.parse(app_js_1.myCache.get("latest-products"));
    else {
        products = await product_js_1.Product.find({}).sort({ createdAt: -1 }).limit(5);
        app_js_1.myCache.set("latest-products", JSON.stringify(products));
    }
    return res.status(200).json({
        success: true,
        products,
    });
});
// Revalidate on New,Update,Delete Product & on New Order
exports.getAllCategories = (0, error_js_1.TryCatch)(async (req, res, next) => {
    let categories;
    if (app_js_1.myCache.has("categories"))
        categories = JSON.parse(app_js_1.myCache.get("categories"));
    else {
        categories = await product_js_1.Product.distinct("category");
        app_js_1.myCache.set("categories", JSON.stringify(categories));
    }
    return res.status(200).json({
        success: true,
        categories,
    });
});
// Revalidate on New,Update,Delete Product & on New Order
exports.getAdminProducts = (0, error_js_1.TryCatch)(async (req, res, next) => {
    let products;
    if (app_js_1.myCache.has("all-products"))
        products = JSON.parse(app_js_1.myCache.get("all-products"));
    else {
        products = await product_js_1.Product.find({});
        app_js_1.myCache.set("all-products", JSON.stringify(products));
    }
    return res.status(200).json({
        success: true,
        products,
    });
});
exports.getSingleProduct = (0, error_js_1.TryCatch)(async (req, res, next) => {
    let product;
    const id = req.params.id;
    if (app_js_1.myCache.has(`product-${id}`))
        product = JSON.parse(app_js_1.myCache.get(`product-${id}`));
    else {
        product = await product_js_1.Product.findById(id);
        if (!product)
            return next(new utillity_class_js_1.default("Product Not Found", 404));
        app_js_1.myCache.set(`product-${id}`, JSON.stringify(product));
    }
    return res.status(200).json({
        success: true,
        product,
    });
});
exports.newProduct = (0, error_js_1.TryCatch)(async (req, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    if (!photo)
        return next(new utillity_class_js_1.default("Please add Photo", 400));
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
        category: category.toLowerCase(),
        photo: photo.path,
    });
    (0, features_js_1.invalidateCache)({ product: true, admin: true });
    return res.status(201).json({
        success: true,
        message: "Product Created Successfully",
    });
});
exports.updateProduct = (0, error_js_1.TryCatch)(async (req, res, next) => {
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
    (0, features_js_1.invalidateCache)({
        product: true,
        productId: String(product._id),
        admin: true,
    });
    return res.status(200).json({
        success: true,
        message: "Product Updated Successfully",
    });
});
exports.deleteProduct = (0, error_js_1.TryCatch)(async (req, res, next) => {
    const product = await product_js_1.Product.findById(req.params.id);
    if (!product)
        return next(new utillity_class_js_1.default("Product Not Found", 404));
    (0, fs_1.rm)(product.photo, () => {
        console.log("Product Photo Deleted");
    });
    await product.deleteOne();
    (0, features_js_1.invalidateCache)({
        product: true,
        productId: String(product._id),
        admin: true,
    });
    return res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
    });
});
exports.getAllProducts = (0, error_js_1.TryCatch)(async (req, res, next) => {
    const { search, sort, category, price } = req.query;
    const page = Number(req.query.page) || 1;
    // 1,2,3,4,5,6,7,8
    // 9,10,11,12,13,14,15,16
    // 17,18,19,20,21,22,23,24
    const limit = Number(process.env.PRODUCT_PER_PAGE) || 8;
    const skip = (page - 1) * limit;
    const baseQuery = {};
    if (search)
        baseQuery.name = {
            $regex: search,
            $options: "i",
        };
    if (price)
        baseQuery.price = {
            $lte: Number(price),
        };
    if (category)
        baseQuery.category = category;
    const productsPromise = product_js_1.Product.find(baseQuery)
        .sort(sort && { price: sort === "asc" ? 1 : -1 })
        .limit(limit)
        .skip(skip);
    const [products, filteredOnlyProduct] = await Promise.all([
        productsPromise,
        product_js_1.Product.find(baseQuery),
    ]);
    const totalPage = Math.ceil(filteredOnlyProduct.length / limit);
    return res.status(200).json({
        success: true,
        products,
        totalPage,
    });
});
// const generateRandomProducts = async (count: number = 10) => {
//   const products = [];
//   for (let i = 0; i < count; i++) {
//     const product = {
//       name: faker.commerce.productName(),
//       photo: "uploads\\5ba9bd91-b89c-40c2-bb8a-66703408f986.png",
//       price: faker.commerce.price({ min: 1500, max: 80000, dec: 0 }),
//       stock: faker.commerce.price({ min: 0, max: 100, dec: 0 }),
//       category: faker.commerce.department(),
//       createdAt: new Date(faker.date.past()),
//       updatedAt: new Date(faker.date.recent()),
//       __v: 0,
//     };
//     products.push(product);
//   }
//   await Product.create(products);
//   console.log({ succecss: true });
// };
// const deleteRandomsProducts = async (count: number = 10) => {
//   const products = await Product.find({}).skip(2);
//   for (let i = 0; i < products.length; i++) {
//     const product = products[i];
//     await product.deleteOne();
//   }
//   console.log({ succecss: true });
// };
