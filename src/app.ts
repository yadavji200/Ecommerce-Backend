import { connectDB } from './utils/features.js';
import express from 'express';

const app = express();

// Importing Routes
import userRoute from "./routes/user.js";
import { errorMiddleware } from './middlewares/error.js';

const port = 4000;

connectDB();

app.use(express.json());


app.get("/", (req, res) => {
    res.send("API Working with /api/v1");

  });


// using Routes
app.use("/api/v1/user",userRoute);

app.use(errorMiddleware);

app.listen(port,()=>{
    console.log(`server is working on http://localhost:${port}`)

});