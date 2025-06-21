const fs = require('fs'); // Importing the File System module
const path = require('path'); // Importing the Path module

// File name and its complete path
const filename = "test.txt";
const filePath = path.join(__dirname, filename);

// Writing initial content to the file
fs.writeFileSync(filePath, "this is me anurag kumar", "utf-8");

// Reading and logging the file content
const fileContent = fs.readFileSync(filePath, 'utf-8');
console.log(fileContent); // Output: this is me anurag kumar

// Appending additional content to the file
const appendFile = fs.appendFileSync(filePath, "\nThis is updated data", "utf-8");
console.log(appendFile); // Undefined (appendFileSync doesn't return any value)

// Creating another file and writing content to it
const filename2 = "test2.txt";
const filepath2 = path.join(__dirname, filename2);
fs.writeFileSync(filepath2, "this is me anurag kumar", "utf-8");

// Deleting the second file
const fileDelete = fs.unlinkSync(filepath2);
console.log(fileDelete); // Undefined (unlinkSync doesn't return any value)

// Renaming the original file
const newUpdatedFileName = "updatedtest.txt";
const newPath = path.join(__dirname, newUpdatedFileName);
const renameFile = fs.renameSync(filePath, newPath);
console.log(renameFile); // Undefined (renameSync doesn't return any value)
