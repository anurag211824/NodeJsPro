// The main file where the Express app is 
// These steps set up your backend application:
// Express handles HTTP requests and routing.
// Mongoose interacts with the database.
// dotenv securely manages sensitive environment variables.
// authRoutes and connectDB modularize your application logic.
const express=require('express')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const authRoutes=require('./routes/authRoutes')
const connectDB=require('./config/db')

dotenv.config()
connectDB()

const app=express()
app.use(express.json())


app.use('/api/auth',authRoutes);

const PORT=process.env.PORT ||5000

app.listen(PORT,()=>{
    console.log(`Server running on part ${PORT}`);
    
})