import express, { Request, Response, NextFunction } from "express";
import { adminOnly } from "../middlewares/auth.js";
import { deleteProduct, getAdminProducts, getAllCategories, getAllProducts, getSingleProduct, getlatestProducts, newProduct, updateProduct } from "../controllers/product.js";
import {singleUpload } from "../middlewares/multer";
import { error } from "console";
import { Product } from "../models/product";
import mongoose from "mongoose";


const app = express.Router();
const deleteOneDoc = async(req:Request,res:Response,next:NextFunction) => {
    console.log("Callingg...");
    try {
       let val = await Product.findOne({ name: "" });
       console.log(val);
       const del = await Product.deleteOne({ _id: new mongoose.Types.ObjectId("") });
       res.status(200).json({message:"Deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    }
    //To Create New Product  - /api/v1/product/new
     app.post("/new", adminOnly, singleUpload, newProduct);

       app.delete('/',deleteOneDoc);

       //To get all Products with filters  - /api/v1/product/all
       app.get("/all", getAllProducts);


      //To get last 10 Products  - /api/v1/product/latest
      app.get("/latest", getlatestProducts);

      //To get all unique Categories  - /api/v1/product/categories
      app.get("/cateogories", getAllCategories);

      //To get all Products   - /api/v1/product/admin-products
      app.get("/admin-products", getAdminProducts);

      app.route("/:id")
      .get(getSingleProduct)
      .put(singleUpload,updateProduct)
      .delete(deleteProduct);


export default app;