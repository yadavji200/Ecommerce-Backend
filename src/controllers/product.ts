import { TryCatch } from "../middlewares/error";
import { Request } from "express";
import { NewProductRequestBody } from "../types/types";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utillity-class.js";
import { rm } from "fs";




  export const newProduct = TryCatch(
   async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
     const { name, price, stock, category } = req.body;
      const photo = req.file;
  
      if (!photo) return next(new ErrorHandler("Please Add Photo", 4000));
  
      if (!name || !price || !stock || !category) {
       rm(photo.path, () => {
         console.log("Deleted");
        });
  
        return next(new ErrorHandler("Please enter All Fields", 400));
      }
      
  

await Product.create({
    name,
    price,
    stock,
    category: category.toLocaleLowerCase(),
    photo:photo.path,
});

return res.status(201).json({
    success: true,
    message: "product Created Successfully",
});

});


export const getlatestProducts = TryCatch(async(req,res,next) =>{
   const Products = await Product.find({}).sort({ createdAt: -1 }).limit(5);

   return res.status(200).json({
    success: true,
    Products,
   });

});
export const getAllCategories = TryCatch(async(req,res,next) =>{
 
  const cateogories: any = await Product.distinct("category");


  return res.status(200).json({
   success: true,
   cateogories,
  });

});