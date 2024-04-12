import { User } from "../models/user.js";
import ErrorHandler from "../utils/utillity-class.js";
import { TryCatch } from "./error.js";



// Middleware to make sure only admin is allowed
export const adminOnly = TryCatch(async (req, res, next) => {
    const { id } = req.query;
    

    if (!id) return next(new ErrorHandler("Login Kr phle", 401));

    const user = await User.findById(id);
    if (!user) return next(new ErrorHandler("Fake ID Deta Hai", 401));
    if (user.role !== "admin")
      return next(new ErrorHandler(" Nhi Hai Teri ID", 403));
  
    next();
});