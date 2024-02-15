import express, { Request, Response, NextFunction } from "express";
import { adminOnly } from "../middlewares/auth";
import { newProduct } from "../controllers/product";
import {singleUpload } from "../middlewares/multer";
import { error } from "console";
import { Product } from "../models/product";
import mongoose from "mongoose";


const app = express.Router();
const deleteOneDoc = async(req:Request,res:Response,next:NextFunction) => {
    console.log("Callingg...");
    try {
       let val = await Product.findOne({ name: "Macbook" });
       console.log(val);
       const del = await Product.deleteOne({ _id: new mongoose.Types.ObjectId("65cde6fa1364afa994f7b738") });
       res.status(200).json({message:"Deleted"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
    }
app.post("/new",singleUpload, newProduct)
app.delete('/',deleteOneDoc)



export default app;