import { register, login } from "/NodejsPro/04CryptoModule/task1.js";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const usersPath = path.resolve("/NodejsPro/05FsModule/NoteskeeperApp/NotesDataBase/Users/users.json");
// Read users from file
const getUsers = () => {
  const data = fs.readFileSync(usersPath, "utf-8");
  return JSON.parse(data);
};
const createNotes = (email, notes) => {
  const users =  getUsers()
  const exits = users.find((user=> user.email !== email))
  if(!exits){
    console.log("Enter Valid user");
  }
  const notesDir = path.join(__dirname, "NotesDataBase","Notes");

  // ✅ Create Notes folder if it doesn't exist
  if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
    console.log("📂 Notes directory created");
  }

  const filePath = path.join(notesDir, `${email}.txt`);
  fs.writeFileSync(filePath, notes, "utf-8");
  console.log("✅ Note created for:", email);
};

const AddInNotes = (email,notes)=>{
    const users =  getUsers()
  const exits = users.find((user)=> user.email === email)
  if(!exits){
    console.log("Enter Valid user");
    return
  }
  const notesDir = path.join(__dirname, "NotesDataBase","Notes");

  // ✅ Create Notes folder if it doesn't exist
  if (!fs.existsSync(notesDir)) {
    fs.mkdirSync(notesDir);
    console.log("📂 Notes directory created");
  }

  const filePath = path.join(notesDir, `${email}.txt`);
  fs.appendFileSync(filePath, notes, "utf-8");
  console.log("✅ Note created for:", email);
}

// 🚀 Usage
// register("ak055@gmail.com", "Anurag Kumar", "12345@jio");
// login("ak055@gmail.com", "12345@jio");
// createNotes("ak055@gmail.com", "hello this is my notes");

// register("uk0@gmail.com", "Ujjawal Kumar", "12345@jio");
// login("uk0@gmail.com", "12345@jio");
// createNotes("uk0@gmail.com", "hello this is my notes");
AddInNotes("uk0@gmail.com","\nI am updating notes")
