import { connectDB } from './utils/features.js';
import express from 'express';
import { errorMiddleware } from './middlewares/error.js';
const app = express();

// Importing Routes
import userRoute from "./routes/user.js";
import productRoute from "./routes/products.js";


const port = 4000;

connectDB();

app.use(express.json());


app.get("/", (req, res) => {
    res.send("API Working with /api/v1");

  });


// using Routes
app.use("/api/v1/user",userRoute);
app.use("/api/v1/product", productRoute);
app.use("/uploads", express.static("uploads"));

app.use(errorMiddleware);

app.listen(port,()=>{
    console.log(`server is working on http://localhost:${port}`)

});
