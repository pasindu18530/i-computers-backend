import express from "express";
import mongoose from "mongoose";


import dns from "node:dns";

import userRouter from "./routers/userRouter.js";
import jwt from "jsonwebtoken";
import authenticateUser from "./middlewares/authentication.js";
import productRouter from "./routers/productRouter.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();

const mongodbURI="mongodb+srv://pasindunawagamuwa4_db_user:Pas18530n@cluster0.eys0fps.mongodb.net/computers?appName=Cluster0"



mongoose.connect(mongodbURI).then(
  ()=>{
    console.log("Connected to MongoDB");
    
  }
)

app.use(express.json())

app.use(authenticateUser)
app.use("/users",userRouter)
app.use("/products",productRouter)






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
