import fs from "fs/promises"
import path from "path"
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fileName = "fspromises.txt";
const filePath = path.join(__dirname, fileName);

// Write file
fs.promises
  .writeFile(filePath, "this is the initial file", "utf-8")
  .then(() => console.log("File created successfully"))
  .catch((err) => console.log(err));

// Read file
fs.promises
  .readFile(filePath, "utf-8")
  .then((data) => console.log(data))
  .catch((err) => console.error("Error reading file:", err));

// Append file
fs.promises
  .appendFile(filePath, "\nthis is appended data", "utf-8")
  .then(() => console.log("File updated successfully"))
  .catch((err) => console.log(err));

// Delete file
fs.promises
  .unlink(filePath)
  .then(() => console.log("File deleted successfully"))
  .catch((err) => console.log(err));
