import crypto from "crypto";
import fs from "fs";
import path from "path";

const usersPath = path.resolve("/NodejsPro/05FsModule/NoteskeeperApp/NotesDataBase/Users/users.json");

// Read users from file
const getUsers = () => {
  const data = fs.readFileSync(usersPath, "utf-8");
  return JSON.parse(data);
};

// Save users to file
const saveUsers = (users) => {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2), "utf-8");
};

export const register = (email, username, password) => {
  const users = getUsers();
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    console.log(username, "already exists");
    return;
  }

  const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
  users.push({ email, username, password: hashedPassword });
  saveUsers(users);

  console.log("Registration successful");
};

export const login = (email, password) => {
  const users = getUsers();
  const user = users.find((user) => user.email === email);
  if (!user) {
    console.log(email, "Invalid Email");
    return;
  }

  const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
  if (user.password === hashedPassword) {
    console.log("Login Successful");
  } else {
    console.log("Incorrect Password");
  }
};
