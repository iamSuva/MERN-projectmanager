import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";
const app=express();
dotenv.config();
const port=process.env.PORT;
const URl=process.env.MONGO_URL;



app.use(cors()); //cross origin
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//mongo connection
mongoose.connect(URl).then(()=>{
console.log("connected to data base");
app.listen(port,(err)=>{
    console.log("listening on port ",port);
})
}).catch((error)=>{
console.log(error);
})
 
app.get("/test",(req,res)=>{
    res.send({message:"Welcome to mern"});
})
app.use("/api",projectRoutes);
app.use("/api/auth",userRoutes);



