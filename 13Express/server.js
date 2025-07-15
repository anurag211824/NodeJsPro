// 📦 Import core and third-party modules
import express from "express";         // Express framework for server creation
import dotenv from "dotenv";          // For loading environment variables from a .env file
import PORT from "./env.js";          // Custom port export from env.js
import path from "path";              // Node.js module for file and directory paths
import { fileURLToPath } from "url";  // Used to convert import.meta.url to __filename

// ✅ Load environment variables from .env file
dotenv.config();

// ✅ Initialize express application
const app = express();

// ✅ Setup __filename and __dirname in ES module context
const __filename = fileURLToPath(import.meta.url); // Convert import.meta.url to file path
const __dirname = path.dirname(__filename);        // Get directory name of current module

// ✅ Fetch external data using top-level await (supported in latest Node.js versions)
const response = await fetch("https://dummyjson.com/todos");  // Fetching dummy TODOs
const data = await response.json();                           // Parsing JSON response
//console.log(data); // Output the fetched data to console

// ✅ Serve static files (like HTML, CSS, JS, images) from "public" folder
//app.use(express.static(path.join(__dirname, "public")));
// Optional: app.use("/public", express.static(path.join(__dirname, "public")));
// The above line will serve static files with /public prefix (e.g., /public/style.css)

// ✅ Define routes

// GET "/" => Send index.html file from public folder
app.get("/", (req, res) => {
  const homePagePath = path.join(__dirname, "public", "index.html"); // Full path to index.html
  res.sendFile(homePagePath); // Send file as HTTP response
});

// GET "/about" => Return simple HTML string
// app.get("/about", (req, res) => {
//   return res.send("<h1>Hello about</h1>");
// });

//Route parameter in express js
app.get("/profile/:username",(req,res)=>{
  // req.params is an object
  console.log(req.params);
  console.log(req.params.username);
  res.send(`Your name is ${req.params.username}`)
})
app.get("/profile/:username/article/:slug",(req,res)=>{
  console.log(req.params);
  const formattedSlug  = req.params.slug.replace(/-/g," ")
  res.send(`<h1>Article ${req.params.username} ${formattedSlug}</h1>`)
  
})

// Query parameters in express js

app.get("/product", (req, res) => {
  console.log(req.query);
  res.send(`<h1>user searched for product ${req.query.page} ${req.query.limit}</h1>`);
});

// ✅ Start server on specified PORT
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
