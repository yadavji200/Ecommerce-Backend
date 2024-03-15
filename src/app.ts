import { connectDB } from './utils/features.js';
import express from 'express';
import { errorMiddleware } from './middlewares/error.js';
const app = express();
import NodeCache from "node-cache";
import { config } from "dotenv";
import morgan from "morgan";





// Importing Routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";
import orderRoute from "./routes/order.js";
import paymentRoute from "./routes/payment.js";

config({
path: "./.env",
});
const port = process.env.PORT || 4000;
console.log("process.env.MONGO_URI... : ", process.env.MONGO_URI);
const mongoURI = process.env.MONGO_URI || "";

connectDB(mongoURI);


export const myCache = new NodeCache();

app.use(express.json());
app.use(morgan("dev"))

app.get("/", (req, res) => {
    res.send("API Working with /api/v1");

  });


// using Routes
app.use("/api/v1/user",userRoute);
app.use("/api/v1/product", productRoute);
app.use("/api/v1/order", orderRoute);
app.use("/api/v1/payment", paymentRoute);




app.use("/uploads", express.static("uploads"));
app.use(errorMiddleware);

app.listen(port,()=>{
    console.log(`server is working on http://localhost:${port}`)

});
