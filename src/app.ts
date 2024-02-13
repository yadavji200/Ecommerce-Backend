import express from 'express';


// Importing Routes
import userRoute from "./routes/user.js";

const port = 4000;

const app = express (); 



// using Routes
app.use("/api/v1/user",userRoute);

app.listen(port,()=>{
    console.log(`server is working on http://localhost:${port}`)

})