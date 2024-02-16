import express, { Request, Response, NextFunction } from "express";
import { adminOnly } from "../middlewares/auth.js";
import { getAllCategories, getlatestProducts, newProduct } from "../controllers/product.js";
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
app.post("/new", adminOnly, singleUpload, newProduct);
app.delete('/',deleteOneDoc);
app.get("/latest", getlatestProducts);
app.get("/cateogories", getAllCategories);

export default app;