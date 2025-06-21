const fs = require("fs/promises");
const path = require("path");

const fileName = "fsAyncAwait.txt";
const filePath = path.join(__dirname, fileName);

const writeToFile = async () => {
  try {
    await fs.writeFile(filePath, "This is the intial Data", "utf-8");
    console.log("file created sucessfully");
  } catch {
    console.log(error);
  }
};
writeToFile();

const readFile = async () => {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    console.log(data);

    console.log("file read sucessfully");
  } catch {
    console.log(error);
  }
};
readFile();

const appendFile = async () => {
  try {
    await fs.appendFile(filePath, "\n this is updated data", "utf-8");

    console.log("file updated sucessfully");
  } catch (error) {
    console.error(error);
  }
};
appendFile();
