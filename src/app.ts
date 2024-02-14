import express from 'express';


// Importing Routes
import userRoute from "./routes/user.js";

const port = 4000;

connectDB();

const app = express (); 

app.use(express.json());


app.get("/", (req, res) => {
    res.send("API Working with /api/v1");
  });


// using Routes
app.use("/api/v1/user",userRoute);

app.listen(port,()=>{
    console.log(`server is working on http://localhost:${port}`)

})

function connectDB() {
    throw new Error('Function not implemented.');
}
