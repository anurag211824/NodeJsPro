import express from "express";
import dotenv from "dotenv";
import PORT from "./env.js";
import path from "path";
import { fileURLToPath } from "url";

// sending static files in expressJs


dotenv.config();
const app = express();

// ✅ Setup dirname for ES module
const __filename = fileURLToPath(import.meta.url);
console.log(__filename);

const __dirname = path.dirname(__filename);
console.log(__dirname);


// ✅ Serve static files
app.use(express.static(path.join(__dirname, "public")));
// app.use("/public",express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  const homePagePath = path.join(__dirname, "public", "index.html");
  res.sendFile(homePagePath);
});

app.get("/about", (req, res) => {
  return res.send("<h1>Hello about</h1>");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
