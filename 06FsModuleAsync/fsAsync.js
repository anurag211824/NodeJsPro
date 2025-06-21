const { error } = require("console");
const fs = require("fs");
const path = require("path");

// Define the file name and path for the first file
const fileName = "fsAsync.txt";
const filePath = path.join(__dirname, fileName);

// Write initial data to the file
fs.writeFile(filePath, "this is the initial Data", "utf-8", (err) => {
  if (err) console.log(error.message); // Log error if any
  else console.log("The file has been saved"); // Success message
});

// Read and display the content of the file
fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) console.log(err); // Log error if any
  else console.log(data); // Print file content
});

// Append data to the file
fs.appendFile(filePath, "\nthis is the updated data", "utf-8", (err) => {
  if (err) console.log(err); // Log error if any
  else console.log("File has been updated"); // Success message
});

// Define the file name and path for the second file
const fileName1 = "fsAsync1.txt";
const filePath1 = path.join(__dirname, fileName1);

// Write initial data to the second file
fs.writeFile(filePath1, "this is the initial Data", "utf-8", (err) => {
  if (err) console.log(error.message); // Log error if any
  else console.log("The file has been saved"); // Success message
});

// Delete the second file
fs.unlink(filePath1, (err) => {
  if (err) console.log(err); // Log error if any
  else console.log("File has been deleted"); // Success message
});
