import express from "express"
import dotenv from "dotenv";
import  PORT  from "./env.js";
dotenv.config()
const app = express();
app.get("/",(req,res)=>{
    return res.send("<h1>Hello World</h1>")
})
app.get("/about",(req,res)=>{
   return res.send("<h1>Hello about</h1>")
})


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
    
})