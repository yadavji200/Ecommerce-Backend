"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newProduct = void 0;
const error_1 = require("../middlewares/error");
const product_1 = require("../models/product");
exports.newProduct = (0, error_1.TryCatch)(async (req, res, next) => {
    const { name, price, stock, category } = req.body;
    const photo = req.file;
    await product_1.Product.create({
        name,
        price,
        stock,
        category: category.toLocaleLowerCase(),
        photo: photo?.path,
    });
    return res.status(201).json({
        success: true,
        message: "product Created Successfully",
    });
});
