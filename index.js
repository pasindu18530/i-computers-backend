import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import dns from "node:dns";

import userRouter from "./routers/userRouter.js";
import jwt from "jsonwebtoken";
import authenticateUser from "./middlewares/authentication.js";
import productRouter from "./routers/productRouter.js";
import dotenv from "dotenv"
dns.setServers(["1.1.1.1", "8.8.8.8"]);

dotenv.config()

const app = express();

const mongodbURI=process.env.MONGO_URI



mongoose.connect(mongodbURI).then(
  ()=>{
    console.log("Connected to MongoDB");
    
  }
)
app.use(cors ())
app.use(express.json())

app.use(authenticateUser)
app.use("/api/users",userRouter)
app.use("/api/products",productRouter)







app.put("/",(req,res)=>{
  console.log("Put Request Received");

  res.json({
    "mesage":"Good morning " + req.body.name
  })
  
})

app.delete("/",(req,res)=>{
  console.log("Delete Request Received");
  
})

let port = 3000

app.listen(port,()=>{
  console.log("Server is running on port 3000");
})
