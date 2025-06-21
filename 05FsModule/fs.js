import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);


// 1️⃣ Create and write to file
const filename = "test.txt";
const filePath = path.join(__dirname, filename);
fs.writeFileSync(filePath, "this is me anurag kumar", "utf-8");
console.log("✅ Initial file created");

// 2️⃣ Read file
const fileContent = fs.readFileSync(filePath, "utf-8");
console.log("📄 File content:\n", fileContent);

// 3️⃣ Append to file
fs.appendFileSync(filePath, "\nThis is updated data", "utf-8");
console.log("📝 File updated");

// 4️⃣ Create another file
const filename2 = "test2.txt";
const filepath2 = path.join(__dirname, filename2);
fs.writeFileSync(filepath2, "This is second file", "utf-8");
console.log("📁 Second file created");

// // 5️⃣ Delete second file
// fs.unlinkSync(filepath2);
// console.log("🗑️ Second file deleted");

// 6️⃣ Rename original file
const newUpdatedFileName = "updatedtest.txt";
const newPath = path.join(__dirname, newUpdatedFileName);
fs.renameSync(filePath, newPath);
console.log("📛 File renamed to:", newUpdatedFileName);
