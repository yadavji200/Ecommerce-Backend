import { TryCatch } from "../middlewares/error";
import { Request } from "express";
import { NewProductRequestBody } from "../types/types";
import { Product } from "../models/product.js";
import ErrorHandler from "../utils/utillity-class.js";
import { rm } from "fs";
import products from "../routes/products";




  export const newProduct = TryCatch(
   async (req: Request<{}, {}, NewProductRequestBody>, res, next) => {
     const { name, price, stock, category } = req.body;
      const photo = req.file;
  
      if (!photo) return next(new ErrorHandler("Please Add Photo", 400));
  
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
 
  const cateogories = await Product.distinct("category");


  return res.status(200).json({
   success: true,
   cateogories,
  });

});
export const getAdminProducts = TryCatch(async (req, res, next) => {
  const Products = await Product.find({});
  
  return res.status(200).json({
    success: true,
    products,
  });
});

export const getSingleProduct = TryCatch(async (req, res, next) => {
const product = await Product.findById(req.params.id);

return res.status(200).json({
  success: true,
  product,
});
});
export const updateProduct = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  const { name, price, stock, category } = req.body;
  const photo = req.file;
  const product = await Product.findById(id);

  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  if (photo) {
    rm(product.photo!, () => {
      console.log("Old Photo Deleted");
    });
    product.photo = photo.path;
  }

  if (name) product.name = name;
  if (price) product.price = price;
  if (stock) product.stock = stock;
  if (category) product.category = category;

  await product.save();

  
  return res.status(200).json({
    success: true,
    message: "Product Updated Successfully",
  });
});

export const deleteProduct = TryCatch(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new ErrorHandler("Product Not Found", 404));

  rm(product.photo!, () => {
    console.log("Product Photo Deleted");
  });

  await product.deleteOne();


  return res.status(200).json({
    success: true,
    message: "Product Deleted Successfully",
  });
});
