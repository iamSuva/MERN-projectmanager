import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import projectRoutes from "./routes/projectRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app=express();
dotenv.config();
const port=process.env.PORT;
const URl=process.env.MONGO_URL;

app.use(express.json());
app.use(express.urlencoded({extended:true}))
mongoose.connect(URl).then(()=>{
console.log("connected to data base");
app.listen(port,(err)=>{
    console.log("listening on port ",port);
})
}).catch((error)=>{
console.log(error);
})

app.use("/api",projectRoutes);
app.use("/api/auth",userRoutes);



